/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



export const adjustCursorPosition = (e, chartElement, tooltipElement) => {
  const mouseEvent = e.nativeEvent;
  if (!(chartElement && tooltipElement && e)) {
    return;
  }

  const { left, top } = chartElement.getBoundingClientRect();
  // eslint-disable-next-line no-param-reassign
  tooltipElement.style.transform = `translate(${mouseEvent.clientX - left}px, ${mouseEvent.clientY -
    top}px)`;
};

export const axisTypes = {
  x: 'xAxis',
  y: 'yAxis',
};
