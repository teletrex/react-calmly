/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import {useCallback} from "react";

/**
 *
 * @TODO: make use the users locale and currency.
 * @TODO: add currency and other formatters
 */

export const useFormat = ( ) => {


  const format = useCallback(
    number => {
      return new Intl.NumberFormat('en-US').format;
    } ,[]
  );


  return {
    /**
     * @type {{top: number, left: number, bottom: number, x: number, width: number, y: number, right: number, height: number}}
     */
    format,
  };
};


