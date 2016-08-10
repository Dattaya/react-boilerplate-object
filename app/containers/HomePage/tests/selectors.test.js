import expect from 'expect';

import {
  selectHome,
  selectUsername,
} from '../selectors';

describe('selectHome', () => {
  const homeSelector = selectHome();
  it('should select the home state', () => {
    const homeState = {
      userData: {},
    };
    const mockedState = {
      home: homeState,
    };
    expect(homeSelector(mockedState)).toEqual(homeState);
  });
});

describe('selectUsername', () => {
  const usernameSelector = selectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = {
      home: {
        username,
      },
    };
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});
