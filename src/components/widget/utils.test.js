/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { getBreakpointFromWidth } from './utils';

describe('getBreakpointFromWidth', () => {
  it.each([
    ['md', 0],
    ['md', 1],
    ['md', 50],
    ['md', 672],
    ['lg', 673],
    ['lg', 1500],
    ['lg', 2000],
  ])('returns %s when width is %s', (result, number) => {
    expect(getBreakpointFromWidth(number)).toBe(result);
  });
});
