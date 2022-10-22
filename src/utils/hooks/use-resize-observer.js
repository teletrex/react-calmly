/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';
import ResizeObserverPonyfill from 'resize-observer-polyfill';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';

import { getEmptyBounds } from '../DomUtils';

import { useNodeRef } from './use-node-ref';

const Observer = window.ResizeObserver || ResizeObserverPonyfill;

/**
 * If properties are given, returns new object containing only those,
 * otherwise, returns object.
 * @param {Object} obj
 * @param {string[] | null | undefined} properties
 */
const getFilteredObject = (obj, properties) => {
  if (!properties) {
    return obj;
  }
  return pick(obj, properties);
};

/**
 *
 * @param {Object} config
 * @param {number} config.debounceDelay
 * @param {boolean} config.trailing
 * @param {string[] | null | undefined} config.observableProperties - specify with properties you want to observe to avoid unnecessary re-renders. undefined to observe all.
 */
export const useResizeObserver = ({
  debounceDelay = 16,
  trailing = true,
  observableProperties,
} = {}) => {
  const [element, setElement] = useNodeRef();
  const observablePropertiesRef = useRef(observableProperties);
  const contentRectRef = useRef(getFilteredObject(getEmptyBounds(), observableProperties));
  const [contentRect, setContentRect] = useState(contentRectRef.current);

  // to make easier to use the hook we check if the array is equal by it's contents and not by reference.
  if (!isEqual(observableProperties, observablePropertiesRef.current)) {
    observablePropertiesRef.current = observableProperties;
  }

  // to avoid unnecessary re-renders we check using the value on the ref and update only if the
  // observed values change.
  const setContentRectIfChanged = useCallback(
    newRect => {
      const filteredNewRect = getFilteredObject(newRect, observablePropertiesRef.current);
      if (!isEqual(filteredNewRect, contentRectRef.current)) {
        contentRectRef.current = filteredNewRect;
        setContentRect(filteredNewRect);
      }
    },
    [observablePropertiesRef.current]
  );

  useEffect(() => {
    if (!element) {
      return undefined;
    }

    const observer = new Observer(
      debounce(
        ([entry]) => {
          setContentRectIfChanged(entry.contentRect);
        },
        debounceDelay,
        { trailing }
      )
    );
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [debounceDelay, element, trailing, setContentRectIfChanged]);

  return {
    /**
     * @type {{top: number, left: number, bottom: number, x: number, width: number, y: number, right: number, height: number}}
     */
    contentRect,
    element,
    setElement,
  };
};
