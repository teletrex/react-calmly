/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import moment from 'moment-timezone';

import { DATE_FORMAT } from '../format';

const getTestPresetsData = () => ({
  en: {
    [DATE_FORMAT.TIME]: '7:45 AM',
    [DATE_FORMAT.TIME_WITH_SECONDS]: '7:45:55 AM',
    [DATE_FORMAT.DATE]: 'Apr 7, 2020',
    [DATE_FORMAT.DATE_TIME]: 'Apr 7, 2020 7:45 AM',
    [DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY]: 'Tuesday, April 7, 2020 7:45 AM',
    [DATE_FORMAT.SHORT_DATE]: '04/07/2020',
  },
  fr: {
    [DATE_FORMAT.TIME]: '07:45',
    [DATE_FORMAT.TIME_WITH_SECONDS]: '07:45:55',
    [DATE_FORMAT.DATE]: '7 avr. 2020',
    [DATE_FORMAT.DATE_TIME]: '7 avr. 2020 07:45',
    [DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY]: 'mardi 7 avril 2020 07:45',
    [DATE_FORMAT.SHORT_DATE]: '07/04/2020',
  },
  de: {
    [DATE_FORMAT.TIME]: '07:45',
    [DATE_FORMAT.TIME_WITH_SECONDS]: '07:45:55',
    [DATE_FORMAT.DATE]: '7. Apr. 2020',
    [DATE_FORMAT.DATE_TIME]: '7. Apr. 2020 07:45',
    [DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY]: 'Dienstag, 7. April 2020 07:45',
    [DATE_FORMAT.SHORT_DATE]: '07.04.2020',
  },
  it: {
    [DATE_FORMAT.TIME]: '07:45',
    [DATE_FORMAT.TIME_WITH_SECONDS]: '07:45:55',
    [DATE_FORMAT.DATE]: '7 apr 2020',
    [DATE_FORMAT.DATE_TIME]: '7 apr 2020 07:45',
    [DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY]: 'martedì 7 aprile 2020 07:45',
    [DATE_FORMAT.SHORT_DATE]: '07/04/2020',
  },
  ja: {
    [DATE_FORMAT.TIME]: '07:45',
    [DATE_FORMAT.TIME_WITH_SECONDS]: '07:45:55',
    [DATE_FORMAT.DATE]: '2020年4月7日',
    [DATE_FORMAT.DATE_TIME]: '2020年4月7日 07:45',
    [DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY]: '2020年4月7日 火曜日 07:45',
    [DATE_FORMAT.SHORT_DATE]: '2020/04/07',
  },
  es: {
    [DATE_FORMAT.TIME]: '7:45',
    [DATE_FORMAT.TIME_WITH_SECONDS]: '7:45:55',
    [DATE_FORMAT.DATE]: '7 de abr. de 2020',
    [DATE_FORMAT.DATE_TIME]: '7 de abr. de 2020 7:45',
    [DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY]: 'martes, 7 de abril de 2020 7:45',
    [DATE_FORMAT.SHORT_DATE]: '07/04/2020',
  },
  'pt-br': {
    [DATE_FORMAT.TIME]: '07:45',
    [DATE_FORMAT.TIME_WITH_SECONDS]: '07:45:55',
    [DATE_FORMAT.DATE]: '7 de abr de 2020',
    [DATE_FORMAT.DATE_TIME]: '7 de abr de 2020 às 07:45',
    [DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY]: 'terça-feira, 7 de abril de 2020 às 07:45',
    [DATE_FORMAT.SHORT_DATE]: '07/04/2020',
  },
  ko: {
    [DATE_FORMAT.TIME]: '오전 7:45',
    [DATE_FORMAT.TIME_WITH_SECONDS]: '오전 7:45:55',
    [DATE_FORMAT.DATE]: '2020년 4월 7일',
    [DATE_FORMAT.DATE_TIME]: '2020년 4월 7일 오전 7:45',
    [DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY]: '2020년 4월 7일 화요일 오전 7:45',
    [DATE_FORMAT.SHORT_DATE]: '2020.04.07.',
  },
});

const getTestTimeAgoPresetData = () => {
  const values = {
    '1 Min Ago': moment().subtract(1, 'minutes'),
    '10 Mins Ago': moment().subtract(10, 'minutes'),
    '1 Hour Ago': moment().subtract(1, 'hours'),
    '1 Day Ago': moment().subtract(1, 'days'),
    '7 Days Ago': moment().subtract(7, 'days'),
  };

  const results = {
    en: {
      '1 Min Ago': 'a minute ago',
      '10 Mins Ago': '10 minutes ago',
      '1 Hour Ago': 'an hour ago',
      '1 Day Ago': 'a day ago',
      '7 Days Ago': '7 days ago',
    },
    'pt-br': {
      '1 Min Ago': 'há um minuto',
      '10 Mins Ago': 'há 10 minutos',
      '1 Hour Ago': 'há uma hora',
      '1 Day Ago': 'há um dia',
      '7 Days Ago': 'há 7 dias',
    },
    ko: {
      '1 Min Ago': '1분 전',
      '10 Mins Ago': '10분 전',
      '1 Hour Ago': '한 시간 전',
      '1 Day Ago': '하루 전',
      '7 Days Ago': '7일 전',
    },
  };

  return {
    values,
    results,
  };
};

const getTestInvalidData = () => [
  { title: 'should return an empty string for null', value: null, result: '' },
  { title: 'should return an empty string for undefined', value: undefined, result: '' },
  { title: 'should return NaN string for NaN', value: NaN, result: 'NaN' },
  {
    title: 'should return Invalid Date for an invalid Date instance',
    value: new Date('abc'),
    result: 'Invalid Date',
  },
  {
    title: 'should return input value string for an invalid ISO string',
    value: '2020-Mar-25T110:37:42.388Z',
    result: '2020-Mar-25T110:37:42.388Z',
  },
  {
    title: 'should return input value string for an date string',
    value: 'Non 25 2020 10:59:18 GMT+0300',
    result: 'Non 25 2020 10:59:18 GMT+0300',
  },
];

const testDateStr = 'Tue Apr 07 2020 07:45:55 GMT-0500';
const getTestDate = () => new Date(testDateStr);

export { getTestPresetsData, getTestTimeAgoPresetData, getTestInvalidData, getTestDate };
