/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import CustomTooltip from './CustomTooltip';
import {
  defaultTooltipLabelFormatter,
  defaultTooltipValueFormatter,
} from './defaultTooltipFormatters';

export const defaultTooltipProps = {
  content: CustomTooltip,
  cursor: false,
  offset: 0,
  labelFormatter: defaultTooltipLabelFormatter,
  formatter: defaultTooltipValueFormatter,
};

// re-chart Tooltip have a few hardcoded style values in js (Tooltip::DefaultTooltipContent);
// Lets nullify them to have them applied from css (...src/components/charts/shared-elements/_mixins.scss)
export const nullifyContentStyle = Object.freeze({
  backgroundColor: null,
  border: null,
  padding: null,
});

const absolutePosTooltipProps = {
  isAnimationActive: false,
  wrapperStyle: Object.freeze({
    padding: 0,
    position: 'absolute',
  }),
  itemStyle: Object.freeze({
    padding: 0,
  }),
  labelStyle: Object.freeze({
    padding: 0,
  }),
  cursor: false,
  contentStyle: nullifyContentStyle,
};

export const commonAbsolutePosTooltipProps = Object.freeze({
  ...absolutePosTooltipProps,
  allowEscapeViewBox: Object.freeze({ x: true, y: true }),
  offset: 0,
  position: Object.freeze({ x: 0, y: 0 }),
});

export const multichartAbsolutePosTooltipProps = Object.freeze({
  ...absolutePosTooltipProps,
  offset: 10,
});
