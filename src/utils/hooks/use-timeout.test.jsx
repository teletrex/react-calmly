/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import { renderHook, act } from '@testing-library/react-hooks';
import noop from 'lodash/noop';

import { useTimeout } from './use-timeout';

describe('useTimeout', () => {
  it('should be managed safe', () => {
    const { result } = renderHook(() => {
      return useTimeout(noop, 300);
    });
    const [set, clear, isReady] = result.current;
    expect(isReady()).toBeFalsy();

    act(() => {
      set('A');
    });
    act(() => {
      set('B');
    });
    act(() => {
      clear();
    });
    expect(isReady()).toBeFalsy();
  });

  it('should call delayed callback with defined delay', done => {
    const testCallback = (p1, p2) => {
      expect(p1).toBe('testP1');
      expect(p2).toBe('testP2');
      done();
    };
    const { result } = renderHook(() => {
      return useTimeout(testCallback, 300);
    });

    const [set] = result.current;
    act(() => {
      set('testP1', 'testP2');
    });
  }, 500);

  it('should call later, later,... until changes stop occurs (debounce)', done => {
    const started = new Date().getTime();
    const timeout = 800;
    const inputCharsDelay = 50; // less then timeout

    const testCallback = param => {
      const time = new Date().getTime() - started;
      // should be postponed four times and finally call with defined timeout,
      expect(time).toBeGreaterThan(timeout + inputCharsDelay * 4);
      expect(param).toBe('search me...');
      done();
    };

    const { result, rerender } = renderHook(() => {
      return useTimeout(testCallback, timeout);
    });

    const [set] = result.current;

    set('se');
    rerender();

    setTimeout(() => {
      set('sear');
      rerender();
      setTimeout(() => {
        set('search');
        rerender();
        setTimeout(() => {
          set('search m');
          rerender();
          setTimeout(() => {
            set('search me...');
            rerender();
          }, inputCharsDelay);
        }, inputCharsDelay);
      }, inputCharsDelay);
    }, inputCharsDelay);
  }, 4000);

  it('should call later, later, but stops correct', done => {
    const timeout = 200;
    const delay = 300; // greater then timeout
    let searchValue = '';
    const myFunc = jest.fn(v => {
      searchValue = v;
    });

    const { result, rerender } = renderHook(() => {
      return useTimeout(myFunc, timeout);
    });

    const [set, clear] = result.current;

    set('11');
    rerender();

    setTimeout(() => {
      expect(searchValue).toBe('11');
      expect(myFunc).toHaveBeenCalledTimes(1);
      set('22');
      rerender();
      setTimeout(() => {
        expect(myFunc).toHaveBeenCalledTimes(2);
        expect(searchValue).toBe('22');
        set('33');
        rerender();
        setTimeout(() => {
          expect(myFunc).toHaveBeenCalledTimes(3);
          expect(searchValue).toBe('33');
          set('44');
          clear();
          setTimeout(() => {
            expect(myFunc).toHaveBeenCalledTimes(3); // still 2, was clear
            expect(searchValue).toBe('33'); // still '33', latest one
            done();
          }, delay);
        }, delay);
      }, delay);
    }, delay);
  }, 4000);
});
