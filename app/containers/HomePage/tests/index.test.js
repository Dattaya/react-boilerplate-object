/**
 * Test the HomePage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ReposList from 'components/ReposList';
import { HomePage, mapDispatchToProps } from '../index';
import { changeUsername } from '../actions';

describe('<HomePage />', () => {
  it('should render the repos list', () => {
    // TODO Fix test
    const renderedComponent = shallow(
      <HomePage data={{ loading: false, repos: [] }} />
    );
    expect(renderedComponent.contains(<ReposList loading={false} repos={[]} />)).toEqual(true);
  });

  it('should render fetch the repos on mount if a username exists', () => {
    // TODO Fix test
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <HomePage
          username="Not Empty"
          onChangeUsername={() => {}}
          setCurrentUser={submitSpy}
          data={{}}
        />
      </IntlProvider>
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toBeDefined();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const username = 'mxstbr';
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });
  });
});
