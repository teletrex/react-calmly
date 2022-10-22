/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




const tests = {
  en: [
    {
      args: ['a', 'a'],
      result: {
        search: 0,
        sort: 0,
      },
    },
    {
      args: ['A', 'a'],
      result: {
        search: 0,
        sort: 1,
      },
    },
    {
      args: ['z', 'a'],
      result: {
        search: 1,
        sort: 1,
      },
    },
    {
      args: ['a', 'z'],
      result: {
        search: -1,
        sort: -1,
      },
    },
    {
      args: [1, 4],
      result: {
        search: -1,
        sort: -1,
      },
    },
    {
      args: ['8', '1'],
      result: {
        search: 1,
        sort: 1,
      },
    },
  ],
  fr: [
    {
      args: ['é', 'e'],
      result: {
        search: 0,
        sort: 1,
      },
    },
  ],
  de: [
    {
      args: ['ä', 'a'],
      result: {
        search: 1,
        sort: 1,
      },
    },
  ],
};

export default tests;
