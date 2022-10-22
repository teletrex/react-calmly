/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import { breakpoints } from '@carbon/layout';

const breakpointsMap = Object.keys(breakpoints).reduce(
  (acc, size) => {
    acc[size.toUpperCase()] = size;
    return acc;
    // 'all' = all media sizes
  },
  { ALL: 'all' }
);

export const GRID_BREAKPOINTS = Object.freeze(breakpointsMap);

export const POLICIES = Object.freeze({
  ALL: 'all',
  AUTO: 'auto',
  NONE: 'none',
  LEFT: 'left',
  RIGHT: 'right',
  ADD: 'add',
  UPDATE: 'update',
});

export const ORIENTATION = Object.freeze({
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
});
