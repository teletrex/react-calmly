/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import {
  ANNIVERSARY_OPERATORS,
  BEFORE_AFTER_DATE_OPERATORS,
  EXACT_OPERATORS,
  IS_ONE_OF_OPERATORS,
  IS_OPERATORS,
  PERIOD_EQUAL_OPERATORS,
  RANGE_OPERATORS,
  TODAY_OPERATORS,
  WITHIN_RANGE_OPERATORS,
  WITHIN_OPERATORS,
} from '../constants/operators';

import DateRule from './DateRule';

jest.mock('../helpers', () => ({
  ...jest.requireActual('../helpers'),
  getTodayTimestamp: jest.fn().mockReturnValue(1610000000000),
}));

const defaultInitialOperator = TODAY_OPERATORS[0];

const operatorTestCases = [
  [
    BEFORE_AFTER_DATE_OPERATORS[0].label,
    BEFORE_AFTER_DATE_OPERATORS[0],
    'input-field-single-date-picker',
  ],
  [IS_OPERATORS[0].label, IS_OPERATORS[0], 'input-field-single-date-picker'],
  [PERIOD_EQUAL_OPERATORS[0].label, PERIOD_EQUAL_OPERATORS[0], 'date-rule-period-equal'],
  [ANNIVERSARY_OPERATORS[0].label, ANNIVERSARY_OPERATORS[0], 'input-field-when-relation'],
  [EXACT_OPERATORS[0].label, EXACT_OPERATORS[0], 'input-field-when-relation'],
  [WITHIN_OPERATORS[0].label, WITHIN_OPERATORS[0], 'input-field-within'],
  [RANGE_OPERATORS[0].label, RANGE_OPERATORS[0], 'input-field-range-date-picker'],
  [WITHIN_RANGE_OPERATORS[0].label, WITHIN_RANGE_OPERATORS[0], 'date-rule-range-of-last'],
  [IS_ONE_OF_OPERATORS[0].label, IS_ONE_OF_OPERATORS[0], 'date-rule-one-of-values'],
];

describe('DateRule', () => {
  const onValueChange = jest.fn();
  let defaultProps;

  beforeEach(() => {
    onValueChange.mockReset();

    defaultProps = {
      id: 'TestDateRuleElement',
      onValueChange,
      operator: defaultInitialOperator,
    };
  });

  test.each(operatorTestCases)(
    'should render a proper component when %s operator is selected',
    (operatorName, operator, testId) => {
      const props = {
        ...defaultProps,
        operator,
      };

      const { getByTestId } = render(<DateRule {...props} />);
      expect(getByTestId(testId)).toBeInTheDocument();
    }
  );
});
