/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import setWith from 'lodash/setWith';
import clone from 'lodash/clone';
import curryRight from 'lodash/curryRight';
import constant from 'lodash/constant';
import head from 'lodash/head';
import keys from 'lodash/keys';
import flow from 'lodash/flow';
import cond from 'lodash/cond';
import identity from 'lodash/identity';
import stubTrue from 'lodash/stubTrue';
import slice from 'lodash/slice';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';

export function nthArgument(n) {
  return (...args) => args[n];
}

export function call(fn, ...args) {
  return fn(...args);
}

export const callRightCurried = curryRight(call, 2);

export function flowParallel(fns) {
  return (first, ...args) => fns.reduce((firstArg, fn) => fn(firstArg, ...args), first);
}

export function setIn(obj, path, value) {
  return setWith(clone(obj), path, value, clone);
}

export const getRootKey = flow([keys, head]);

export const NoopComponent = constant(null);

export const boolToNumber = cond([
  [identity, constant(1)],
  [stubTrue, constant(0)],
]);

export function replaceNthItem(array, index, modifyFn) {
  const head = slice(array, 0, index);
  const item = get(array, index);
  const tail = slice(array, index + 1);

  return [...head, modifyFn(item), ...tail];
}

export function isEqualLikeString(a, b) {
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    const copyA = [...a].sort();
    const copyB = [...b].sort();

    for (let i = 0; i < copyA.length; i++) {
      if (`${copyA[i]}` !== `${copyB[i]}`) {
        return false;
      }
    }

    return true;
  }

  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return !keysA.some(key => `${a[key]}` !== `${b[key]}`);
  }

  return false;
}

export const parametrizedDebounce = (callback, time = 10) => {
  let mergeParams = {};
  let isReplaced = false;

  const debounceFn = debounce(() => {
    callback(mergeParams, isReplaced);

    mergeParams = {};
  }, time);

  const fn = (params, isReplace) => {
    mergeParams = isReplace
      ? params
      : {
          ...mergeParams,
          ...params,
        };
    isReplaced = isReplace;

    debounceFn();
  };

  fn.cancel = debounceFn.cancel;
  fn.flush = debounceFn.flush;

  return fn;
};

/**
 * Description: Just shortcut to "elegant" access to ref's object data
 * @param {object} ref - reference object created by React.useRef() and/or React.createRef()
 * @returns {*} reference object current value
 */
export const current = ref => ref?.current;

/**
 *
 * @param {any} value
 * @returns {boolean}
 */
export const isTrue = value => value === true;

/**
 *
 * @param {any} value
 * @returns {boolean}
 */
export const isFalse = value => value === false;

/**
 *
 * @param {function} Fn
 * @returns {function(...[*]): function(): *}
 */
export const withFn = Fn => (...args) => () => Fn(...args);
export const ifTrue = withFn(isTrue);
export const ifFalse = withFn(isFalse);
export const ifFunction = withFn(isFunction);
