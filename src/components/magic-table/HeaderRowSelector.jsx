/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, {useCallback}  from 'react';

import {Checkbox } from '@carbon/react';

const HeaderRowSelector = ({
  id,
  onChange,
  value,
  label,
  isIndeterminate,
  ...otherProps
}) => {

  const onChangeHandler = useCallback(
    event => {
      onChange(event, event.target.checked);
    },
    [onChange]
  );
  const userAgentString = navigator.userAgent;

  const isFirefox =  userAgentString.indexOf("Firefox") > -1;;

  return (
    <Checkbox key={id}
              id={id}
              className = {!isFirefox && "notfirefox"}
              labelText={value}
              onClick={onChangeHandler}
              checked={value}
              indeterminate={isIndeterminate}
              {...otherProps} />
  );
}

export default HeaderRowSelector;
//  .bx--form-item.bx--checkbox-wrapper:first-of-type
//  div.bx--form-item.bx--checkbox-wrapper:first-of-type
// margin-bottom:1rem

