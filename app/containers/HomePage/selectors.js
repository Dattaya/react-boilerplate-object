/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.home;

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => homeState.username,
);

export {
  selectHome,
  selectUsername,
};
