/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import moment from 'moment-timezone';

import { DATE_FORMAT } from './presets';

const shortenYear = format => format.replace(/Y+/g, val => val.slice(2));

const shortenDayMonth = format => format.replace(/D+|M+/g, val => val.slice(1));

export const getFormats = (locale, longDateFormat) => {
  const format = moment.localeData(locale).longDateFormat(longDateFormat);
  const reverseFormat = format
    .split('')
    .reverse()
    .join('');
  const shortYearFormat = shortenYear(format);
  const shortDayMonthFormat = shortenDayMonth(format);
  const shortDayMonthYearFormat = shortenYear(shortDayMonthFormat);

  return {
    format,
    reverseFormat,
    shortYearFormat,
    shortDayMonthFormat,
    shortDayMonthYearFormat,
    yearOnly: 'YYYY',
  };
};

const separatorDictironary = {
  Dot: '.',
  Comma: ',',
  ForwardSlash: '/',
  Hyphen: '-',
};

const trimSeparators = format => format.replace(/^[./\-,]+|[./\-,]+$/g, '');
const replaceSeparatorBy = (format, newSeparator) => format.replace(/[.,/-]/g, newSeparator);

export const getAllSeparatorsShortDateFormats = locale => {
  const formats = getFormats(locale, DATE_FORMAT.SHORT_DATE);

  return Object.entries(separatorDictironary).reduce(
    (allFormats, [separatorName, separator]) => {
      Object.entries(formats).forEach(([formatName, format]) => {
        // eslint-disable-next-line no-param-reassign
        allFormats[`${formatName}${separatorName}`] = replaceSeparatorBy(
          trimSeparators(format),
          separator
        );
      });
      return allFormats;
    },
    { ...formats }
  );
};
