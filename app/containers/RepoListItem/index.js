/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import ListItem from 'components/ListItem';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';
import { selectCurrentUser } from 'containers/App/selectors';

export class RepoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;

    if (!item) {
      return null;
    }

    let nameprefix = '';

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    if (item.login.toLowerCase() !== this.props.currentUser.toLowerCase()) {
      nameprefix = `${item.login}/`;
    }

    // Put together the content of the repository
    const content = (
      <Wrapper>
        <RepoLink href={item.htmlUrl} target="_blank">
          {nameprefix + item.name}
        </RepoLink>
        <IssueLink href={`${item.htmlUrl}/issues`} target="_blank">
          <IssueIcon />
          <FormattedNumber value={item.openIssuesCount} />
        </IssueLink>
      </Wrapper>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.fullName}`} item={content} />
    );
  }
}

RepoListItem.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

RepoListItem.defaultProps = {
  currentUser: '',
};

export default connect(createSelector(
  selectCurrentUser(),
  (currentUser) => ({ currentUser })
))(RepoListItem);
