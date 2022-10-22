/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import classNames from 'classnames';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { keys, match } from '../keyboard';
import  settings  from '../../settings';

import { ListBoxTypes, ListBoxSizes } from './constants';

const { prefix } = settings;

const ListBox = React.forwardRef(function ListBox(
  {
    children,
    className: containerClassName,
    disabled,
    type,
    size,
    invalid,
    invalidText,
    light,
    innerRef,
    isOpen,
    tabIndex,
    ...rest
  },
  ref
) {
  const handleOnKeyDown = useCallback(event => {
    if (match(event, keys.Escape)) {
      event.stopPropagation();
    }
  }, []);

  const handleClick = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const className = classNames({
    [containerClassName]: !!containerClassName,
    [`${prefix}--list-box`]: true,
    [`${prefix}--list-box--${size}`]: size,
    [`${prefix}--list-box--inline`]: type === 'inline',
    [`${prefix}--list-box--disabled`]: disabled,
    [`${prefix}--list-box--light`]: light,
    [`${prefix}--list-box--expanded`]: isOpen,
  });
  return (
    <>
      <div
        {...rest}
        ref={ref}
        className={className}
        data-invalid={invalid || undefined}
        onClick={handleClick}
        onKeyDown={handleOnKeyDown}
        role="button"
        tabIndex={tabIndex}
      >
        {children}
      </div>
      {invalid ? <div className={`${prefix}--form-requirement`}>{invalidText}</div> : null}
    </>
  );
});

ListBox.displayName = 'ListBox';
ListBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  isOpen: PropTypes.bool,
  light: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(ListBoxSizes)),
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(Object.values(ListBoxTypes)).isRequired,
};

ListBox.defaultProps = {
  children: undefined,
  className: '',
  disabled: false,
  invalid: false,
  invalidText: '',
  isOpen: false,
  light: false,
  size: undefined,
  tabIndex: 0,
};

export default ListBox;
