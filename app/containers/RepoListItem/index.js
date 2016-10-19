/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { FormattedNumber } from 'react-intl';
import { selectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import IssueIcon from 'components/IssueIcon';
import A from 'components/A';

import styles from './styles.css';

export class RepoListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
      <div className={styles.linkWrapper}>
        <A
          className={styles.linkRepo}
          href={item.htmlUrl}
          target="_blank"
        >
          {nameprefix + item.name}
        </A>
        <A
          className={styles.linkIssues}
          href={`${item.htmlUrl}/issues`}
          target="_blank"
        >
          <IssueIcon className={styles.issueIcon} />
          <FormattedNumber value={item.openIssuesCount} />
        </A>
      </div>
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
