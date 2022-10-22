/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useCallback,useState, useEffect}  from 'react';

import {Checkbox } from '@carbon/react';

const RowSelector = ({
  id,
  row,
  column,
  labelText,
  onChange,
  value,
  isIndeterminate,
  disabled,
  ...otherProps
}) => {

  //const [internalValue, setInternalValue] = useState(value);

  const onChangeHandler =
    event => {
      onChange(event, row, column, event.target.checked);
    };

  const _style = {"display":"grid","alignItems":"center"};
  return (
    <Checkbox
      style={_style}
      key={id}
      id={id}
      labelText={""}
      onClick={onChangeHandler}
      checked={value === true}
      disabled={disabled}
      indeterminate={isIndeterminate}
      {...otherProps}
    />
  );
}

export default React.memo(RowSelector);
//  .bx--form-item.bx--checkbox-wrapper:first-of-type
//  div.bx--form-item.bx--checkbox-wrapper:first-of-type
// margin-bottom:1rem

