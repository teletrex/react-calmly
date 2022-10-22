/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import { useCallback, useEffect, useRef } from 'react';

export function useTimeout(handler, delay) {
  const ready = useRef(false);
  const timeoutId = useRef(NaN);
  const callback = useRef(handler);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(
    (...args) => {
      ready.current = false;
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = NaN;
      }

      timeoutId.current = setTimeout(() => {
        ready.current = true;
        callback.current(...args);
      }, delay);
    },
    [delay]
  );

  const clear = useCallback(() => {
    ready.current = false;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = NaN;
    }
  }, []);

  useEffect(() => {
    callback.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!Number.isNaN(timeoutId.current)) {
      set();
    }

    return clear;
  }, [clear, delay, set]);

  return [set, clear, isReady];
}
