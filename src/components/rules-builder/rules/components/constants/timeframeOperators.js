/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { RULE_INPUT_TYPES } from '../../../constants';

const { NONE, RANGE, SINGLE_VALUE, WHEN_RELATION, WITHIN_PERIOD } = RULE_INPUT_TYPES;

export const TIMEFRAME_OPERATORS = [
  // Within:
  {
    inputType: WITHIN_PERIOD,
    label: 'within the last',
    value: 'WITHIN_THE_LAST',
  },

  // Today:
  {
    inputType: NONE,
    label: 'on today',
    value: 'ON_TODAY',
  },
  {
    inputType: NONE,
    label: 'before today',
    value: 'BEFORE_TODAY',
  },

  // Any time:
  {
    inputType: NONE,
    label: 'at any time',
    value: 'AT_ANY_TIME',
  },

  // Date:
  {
    inputType: SINGLE_VALUE,
    label: 'on',
    value: 'ON',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'after',
    value: 'AFTER',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'before',
    value: 'BEFORE',
  },

  // Date range:
  {
    inputType: RANGE,
    label: 'between',
    value: 'BETWEEN',
  },

  // When relation:
  {
    inputType: WHEN_RELATION,
    label: 'exactly',
    value: 'EXACTLY',
  },
  {
    inputType: WHEN_RELATION,
    label: 'more than',
    value: 'MORE_THAN',
  },
  {
    inputType: WHEN_RELATION,
    label: 'less than',
    value: 'LESS_THAN',
  },
];
