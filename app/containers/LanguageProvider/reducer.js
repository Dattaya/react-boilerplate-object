/*
 *
 * LanguageProvider reducer
 *
 */

import {
  CHANGE_LOCALE,
} from './constants';

const initialState = {
  locale: 'en',
};

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.locale };
    default:
      return state;
  }
}

export default languageProviderReducer;
