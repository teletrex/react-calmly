/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, {useMemo} from 'react';



const CurrencyCell = ({
  value,
  rawFormatter
}) => {

  const numberAlignerClassname =  useMemo ((value) =>
    "mono rightalign "
    + (value && value.includes && value.includes(')') ? "negative" : ""),
  [value]);

  return (
    <div className={numberAlignerClassname}>{ (value && value.includes) ? value : (isNaN(value)? "": rawFormatter.format(value))}</div>
  );
};

export default React.memo(CurrencyCell);

