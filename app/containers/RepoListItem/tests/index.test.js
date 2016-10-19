/**
 * Test the repo list item
 */

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { IntlProvider } from 'react-intl';
import { RepoListItem } from '../index';
import ListItem from 'components/ListItem';

describe('<RepoListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      login: 'mxstbr',
      htmlUrl: 'https://github.com/mxstbr/react-boilerplate',
      name: 'react-boilerplate',
      openIssuesCount: 20,
      fullName: 'mxstbr/react-boilerplate',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <RepoListItem item={item} />
    );
    expect(renderedComponent.find(ListItem).length).toEqual(1);
  });

  it('should not render the current username', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <RepoListItem item={item} currentUser={item.login} />
      </IntlProvider>
    );
    expect(renderedComponent.text().indexOf(item.login)).toBeLessThan(0);
  });

  it('should render usernames that are not the current one', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <RepoListItem item={item} currentUser="nikgraf" />
      </IntlProvider>
    );
    expect(renderedComponent.text().indexOf(item.login)).toBeGreaterThan(-1);
  });

  it('should render the repo name', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <RepoListItem item={item} />
      </IntlProvider>
    );
    expect(renderedComponent.text().indexOf(item.name)).toBeGreaterThan(-1);
  });

  it('should render the issue count', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <RepoListItem item={item} />
      </IntlProvider>
    );
    expect(renderedComponent.text().indexOf(item.openIssuesCount)).toBeGreaterThan(1);
  });

  it('should render the IssueIcon', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <RepoListItem item={item} />
      </IntlProvider>
    );
    expect(renderedComponent.find('svg').length).toEqual(1);
  });
});
