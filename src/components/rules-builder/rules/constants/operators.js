/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { RULE_INPUT_TYPES } from '../../constants';

const {
  MULTIPLE_VALUES,
  NONE,
  PERIOD_NUMBER,
  PERIOD_RANGE,
  RANGE,
  SINGLE_VALUE,
  WHEN_RELATION,
  WITHIN_PERIOD,
} = RULE_INPUT_TYPES;

// Common operators
export const BLANK_OPERATORS = [
  {
    inputType: NONE,
    label: 'is blank',
    value: 'IS_BLANK',
  },
  {
    inputType: NONE,
    label: 'is not blank',
    value: 'IS_NOT_BLANK',
  },
];

export const EXACT_OPERATORS = [
  {
    inputType: WHEN_RELATION,
    label: 'is exactly',
    value: 'IS_EXACTLY',
  },
  {
    inputType: WHEN_RELATION,
    label: 'is not exactly',
    value: 'IS_NOT_EXACTLY',
  },
];

export const IS_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'is',
    value: 'IS',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'is not',
    value: 'IS_NOT',
  },
];

export const HAS_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'has',
    value: 'HAS',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'has not',
    value: 'HAS_NOT',
  },
];

export const IS_ONE_OF_OPERATORS = [
  {
    inputType: MULTIPLE_VALUES,
    label: 'is one of the following',
    value: 'IS_ONE_OF_THE_FOLLOWING',
  },
  {
    inputType: MULTIPLE_VALUES,
    label: 'is not one of the following',
    value: 'IS_NOT_ONE_OF_THE_FOLLOWING',
  },
];

export const CONTAIN_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'contains',
    value: 'CONTAINS',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'does not contain',
    value: 'DOES_NOT_CONTAIN',
  },
];

export const CONTAIN_ONE_OF_OPERATORS = [
  {
    inputType: MULTIPLE_VALUES,
    label: 'contains one of the following',
    value: 'CONTAINS_ONE_OF_THE_FOLLOWING',
  },
  {
    inputType: MULTIPLE_VALUES,
    label: 'does not contain one of the following',
    value: 'DOES_NOT_CONTAIN_ONE_OF_THE_FOLLOWING',
  },
];

export const RANGE_OPERATORS = [
  {
    inputType: RANGE,
    label: 'is between',
    value: 'IS_BETWEEN',
  },
];

// String related operators
export const STARTS_WITH_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'starts with',
    value: 'STARTS_WITH',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'does not start with',
    value: 'DOES_NOT_START_WITH',
  },
];

export const STARTS_WITH_ONE_OF_OPERATORS = [
  {
    inputType: MULTIPLE_VALUES,
    label: 'starts with one of the following',
    value: 'STARTS_WITH_ONE_OF_THE_FOLLOWING',
  },
  {
    inputType: MULTIPLE_VALUES,
    label: 'does not start with one of the following',
    value: 'DOES_NOT_START_WITH_ONE_OF_THE_FOLLOWING',
  },
];

export const ENDS_WITH_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'ends with',
    value: 'ENDS_WITH',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'does not end with',
    value: 'DOES_NOT_END_WITH',
  },
];

export const ENDS_WITH_ONE_OF_OPERATORS = [
  {
    inputType: MULTIPLE_VALUES,
    label: 'ends with one of the following',
    value: 'ENDS_WITH_ONE_OF_THE_FOLLOWING',
  },
  {
    inputType: MULTIPLE_VALUES,
    label: 'does not end with one of the following',
    value: 'DOES_NOT_END_WITH_ONE_OF_THE_FOLLOWING',
  },
];

// Number related operators
export const LESS_THAN_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'is less than',
    value: 'IS_LESS',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'is less than or equal to',
    value: 'IS_LESS_OR_EQUAL',
  },
];

export const GREATER_THAN_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'is greater than',
    value: 'IS_GREATER',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'is greater than or equal to',
    value: 'IS_GREATER_OR_EQUAL',
  },
];

// Date related operators
export const TODAY_OPERATORS = [
  {
    inputType: NONE,
    label: 'is today',
    value: 'IS_TODAY',
  },
  {
    inputType: NONE,
    label: 'is after today',
    value: 'IS_AFTER_TODAY',
  },
  {
    inputType: NONE,
    label: 'is not after today',
    value: 'IS_NOT_AFTER_TODAY',
  },
  {
    inputType: NONE,
    label: 'is before today',
    value: 'IS_BEFORE_TODAY',
  },
  {
    inputType: NONE,
    label: 'is not before today',
    value: 'IS_NOT_BEFORE_TODAY',
  },
  {
    inputType: NONE,
    label: 'anniversary is today',
    value: 'ANNIVERSARY_IS_TODAY',
  },
];

export const ANNIVERSARY_OPERATORS = [
  {
    inputType: WHEN_RELATION,
    label: 'anniversary is',
    value: 'ANNIVERSARY_IS',
  },
];

export const WITHIN_OPERATORS = [
  {
    inputType: WITHIN_PERIOD,
    label: 'is within the last',
    value: 'IS_WITHIN_THE_LAST',
  },
  {
    inputType: WITHIN_PERIOD,
    label: 'is not within the last',
    value: 'IS_NOT_WITHIN_THE_LAST',
  },
  {
    inputType: WITHIN_PERIOD,
    label: 'is within the next',
    value: 'IS_WITHIN_THE_NEXT',
  },
  {
    inputType: WITHIN_PERIOD,
    label: 'is not within the next',
    value: 'IS_NOT_WITHIN_THE_NEXT',
  },
];

export const WITHIN_RANGE_OPERATORS = [
  {
    inputType: PERIOD_RANGE,
    label: 'is within the range of the last',
    value: 'IS_WITHIN_THE_RANGE_OF_THE_LAST',
  },
];

export const PERIOD_EQUAL_OPERATORS = [
  {
    inputType: PERIOD_NUMBER,
    label: 'year is',
    value: 'YEAR_IS',
  },
  {
    inputType: PERIOD_NUMBER,
    label: 'month is',
    value: 'MONTH_IS',
  },
  {
    inputType: PERIOD_NUMBER,
    label: 'day is',
    value: 'DAY_IS',
  },
];

export const BEFORE_AFTER_DATE_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'is after',
    value: 'IS_AFTER',
  },
  {
    inputType: SINGLE_VALUE,
    label: 'is before',
    value: 'IS_BEFORE',
  }
]

export const DATA_AGGREGATION_OPERATORS = [
  {
    inputType: SINGLE_VALUE,
    label: 'by',
    value: 'BY',
  },

];
