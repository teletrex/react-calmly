/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import update from 'immutability-helper';
import isArray from 'lodash/isArray';
import pick from 'lodash/pick';
// import uid from '@carbon/react';  //TODO:  Kinda odd way of doing this...

const uid = new Date().getTime();

export const findRule = (rule, ruleId) => {
  if (rule.id === ruleId)
    return {
      data: rule,
      trace: [],
    };

  if (!isArray(rule.data)) return {};

  const result = {
    data: null,
    trace: [],
  };

  rule.data.some((item, index) => {
    const { data, trace } = findRule(item, ruleId);
    if (!data) {
      return false;
    }

    result.data = data;
    result.trace = [...trace, { index, parent: rule }];

    return true;
  });

  return result;
};

/**
 * Generate an update object that will be used in update from 'immutability-helper'
 *
 * @param trace - foundRuleTrace from findRule
 * @param {Object} update
 * @param {Object} [update.updateItems={}]
 * @param {Object} [update.updateValues={}]
 * @param maxLevel - max level of nesting
 * @param level - current level
 */
const generateUpdateObject = (
  trace,
  { updateItems = {}, updateValues = {} },
  maxLevel,
  level = 0
) => {
  if (maxLevel === level)
    return { ...updateValues[level], data: { ...(updateItems[level] || {}) } };

  const newTrace = [...trace];
  const { index } = newTrace.pop();
  return {
    ...updateValues[level],
    data: {
      ...(updateItems[level] || {}),
      [index]: generateUpdateObject(newTrace, { updateItems, updateValues }, maxLevel, level + 1),
    },
  };
};

/**
 * Generate an update object that will be used in update from 'immutability-helper'
 * for updating 'level'
 */
const generateUpdateObjectForLevel = (rule, level) => {
  if (!isArray(rule.data)) return { level: { $set: level } };

  return {
    level: { $set: level },
    data: { ...rule.data.map(item => generateUpdateObjectForLevel(item, level + 1)) },
  };
};

/**
 * Update maxLevelInside of each Rule.
 * We need to do this when we delete some Rule.
 */
const updateMaxLevelInside = rule => {
  if (isArray(rule.data)) {
    let maxLevelInside = 0;
    const data = rule.data.map(item => {
      const ret = updateMaxLevelInside(item);
      maxLevelInside = Math.max(maxLevelInside, ret.maxLevelInside);
      return ret;
    });
    return { ...rule, maxLevelInside: maxLevelInside + 1, data };
  }

  return {
    ...rule,
    maxLevelInside: 0,
  };
};

export const updateRuleCriteria = (rule, criteriaKey, createRule) => {
  const newRule = update(rule.data, {
    criteriaKey: { $set: criteriaKey },
    data: { $set: createRule(criteriaKey, {}) },
  });

  const updateItems = {
    [rule.trace.length - 1]: {
      $splice: [[rule.trace[0].index, 1, newRule]],
    },
  };

  return generateUpdateObject(rule.trace, { updateItems }, rule.trace.length - 1);
};

export const insertNewRule = (rules, ruleId, ruleToInsert, direction) => {
  const rule = findRule(rules, ruleId);
  const { index } = rule.trace[0];

  const newRule = update(ruleToInsert, generateUpdateObjectForLevel(ruleToInsert, rule.data.level));

  const updateItems = {
    [rule.trace.length - 1]: {
      $splice: [[index + (direction === -1 ? 0 : 1), 0, newRule]],
    },
  };
  const updateValues = {
    ...new Array(rule.trace.length).fill(0).map((val, index) => ({
      operands: { $apply: x => x + newRule.operands },
      maxLevelInside: {
        $apply: x => Math.max(x, newRule.maxLevelInside + rule.trace.length - index),
      },
    })),
  };

  return generateUpdateObject(rule.trace, { updateItems, updateValues }, rule.trace.length);
};

export const addNewRule = (rules, groupId) => {
  const { data, trace } = findRule(rules, groupId);

  const newRule = {
    id: uid(),
    level: data.level + 1,
    maxLevelInside: 0,
    operands: 1,
    data: null,
  };

  const updateItems = {
    [trace.length]: { $push: [newRule] },
  };
  const updateValues = {
    ...new Array(trace.length + 1).fill({
      operands: { $apply: x => x + 1 },
    }),
  };

  return generateUpdateObject(trace, { updateItems, updateValues }, trace.length);
};

export const deleteRule = (rules, ruleId) => {
  const { data, trace } = findRule(rules, ruleId);
  if (!data) {
    return rules;
  }

  const { parent, index } = trace[0];

  if (parent.data.length === 1 && trace.length !== 1) {
    return deleteRule(rules, parent.id);
  }

  const updateItems = {
    [trace.length - 1]: {
      $splice: [[index, 1]],
    },
  };
  const updateValues = {
    ...new Array(trace.length).fill({
      operands: { $apply: x => x - data.operands },
    }),
  };

  const updateObject = generateUpdateObject(trace, { updateItems, updateValues }, trace.length - 1);
  return updateMaxLevelInside(update(rules, updateObject));
};

export const duplicateRule = ({ trace, data: rule }, createRule) => {
  const { index } = trace[0];
  const duplicateRule = {
    ...rule,
    data: createRule(
      rule.criteriaKey,
      pick(rule.data.ruleData, 'operator', 'value'),
      pick(rule.data.ruleTimeframe, 'operator', 'value')
    ),
    id: uid(),
  };

  const updateItems = {
    [trace.length - 1]: {
      $splice: [[index + 1, 0, duplicateRule]],
    },
  };
  const updateValues = {
    ...new Array(trace.length).fill({
      operands: { $apply: x => x + rule.operands },
    }),
  };

  return generateUpdateObject(trace, { updateItems, updateValues }, trace.length - 1);
};

