/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import commaNumber from 'comma-number';

export const defaultTooltipLabelFormatter = label => label;
export const defaultTooltipValueFormatter = (value, valueLabel) =>
  valueLabel ? `${valueLabel} ${commaNumber(value)}` : commaNumber(value);
