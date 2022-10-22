/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useCallback, useEffect, useState } from 'react';

import {TableTextInput}  from '../table-text-input/TableTextInput';
import PropTypes, { instanceOf } from 'prop-types';

// Add this in your component file
require('react-dom');
window.React2 = require('react');
//console.log('TextInputEditor in ppmd-ui' + (window.React1 === window.React2));

const NUMBER_EDITORTYPES = Object.freeze({
  number: 'number',
  percent: 'percent',
  currency: 'currency',
  wholenumber: 'wholenumber',
  wholepercent: 'wholepercent',
  wholecurrency: 'wholecurrency',
})

const numberEditorTypes = Object.keys(NUMBER_EDITORTYPES);
const NUMERIC_REGEXP = /^-?[0-9]*[\.,]?[0-9]*$/;
const WHOLE_NUMERIC_REGEXP = /^-?[0-9]*$/;
const CURRENCY_REGEXP = /^[$€‎£]?(-?[\d]*[\.,]?[\d]*$)/;
const WHOLE_CURRENCY_REGEXP = /^[$€‎£]?(-?[\d]*$)/;

const notEqualShouldRender = ( prevState, nextState)  => {
  return (prevState.initialValue !== nextState.initialValue || prevState.disabled !== nextState.disabled);
}

const TextInputEditor = ({
  id,
  row,
  column,
  format,
  initialValue,
  onCellChange,
  onCellBlur,
  onEnterKey,
  disabled,
  editorType,
  placeHolder
}) => {

  const [editingValue, setEditingValue] = useState(initialValue || '');
  const numberOnly = numberEditorTypes.includes(editorType);

  const isEditing = initialValue !== null ? (initialValue.trim() !== editingValue.trim()) : (editingValue.trim() !== '');
  const className = `text-input-editor mono ${numberOnly ? 'rightalign' : ''} ${isEditing ? 'editing' : ''}`;

  useEffect(() => {
    setEditingValue(initialValue || '');
  }, [initialValue])

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (
      (
        (editorType === NUMBER_EDITORTYPES.currency && CURRENCY_REGEXP.test(inputValue)) ||
        (editorType === NUMBER_EDITORTYPES.number && NUMERIC_REGEXP.test(inputValue)) ||
        (editorType === NUMBER_EDITORTYPES.wholenumber && WHOLE_NUMERIC_REGEXP.test(inputValue)) ||
        (editorType === NUMBER_EDITORTYPES.wholecurrency && WHOLE_CURRENCY_REGEXP.test(inputValue))
      )
      ||
      !numberOnly
    ) {
      setEditingValue(inputValue);
      if (typeof onCellChange === 'function')
        onCellChange(event, column, row.id, row, inputValue, initialValue, format, editorType);  // let's just return the row index for the row.
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const inputValue = event.target.value;
      let parsedValue = validateInput(inputValue);
      setEditingValue(parsedValue !== null ? inputValue : initialValue || '')
      if (parsedValue !== null && typeof onEnterKey == 'function') {
        if (numberOnly && parsedValue === '') {
          parsedValue = null;
        }
        onEnterKey(event, column, row.id, row, parsedValue, initialValue, format, editorType);
      }
    }
  };

  const selectText = useCallback(event => {
    event.target.select();
  }, [])

/*  Removed, we prevent people from typing the wrong thing in handleChange.
    It's never a good idea to change the value of the input when people
    confirm a new value has been input into the cell. i.e. removing decimal points.

  const formatInput = (text, format) => {
    switch (format) {
      case NUMBER_EDITORTYPES.currency:
        const match = CURRENCY_REGEXP.exec(text);
        if (match !== null) {
          const [wholeString, actualValue] = match;
          if (wholeString.length > 0 && actualValue.length > 0) {
            return actualValue.replace(',', '.');
          } else if (wholeString.length === 0 && actualValue.length === 0) {
            return actualValue;
          }
        }
        break;
      case NUMBER_EDITORTYPES.number:
      case NUMBER_EDITORTYPES.percent:
        return text.replace(',', '.');
      default:
        return text;
    }
    return null; //not fitting format
  }
*/

  const isValueSame = (inputText) => {
    const initVal = initialValue || '';
    if(initVal === inputText){
      return true;
    }
    if (editorType === NUMBER_EDITORTYPES.currency || editorType === NUMBER_EDITORTYPES.wholecurrency) {
      const inputMatch = CURRENCY_REGEXP.exec(inputText);
      const initialMatch = CURRENCY_REGEXP.exec(initVal);
      if (inputMatch && initialMatch) {
        const [wholeInput, parsedInput] = inputMatch;
        const [wholeInitial, parsedInitial] = initialMatch;
        return parseFloat(parsedInput) === parseFloat(parsedInitial);
      }
      return false;
    }
    else if (numberOnly) {
      return parseFloat(inputText) === parseFloat(initVal);
    }
  }

  const validateInput = (inputValue) => {
    inputValue = inputValue.trim();
    if (inputValue !== null && !isValueSame(inputValue)) {
      return inputValue
    }
    return null; //same value or not fitting format
  }

  const handleBlur = (event) => {
    const inputValue = event.target.value;
    let parsedValue = validateInput(inputValue);
    setEditingValue(parsedValue !== null ? inputValue : initialValue || '');
    if (parsedValue !== null && typeof onCellBlur === 'function') {
      if (numberOnly && parsedValue === '') {
        parsedValue = null;
      }
      onCellBlur(event, column, row.id, row, parsedValue, initialValue, format, editorType); // go out set the data and set the cell to the formatted response.
    }
  };
  return (
    <TableTextInput
      className={className}
      onMouseUp={e => e.preventDefault()}
      id={id}
      onBlur={handleBlur}
      placeHolder={placeHolder}
      onChange={handleChange}
      onClick={selectText}
      onFocus={selectText}
      onKeyDown={handleKeyDown}
      value={editingValue}
      disabled={disabled}
    />
  );
};

TextInputEditor.propTypes = {
  /** Hello */
  id: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  column: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
};

TextInputEditor.defaultProps = {
  initialValue: null,
};

export default React.memo(TextInputEditor);

