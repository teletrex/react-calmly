/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import isString from 'lodash/isString';

const REG_STRING_WITH_PARAMS = /^(?:(?:(?:[^{}]|(?:{{)|(?:}}))+)|(?:{[0-9]+}))+$/;
const REG_STRING_PARAMS = /((?:[^{}]|(?:{{)|(?:}}))+)|(?:{([0-9]+)})/g;
const REG_STRING_PARAMETER = /(?:{{)|(?:}})/g;

export const formatString = (template, ...args) => {
  let result = template || '';

  if (template && template.match(REG_STRING_WITH_PARAMS)) {
    result = template.replace(REG_STRING_PARAMS, (m, str, index) => {
      if (str) {
        return str.replace(REG_STRING_PARAMETER, m => m[0]);
      }
      if (index >= args.length) {
        return m;
      }
      return args[index] !== null && args[index] !== undefined ? args[index] : m;
    });
  }
  return result;
};

// export const getRandomString = (length = 8) => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   const rndCharsLength = chars.length;
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * rndCharsLength));
//   }
//   return result;
// };

export const getRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  let array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  array = array.map(x => chars.charCodeAt(x % chars.length));
  result = String.fromCharCode.apply(null, array);
  return result;
};

// export const getRandomIntegerString = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
//   const minimum = Math.ceil(min);
//   return `${Math.floor(Math.random() * (Math.floor(max) - minimum + 1)) + minimum}`;
// };

export const getRandomIntegerString = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const minimum = Math.ceil(min);
  var array2 = new Uint32Array(1);
  window.crypto.getRandomValues(array2);
  return `${Math.floor((array2[0]* Math.pow(2,-32)) * (Math.floor(max) - minimum + 1)) + minimum}`;
};


export const capitalizeFirstChar = srcString => {
  return isString(srcString) && srcString.length > 0
    ? srcString.charAt(0).toUpperCase() + srcString.slice(1)
    : srcString;
};

export const makeQuery = queryObject => {
  const query = Object.entries(queryObject)
      .reduce((result, entry) => {
          result.push(entry.join('='))
          return result
      }, []).join('&')
  return `?${query}`
};
