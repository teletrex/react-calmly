/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import forEach from 'lodash/forEach';
import { render } from '@testing-library/react';

import {
  getTestDate,
  getTestTimeAgoPresetData,
  getTestInvalidData,
  getTestPresetsData,
} from '../../translation/moment.mock';
import TestLocalizationWrapper from '../../utils/test-helpers/TestLocalizationWrapper';
import {
  ERROR_RELEGATION_REASON_TAG,
  relegateErrors,
} from '../../utils/test-helpers/relegate-errors';

import FormatDate from './FormatDate';
import { DATE_FORMAT } from './presets';

const testPresetsData = getTestPresetsData();
const testFromNowPresetData = getTestTimeAgoPresetData();
const testInvalidData = getTestInvalidData();
const testDate = getTestDate();
const testDateNumber = testDate.getTime();
const testDateISOStr = testDate.toISOString();

const getWrapper = locale => ({ children }) => {
  return (
    <TestLocalizationWrapper locale={locale}>
      <span data-testid="container">{children}</span>
    </TestLocalizationWrapper>
  );
};

describe('FormatDate', () => {
  forEach(testPresetsData, (presets, locale) => {
    // eslint-disable-next-line jest/valid-describe
    describe(`check formatting for ${locale}`, () => {
      forEach(presets, (presetResult, preset) => {
        it(`should format to ${preset} correctly for Date value`, () => {
          const { getByText } = render(<FormatDate preset={preset} value={testDate} />, {
            wrapper: getWrapper(locale),
          });
          expect(getByText(presetResult)).toBeInTheDocument();
        });

        it(`should format to ${preset} correctly for number value`, () => {
          const { getByText } = render(<FormatDate preset={preset} value={testDateNumber} />, {
            wrapper: getWrapper(locale),
          });
          expect(getByText(presetResult)).toBeInTheDocument();
        });

        it(`should format to ${preset} correctly for ISO string value`, () => {
          const { getByText } = render(<FormatDate preset={preset} value={testDateISOStr} />, {
            wrapper: getWrapper(locale),
          });
          expect(getByText(presetResult)).toBeInTheDocument();
        });
      });
    });
  });
  describe(`check formatting for en`, () => {
    const preset = DATE_FORMAT.MONTH_YEAR;
    const presetResult = 'April 2020';
    const locale = 'en';
    it(`should format to ${DATE_FORMAT.MONTH_YEAR} correctly for Date value`, () => {
      const { getByText } = render(<FormatDate preset={preset} value={testDate} />, {
        wrapper: getWrapper(locale),
      });
      expect(getByText(presetResult)).toBeInTheDocument();
    });

    it(`should format to ${DATE_FORMAT.MONTH_YEAR} correctly for number value`, () => {
      const { getByText } = render(<FormatDate preset={preset} value={testDateNumber} />, {
        wrapper: getWrapper(locale),
      });
      expect(getByText(presetResult)).toBeInTheDocument();
    });

    it(`should format to ${DATE_FORMAT.MONTH_YEAR} correctly for ISO string value`, () => {
      const { getByText } = render(<FormatDate preset={preset} value={testDateISOStr} />, {
        wrapper: getWrapper(locale),
      });
      expect(getByText(presetResult)).toBeInTheDocument();
    });
  });

  describe('check TIME_AGO preset', () => {
    const { values, results: localeResults } = testFromNowPresetData;

    forEach(localeResults, (results, locale) => {
      // eslint-disable-next-line jest/valid-describe
      describe(`check formatting for ${locale}`, () => {
        forEach(values, (date, valueKey) => {
          it(`should format ${valueKey} for ${locale} locale properly`, () => {
            const { getByTestId } = render(
              <FormatDate preset={DATE_FORMAT.TIME_AGO} value={date.valueOf()} />,
              {
                wrapper: getWrapper(locale),
              }
            );
            const formatContainer = getByTestId('container');
            expect(formatContainer.textContent).toBe(results[valueKey]);
          });
        });
      });
    });
  });

  describe(`check formatting for invalid values`, () => {
    testInvalidData.forEach(({ title, value, result }) => {
      it(title, () => {
        relegateErrors(
          {
            reasonTag: ERROR_RELEGATION_REASON_TAG.EXPECTED_BEHAVIOR,
            reason:
              'This test checks formatting of invalid props. PropTypes errors is correct behavior here.',
            expectedErrorCount: 2,
            skipProducedLogs: true,
          },
          () => {
            const { getByTestId } = render(<FormatDate preset={DATE_FORMAT.DATE} value={value} />, {
              wrapper: getWrapper(),
            });
            const formatContainer = getByTestId('container');
            expect(formatContainer.textContent).toBe(result);
          }
        );
      });
    });
  });
});
