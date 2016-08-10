import {
  selectLanguage,
} from '../selectors';
import expect from 'expect';

describe('selectLanguage', () => {
  const globalSelector = selectLanguage();
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      language: globalState,
    };
    expect(globalSelector(mockedState)).toEqual(globalState);
  });
});
