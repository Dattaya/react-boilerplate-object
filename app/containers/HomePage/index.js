/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import Clock from 'containers/Clock';
import { setCurrentUser } from 'containers/App/actions';
import {
  makeSelectCurrentUser,
} from 'containers/App/selectors';

import { makeSelectUsername } from './selectors';
import { changeUsername } from './actions';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';

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
    const { loading, error, repos } = this.props.data;
    const reposListProps = {
      loading,
      error,
      repos,
    };

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
            <Clock />
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
            <ReposList {...reposListProps} />
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
  }
`;

const withData = graphql(query, {
  options: ({ login }) => ({ variables: { login }, noFetch: !login }),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  login: makeSelectCurrentUser(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(withData(HomePage));
