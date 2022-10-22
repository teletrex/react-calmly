/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import settings from '../../../settings.js';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import noop from 'lodash/noop';
import values from 'lodash/values';

const { prefix } = settings;

export const TableTextInput = (
  {
    labelText,
    className,
    disabled,
    id,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onMouseUp,
    onBlur,
    invalid,
    invalidText,
    value,
    light,
    ...other
  }
) => {

//  className = `${prefix}--text__input`;


  const textInputClasses = classNames(`${prefix}--text-input`, className, {
    [`${prefix}--text-input--light`]: light,
    [`${prefix}--text-input--invalid`]: invalid
  });



  return (
    <div className={`${prefix}--form-item ${prefix}--text-input-wrapper`}>
      <div
        className={classNames(`${prefix}--text-input__field-wrapper`, {
          [`${prefix}--text-input--data-warning`]: invalid,
        })}
        data-invalid={ invalid || null}
      >
        <input
          id={id}
          className={textInputClasses}
          width="100%"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          disabled={disabled}
          onMouseUp={onMouseUp}
        />
      </div>
    </div>
  );
}


TableTextInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  light: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TableTextInput.defaultProps = {
  className: '',
  defaultValue: '',
  disabled: false,
  invalid: false,
  invalidText: '',
  light: true,
  onChange: noop,
  onClick: noop,
  placeholder: undefined,
  readOnly: false,
  tooltipAlignment: 'center',
  tooltipPosition: 'bottom',
  value: undefined,
};
