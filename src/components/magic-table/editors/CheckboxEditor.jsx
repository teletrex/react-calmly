/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useCallback, useEffect}  from 'react';

import Checkbox from '../../checkbox';


const notEqualShouldRender = ( prevState, nextState)  => {
  return (prevState.initialValue !== nextState.initialValue || prevState.disabled !== nextState.disabled);
}


const CheckboxEditor = ({
  id,
  row,
  column,
  onCellChange,
  editorType,
  initialValue,
  disabled
}) => {

  const [value, setValue] = React.useState(initialValue);

  useEffect (() => {
    setValue(initialValue);
  },[initialValue])

  const onChangeHandler = useCallback(
    event => {
      setValue(event.target.checked);
      onCellChange(event, column, row.id, row, event.target.checked, initialValue, "checkbox", editorType);
    },
    [onCellChange, column, row.id, initialValue]
  );

  return (
    <Checkbox disabled={disabled} key={id} id={id}  onClick={onChangeHandler} checked={value} />
  );
}

export default React.memo(CheckboxEditor);
//  .bx--form-item.bx--checkbox-wrapper:first-of-type
//  div.bx--form-item.bx--checkbox-wrapper:first-of-type
// margin-bottom:1rem

