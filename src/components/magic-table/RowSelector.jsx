/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useCallback,useState, useEffect}  from 'react';

import {Checkbox}  from '@carbon/react';
import InlineCheckbox from '../checkbox-tree/InlineCheckbox';

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


  const onChangeHandler =
    event => {
      onChange(event, row, column, event.target.checked);
    };

  const _style = {"display":"grid","alignItems":"center"};
  return (
    <InlineCheckbox
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


