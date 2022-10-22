/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { useEffect } from 'react';

/**
 *
 * @param callback {function} which is call on component mount
 */
export const useOnMount = callback => {
  useEffect(callback, []);
};
