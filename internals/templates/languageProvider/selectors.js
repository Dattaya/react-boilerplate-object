import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = () => (state) => state.language;

/**
 * Select the language locale
 */

const selectLocale = () => createSelector(
  selectLanguage(),
  (languageState) => languageState.locale
);

export {
  selectLanguage,
  selectLocale,
};
