/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import capitalize from 'lodash/capitalize';
import uniqueId from 'lodash/uniqueId';

import { composeOperators } from '../../utils/composeOperators';

export const getRuleOutput = (operator, value) => ({ operator, value });

export const getInitialOperator = (operatorValue, operators) =>
  operators.find(item => item.value === operatorValue);

export const getRuleConfigData = ruleConfig => {
  const { placeholder = {}, inputComponent } = ruleConfig;

  return {
    placeholder,
    ...(inputComponent && { inputComponent }),
  };
};

export const getRuleContainerConfigData = (ruleConfig, ruleData, operatorsList) => {
  const { disableCriteriaReselect, operators: ruleOperators = [] } = ruleConfig;
  const { value } = ruleData;
  const operators = ruleOperators.length
    ? composeOperators(ruleOperators, operatorsList)
    : operatorsList;
  let operator = getInitialOperator(ruleData.operator, operators);

  if (disableCriteriaReselect && !operator) {
    [operator] = operators;
  }

  return {
    operator,
    value,
    operators,
  };
};

export const getRuleId = ruleType => `${capitalize(ruleType)}Rule_${uniqueId()}`;
