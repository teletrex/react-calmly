/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import moment from 'moment-timezone';
import 'moment/locale/ru';
import 'moment/locale/hi';
import 'moment/locale/ne';
import 'moment/locale/en-au';
import forEach from 'lodash/forEach';

import { getIs24HoursLocale } from './moment';
import { getTestPresetsData, getTestDate } from './moment.mock';

const testPresetsData = getTestPresetsData();
const testDate = getTestDate();

describe('moment localization', () => {
  forEach(testPresetsData, (presets, locale) => {
    // eslint-disable-next-line jest/valid-describe
    describe(`check formatting for ${locale} for moment globally`, () => {
      test(`should switch to locale ${locale} correctly`, () => {
        const resultLocale = moment.locale(locale);
        expect(resultLocale).toBe(locale);
      });

      test(`should switch to locale ${locale} correctly for moment instance`, () => {
        const instance = moment(testDate);
        instance.locale(locale);
        expect(instance.locale()).toBe(locale);
      });

      forEach(presets, (presetResult, preset) => {
        // skip custom presets
        if (preset.includes('[custom] ')) {
          return;
        }
        test(`should format to ${preset} correctly`, () => {
          const instance = moment(testDate);
          instance.locale(locale);
          expect(instance.format(preset)).toBe(presetResult);
        });
      });
    });
  });

  describe('getIs24HoursLocale', () => {
    const locales24hours = ['it', 'es', 'fr', 'de', 'pt-br', 'ja', 'ru'];
    const locales12hours = ['en', 'ko', 'hi', 'ne', 'en-au'];

    test('should return true for locales that uses 24 hours mode', () => {
      locales24hours.forEach(locale => {
        expect(getIs24HoursLocale(locale)).toBe(true);
      });
    });

    test('should return false for locales that uses 12 hours mode', () => {
      locales12hours.forEach(locale => {
        expect(getIs24HoursLocale(locale)).toBe(false);
      });
    });

    test('should not change global locale', () => {
      moment.locale('en');
      getIs24HoursLocale('ja');
      expect(moment.locale()).toBe('en');
    });
  });
});
