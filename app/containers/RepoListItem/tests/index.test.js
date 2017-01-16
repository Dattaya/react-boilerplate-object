/**
 * Test the repo list item
 */

import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';

import ListItem from 'components/ListItem';
import { RepoListItem } from '../index';

const renderComponent = (props = {}) => render(
  <IntlProvider locale="en">
    <RepoListItem {...props} />
  </IntlProvider>
);

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
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });

  it('should not render the current username', () => {
    const renderedComponent = renderComponent({
      item,
      currentUser: item.login,
    });
    expect(renderedComponent.text()).not.toContain(item.login);
  });

  it('should render usernames that are not the current one', () => {
    const renderedComponent = renderComponent({
      item,
      currentUser: 'nikgraf',
    });
    expect(renderedComponent.text()).toContain(item.login);
  });

  it('should render the repo name', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.text()).toContain(item.name);
  });

  it('should render the issue count', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.text()).toContain(item.openIssuesCount);
  });

  it('should render the IssueIcon', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.find('svg').length).toBe(1);
  });
});
