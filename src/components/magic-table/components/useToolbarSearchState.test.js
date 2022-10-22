/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import { renderHook, act } from '@testing-library/react-hooks';

import useToolbarSearchState from './useToolbarSearchState';

describe('useToolbarSearchState', () => {
  describe('value return', () => {
    test('returns empty string by default', () => {
      const { result } = renderHook(() => useToolbarSearchState({}));

      expect(result.current.value).toEqual('');
    });

    test('given value property should be returned as value', () => {
      const { result } = renderHook(() =>
        useToolbarSearchState({
          value: 'some value',
        })
      );

      expect(result.current.value).toEqual('some value');
    });

    test('given searchTextValue property should be returned as value', () => {
      const { result } = renderHook(() =>
        useToolbarSearchState({
          searchTextValue: 'some value as search text value',
        })
      );

      expect(result.current.value).toEqual('some value as search text value');
    });

    test('value can be fully controlled', () => {
      const { result } = renderHook(() => useToolbarSearchState({}));

      act(() => {
        result.current.setValue('new value');
      });

      expect(result.current.value).toEqual('new value');
    });

    test('value can be fully controlled after initial value given', () => {
      const { result } = renderHook(() => useToolbarSearchState({ value: 'some value' }));

      expect(result.current.value).toEqual('some value');
      act(() => {
        result.current.setValue('new value');
      });
      expect(result.current.value).toEqual('new value');
      act(() => {
        result.current.setValue('new value 2');
      });
      expect(result.current.value).toEqual('new value 2');
    });
  });

  describe('when both value and searchTextValue are defined', () => {
    test('value will be returned instead of searchTextValue', () => {
      const { result } = renderHook(() =>
        useToolbarSearchState({
          value: 'the value',
          searchTextValue: 'the search text value',
        })
      );

      expect(result.current.value).toEqual('the value');
    });

    test('searchTextValue will be returned if it changes', () => {
      const { result, rerender } = renderHook(props => useToolbarSearchState(props), {
        initialProps: {
          value: 'the value',
          searchTextValue: 'the search text value',
        },
      });

      expect(result.current.value).toEqual('the value');
      rerender({ value: 'the value', searchTextValue: 'new search text value' });
      expect(result.current.value).toEqual('new search text value');
    });

    test('value will be returned if it changes', () => {
      const { result, rerender } = renderHook(props => useToolbarSearchState(props), {
        initialProps: {
          value: 'the value',
          searchTextValue: 'the search text value',
        },
      });

      expect(result.current.value).toEqual('the value');
      rerender({ value: 'the new value', searchTextValue: 'the search text value' });
      expect(result.current.value).toEqual('the new value');
    });

    test('value will be returned if it and searchTextValue change', () => {
      const { result, rerender } = renderHook(props => useToolbarSearchState(props), {
        initialProps: {
          value: 'the value',
          searchTextValue: 'the search text value',
        },
      });

      expect(result.current.value).toEqual('the value');
      rerender({ value: 'the new value', searchTextValue: 'the new search text value' });
      expect(result.current.value).toEqual('the new value');
    });
  });
});
