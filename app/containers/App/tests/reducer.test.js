import expect from 'expect';
import update from 'immutability-helper';
import appReducer from '../reducer';
import {
  setCurrentUser,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      currentUser: null,
    };
  });

  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(state);
  });

  it('should handle the setCurrentUser action correctly', () => {
    const user = 'test';
    const expectedResult = update(state, {
      currentUser: { $set: user },
    });

    expect(appReducer(state, setCurrentUser(user))).toEqual(expectedResult);
  });
});
