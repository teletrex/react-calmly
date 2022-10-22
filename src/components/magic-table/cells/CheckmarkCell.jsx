/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { CheckmarkOutline }  from "@carbon/icons-react";



const CheckmarkCell = ({
  value
}) => {

  return (
    (value && value == 1) ?
      <span style={{
        display:'flex',
        justifyContent:'center'}}>
        <CheckmarkOutline size={16} />
      </span>
      : ''
  );
};

export default React.memo(CheckmarkCell);

