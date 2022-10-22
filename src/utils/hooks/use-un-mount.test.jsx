/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React, { useRef } from 'react';
import noop from 'lodash/noop';
import { render } from '@testing-library/react';

import { useUnMount } from './use-un-mount';

describe('useUnMount', () => {
  const TestBody = ({ whenUnmount }) => {
    useUnMount(whenUnmount);
    return <div aria-label="test-body">test body</div>;
  };

  const TestComponent = ({ 'aria-label': ariaLabel, mount = true, onUnMount = noop }) => {
    const render = useRef(0);
    render.current += 1;

    return (
      <div aria-label={ariaLabel}>
        <div aria-label="render-count">{render.current}</div>
        {mount && <TestBody whenUnmount={onUnMount} />}
      </div>
    );
  };

  it('should not call unmount callback while mounted, re-rendered', () => {
    const onUnMount = jest.fn();
    const { getByLabelText, rerender } = render(
      <TestComponent ariaLabel="initial" onUnMount={onUnMount} />
    );
    const renderCount = Number(getByLabelText('render-count').innerHTML);
    expect(onUnMount).toHaveBeenCalledTimes(0);

    rerender(<TestComponent ariaLabel="second-time" />);
    const renderCountNext = Number(getByLabelText('render-count').innerHTML);
    expect(renderCountNext).toBeGreaterThan(renderCount);
    expect(onUnMount).toHaveBeenCalledTimes(0);

    rerender(<TestComponent ariaLabel="third-time" />);
    const renderCountMore = Number(getByLabelText('render-count').innerHTML);
    expect(renderCountMore).toBeGreaterThan(renderCountNext);
    expect(onUnMount).toHaveBeenCalledTimes(0);
  });

  it('should call unmount callback correct, when un-mounted', () => {
    const onUnMount = jest.fn();
    const { getByLabelText, rerender } = render(
      <TestComponent ariaLabel="initial" onUnMount={onUnMount} />
    );
    const renderCount = Number(getByLabelText('render-count').innerHTML);
    expect(onUnMount).toHaveBeenCalledTimes(0);

    rerender(<TestComponent ariaLabel="unmount-child" mount={false} />);
    const renderCountNext = Number(getByLabelText('render-count').innerHTML);
    expect(renderCountNext).toBeGreaterThan(renderCount);
    expect(onUnMount).toHaveBeenCalledTimes(1);

    rerender(<TestComponent ariaLabel="mount-child" mount onUnMount={onUnMount} />);
    expect(onUnMount).toHaveBeenCalledTimes(1);

    rerender(<TestComponent ariaLabel="unmount-child-again" mount={false} />);
    expect(onUnMount).toHaveBeenCalledTimes(2);
  });
});
