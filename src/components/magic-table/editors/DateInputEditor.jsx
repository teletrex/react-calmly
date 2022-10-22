/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { useCallback, useState } from 'react'
import { DatePickerInput } from '@carbon/react'
import { DatePicker } from '@carbon/react'
import PropTypes from 'prop-types'

const DateInputEditor = ({
  id,
  row,
  column,
  initialValue,
  onCellChange,
  onCellBlur,
  format,
  editorType,
  invalidText,
  disabled,
  readOnly,
  ...editorProps
}) => {
  const handleChange = (selectedDates, dateStr, instance) => {
    const inputValue = dateStr
    initialValue = inputValue
    if (onCellChange)
      onCellChange(selectedDates, column, row.id, row, inputValue, initialValue, format, editorType) // let's just return the row index for the row.
  }

  const handleBlur = (event) => {
    const inputValue = event.target.value
    initialValue = inputValue
    if (onCellBlur) {
      let typedValue = inputValue
      onCellBlur(event, column, row.id, row, typedValue, initialValue, format, editorType) // go out set the data and set the cell to the formatted response.
    }
  }

  return (
    // Had to do this way as having expression (initialValue === undefined || initialValue == '')?'' :initialValue
    // did not work when you pass it in value for DatePicker

    <DatePicker
      datePickerType='single'
      id='date-picker-start'
      disabled={disabled}
      light={false}
      short={false}
      timeZone={false}
      onChange={handleChange}
      value={typeof initialValue === 'undefined' ? '' : initialValue}
      {...editorProps}
      format={editorProps.dateFormat}
    >
      <DatePickerInput
        aria-label
        className='date-picker'
        id='date-picker-start-input-id'
        invalidText={invalidText}
        labelText=''
        value={typeof initialValue === 'undefined' ? '' : initialValue}
        onBlur={handleBlur}
        disabled={disabled}
        autocomplete='off'
        readOnly={readOnly}
        {...editorProps}
        format={editorProps.dateFormat}
      />
    </DatePicker>
  )
}

export default React.memo(DateInputEditor)

DateInputEditor.propTypes = {
  /** Unique id of the editor */
  id: PropTypes.string.isRequired,
  /** Map of all items in grid row,
   * must contain an entry with the key provided in the column property
   * must contain an "id" entry to identify the data row to be updated. */
  row: PropTypes.object.isRequired,
  /** name of the column in the data row */
  column: PropTypes.string.isRequired,
  /** initial value if available.  Format "May 12, 2020" */
  initialValue: PropTypes.string,
  /** format string for the column format, passed back when cell is changed or blurred */
  //  format: PropTypes.string.isRequired,
  /** onCellChange, optional.  Called when cell entry is changed with each keystroke.
   *  onCellChange(selectedDates, column, row.id, row, typedValue, initialValue, format);
   * Useful for key-by-key validation (validation not provided) */
  onCellChange: PropTypes.func,
  /** onCellBlur, handler called when date is updated.
   * called with the following parameters:
   *  onCellBlur(selectedDates, column, row.id, row, typedValue, initialValue, format);
   *  typedValue is the new value for the cell. */
  onCellBlur: PropTypes.func.isRequired,
  /** Can also call with any of the flatpicker options and they will get passed through.
   * https://flatpickr.js.org/
   */
  editorProps: PropTypes.object,
}
