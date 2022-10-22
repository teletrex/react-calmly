/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import TestLocalizationWrapper from '../../test-helpers/TestLocalizationWrapper';

import useCollator from './useCollator';
import { COLLATION_TYPE } from './presets';
import tests from './tests';

const getWrapper = locale => ({ children }) => {
  return <TestLocalizationWrapper locale={locale}>{children}</TestLocalizationWrapper>;
};

describe('useCollator', () => {
  describe('{ compare }', () => {
    Object.values(COLLATION_TYPE).forEach(preset => {
      Object.keys(tests).forEach(locale => {
        tests[locale].forEach(test => {
          it(`returns "${test.result[preset]}" with "${test.args.join(
            ', '
          )}" arguments for "${locale}" locale with "${preset}" preset`, () => {
            const wrapper = getWrapper(locale);

            const { result } = renderHook(() => useCollator(preset), { wrapper });
            const { compare } = result.current;

            expect(compare(...test.args)).toBe(test.result[preset]);
          });
        });
      });
    });
    it('fallbacks to "sort" preset without preset presented', () => {
      const locale = 'en';
      const wrapper = getWrapper(locale);
      const { result } = renderHook(() => useCollator(), { wrapper });
      const { compare } = result.current;

      expect(compare('a', 'A')).toBe(-1);
    });
  });
  describe('{ includes }', () => {
    Object.values(COLLATION_TYPE).forEach(preset => {
      it(`should return ${preset ===
        'search'} for "App" and "apple" for en locale with ${preset} preset`, () => {
        const locale = 'en';
        const wrapper = getWrapper(locale);
        const { result } = renderHook(() => useCollator(preset), { wrapper });
        const { includes } = result.current;

        expect(includes('App', 'apple')).toBe(preset === 'search');
      });
      it(`should return ${preset ===
        'search'} for "Apple" and "äpple" for en locale with ${preset} preset`, () => {
        const locale = 'en';
        const wrapper = getWrapper(locale);
        const { result } = renderHook(() => useCollator(preset), { wrapper });
        const { includes } = result.current;

        expect(includes('apple', 'äpplé')).toBe(preset === 'search');
      });
      it(`should return false for "Apple" and "appl" for ${preset} preset`, () => {
        const locale = 'en';
        const wrapper = getWrapper(locale);
        const { result } = renderHook(() => useCollator(preset), { wrapper });
        const { includes } = result.current;

        expect(includes('Apple', 'appl')).toBe(false);
      });
    });
  });
});
