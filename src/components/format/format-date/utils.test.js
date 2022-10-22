/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { getFormats, getAllSeparatorsShortDateFormats } from './utils';
import { DATE_FORMAT } from './presets';

const formats = [
  ['format', 'MM/DD/YYYY', undefined, 'SHORT_DATE'],
  ['reverseFormat', 'YYYY/DD/MM', undefined, 'SHORT_DATE'],
  ['shortYearFormat', 'MM/DD/YY', undefined, 'SHORT_DATE'],
  ['shortDayMonthFormat', 'M/D/YYYY', undefined, 'SHORT_DATE'],
  ['shortDayMonthYearFormat', 'M/D/YY', undefined, 'SHORT_DATE'],
  ['yearOnly', 'YYYY', undefined, 'SHORT_DATE'],

  ['format', 'MM/DD/YYYY', 'en', 'SHORT_DATE'],
  ['reverseFormat', 'YYYY/DD/MM', 'en', 'SHORT_DATE'],
  ['shortYearFormat', 'MM/DD/YY', 'en', 'SHORT_DATE'],
  ['shortDayMonthFormat', 'M/D/YYYY', 'en', 'SHORT_DATE'],
  ['shortDayMonthYearFormat', 'M/D/YY', 'en', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'en', 'SHORT_DATE'],

  ['format', 'DD/MM/YYYY', 'fr', 'SHORT_DATE'],
  ['reverseFormat', 'YYYY/MM/DD', 'fr', 'SHORT_DATE'],
  ['shortYearFormat', 'DD/MM/YY', 'fr', 'SHORT_DATE'],
  ['shortDayMonthFormat', 'D/M/YYYY', 'fr', 'SHORT_DATE'],
  ['shortDayMonthYearFormat', 'D/M/YY', 'fr', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'fr', 'SHORT_DATE'],

  ['format', 'DD/MM/YYYY', 'it', 'SHORT_DATE'],
  ['reverseFormat', 'YYYY/MM/DD', 'it', 'SHORT_DATE'],
  ['shortYearFormat', 'DD/MM/YY', 'it', 'SHORT_DATE'],
  ['shortDayMonthFormat', 'D/M/YYYY', 'it', 'SHORT_DATE'],
  ['shortDayMonthYearFormat', 'D/M/YY', 'it', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'it', 'SHORT_DATE'],

  ['format', 'DD/MM/YYYY', 'fr', 'SHORT_DATE'],
  ['reverseFormat', 'YYYY/MM/DD', 'fr', 'SHORT_DATE'],
  ['shortYearFormat', 'DD/MM/YY', 'fr', 'SHORT_DATE'],
  ['shortDayMonthFormat', 'D/M/YYYY', 'fr', 'SHORT_DATE'],
  ['shortDayMonthYearFormat', 'D/M/YY', 'fr', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'fr', 'SHORT_DATE'],

  ['format', 'YYYY/MM/DD', 'ja', 'SHORT_DATE'],
  ['reverseFormat', 'DD/MM/YYYY', 'ja', 'SHORT_DATE'],
  ['shortYearFormat', 'YY/MM/DD', 'ja', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'ja', 'SHORT_DATE'],

  ['format', 'YYYY.MM.DD.', 'ko', 'SHORT_DATE'],
  ['reverseFormat', '.DD.MM.YYYY', 'ko', 'SHORT_DATE'],
  ['shortYearFormat', 'YY.MM.DD.', 'ko', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'ko', 'SHORT_DATE'],

  ['format', 'DD/MM/YYYY', 'pt-BR', 'SHORT_DATE'],
  ['reverseFormat', 'YYYY/MM/DD', 'pt-BR', 'SHORT_DATE'],
  ['shortYearFormat', 'DD/MM/YY', 'pt-BR', 'SHORT_DATE'],
  ['shortDayMonthFormat', 'D/M/YYYY', 'pt-BR', 'SHORT_DATE'],
  ['shortDayMonthYearFormat', 'D/M/YY', 'pt-BR', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'pt-BR', 'SHORT_DATE'],

  ['format', 'DD/MM/YYYY', 'es', 'SHORT_DATE'],
  ['reverseFormat', 'YYYY/MM/DD', 'es', 'SHORT_DATE'],
  ['shortYearFormat', 'DD/MM/YY', 'es', 'SHORT_DATE'],
  ['shortDayMonthFormat', 'D/M/YYYY', 'es', 'SHORT_DATE'],
  ['shortDayMonthYearFormat', 'D/M/YY', 'es', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'es', 'SHORT_DATE'],

  ['format', 'DD.MM.YYYY', 'de', 'SHORT_DATE'],
  ['reverseFormat', 'YYYY.MM.DD', 'de', 'SHORT_DATE'],
  ['shortYearFormat', 'DD.MM.YY', 'de', 'SHORT_DATE'],
  ['shortDayMonthFormat', 'D.M.YYYY', 'de', 'SHORT_DATE'],
  ['shortDayMonthYearFormat', 'D.M.YY', 'de', 'SHORT_DATE'],
  ['yearOnly', 'YYYY', 'de', 'SHORT_DATE'],
];

