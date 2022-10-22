/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { renderHook } from '@testing-library/react-hooks';

import {
  ERROR_RELEGATION_REASON_TAG,
  relegateErrors,
} from '../../utils/test-helpers/relegate-errors';

import useFormatCurrency from './useFormatCurrency';
import presets from './presets';
import tests from './tests';

describe('useFormatCurrency', () => {
  Object.keys(presets).forEach(preset => {
    tests.forEach(test => {
      it(`Should return formatted value ${test.value} and currency ${test.currency} with ${preset} preset`, () => {
        const { result } = renderHook(() => useFormatCurrency());
        const { formatCurrency } = result.current;
        expect(formatCurrency(test.value, test.currency, preset)).toBe(test.result[preset]);
      });
    });
  });
  tests.forEach(test => {
    it(`Should return formatted value ${test.value} and currency ${test.currency} without preset`, () => {
      const { result } = renderHook(() => useFormatCurrency());
      const { formatCurrency } = result.current;
      expect(formatCurrency(test.value, test.currency)).toBe(test.result.default);
    });
  });
  it(`Should return empty string without currency`, () => {
    const { result } = renderHook(() => useFormatCurrency());
    const { formatCurrency } = result.current;
    expect(formatCurrency(0)).toBe('');
  });
  it(`Should return empty string without value`, () => {
    const { result } = renderHook(() => useFormatCurrency());
    const { formatCurrency } = result.current;
    expect(formatCurrency()).toBe('');
  });
  it(`Should return empty string with wrong value type`, () => {
    const { result } = renderHook(() => useFormatCurrency());
    const { formatCurrency } = result.current;
    expect(formatCurrency('string', 'USD')).toBe('');
  });
  it(`Should return empty string with wrong currency type`, () => {
    const { result } = renderHook(() => useFormatCurrency());
    const { formatCurrency } = result.current;
    expect(formatCurrency(0, 0)).toBe('');
  });
  it(`Should return 0 if error`, () => {
    relegateErrors(
      {
        reason: 'Invalid input breaking ReactIntl is tested- desired test behavior.',
        reasonTag: ERROR_RELEGATION_REASON_TAG.EXPECTED_BEHAVIOR,
        expectedErrorCount: 1,
        skipProducedLogs: true,
      },
      () => {
        const { result } = renderHook(() => useFormatCurrency());
        const { formatCurrency } = result.current;
        expect(formatCurrency(0, 'A')).toBe('0');
      }
    );
  });
});
