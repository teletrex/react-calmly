/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { useCallback, useState } from 'react';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isNil from 'lodash/isNil';

const applyRef = (ref, value) => {
  if (isFunction(ref)) {
    ref(value);
  } else if (isObject(ref) && !isNil(ref)) {
    // eslint-disable-next-line no-param-reassign
    ref.current = ref;
  }
};

/**
 *
 * @returns {[Element, function]}
 */
export function useNodeRef({ forwardRef } = {}) {
  const [nodeRef, setRef] = useState();

  return [
    nodeRef,
    useCallback(
      node => {
        if (node) {
          setRef(node);
          applyRef(forwardRef, node);
        }
      },
      [forwardRef]
    ),
  ];
}

/**
 *
 * @param reference Function|{{current:Object}} - React
 * @returns {Object}
 */
export const getNode = reference => (isFunction(reference) ? reference() : reference?.current);
