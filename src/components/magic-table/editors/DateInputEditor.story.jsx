/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import DateInputEditor from './DateInputEditor';

export default {
  title: 'Components/DateInputEditor',
  component: DateInputEditor,
  parameters: {
    info: {
      text: `

  ** id ** : PropTypes.string.isRequired:  Unique id of the editor

  ** row ** : PropTypes.object.isRequired:
  Map of all items in grid row
   * must contain an entry with the key provided in the column property
   * must contain an "id" entry to identify the data row to be updated.

  ** column ** : PropTypes.string.isRequired: Name of the column in the data row

  ** initialValue ** : PropTypes.string.isRequired: Previously saved value if available.  Format "May 12, 2020"

  ** format ** : PropTypes.string.isRequired: Format string for the column format, passed back when cell is changed or blurred.

  ** onCellChange ** : PropTypes.func, optional.  Called when cell entry is changed with each keystroke.

  ** onCellBlur ** : PropTypes.func.isRequired. Handler called when date is updated.
   * Called with the following parameters:
   *  onCellBlur(event, column, row.id, row, typedValue, initialValue, format);
   *  typedValue is the new value for the cell. */
  `
    }
  }
}

export const DefaultPromo_mdY = () => <DateInputEditor
  initialValue={"08/02/2021"}
  minDate = {"08/02/2021"}
  maxDate = {"08/10/2021"}
  dateFormat = {"m/d/Y"}
/>

export const DefaultPromo_dmY = () => <DateInputEditor
  initialValue={"08/02/2021"}
  minDate = {"08/02/2021"}
  maxDate = {"08/10/2021"}
  dateFormat = {"d/m/Y"}
/>

export const DefaultAPO_MdY = () => <DateInputEditor
  //  initialValue={"May 12, 2021"}
  initialValue={"Aug 2, 2021"}
  minDate = {"Aug 2, 2021"}
  maxDate = {"Aug 10, 2021"}
  dateFormat = {"M d, Y"}
/>

