/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';

import { RULE_INPUT_TYPES } from '../../constants';
import { DEFAULT_PROPS, PROPTYPES, VALUES } from '../constants';
import { getRuleConfigData, getRuleId } from '../helpers';

import { NumberValue, RangeValues, OneOfValues } from './inputFields';

const NumberRule = ({ config, id, onValueChange, operator, value }) => {
  const { placeholder } = getRuleConfigData(config);

  const commonProps = {
    id,
    onValueChange,
    operator,
    value,
  };

  switch (operator?.inputType) {
    case RULE_INPUT_TYPES.SINGLE_VALUE:
      return <NumberValue {...commonProps} placeholder={placeholder.numberInput} />;

    case RULE_INPUT_TYPES.RANGE:
      return <RangeValues {...commonProps} placeholder={placeholder.numberInput} />;

    case RULE_INPUT_TYPES.MULTIPLE_VALUES:
      return <OneOfValues {...commonProps} placeholder={placeholder.addTagsInline} />;

    default:
      return null;
  }
};

NumberRule.propTypes = {
  config: PropTypes.shape({
    operators: PROPTYPES.OPERATORS,
    placeholder: PropTypes.shape({
      addTagsInline: PropTypes.string,
      numberInput: PropTypes.string,
    }),
  }),
  id: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
};

NumberRule.defaultProps = {
  config: {
    operators: DEFAULT_PROPS.OPERATORS,
    placeholder: {},
  },
  id: getRuleId('number'),
  operator: null,
  value: VALUES.UNPROVIDED,
};

export default NumberRule;
