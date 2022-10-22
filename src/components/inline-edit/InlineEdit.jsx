/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import classNames from 'classnames';
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import  settings  from '../../settings';
import { TextInput, Button } from '@carbon/react';
import { Checkmark, Close } from '@carbon/icons-react';
import { keys, match } from '../keyboard';


import { withTranslation } from '../../translation';

import { DEFAULT_ERROR_MESSAGES } from '../text-input/constants';
import { mergeRefs } from '../../utils/DomUtils';


import InlineEditSkeleton from './InlineEdit.Skeleton';

const { prefix } = settings;

// default value for maxLength attribute
const DEFAULT_MAX_LENGTH = 524288;

const InlineEdit = ({
  className,
  domProps,
  forwardedRef,
  fieldName,
  id,
  inputType,
  invalid,
  invalidText,
  isLoading,
  mandatory,
  mandatoryErrorMessage,
  maxLength,
  maxLengthErrorMessage,
  minLength,
  minLengthErrorMessage,
  onBlur,
  onCancel,
  onChange,
  onInputChange,
  onValidationChange,
  pattern,
  patternErrorMessage,
  placeholder,
  range: { minNumber, maxNumber },
  rangeErrorMessage,
  required,
  requiredErrorMessage,
  t,
  value,
}) => {
  const [editedValue, setEditedValue] = useState(value);
  const [savedValue, setSavedValue] = useState(value);
  const [isErrorVisible, setErrorVisibility] = useState(false);
  const [isTextInputErrorVisible, setIsTextInputErrorVisible] = useState(false);
  const [isFocused, setFocused] = useState(false);

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const isSaveDisabled = !!savedValue && editedValue === savedValue;

  useEffect(() => {
    setEditedValue(value);
    setSavedValue(value);
  }, [value]);

  useEffect(() => {
    if (!isFocused && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isFocused]);

  const validate = (value = '') => {
    const messages = [];

    if (invalid && invalidText) {
      messages.push(invalidText);
    }

    if (
      inputType === 'number' &&
      value &&
      (Number(value) < minNumber || Number(value) > maxNumber)
    ) {
      messages.push(rangeErrorMessage || t('Value is out of range.'));
    }

    if ((required || mandatory) && !value.trim()) {
      messages.push(requiredErrorMessage || mandatoryErrorMessage || t('Field is required.'));
    }

    if (pattern && value) {
      const regexp = pattern instanceof RegExp ? pattern : new RegExp(pattern);

      if (!regexp.test(value)) {
        messages.push(patternErrorMessage || t('Field contains not allowed characters.'));
      }
    }

    return messages.join(' ') || null;
  };

  const saveAndBlur = () => {
    if (validate(editedValue)) {
      setErrorVisibility(true);
      return;
    }

    setSavedValue(editedValue);
    onChange(editedValue);

    setFocused(false);
    onBlur();
  };

  const cancelAndBlur = () => {
    setErrorVisibility(false);

    setEditedValue(savedValue);
    onCancel({
      state: {
        editedValue,
        savedValue,
        isErrorVisible,
      },
    });

    setFocused(false);
    onBlur();
  };

  const handleKeyPress = event => {
    if (match(event.which, keys.Enter) && !invalid) {
      saveAndBlur();
    } else if (match(event.which, keys.Escape)) {
      cancelAndBlur();
    }
  };

  const handleOnChange = (value = '') => {
    setErrorVisibility(!!(isErrorVisible && validate(value)));

    setEditedValue(value.slice(0, maxLength));

    onInputChange(value.slice(0, maxLength));
  };

  const renderButtons = () => {
    if (!isFocused || invalid || isErrorVisible || isTextInputErrorVisible) {
      return null;
    }

    return (
      <div className={`${prefix}--row-buttons`}>
        <Button
          className={`${prefix}--inline-edit__label--edit__ok-button`}
          disabled={isSaveDisabled}
          hasIconOnly
          iconDescription={t('Save')}
          onClick={saveAndBlur}
          preventDefaultOnMouseDown
          renderIcon={ <Checkmark size={16} /> }
          tabIndex={0}
          tooltipAlignment="center"
          tooltipPosition="top"
          type="button"
        />
        <Button
          className={`${prefix}--inline-edit__label--edit__cancel-button`}
          hasIconOnly
          iconDescription={t('Cancel')}
          onClick={cancelAndBlur}
          preventDefaultOnMouseDown
          renderIcon={<Close size={16} />}
          tabIndex={0}
          tooltipAlignment="center"
          tooltipPosition="top"
          type="button"
        />
      </div>
    );
  };

  return (
    <div ref={wrapperRef} className={classNames(className, `${prefix}--inline-edit`)} {...domProps}>
      {isLoading && <InlineEditSkeleton />}
      {!isLoading && (
        <div
          className={`${prefix}--inline-edit__label--edit`}
          onBlur={cancelAndBlur}
          onFocus={() => {
            setFocused(true);
          }}
        >
          <TextInput
            ref={mergeRefs(inputRef, forwardedRef)}
            fieldName={fieldName}
            hideLabel
            id={id}
            invalid={invalid || isErrorVisible}
            invalidText={validate(editedValue)}
            labelText={t('Inline Edit')}
            maxChars={maxLength}
            maxCharsErrorMessage={maxLengthErrorMessage}
            minChars={minLength}
            minCharsErrorMessage={minLengthErrorMessage}
            onChange={e => handleOnChange(e.target.value)}
            onKeyDown={handleKeyPress}
            onValidationChange={value => {
              onValidationChange(value);
              setIsTextInputErrorVisible(value);
            }}
            placeholder={placeholder || t('Click to enter value')}
            type={inputType}
            value={editedValue}
          />
          {renderButtons()}
        </div>
      )}
    </div>
  );
};

InlineEdit.propTypes = {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,
  /**
   * Spreading props on DOM elements
   */
  domProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /**
   * Optional string to substitute in error messages for minimum and maximum length
   */
  fieldName: PropTypes.string,
  /**
   * Ref to the input element
   */
  forwardedRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  /**
   * id obligatory by TextInput
   */
  id: PropTypes.string.isRequired,
  /**
   * Specify the type of the <input>
   */
  inputType: PropTypes.string,
  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.string,
  /**
   * Show skeleton state
   */
  isLoading: PropTypes.bool,
  /**
   * Enables validation on mandatory field
   */
  // eslint-disable-next-line react/require-default-props
  mandatory:
    PropTypes.bool,

  /**
   * Error message for validation on mandatory field
   */
  // eslint-disable-next-line react/require-default-props
  mandatoryErrorMessage:
    PropTypes.string,

  /**
   * MaxLength of the input field
   */
  maxLength: PropTypes.number,
  /**
   * Error message for validation on maximum number of characters
   */
  maxLengthErrorMessage: PropTypes.string,
  /**
   * Enables validation on minimum number of characters
   */
  minLength: PropTypes.number,
  /**
   * Error message for validation on minimum number of characters
   */
  minLengthErrorMessage: PropTypes.string,
  /**
   * Callback called on blur
   */
  onBlur: PropTypes.func,
  /**
   * Callback called on cancel
   */
  onCancel: PropTypes.func,
  /**
   * Callback called on element state change
   */
  onChange: PropTypes.func,
  /**
   * Callback called on input change
   */
  onInputChange: PropTypes.func,
  onValidationChange: PropTypes.func,
  /**
   * Regular expression to enables validation on allowed characters
   */
  pattern: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * Error message for validation on allowed characters
   */
  patternErrorMessage: PropTypes.string,
  /**
   * Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   * Enables validation on value range for number input
   */
  range: PropTypes.shape({
    maxNumber: PropTypes.number,
    minNumber: PropTypes.number,
  }),
  /**
   * Error message for validation on value range
   */
  rangeErrorMessage: PropTypes.string,
  /**
   * i18next translate function comming from withTranslation HOC
   */
  /**
   * Enables validation on mandatory field
   */
  required: PropTypes.bool,
  /**
   * Error message for validation on mandatory field
   */
  requiredErrorMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
  /**
   * Initial value for element
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InlineEdit.defaultProps = {
  className: '',
  domProps: {},
  fieldName: 'Value',
  forwardedRef: null,
  inputType: 'text',
  invalid: false,
  invalidText: '',
  isLoading: false,
  maxLength: DEFAULT_MAX_LENGTH,
  maxLengthErrorMessage: DEFAULT_ERROR_MESSAGES.maxChars,
  minLength: 0,
  minLengthErrorMessage: DEFAULT_ERROR_MESSAGES.minChars,
  onBlur: noop,
  onCancel: noop,
  onChange: noop,
  onInputChange: noop,
  onValidationChange: noop,
  pattern: '',
  patternErrorMessage: '',
  placeholder: '',
  range: {
    minNumber: -Infinity,
    maxNumber: Infinity,
  },
  rangeErrorMessage: '',
  required: false,
  requiredErrorMessage: '',
  value: '',
};

const InlineEditWithTranslation = withTranslation()(InlineEdit);

export default React.forwardRef((props, ref) => (
  <InlineEditWithTranslation forwardedRef={ref} {...props} />
));
