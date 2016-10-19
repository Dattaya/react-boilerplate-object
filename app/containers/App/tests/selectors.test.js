import expect from 'expect';

import {
  selectGlobal,
  selectCurrentUser,
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
