/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import  settings  from '../../settings';
import noop from 'lodash/noop';

import { mergeRefs } from '../../utils/DomUtils';

const { prefix } = settings;

const InlineCheckbox = React.memo(
  React.forwardRef(function InlineCheckbox(
    {
      id = 'inline-checkbox',
      indeterminate,
      checked = false,
      disabled,
      ariaLabel = '',
      name = '',
      onChange,
      onClick,
      onKeyDown,
      title = undefined,
    },
    ref
  ) {
    const inputNode = useRef();

    const handleRef = useCallback(el => {
      inputNode.current = el;
    }, []);

    const changeHandler = useCallback(
      evt => {
        onChange(evt.target.checked, id, evt);
      },
      [id, onChange]
    );

    const clickHandler = useCallback(
      evt => {
        onClick(evt);
      },
      [onClick]
    );

    useEffect(() => {
      inputNode.current.indeterminate = indeterminate ? indeterminate.toString() : undefined;
    }, [indeterminate]);

    return (
      <>
        <input
          ref={mergeRefs(ref, handleRef)}
          aria-checked={indeterminate ? 'mixed' : undefined}
          checked={checked && !indeterminate}
          className={`${prefix}--checkbox`}
          disabled={disabled}
          id={id}
          name={name}
          onChange={changeHandler}
          onClick={clickHandler}
          onKeyDown={onKeyDown}
          type="checkbox"
        />
        <label
          aria-label={ariaLabel}
          className={`${prefix}--checkbox-label`}
          htmlFor={id}
          title={title}
        >
        </label>
      </>
    );
  })
);

InlineCheckbox.propTypes = {
  /**
   * Specify the label for the control
   */
  ariaLabel: PropTypes.string.isRequired,

  /**
   * Specify whether the underlying control is checked, or not
   */
  checked: PropTypes.bool.isRequired,

  /**
   * Specify whether the underlying input control should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide an `id` for the underlying input control
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the control is in an indterminate state
   */
  indeterminate: PropTypes.bool,

  /**
   * Provide a `name` for the underlying input control
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown: PropTypes.func,
  /**
   * Provide an optional tooltip for the InlineCheckbox
   */
  title: PropTypes.string,
};

InlineCheckbox.displayName = 'InlineCheckbox';

InlineCheckbox.defaultProps = {
  disabled: false,
  indeterminate: false,
  onChange: noop,
  onClick: noop,
  onKeyDown: noop,
  title: undefined,
};

export default InlineCheckbox;
