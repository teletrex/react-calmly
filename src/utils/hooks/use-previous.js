/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { useEffect, useRef } from 'react';

export function usePrevious(value, initial = undefined) {
  const ref = useRef(initial);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
