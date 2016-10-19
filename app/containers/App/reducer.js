/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  SET_CURRENT_USER,
} from './constants';

// The initial state of the App
const initialState = {
  currentUser: null,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.user };

    default:
      return state;
  }
}

export default appReducer;
