import expect from 'expect';

import {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
} from '../selectors';

describe('selectGlobal', () => {
  const globalSelector = selectGlobal();
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(globalSelector(mockedState)).toEqual(globalState);
  });
});

describe('selectCurrentUser', () => {
  const currentUserSelector = selectCurrentUser();
  it('should select the current user', () => {
    const username = 'mxstbr';
    const mockedState = {
      global: {
        currentUser: username,
      },
    };
    expect(currentUserSelector(mockedState)).toEqual(username);
  });
});

describe('selectLoading', () => {
  const loadingSelector = selectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      global: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('selectError', () => {
  const errorSelector = selectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      global: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('selectRepos', () => {
  const reposSelector = selectRepos();
  it('should select the repos', () => {
    const repositories = [];
    const mockedState = {
      global: {
        userData: {
          repositories,
        },
      },
    };
    expect(reposSelector(mockedState)).toEqual(repositories);
  });
});
