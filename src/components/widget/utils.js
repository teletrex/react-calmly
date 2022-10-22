/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import { createCssClassBuilder } from '../../utils';
import { sortObjectByValue } from '../../utils/ObjectUtils';

import { breakpoints } from './constants';

export const widgetClassBuilder = createCssClassBuilder('widget');

export const getBreakpointFromWidth = width => {
  const sortedBreakpoints = sortObjectByValue(breakpoints);

  const lowerBP = sortedBreakpoints[0][0];

  return sortedBreakpoints.reduce((currentBP, [targetBP, BPWidth]) => {
    if (width > BPWidth) {
      return targetBP;
    }
    return currentBP;
  }, lowerBP);
};

export const getGetNewPosition = layout => {
  const xByRow = { 0: 0 };
  let lowestRow = 0;

  layout.forEach(item => {
    const nextAvailableXRelativeToItem = item.x + item.w;
    const lowestItemRow = item.y + item.h - 1;

    // the item can occupy more than one row
    // save his x to each of those rows
    for (let l = 0; l < item.h; l++) {
      const currentRow = l + item.y;
      const rowX = xByRow[currentRow] || 0;
      if (nextAvailableXRelativeToItem > rowX) {
        xByRow[currentRow] = nextAvailableXRelativeToItem;
      }
    }

    if (lowestItemRow > lowestRow) {
      lowestRow = lowestItemRow;
    }
  });

  const proposedX = xByRow[lowestRow];

  return {
    // since we have 6 columns and min width is 2,
    // we cannot place an element after the 4th column,
    // we do, instead, put it on 0 becase it will land on beggining of the next line.
    x: proposedX > 4 ? 0 : proposedX,
    // always put it one line below because even if we don't need to
    // break line, react-grid-layout will vertically compress.
    y: lowestRow + 1,
  };
};
