/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { useState } from "react";
import { storiesOf } from "@storybook/react"
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import TextInputEditor from "./TextInputEditor";


const formats = {
  number: "number",
  currency: "currency",
  percent: "percent",
  string: "string"
}


storiesOf('Components/TextInputEditor', module)
  .add('Default',
    () => {
      const [row, setRow] = useState({ id: 1, data: "2.32", format: "number" })

      return (
        <div style={{ width: '50%' }}>
          <TextInputEditor
            id="1"
            column="1"
            row={row}
            onEnterKey={(event, column, rowId, row, inputValue, initialValue, format) => {
              action("onEnterKey")(event, column, rowId, row, inputValue, initialValue, format)
              setRow({ ...row, data: inputValue })
            }}
            initialValue={row.data}
            disabled={boolean("disabled", false)}
            format={select("format", formats, formats.currency)}
            onCellBlur={(event, column, rowId, row, inputValue, initialValue, format) => {
              action("onCellBlur")(event, column, rowId, row, inputValue, initialValue, format)
              setRow({ ...row, data: inputValue })
            }}
          />
        </div>
      )
    }
  )