const allSeparatorsShortDateFormats = [
  ['formatDot', 'MM.DD.YYYY', undefined],
  ['reverseFormatDot', 'YYYY.DD.MM', undefined],
  ['shortYearFormatDot', 'MM.DD.YY', undefined],
  ['shortDayMonthFormatDot', 'M.D.YYYY', undefined],
  ['shortDayMonthYearFormatDot', 'M.D.YY', undefined],
  ['formatComma', 'MM,DD,YYYY', undefined],
  ['reverseFormatComma', 'YYYY,DD,MM', undefined],
  ['shortYearFormatComma', 'MM,DD,YY', undefined],
  ['shortDayMonthFormatComma', 'M,D,YYYY', undefined],
  ['shortDayMonthYearFormatComma', 'M,D,YY', undefined],
  ['formatForwardSlash', 'MM/DD/YYYY', undefined],
  ['reverseFormatForwardSlash', 'YYYY/DD/MM', undefined],
  ['shortYearFormatForwardSlash', 'MM/DD/YY', undefined],
  ['shortDayMonthFormatForwardSlash', 'M/D/YYYY', undefined],
  ['shortDayMonthYearFormatForwardSlash', 'M/D/YY', undefined],
  ['formatHyphen', 'MM-DD-YYYY', undefined],
  ['reverseFormatHyphen', 'YYYY-DD-MM', undefined],
  ['shortYearFormatHyphen', 'MM-DD-YY', undefined],

  ['formatDot', 'MM.DD.YYYY', 'en'],
  ['reverseFormatDot', 'YYYY.DD.MM', 'en'],
  ['shortYearFormatDot', 'MM.DD.YY', 'en'],
  ['shortDayMonthFormatDot', 'M.D.YYYY', 'en'],
  ['shortDayMonthYearFormatDot', 'M.D.YY', 'en'],
  ['formatComma', 'MM,DD,YYYY', 'en'],
  ['reverseFormatComma', 'YYYY,DD,MM', 'en'],
  ['shortYearFormatComma', 'MM,DD,YY', 'en'],
  ['shortDayMonthFormatComma', 'M,D,YYYY', 'en'],
  ['shortDayMonthYearFormatComma', 'M,D,YY', 'en'],
  ['formatForwardSlash', 'MM/DD/YYYY', 'en'],
  ['reverseFormatForwardSlash', 'YYYY/DD/MM', 'en'],
  ['shortYearFormatForwardSlash', 'MM/DD/YY', 'en'],
  ['shortDayMonthFormatForwardSlash', 'M/D/YYYY', 'en'],
  ['shortDayMonthYearFormatForwardSlash', 'M/D/YY', 'en'],
  ['formatHyphen', 'MM-DD-YYYY', 'en'],
  ['reverseFormatHyphen', 'YYYY-DD-MM', 'en'],
  ['shortYearFormatHyphen', 'MM-DD-YY', 'en'],

  ['formatDot', 'DD.MM.YYYY', 'fr'],
  ['reverseFormatDot', 'YYYY.MM.DD', 'fr'],
  ['shortYearFormatDot', 'DD.MM.YY', 'fr'],
  ['shortDayMonthFormatDot', 'D.M.YYYY', 'fr'],
  ['shortDayMonthYearFormatDot', 'D.M.YY', 'fr'],
  ['formatComma', 'DD,MM,YYYY', 'fr'],
  ['reverseFormatComma', 'YYYY,MM,DD', 'fr'],
  ['shortYearFormatComma', 'DD,MM,YY', 'fr'],
  ['shortDayMonthFormatComma', 'D,M,YYYY', 'fr'],
  ['shortDayMonthYearFormatComma', 'D,M,YY', 'fr'],
  ['formatForwardSlash', 'DD/MM/YYYY', 'fr'],
  ['reverseFormatForwardSlash', 'YYYY/MM/DD', 'fr'],
  ['shortYearFormatForwardSlash', 'DD/MM/YY', 'fr'],
  ['shortDayMonthFormatForwardSlash', 'D/M/YYYY', 'fr'],
  ['shortDayMonthYearFormatForwardSlash', 'D/M/YY', 'fr'],
  ['formatHyphen', 'DD-MM-YYYY', 'fr'],
  ['reverseFormatHyphen', 'YYYY-MM-DD', 'fr'],
  ['shortYearFormatHyphen', 'DD-MM-YY', 'fr'],
  ['shortDayMonthFormatHyphen', 'D-M-YYYY', 'fr'],
  ['shortDayMonthYearFormatHyphen', 'D-M-YY', 'fr'],

  ['formatDot', 'DD.MM.YYYY', 'es'],
  ['reverseFormatDot', 'YYYY.MM.DD', 'es'],
  ['shortYearFormatDot', 'DD.MM.YY', 'es'],
  ['shortDayMonthFormatDot', 'D.M.YYYY', 'es'],
  ['shortDayMonthYearFormatDot', 'D.M.YY', 'es'],
  ['formatComma', 'DD,MM,YYYY', 'es'],
  ['reverseFormatComma', 'YYYY,MM,DD', 'es'],
  ['shortYearFormatComma', 'DD,MM,YY', 'es'],
  ['shortDayMonthFormatComma', 'D,M,YYYY', 'es'],
  ['shortDayMonthYearFormatComma', 'D,M,YY', 'es'],
  ['formatForwardSlash', 'DD/MM/YYYY', 'es'],
  ['reverseFormatForwardSlash', 'YYYY/MM/DD', 'es'],
  ['shortYearFormatForwardSlash', 'DD/MM/YY', 'es'],
  ['shortDayMonthFormatForwardSlash', 'D/M/YYYY', 'es'],
  ['shortDayMonthYearFormatForwardSlash', 'D/M/YY', 'es'],
  ['formatHyphen', 'DD-MM-YYYY', 'es'],
  ['reverseFormatHyphen', 'YYYY-MM-DD', 'es'],
  ['shortYearFormatHyphen', 'DD-MM-YY', 'es'],
  ['shortDayMonthFormatHyphen', 'D-M-YYYY', 'es'],
  ['shortDayMonthYearFormatHyphen', 'D-M-YY', 'es'],

  ['formatDot', 'DD.MM.YYYY', 'it'],
  ['reverseFormatDot', 'YYYY.MM.DD', 'it'],
  ['shortYearFormatDot', 'DD.MM.YY', 'it'],
  ['shortDayMonthFormatDot', 'D.M.YYYY', 'it'],
  ['shortDayMonthYearFormatDot', 'D.M.YY', 'it'],
  ['formatComma', 'DD,MM,YYYY', 'it'],
  ['reverseFormatComma', 'YYYY,MM,DD', 'it'],
  ['shortYearFormatComma', 'DD,MM,YY', 'it'],
  ['shortDayMonthFormatComma', 'D,M,YYYY', 'it'],
  ['shortDayMonthYearFormatComma', 'D,M,YY', 'it'],
  ['formatForwardSlash', 'DD/MM/YYYY', 'it'],
  ['reverseFormatForwardSlash', 'YYYY/MM/DD', 'it'],
  ['shortYearFormatForwardSlash', 'DD/MM/YY', 'it'],
  ['shortDayMonthFormatForwardSlash', 'D/M/YYYY', 'it'],
  ['shortDayMonthYearFormatForwardSlash', 'D/M/YY', 'it'],
  ['formatHyphen', 'DD-MM-YYYY', 'it'],
  ['reverseFormatHyphen', 'YYYY-MM-DD', 'it'],
  ['shortYearFormatHyphen', 'DD-MM-YY', 'it'],
  ['shortDayMonthFormatHyphen', 'D-M-YYYY', 'it'],
  ['shortDayMonthYearFormatHyphen', 'D-M-YY', 'it'],

  ['formatDot', 'DD.MM.YYYY', 'pt-BR'],
  ['reverseFormatDot', 'YYYY.MM.DD', 'pt-BR'],
  ['shortYearFormatDot', 'DD.MM.YY', 'pt-BR'],
  ['shortDayMonthFormatDot', 'D.M.YYYY', 'pt-BR'],
  ['shortDayMonthYearFormatDot', 'D.M.YY', 'pt-BR'],
  ['formatComma', 'DD,MM,YYYY', 'pt-BR'],
  ['reverseFormatComma', 'YYYY,MM,DD', 'pt-BR'],
  ['shortYearFormatComma', 'DD,MM,YY', 'pt-BR'],
  ['shortDayMonthFormatComma', 'D,M,YYYY', 'pt-BR'],
  ['shortDayMonthYearFormatComma', 'D,M,YY', 'pt-BR'],
  ['formatForwardSlash', 'DD/MM/YYYY', 'pt-BR'],
  ['reverseFormatForwardSlash', 'YYYY/MM/DD', 'pt-BR'],
  ['shortYearFormatForwardSlash', 'DD/MM/YY', 'pt-BR'],
  ['shortDayMonthFormatForwardSlash', 'D/M/YYYY', 'pt-BR'],
  ['shortDayMonthYearFormatForwardSlash', 'D/M/YY', 'pt-BR'],
  ['formatHyphen', 'DD-MM-YYYY', 'pt-BR'],
  ['reverseFormatHyphen', 'YYYY-MM-DD', 'pt-BR'],
  ['shortYearFormatHyphen', 'DD-MM-YY', 'pt-BR'],
  ['shortDayMonthFormatHyphen', 'D-M-YYYY', 'pt-BR'],
  ['shortDayMonthYearFormatHyphen', 'D-M-YY', 'pt-BR'],

  ['formatDot', 'YYYY.MM.DD', 'ja'],
  ['reverseFormatDot', 'DD.MM.YYYY', 'ja'],
  ['shortYearFormatDot', 'YY.MM.DD', 'ja'],
  ['shortDayMonthFormatDot', 'YYYY.M.D', 'ja'],
  ['shortDayMonthYearFormatDot', 'YY.M.D', 'ja'],
  ['formatComma', 'YYYY,MM,DD', 'ja'],
  ['reverseFormatComma', 'DD,MM,YYYY', 'ja'],
  ['shortYearFormatComma', 'YY,MM,DD', 'ja'],
  ['shortDayMonthFormatComma', 'YYYY,M,D', 'ja'],
  ['shortDayMonthYearFormatComma', 'YY,M,D', 'ja'],
  ['formatForwardSlash', 'YYYY/MM/DD', 'ja'],
  ['reverseFormatForwardSlash', 'DD/MM/YYYY', 'ja'],
  ['shortYearFormatForwardSlash', 'YY/MM/DD', 'ja'],
  ['shortDayMonthFormatForwardSlash', 'YYYY/M/D', 'ja'],
  ['shortDayMonthYearFormatForwardSlash', 'YY/M/D', 'ja'],
  ['formatHyphen', 'YYYY-MM-DD', 'ja'],
  ['reverseFormatHyphen', 'DD-MM-YYYY', 'ja'],
  ['shortYearFormatHyphen', 'YY-MM-DD', 'ja'],
  ['shortDayMonthFormatHyphen', 'YYYY-M-D', 'ja'],
  ['shortDayMonthYearFormatHyphen', 'YY-M-D', 'ja'],

  ['formatDot', 'YYYY.MM.DD', 'ko'],
  ['reverseFormatDot', 'DD.MM.YYYY', 'ko'],
  ['shortYearFormatDot', 'YY.MM.DD', 'ko'],
  ['shortDayMonthFormatDot', 'YYYY.M.D', 'ko'],
  ['shortDayMonthYearFormatDot', 'YY.M.D', 'ko'],
  ['formatComma', 'YYYY,MM,DD', 'ko'],
  ['reverseFormatComma', 'DD,MM,YYYY', 'ko'],
  ['shortYearFormatComma', 'YY,MM,DD', 'ko'],
  ['shortDayMonthFormatComma', 'YYYY,M,D', 'ko'],
  ['shortDayMonthYearFormatComma', 'YY,M,D', 'ko'],
  ['formatForwardSlash', 'YYYY/MM/DD', 'ko'],
  ['reverseFormatForwardSlash', 'DD/MM/YYYY', 'ko'],
  ['shortYearFormatForwardSlash', 'YY/MM/DD', 'ko'],
  ['shortDayMonthFormatForwardSlash', 'YYYY/M/D', 'ko'],
  ['shortDayMonthYearFormatForwardSlash', 'YY/M/D', 'ko'],
  ['formatHyphen', 'YYYY-MM-DD', 'ko'],
  ['reverseFormatHyphen', 'DD-MM-YYYY', 'ko'],
  ['shortYearFormatHyphen', 'YY-MM-DD', 'ko'],
  ['shortDayMonthFormatHyphen', 'YYYY-M-D', 'ko'],
  ['shortDayMonthYearFormatHyphen', 'YY-M-D', 'ko'],
];

describe('getFormats', () => {
  test.each(formats)(
    'returns object containing "%s" with value of "%s" for locale "%s" and preset "%s"',
    (key, value, locale, preset) => {
      expect(getFormats(locale, DATE_FORMAT[preset])).toHaveProperty(key, value);
    }
  );
});

describe('getAllSeparatorsShortDateFormats', () => {
  test.each(formats)(
    'returns object containing "%s" with value of "%s" for locale "%s"',
    (key, value, locale) => {
      expect(getAllSeparatorsShortDateFormats(locale)).toHaveProperty(key, value);
    }
  );

  test.each(allSeparatorsShortDateFormats)(
    'returns object containing "%s" with value of "%s" for locale "%s"',
    (key, value, locale) => {
      expect(getAllSeparatorsShortDateFormats(locale)).toHaveProperty(key, value);
    }
  );
});
