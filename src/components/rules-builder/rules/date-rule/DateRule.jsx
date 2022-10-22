/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';

import { RULE_INPUT_TYPES } from '../../constants';
import { PROPTYPES, VALUES } from '../constants';
import { getRuleId } from '../helpers';

import {
  OneOfValues,
  PeriodEqual,
  RangeDatePicker,
  SingleDatePicker,
  WhenRelation,
  Within,
  WithinRange,
} from './inputFields';

const DateRule = ({ id, onValueChange, operator, value }) => {
  const props = {
    id,
    onValueChange,
    operator,
    value,
  };

  switch (operator?.inputType) {
    case RULE_INPUT_TYPES.SINGLE_VALUE:
      return <SingleDatePicker {...props} />;

    case RULE_INPUT_TYPES.PERIOD_NUMBER:
      return <PeriodEqual {...props} />;

    case RULE_INPUT_TYPES.WHEN_RELATION:
      return <WhenRelation {...props} />;

    case RULE_INPUT_TYPES.WITHIN_PERIOD:
      return <Within {...props} />;

    case RULE_INPUT_TYPES.RANGE:
      return <RangeDatePicker {...props} />;

    case RULE_INPUT_TYPES.PERIOD_RANGE:
      return <WithinRange {...props} />;

    case RULE_INPUT_TYPES.MULTIPLE_VALUES:
      return <OneOfValues {...props} />;

    default:
      return null;
  }
};

DateRule.propTypes = {
  id: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
};

DateRule.defaultProps = {
  id: getRuleId('date'),
  operator: null,
  value: VALUES.UNPROVIDED,
};

export default DateRule;
