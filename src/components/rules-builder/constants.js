/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




// comment needed for translation parsing
// t('Or')
// t('And')
// t('And (changes all in level)')
// t('And (adds bracket)')
// t('Or (changes all in level)')
// t('Or (adds bracket)')

export const CONJUNCTION_OR = Object.freeze({
  id: 'OR',
  label: 'Or',
});

export const CONJUNCTION_AND = Object.freeze({
  id: 'AND',
  label: 'And',
});

export const CONJUNCTION_AND_ALL = Object.freeze({
  id: 'AND_ALL',
  value: 'AND',
  label: 'And (changes all in level)',
  changeAll: true,
});

export const CONJUNCTION_AND_BRACKETS = Object.freeze({
  id: 'AND_BRACKETS',
  value: 'AND',
  label: 'And (adds bracket)',
  changeAll: false,
});

export const CONJUNCTION_OR_ALL = Object.freeze({
  id: 'OR_ALL',
  value: 'OR',
  label: 'Or (changes all in level)',
  changeAll: true,
});

export const CONJUNCTION_OR_BRACKETS = Object.freeze({
  id: 'OR_BRACKETS',
  value: 'OR',
  label: 'Or (adds bracket)',
  changeAll: false,
});

export const RULE_TYPES = {
  custom: 'custom',
  date: 'date',
  number: 'number',
  select: 'select',
  string: 'string',
};

export const RULE_INPUT_TYPES = {
  // Common:
  RANGE: 'range',
  NONE: 'none',
  SINGLE_VALUE: 'singleValue',
  MULTIPLE_VALUES: 'multipleValues',

  // Date related:
  PERIOD_NUMBER: 'periodNumber',
  WHEN_RELATION: 'whenRelation',
  WITHIN_PERIOD: 'withinPeriod',
  PERIOD_RANGE: 'periodRange',
};

export const CONJUNCTIONS = {
  CONJUNCTION_OR,
  CONJUNCTION_AND,
  CONJUNCTION_AND_ALL,
  CONJUNCTION_AND_BRACKETS,
  CONJUNCTION_OR_ALL,
  CONJUNCTION_OR_BRACKETS,
};
