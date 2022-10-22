/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




// in practice md will work as if it were one column
// but to keep the the min width logic unified and independent from breakpoint
// we use 2 columns
export const cols = Object.freeze({ lg: 8, md: 2 });

export const breakpoints = Object.freeze({ lg: 672, md: 0 });

export const margin = Object.freeze([16, 16]);
export const bigMargin = Object.freeze([32, 32]);

export const marginSizes = Object.freeze({
  DEFAULT: 'default',
  BIG: 'big',
});

export const marginsMap = Object.freeze({
  [marginSizes.DEFAULT]: margin,
  [marginSizes.BIG]: bigMargin,
});

export const rowHeight = 150;

export const minWidth = 1;

export const maxWidth = 8;

export const minHeight = 1;

export const maxHeight = 6;

export const placeholderClassName = '.react-grid-placeholder';

export const droppingElementId = '__dropping-elem__';

export const validXValues = Object.freeze([0, 1, 2, 3, 4]);
export const validWValues = Object.freeze([2, 3, 4, 6]);
export const validHValues = Object.freeze([1, 2, 3, 4]);
