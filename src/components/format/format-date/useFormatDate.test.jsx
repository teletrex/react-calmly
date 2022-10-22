/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import forEach from 'lodash/forEach';
import { renderHook } from '@testing-library/react-hooks';

import {
  getTestDate,
  getTestTimeAgoPresetData,
  getTestInvalidData,
  getTestPresetsData,
} from '../../../translation/moment.mock';
import TestLocalizationWrapper from '../../../utils/test-helpers/TestLocalizationWrapper';

import { useFormatDate } from './useFormatDate';
import { DATE_FORMAT } from './presets';

const testPresetsData = getTestPresetsData();
const testFromNowPresetData = getTestTimeAgoPresetData();
const testInvalidData = getTestInvalidData();
const testDate = getTestDate();
const testDateNumber = testDate.getTime();
const testDateISOStr = testDate.toISOString();

const getWrapper = locale => ({ children }) => {
  return <TestLocalizationWrapper locale={locale}>{children}</TestLocalizationWrapper>;
};

describe('useDateFormat / formatDate', () => {
  forEach(testPresetsData, (presets, locale) => {
    // eslint-disable-next-line jest/valid-describe
    describe(`check formatting for ${locale}`, () => {
      forEach(presets, (presetResult, preset) => {
        test(`should format to ${preset} correctly`, () => {
          const { result } = renderHook(() => useFormatDate(), { wrapper: getWrapper(locale) });
          const { formatDate } = result.current;

          expect(formatDate(testDate, preset)).toBe(presetResult);
          expect(formatDate(testDateNumber, preset)).toBe(presetResult);
          expect(formatDate(testDateISOStr, preset)).toBe(presetResult);
        });
      });
    });
  });

  describe(`check formatting for invalid values`, () => {
    testInvalidData.forEach(({ title, value, result: formatResult }) => {
      test(title, () => {
        const { result } = renderHook(() => useFormatDate(), { wrapper: getWrapper() });
        const { formatDate } = result.current;

        expect(formatDate(value, DATE_FORMAT.DATE)).toBe(formatResult);
      });
    });
  });

  describe('check formatting for TIME_AGO preset', () => {
    const { values, results: localeResults } = testFromNowPresetData;

    forEach(localeResults, (results, locale) => {
      // eslint-disable-next-line jest/valid-describe
      describe(`check formatting for ${locale}`, () => {
        forEach(values, (date, valueKey) => {
          test(`should format ${valueKey} for ${locale} locale properly`, () => {
            const { result } = renderHook(() => useFormatDate(), { wrapper: getWrapper(locale) });
            const { formatDate } = result.current;

            expect(formatDate(date, DATE_FORMAT.TIME_AGO)).toBe(results[valueKey]);
          });
        });
      });
    });
  });
});
