/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from 'containers/App/actions';
import { selectUsername } from './selectors';
import { changeUsername } from './actions';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import H2 from 'components/H2';
import Input from './Input';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import Section from './Section';
import messages from './messages';
import {
  selectCurrentUser,
} from 'containers/App/selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.onSubmitForm();
    }
  }

  /**
   * Change current username when the form has been submitted
   */
  onSubmitForm = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    this.props.setCurrentUser(this.props.username);
  };

  render() {
    let mainContent = null;

    const { loading, repos, error } = this.props.data;

    // Show a loading indicator when we're loading
    if (loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (error) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (repos !== null) {
      mainContent = (<List items={repos} component={RepoListItem} />);
    }

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            {mainContent}
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    repos: React.PropTypes.array,
  }),
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
  setCurrentUser: React.PropTypes.func,
};

const query = gql`
  query Repos($login: String) {
    repos(login: $login) {
      name
      login
      fullName
      htmlUrl
      openIssuesCount
    }
}`;

const HomePageWithData = graphql(query, {
  options: ({ login }) => ({ variables: { login }, noFetch: !login }),
}
)(HomePage);

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  username: selectUsername(),
  login: selectCurrentUser(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePageWithData);
