/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React, { useRef, useState } from 'react';
import { render } from '@testing-library/react';

import { useOnMount } from './use-on-mount';

describe('useOnMount', () => {
  const TestComponent = ({ 'aria-label': ariaLabel }) => {
    const render = useRef(0);
    render.current += 1;
    const [mount, setMount] = useState(0);
    useOnMount(() => {
      setMount(prev => prev + 1);
    });

    return (
      <div aria-label={ariaLabel}>
        <>
          <div aria-label="render-count">{render.current}</div>
          <div aria-label="mount-count">{mount}</div>
        </>
      </div>
    );
  };

  it('should useOnMount once, on component did mount', () => {
    const { getByLabelText, rerender } = render(<TestComponent ariaLabel="initial" />);
    const renderCount = Number(getByLabelText('render-count').innerHTML);
    expect(getByLabelText('mount-count')).toContainHTML('1');

    rerender(<TestComponent ariaLabel="second-time" />);
    const renderCountNext = Number(getByLabelText('render-count').innerHTML);
    expect(renderCountNext).toBeGreaterThan(renderCount);
    expect(getByLabelText('mount-count')).toContainHTML('1');

    rerender(<TestComponent ariaLabel="third-time" />);
    const renderCountMore = Number(getByLabelText('render-count').innerHTML);
    expect(renderCountMore).toBeGreaterThan(renderCountNext);
    expect(getByLabelText('mount-count')).toContainHTML('1');
  });
});
