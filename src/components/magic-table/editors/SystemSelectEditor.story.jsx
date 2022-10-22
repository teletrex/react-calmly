/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, {useState} from 'react';

import SystemSelectEditor from './SystemSelectEditor';

export default {
  title: 'Components/SystemSelectEditor',
  component: SystemSelectEditor,
  parameters: {
    info : {
      text: `
    ** Properties **

    This editor is used for editing in grids only.  We are using the OS level menu as it will work in grids without a separate popup mini-dialog.  The width will fit to the parent container.

    ** id ** : PropTypes.string.isRequired:  Unique id of the editor

    ** row ** : PropTypes.object.isRequired:
     Map of all items in grid row
      * must contain an entry with the key provided in the column property
      * must contain an "id" entry to identify the data row to be updated.

    ** column ** : PropTypes.string.isRequired: Name of the column in the data row

    ** initialValue ** : PropTypes.string.isRequired: Previously saved value if available.  Format "May 12, 2020"

    ** format ** : PropTypes.string.isRequired: Format string for the column format, passed back when cell is changed or blurred.

    ** Callbacks, these are passed in with a call to useGridFormatters({onCellChange, <your handler>, onCellBlur, <your handler>})**

    ** onCellChange ** : PropTypes.func, optional.  Called when cell entry is changed with each keystroke.
     * Called with the following parameters:
     *  onCellChange(event, column, row.id, row, typedValue, initialValue, format);
     *  typedValue is the new value for the cell.

    ** onCellBlur ** : PropTypes.func, optional.  Called when cell entry is changed with each keystroke.
     * Called with the following parameters:
     *  onCellBlur(event, column, row.id, row, typedValue, initialValue, format);
     *  typedValue is the new value for the cell.

    **menuItems** (required)

    Pass in an array of {label:<string>,value: <number or string>}. Labels are displayed, values are used for selection matching.

    Menus are passed in with the call to useGridFormatters().getConfig(config,menus) where menus is a map of menu items by column.  Menuitems are {label:<label name>, value: <value (string or number)>}

    **initialValue**  (optional)

    Pass in the initialValue of the selection, if any.

    *selectLabel** (optional, default "Select item from list")

    Pass in the label for the select editor that will show when there is no initialValue.

    **multiple**

    Do not use, future feature.

`
    }

  }
}

const myMenuItems = [
        {
          label:"Mountain View",
          value: 1},
        {
          label:"Shanghai",
          value: 2},
        {
          label:"Pune",
          value: 3}
      ]

const sampleRow = {id:"row1", "dropdownColumn":2};

const handleOnChange = (event, column, rowId, row, selectedValue, initialValue, format) => {
  console.log("onChange: " + JSON.stringify({
    column: column,
    rowId: rowId,
    row: row,
    selectedValue: selectedValue,
    initialValue: initialValue,
    format: format
  }));
}

const handleOnBlur = (event, column, rowId, row, selectedValue, initialValue, format) => {
  console.log("onBlur: " + JSON.stringify({
    column: column,
    rowId: rowId,
    row: row,
    selectedValue: selectedValue,
    initialValue: initialValue,
    format: format
  }));
}

export const Default = () => <SystemSelectEditor
  selectLabel={"Please choose a city"}
  onCellChange={handleOnChange}
  onCellBlur={handleOnBlur}
  menuItems={myMenuItems}
  row={sampleRow}
  column={"dropdownColumn"}
  format={"string"}
/>

export const WithInitialValue = () => <SystemSelectEditor
  selectLabel={"Please choose a city"}
  initialValue={2}
  onCellChange={handleOnChange}
  onCellBlur={handleOnBlur}
  menuItems={myMenuItems}
  row={sampleRow}
  column={"dropdownColumn"}
  format={"string"}
/>



export const WithInitialValueAndGrabMenuDataOnClick = () => {

  const myStarterMenuItems = [
    {
      label:"Mountain View",
      value: 1},
    {
      label:"Shanghai",
      value: 2},
    {
      label:"Pune",
      value: 3}
  ]
  const [myMenuItems,setMyMenuItems] = useState(myStarterMenuItems);

  const simulateGrabbingMenuData = () => {
    /* go fetch the data, dispatch an action to set your menu state */
    setMyMenuItems(
      [
        {
          label:"Mountain View",
          value: 1},
        {
          label:"Shanghai",
          value: 2},
        {
          label:"Pune",
          value: 3},
        {
          label:"Denver",
          value: 4},
        {
          label:"Boston",
          value: 5},
        {
          label:"Hotlanta",
          value: 6},
      ]
    );
  }

  return (<SystemSelectEditor
    selectLabel={"Please choose a city"}
    initialValue={2}
    onCellClick={simulateGrabbingMenuData}
    onCellChange={handleOnChange}
    onCellBlur={handleOnBlur}
    menuItems={myMenuItems}
    row={sampleRow}
    column={"dropdownColumn"}
    format={"string"}
  />);
}


