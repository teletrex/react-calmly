/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, {useCallback, useState} from 'react';
import {DatePickerInput } from '@carbon/react';
import {DatePicker} from '@carbon/react';
import PropTypes from "prop-types";

const DateRangeEditor = ({
  id,
  row,
  column,
  initialValue,
  onCellChange,
  onCellBlur,
  format,
  editorType,
  invalidText,
  disabled
}) => {

  let isUndefined = (initialValue === undefined || initialValue == '');

  const handleChange = (event) => {
    const inputValue = event[0];
      initialValue = inputValue;
      if (onCellChange)
        onCellChange(event, column, row.id, row, inputValue, initialValue, editorType);  // let's just return the row index for the row.
    };

  const handleBlur = (event) => {
    const inputValue = event.target.value;
    initialValue = inputValue;
    if (onCellBlur) {
      let typedValue = inputValue;
//      const formattedValue = onCellBlur(event, column, row.id, row, typedValue, initialValue, format, (result) => handleCellBlurSuccess(result,row.id,column));  // go out set the data and set the cell to the formatted response.
      const formattedValue = onCellBlur(event, column, row.id, row, typedValue, initialValue, format, editorType);  // go out set the data and set the cell to the formatted response.
    }
  }

  const handleCellBlurSuccess =  (result, rowId, column) => {
    const rowsChanged = result.data.result.count;
    if (rowsChanged > 0) {
      const formattedValue = result.data.result.formattedResult;
    }
  };

  return (
    // Had to do this way as having expression (initialValue === undefined || initialValue == '')?'' :initialValue
    // did not work when you pass it in value for DatePicker

    <DatePicker datePickerType="range"  id="date-picker-start"
                light={false} minDate={new Date().setHours(0,0,0,0)}
                short={false}
                timeZone={false}
                onChange={handleChange}
                onClose={function noRefCheck(){}}
                dateFormat="M j, Y"
                value={isUndefined ? '&nbsp;' : initialValue}
                disabled={disabled}
    >
      <DatePickerInput aria-label
                       className="date-picker"
                       disabled={false}
                       id="date-picker-start-input-id"
                       invalidText={invalidText}
                       onClick={function noRefCheck(){}}
                       pattern="\d{1,2}/\d{1,2}/\d{4}"
                       labelText=''
                       onBlur={handleBlur}
                       value={isUndefined ? '&nbsp;' : initialValue[0]}
                       disabled={disabled}
      />
      <DatePickerInput aria-label
                       className="date-picker"
                       id="date-picker-end-input-id"
                       invalidText={invalidText}
                       onClick={function noRefCheck(){}}
                       pattern="\d{1,2}/\d{1,2}/\d{4}"
                       labelText=''
                       onBlur={handleBlur}
                       value={isUndefined ? '&nbsp;' : initialValue[1]}
                       disabled={disabled}
      />
    </DatePicker>

  );

};

export default DateRangeEditor;

DateRangeEditor.propTypes = {
  /** Unique id of the editor */
  id: PropTypes.string.isRequired,
  /** Map of all items in grid row,
   * must contain an entry with the key provided in the column property
   * must contain an "id" entry to identify the data row to be updated. */
  row: PropTypes.object.isRequired,
  /** name of the column in the data row */
  column: PropTypes.string.isRequired,
  /** initial value if available.  Format "May 12, 2020" */
  initialValue: PropTypes.string.isRequired,
  /** format string for the column format, passed back when cell is changed or blurred */
  format: PropTypes.string.isRequired,
  /** onCellChange, optional.  Called when cell entry is changed with each keystroke.
   * Useful for key-by-key validation (validation not provided) */
  onCellChange: PropTypes.func,
  /** onCellBlur, handler called when date is updated.
   * called with the following parameters:
   *  onCellBlur(event, column, row.id, row, typedValue, initialValue, format);
   *  typedValue is the new value for the cell. */
  onCellBlur:PropTypes.func.isRequired,

};

DateRangeEditor.defaultProps = {
};