export const changeRuleData = (rules, ruleId, ruleData) => {
  const rule = findRule(rules, ruleId);
  const { parent } = rule.trace[0];
  const updateItems = {};

  const newElements = parent.data.map(item =>
    item.id === ruleId ? update(item, { data: { ruleData: { $set: ruleData } } }) : item
  );

  updateItems[rule.trace.length - 1] = { $set: newElements };

  return generateUpdateObject(rule.trace, { updateItems }, rule.trace.length - 1);
};

export const changeRuleTimeframe = (rules, ruleId, timeframeData) => {
  const rule = findRule(rules, ruleId);
  const { parent } = rule.trace[0];
  const updateItems = {};

  const newElements = parent.data.map(item =>
    item.id === ruleId ? update(item, { data: { ruleTimeframe: { $set: timeframeData } } }) : item
  );

  updateItems[rule.trace.length - 1] = { $set: newElements };

  return generateUpdateObject(rule.trace, { updateItems }, rule.trace.length - 1);
};

export const changeConjunction = (rule, conjunction) => {
  const { index, parent } = rule.trace[0];

  const updateItems = {};
  let updateValues = {};
  if (conjunction.changeAll) {
    updateValues = {
      [rule.trace.length - 1]: { conjunction: { $set: conjunction.value } },
    };
  } else {
    const newGroup = {
      id: uid(),
      conjunction: conjunction.value,
      level: parent.data[index - 1].level,
      maxLevelInside:
        1 + Math.max(parent.data[index - 1].maxLevelInside, parent.data[index].maxLevelInside),
      operands: parent.data[index - 1].operands + parent.data[index].operands,
      data: [
        update(
          parent.data[index - 1],
          generateUpdateObjectForLevel(parent.data[index - 1], parent.data[index - 1].level + 1)
        ),
        update(
          parent.data[index],
          generateUpdateObjectForLevel(parent.data[index], parent.data[index].level + 1)
        ),
      ],
    };

    updateItems[rule.trace.length - 1] = { $splice: [[index - 1, 2, newGroup]] };
    updateValues = {
      ...new Array(rule.trace.length).fill(0).map((val, index) => ({
        maxLevelInside: {
          $apply: x => Math.max(x, newGroup.maxLevelInside + rule.trace.length - index),
        },
      })),
    };
  }

  return generateUpdateObject(rule.trace, { updateItems, updateValues }, rule.trace.length - 1);
};

export const groupRules = (rules, ruleId, oneConjunctionMode) => {
  const { data, trace } = findRule(rules, ruleId);
  const { index, parent } = trace[0];

  const newGroup = {
    id: uid(),
    conjunction: oneConjunctionMode || parent.conjunction,
    level: data.level,
    maxLevelInside: data.maxLevelInside + 1,
    operands: data.operands,
    data: [update(data, generateUpdateObjectForLevel(data, data.level + 1))],
  };

  const updateItems = {
    [trace.length - 1]: {
      $splice: [[index, 1, newGroup]],
    },
  };
  const updateValues = {
    ...new Array(trace.length).fill(0).map((val, index) => ({
      maxLevelInside: {
        $apply: x => Math.max(x, newGroup.maxLevelInside + trace.length - index),
      },
    })),
  };

  return generateUpdateObject(trace, { updateItems, updateValues }, trace.length - 1);
};

export const ungroupRules = (rules, groupId) => {
  const { data, trace } = findRule(rules, groupId);
  const { parent, index } = trace[0];

  if (!isArray(data.data)) {
    return ungroupRules(rules, parent.id);
  }

  const newElements = data.data.map(item =>
    update(item, generateUpdateObjectForLevel(item, data.level))
  );

  const updateItems = {
    [trace.length - 1]: {
      $splice: [[index, 1, ...newElements]],
    },
  };

  const updateObject = generateUpdateObject(trace, { updateItems }, trace.length - 1);

  return updateMaxLevelInside(update(rules, updateObject));
};

export const moveRule = (rules, ruleId, direction) => {
  const { data, trace } = findRule(rules, ruleId);
  const { parent, index } = trace[0];
  const limit = direction === 1 ? 0 : parent.data.length - 1;

  if (!data || (index === limit && trace.length === 1)) return rules;

  const updateItems = {};
  let groupIdToRemoveBracket = null;

  if (index !== limit) {
    const otherItemData = parent.data[index - direction].data;
    if (isArray(otherItemData)) {
      const newItem = update(data, generateUpdateObjectForLevel(data, otherItemData[0].level));
      updateItems[trace.length - 1] = {
        $splice: [[index, 1]],
        [index - direction]: {
          data: { $splice: [[direction === 1 ? Number.MAX_VALUE : 0, 0, newItem]] },
        },
      };
    } else {
      updateItems[trace.length - 1] = {
        $splice: [
          [index, 1],
          [index - direction, 0, data],
        ],
      };
    }
  } else {
    const { index: indexOfParent } = trace[1];
    const newItem = update(data, generateUpdateObjectForLevel(data, parent.level));

    updateItems[trace.length - 1] = { $splice: [[index, 1]] };
    updateItems[trace.length - 2] = {
      $splice: [[indexOfParent + (direction === 1 ? 0 : 1), 0, newItem]],
    };

    if (parent.data.length <= 1) groupIdToRemoveBracket = parent.id;
  }

  const updateObject = generateUpdateObject(trace, { updateItems }, trace.length - 1);
  const newRules = update(rules, updateObject);

  if (groupIdToRemoveBracket !== null) {
    return ungroupRules(newRules, groupIdToRemoveBracket);
  }

  return updateMaxLevelInside(newRules);
};
