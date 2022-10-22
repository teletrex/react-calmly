/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';

import {Checkbox, CheckboxChecked} from "@carbon/icons-react";

export const CheckboxIndicator = (
  {
    checked,
    label
  }
) => {
  return (
    <div className={"checkbox-indicator"}>
      {checked ? <CheckboxChecked size={16}/> :<Checkbox size={16}/>}
      {label}
    </div>
  )
}

CheckboxIndicator.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string
}
