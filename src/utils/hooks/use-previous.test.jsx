/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { renderHook } from '@testing-library/react-hooks';

import { usePrevious } from './use-previous';

describe('usePrevious', () => {
  it('should return undefined', () => {
    const value = 'initial';
    const { result } = renderHook(() => {
      return usePrevious(value);
    });
    expect(result.current).toBeUndefined();
  });

  it('should return initial', () => {
    const value = 'initial';
    const { result } = renderHook(() => {
      return usePrevious(value, value);
    });
    expect(result.current).toBe('initial');
  });

  it('should return previous values', () => {
    let value = 'value0';

    const { result, rerender } = renderHook(() => {
      return usePrevious(value, value);
    });
    expect(result.current).toBe('value0');

    value = 'value1';
    rerender();
    expect(result.current).toBe('value0');

    value = 'value2';
    rerender();
    expect(result.current).toBe('value1');

    value = 'value3';
    rerender();
    expect(result.current).toBe('value2');
  });
});
