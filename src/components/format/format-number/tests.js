/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



const tests = [
  {
    value: 999999999,
    result: { default: '999,999,999' },
  },
  {
    value: 0,
    result: { default: '0' },
  },
  {
    value: -10000000,
    result: { default: '-10,000,000' },
  },
];

export default tests;
