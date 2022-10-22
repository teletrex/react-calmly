/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, {useCallback}  from 'react';


import {CaretDown, CaretRight} from "@carbon/icons-react";

const RowDrawerOpener = ({
  id,
  row,
  column,
  labelText,
  onChange,
  value,
  ...otherProps
}) => {

  let trueValue = true;
  if ((typeof value === "undefined") || value===false)
    trueValue = false;

  const onChangeHandler = useCallback(
    event => {
      onChange(event, row, column, !trueValue);
    },
    [onChange, column, row.id]
  );

  return (
    <div onClick={onChangeHandler} style={{width:"25px"}}>
      {trueValue && <CaretDown size={24}/>}
      {!trueValue && <CaretRight size={24} />}
    </div>
  );
}

export default RowDrawerOpener;


