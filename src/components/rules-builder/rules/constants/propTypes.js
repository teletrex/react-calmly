/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import PropTypes from 'prop-types';

import { RULE_INPUT_TYPES } from '../../constants';

const { any, arrayOf, func, oneOf, oneOfType, shape, string } = PropTypes;

const OPERATOR = oneOfType([
  string,
  shape({
    inputType: oneOf(Object.values(RULE_INPUT_TYPES)).isRequired,
    label: string.isRequired,
    value: string.isRequired,
  }),
]);
const OPERATORS = arrayOf(OPERATOR);

const TIMEFRAME = shape({
  data: shape({
    operator: string,
    value: any,
  }),
  onChange: func,
});

const OPERATOR_NAME = string;

const SELECT_OPTION = shape({
  label: string.isRequired,
  value: string.isRequired,
});

const SELECT_OPTIONS = arrayOf(SELECT_OPTION);

export const PROPTYPES = {
  OPERATOR,
  OPERATORS,
  OPERATOR_NAME,
  SELECT_OPTION,
  SELECT_OPTIONS,
  TIMEFRAME,
};
