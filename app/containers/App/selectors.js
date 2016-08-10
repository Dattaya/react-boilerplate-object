/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.global;

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.currentUser
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.loading
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.error
);

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.userData.repositories
);

export {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
};
