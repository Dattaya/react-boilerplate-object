/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.global;

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.currentUser
);

export {
  selectGlobal,
  selectCurrentUser,
};
