/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    routing: routerReducer,
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
}
