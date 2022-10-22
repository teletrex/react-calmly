/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React,{useState,useRef} from 'react';
import PropTypes from 'prop-types';
import settings from '../../../settings';

const {prefix} = settings;

const SystemSelectEditor = (
  {
    id,
    row,
    menuItems,
    column,
    format,
    initialValue,
    selectLabel,
    invalidText,
    onCellChange,
    onCellBlur,
    onCellClick,
    disabled
}) => {

  let isUndefined = (initialValue === undefined || initialValue == '');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (onCellChange)
      onCellChange(event, column, row.id, row, selectedValue, initialValue, format);  // let's just return the row index for the row.
    initialValue = selectedValue;
  };

  const handleBlur = (event) => {
    const selectedValue = event.target.value;
    if (onCellBlur) {
      onCellBlur(event, column, row.id, row, selectedValue, initialValue, format);  // go out set the data and set the cell to the formatted response.
    }
    initialValue = selectedValue;
  }

  const handleOnClick = (event) => {
    const selectedValue = event.target.value;
    onCellClick(event, column, row.id, row, selectedValue, initialValue, format);
    setClicked(true);
  }

  const [clicked, setClicked] = useState(!(typeof onCellClick == "function"));
  const selectRef = useRef(null);

  return (
    <>
      <div className={`${prefix}--system-select-editor`}>
        <select ref={selectRef} className="system-select"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={initialValue}
                disabled={disabled}
                multiple={false}  /* make a story to support multiple selections*/
                >
          <option name={"_unselected"} value={"_unselected"} key={"_unselected"}>{selectLabel}</option>
          {menuItems && menuItems.map(item => <option name={item.label}
                                         key={item.value}
                                         value={item.value}>{item.label}
          </option>)}
        </select>
        {!clicked && (typeof onCellClick == "function")  &&
        <div className={"onclick-overlay"} onClick={handleOnClick}></div>
        }

      </div>
    </>
  );
};

export default SystemSelectEditor;

SystemSelectEditor.propTypes = {
  onCellBlur : PropTypes.func,
  onCellChange: PropTypes.func,
  selectLabel : PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string,PropTypes.number]), /* value in the value parameter of the option tag. */
  menuItems: PropTypes.arrayOf( PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),
  multiple: PropTypes.bool
}

SystemSelectEditor.defaultProps = {
  selectLabel : "Select item from list",
  multiple: false
}
