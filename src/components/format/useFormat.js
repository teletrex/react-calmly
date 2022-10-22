/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import useFormatCurrency from './format-currency';
import useFormatNumber from './format-number';
import { useFormatDate, useParseDate } from './format-date';

export const useFormat = () => {
  const { formatCurrency } = useFormatCurrency();
  const { formatDate } = useFormatDate();
  const { formatNumber } = useFormatNumber();
  const { parseDate } = useParseDate();

  return { formatCurrency, formatDate, formatNumber, parseDate };
};
