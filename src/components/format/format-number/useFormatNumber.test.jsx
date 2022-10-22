/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { renderHook } from '@testing-library/react-hooks';

import useFormatNumber from './useFormatNumber';
import presets from './presets';
import tests from './tests';

describe('useFormatNumber', () => {
  Object.keys(presets).forEach(preset => {
    tests.forEach(test => {
      it(`Should return formatted value ${test.value} with ${preset} preset`, () => {
        const { result } = renderHook(() => useFormatNumber());
        const { formatNumber } = result.current;
        expect(formatNumber(test.value, preset)).toBe(test.result[preset]);
      });
    });
  });
  tests.forEach(test => {
    it(`Should return formatted value ${test.value} without preset`, () => {
      const { result } = renderHook(() => useFormatNumber());
      const { formatNumber } = result.current;
      expect(formatNumber(test.value)).toBe(test.result.default);
    });
  });
  it(`Should return empty string without value`, () => {
    const { result } = renderHook(() => useFormatNumber());
    const { formatNumber } = result.current;
    expect(formatNumber()).toBe('');
  });
  it(`Should return empty string with wrong value type`, () => {
    const { result } = renderHook(() => useFormatNumber());
    const { formatNumber } = result.current;
    expect(formatNumber('string')).toBe('');
  });
});
