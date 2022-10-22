/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import isArray from 'lodash/isArray';
import omit from 'lodash/omit';
import uid from '@carbon/react/es/tools/uniqueId';

const mapRule = (rule, level, oneConjunctionMode) => {
  if (isArray(rule.data)) {
    let operands = 0;
    let maxLevelInside = 0;
    const data = rule.data.map(item => {
      const ret = mapRule(item, level + 1);
      operands += ret.operands;
      maxLevelInside = Math.max(maxLevelInside, ret.maxLevelInside);
      return ret;
    });
    return {
      ...rule,
      id: uid(),
      conjunction: oneConjunctionMode || rule.conjunction,
      level,
      maxLevelInside: maxLevelInside + 1,
      operands,
      data,
    };
  }

  return {
    ...rule,
    id: uid(),
    level,
    maxLevelInside: 0,
    operands: 1,
    data: rule.data,
  };
};

const mapRuleElements = (rule, createRule) => {
  const data = isArray(rule.data)
    ? rule.data.map(item => mapRuleElements(item, createRule))
    : createRule(rule.criteriaKey, rule.data, rule.timeframe);

  return {
    ...omit(rule, 'timeframe'),
    data,
  };
};

const composeRules = (rules, createRule, oneConjunctionMode) =>
  mapRuleElements(mapRule(rules, 0, oneConjunctionMode) || [], createRule);

export default composeRules;
