/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useState, useCallback } from 'react';

import { PieChartActiveShape } from './PieChartActiveShape';

export const useHighlightedActiveShape = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const onMouseOver = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);
  const onMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const renderActiveShape = useCallback(props => <PieChartActiveShape {...props} />, []);

  return { activeIndex, renderActiveShape, onMouseOver, onMouseLeave };
};

export const useTooltipFollowsCursor = (chartElement, tooltipElement) => {
  const adjustTooltipPosition = useCallback(
    mouseEvent => {
      if (!(chartElement && tooltipElement && mouseEvent)) {
        return;
      }

      const { left, top } = chartElement.getBoundingClientRect();
      // eslint-disable-next-line no-param-reassign
      tooltipElement.style.transform = `translate(${mouseEvent.clientX -
        left -
        28}px, ${mouseEvent.clientY - top + 10}px)`;
    },
    [chartElement, tooltipElement]
  );

  return useCallback(
    (_, __, e) => {
      adjustTooltipPosition(e);
    },
    [adjustTooltipPosition]
  );
};
