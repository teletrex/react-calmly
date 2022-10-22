/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



// Based on https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ClickAwayListener/ClickAwayListener.test.js
// Licensed under MIT License https://github.com/mui-org/material-ui/blob/next/LICENSE

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import usePortal from 'react-useportal';

import ClickAwayListener from './ClickAwayListener';

const Portal = ({ children }) => {
  const { Portal } = usePortal();

  return <Portal>{children}</Portal>;
};

describe('<ClickAwayListener />', () => {
  it('should render the children', () => {
    const { container } = render(
      <ClickAwayListener onClickAway={() => {}}>
        <span />
      </ClickAwayListener>
    );
    expect(container.querySelectorAll('span').length).toBe(1);
  });

  describe('prop: onClickAway', () => {
    it('should be called when clicking away', () => {
      const handleClickAway = jest.fn();
      render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>
      );
      fireEvent.click(document.body);
      expect(handleClickAway.mock.calls.length).toBe(1);
    });

    it('should not be called when clicking inside', () => {
      const handleClickAway = jest.fn();
      const { container } = render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>
      );

      fireEvent.click(container.querySelector('span'));
      expect(handleClickAway.mock.calls.length).toBe(0);
    });

    it('should be called when preventDefault is `true`', () => {
      const handleClickAway = jest.fn();
      render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>
      );
      const preventDefault = event => event.preventDefault();
      document.body.addEventListener('click', preventDefault);

      fireEvent.click(document.body);
      expect(handleClickAway.mock.calls.length).toBe(1);

      document.body.removeEventListener('click', preventDefault);
    });

    it('should not be called when clicking inside a portaled element', () => {
      const handleClickAway = jest.fn();
      const { getByText } = render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Portal>
              <span>Inside a portal</span>
            </Portal>
          </div>
        </ClickAwayListener>
      );

      fireEvent.click(getByText('Inside a portal'));
      expect(handleClickAway.mock.calls.length).toBe(0);
    });

    it('should be called when clicking inside a portaled element and `disableReactTree` is `true`', () => {
      const handleClickAway = jest.fn();
      const { getByText } = render(
        <ClickAwayListener disableReactTree onClickAway={handleClickAway}>
          <div>
            <Portal>
              <span>Inside a portal</span>
            </Portal>
          </div>
        </ClickAwayListener>
      );

      fireEvent.click(getByText('Inside a portal'));
      expect(handleClickAway.mock.calls.length).toBe(1);
    });

    it('should call `props.onClickAway` when the appropriate mouse event is triggered', () => {
      const handleClickAway = jest.fn();
      render(
        <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>
      );
      fireEvent.mouseUp(document.body);
      expect(handleClickAway.mock.calls.length).toBe(0);
      fireEvent.mouseDown(document.body);
      expect(handleClickAway.mock.calls.length).toBe(1);
    });
  });

  it('should handle null child', () => {
    const Child = React.forwardRef(() => null);
    const handleClickAway = jest.fn();
    render(
      <ClickAwayListener onClickAway={handleClickAway}>
        <Child />
      </ClickAwayListener>
    );
    fireEvent.click(document.body);
    expect(handleClickAway.mock.calls.length).toBe(0);
  });
});
