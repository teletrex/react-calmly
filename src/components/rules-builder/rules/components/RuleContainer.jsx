/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { RULE_INPUT_TYPES, RULE_TYPES } from '../../constants';
import { getRuleContainerConfigData, getRuleId, getRuleOutput } from '../helpers';
import {
  ALL_AVAILABLE_OPERATORS,
  CUSTOM_RULE_DEFAULT_OPERATORS,
  DATE_RULE_OPERATORS,
  DEFAULT_PROPS,
  NUMBER_RULE_OPERATORS,
  PROPTYPES,
  SELECT_RULE_OPERATORS,
  STRING_RULE_OPERATORS,
  VALUES,
} from '../constants';

import RuleOperatorDropdown from './OperatorDropdown';
import TimeframeSelector from './TimeframeSelector';

const RULE_OPERATORS = {
  [RULE_TYPES.date]: DATE_RULE_OPERATORS,
  [RULE_TYPES.number]: NUMBER_RULE_OPERATORS,
  [RULE_TYPES.select]: SELECT_RULE_OPERATORS,
  [RULE_TYPES.string]: STRING_RULE_OPERATORS,
  [RULE_TYPES.custom]: {
    DEFAULT: CUSTOM_RULE_DEFAULT_OPERATORS,
    ALL: ALL_AVAILABLE_OPERATORS,
  },
};

const getOperatorsList = ruleConfig => {
  if (ruleConfig.type === RULE_TYPES.custom) {
    const customRuleOperators = isEmpty(ruleConfig.operators) ? 'DEFAULT' : 'ALL';
    return RULE_OPERATORS[RULE_TYPES.custom][customRuleOperators];
  }

  return RULE_OPERATORS[ruleConfig.type] || [];
};

const RuleContainer = ({ config, data, onRuleChange, timeframe, ruleComponent: RuleComponent }) => {
  const { operator, operators, value } = getRuleContainerConfigData(
    config,
    data,
    getOperatorsList(config)
  );

  const [isTimeframeVisible, setIsTimeframeVisible] = useState(!isEmpty(timeframe));
  const id = useMemo(() => getRuleId(config.type), [config.type]);

  const handleOperatorChange = ({ selectedItem: newOperator }) => {
    const newValue =
      newOperator.inputType === RULE_INPUT_TYPES.NONE ? VALUES.BLANK : VALUES.UNPROVIDED;

    onRuleChange(getRuleOutput(newOperator.value, newValue));
  };

  const handleValueChange = newValue => {
    onRuleChange(getRuleOutput(operator.value, newValue));
  };

  const setTimeframeVisibility = isVisible => {
    // allow to control the visibility only if hasTimeframe param was set
    if (!isEmpty(timeframe)) {
      if (!isVisible && !isEmpty(timeframe?.data)) {
        // reset timeframe if it has a value and is being hidden
        timeframe.onChange({});
      }
      setIsTimeframeVisible(isVisible);
    }
  };

  const commonProps = {
    id,
    operator,
  };

  return (
    <>
      <RuleOperatorDropdown
        onOperatorChange={handleOperatorChange}
        operators={operators}
        {...commonProps}
      />
      <RuleComponent
        config={config}
        onValueChange={handleValueChange}
        setTimeframeVisibility={setTimeframeVisibility}
        timeframe={timeframe}
        value={value}
        {...commonProps}
      />
      {isTimeframeVisible && <TimeframeSelector {...commonProps} timeframe={timeframe} />}
    </>
  );
};

RuleContainer.propTypes = {
  config: PropTypes.shape({
    operators: PROPTYPES.OPERATORS.isRequired,
    type: PropTypes.oneOf(Object.values(RULE_TYPES)).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    operator: PROPTYPES.OPERATOR_NAME,
  }),
  onRuleChange: PropTypes.func.isRequired,
  ruleComponent: PropTypes.func.isRequired,
  timeframe: PROPTYPES.TIMEFRAME,
};

RuleContainer.defaultProps = {
  data: {
    operator: null,
  },
  timeframe: DEFAULT_PROPS.TIMEFRAME,
};

export default RuleContainer;
