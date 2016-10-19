import expect from 'expect';

import {
  SET_CURRENT_USER,
} from '../constants';

import {
  setCurrentUser,
} from '../actions';

describe('App Actions', () => {
  describe('setCurrentUser', () => {
    it('should return the correct type and the passed username', () => {
      const user = 'test';
      const expectedResult = {
        type: SET_CURRENT_USER,
        user,
      };

      expect(setCurrentUser(user)).toEqual(expectedResult);
    });
  });
});
