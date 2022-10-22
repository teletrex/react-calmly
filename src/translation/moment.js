/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import memoize from 'lodash/memoize';
import moment from 'moment-timezone';
// TODO temporary we need to load all locales to be able to handle any locale format
import 'moment/min/locales';

// Default config for en locale
// moment.updateLocale('en', {
//   longDateFormat: {
//     LTS: "h:mm:ss A",
//     LT: 'h:mm A',
//     L: 'MM/DD/YYYY',
//     LL: 'MMMM D, YYYY',
//     LLL: 'MMMM D, YYYY h:mm A',
//     LLLL: 'dddd, MMMM D, YYYY h:mm A',
//     // small `l` usually converted automatically from big `L`
//     l: "M/D/YYYY",
//     ll: "MMM D, YYYY",
//     lll: "MMM D, YYYY h:mm A",
//     llll: "ddd, MMM D, YYYY h:mm A"
//   },
// });

export const FALLBACK_LOCALE = 'en';

export const getIs24HoursLocale = memoize(locale => {
  const ltFormatStr = moment.localeData(locale).longDateFormat('LT');
  return ltFormatStr.includes('H');
});
