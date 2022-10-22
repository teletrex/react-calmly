/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



const tests = [
  {
    value: 999999999,
    currency: 'USD',
    result: { default: '$999,999,999.00' },
  },
  {
    value: 0,
    currency: 'EUR',
    result: { default: '€0.00' },
  },
  {
    value: -1000000,
    currency: 'UAH',
    result: { default: '-UAH\xa01,000,000.00' },
  },
];

export default tests;
