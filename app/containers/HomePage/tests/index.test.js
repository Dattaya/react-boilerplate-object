/**
 * Test the HomePage
 */

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { IntlProvider } from 'react-intl';
import { HomePage, mapDispatchToProps } from '../index';
import { changeUsername } from '../actions';
import RepoListItem from 'containers/RepoListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';

describe('<HomePage />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <HomePage data={{ loading: true }} />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    // TODO Fix test
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <HomePage
          data={{
            loading: false,
            error: { message: 'Loading failed!' },
          }}

        />
      </IntlProvider>
    );
    expect(
      renderedComponent
        .text()
        .indexOf('Something went wrong, please try again!')
      ).toBeGreaterThan(-1);
  });

  it('should render fetch the repos on mount if a username exists', () => {
    // TODO Fix test
    const setCurrentUserSpy = expect.createSpy();
    mount(
      <IntlProvider locale="en">
        <HomePage
          username="Not Empty"
          onChangeUsername={() => {}}
          setCurrentUser={setCurrentUserSpy}
          data={{}}
        />
      </IntlProvider>
    );
    expect(setCurrentUserSpy).toHaveBeenCalled();
  });

  it('should render the repositories if loading was successful', () => {
    const repos = [{
      login: 'mxstbr',
      htmlUrl: 'https://github.com/mxstbr/react-boilerplate',
      name: 'react-boilerplate',
      openIssuesCount: 20,
      fullName: 'mxstbr/react-boilerplate',
    }];
    const renderedComponent = shallow(
      <HomePage data={{ repos, error: null }} />
    );

    expect(renderedComponent.contains(<List items={repos} component={RepoListItem} />)).toEqual(true);
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toExist();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        const username = 'mxstbr';
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });
  });
});
