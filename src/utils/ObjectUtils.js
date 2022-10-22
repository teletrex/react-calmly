/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



/**
 * Sorts objects properties using < > comparison
 * return array of arrays containing key, value
 * @param {{[string]: number}} object
 *
 * ex: given objec: { a: 10, b: 5, c: 6 }
 * returns [ ['b', 5], ['c', 6], ['a', 10]]
 */
export const sortObjectByValue = object =>
  Object.entries(object).sort((a, b) => {
    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;
    return 0;
  });
