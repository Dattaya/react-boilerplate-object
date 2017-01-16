/**
 * Test store addons
 */

import { browserHistory } from 'react-router';
import apolloClient from 'apolloClient';
import configureStore from '../store';

describe('configureStore', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory, apolloClient);
  });

  describe('asyncReducers', () => {
    it('should contain an object for async reducers', () => {
      expect(typeof store.asyncReducers).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });
});
