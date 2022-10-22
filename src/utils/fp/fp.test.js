/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import {
  nthArgument,
  call,
  flowParallel,
  setIn,
  getRootKey,
  replaceNthItem,
  isEqualLikeString,
  parametrizedDebounce,
} from './index';

describe('fp helpers', () => {
  describe('nthArgument', () => {
    it('should take nth argument of a given function', () => {
      const getSecondArg = nthArgument(1);

      expect(getSecondArg(1, 2)).toEqual(2);
    });
  });

  describe('call', () => {
    it('should invoke function w/o need of giving _this context', () => {
      const mock = jest.fn((a, b) => a + b);

      expect(call(mock, 1, 2)).toEqual(3);
      expect(mock).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('flowParallel', () => {
    it('should invoke given function consistently with additional arguments', () => {
      const mock = jest.fn((a, b) => a + b);
      const fn = flowParallel([a => a.key, mock]);

      expect(fn({ key: 4 }, 3)).toEqual(7);
      expect(mock).toHaveBeenCalledWith(4, 3);
    });
  });

  describe('setIn', () => {
    it('should not mutate object', () => {
      const initial = { a: { b: { c: 3 } } };
      const cloned = setIn(initial, ['a', 'b', 'c'], 4);

      expect(cloned).not.toBe(initial);
      expect(cloned.a).not.toBe(initial.a);
      expect(cloned.a.b).not.toBe(initial.a.b);
      expect(cloned).toEqual({ a: { b: { c: 4 } } });
    });

    it('should set value in object root', () => {
      const initial = {};
      const cloned = setIn(initial, ['a'], 4);

      expect(cloned.a).toEqual(4);
    });

    it('should return root key name', () => {
      const ROOT_KEY = 'a';
      const obj = { [ROOT_KEY]: 3 };

      expect(getRootKey(obj)).toEqual(ROOT_KEY);
    });
  });

  describe('replaceNthItem', () => {
    it('should return new array with correctly modified item', () => {
      const arr = [1, 2, 3];
      const newArr = replaceNthItem(arr, 1, v => v + 10);

      expect(arr).not.toBe(newArr);
      expect(newArr).toEqual([1, 12, 3]);
    });
  });

  describe('isEqualLikeString', () => {
    it('should return false if different types', () => {
      expect(isEqualLikeString(undefined, {})).toBeFalsy();
    });

    it('should return false if different length', () => {
      expect(isEqualLikeString({ a: 10 }, { a: 10, b: 20 })).toBeFalsy();
      expect(isEqualLikeString([10, '20'], ['20'])).toBeFalsy();
    });

    it('should return true', () => {
      expect(isEqualLikeString({ a: 10, b: '20', c: {} }, { a: 10, b: 20, c: {} })).toBeTruthy();
      expect(isEqualLikeString([10, {}, '20'], [10, 20, {}])).toBeTruthy();
    });
  });

  describe('parametrizedDebounce', () => {
    it('should call with merged params', () => {
      const mockCallback = jest.fn();
      const debounceFn = parametrizedDebounce(mockCallback);

      debounceFn({ a: 10 });
      debounceFn({ b: 20 });
      debounceFn.flush();

      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toEqual({ a: 10, b: 20 });
    });

    it('should call with replaced params', () => {
      const mockCallback = jest.fn();
      const debounceFn = parametrizedDebounce(mockCallback);

      debounceFn({ a: 10 });
      debounceFn({ b: 20 }, true);
      debounceFn.flush();

      expect(mockCallback.mock.calls[0][0]).toEqual({ b: 20 });
    });
  });
});
