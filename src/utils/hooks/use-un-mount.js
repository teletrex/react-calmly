/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { useEffect, useRef } from 'react';

/**
 *
 * @param callback {function} which is call on component unMount
 */
export const useUnMount = callback => {
  const callBackRef = useRef(callback);
  callBackRef.current = callback;
  useEffect(() => () => callBackRef.current?.(), []);
};
