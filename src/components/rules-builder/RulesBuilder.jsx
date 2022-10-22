/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import classNames from 'classnames';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import map from 'lodash/map';
import noop from 'lodash/noop';
import  settings  from '../../settings';

// import Button from '../button';
import { Button  } from '@carbon/react';
import { useTranslation } from '../../translation';

import { CustomRule, DateRule, NumberRule, SelectRule, StringRule } from './rules';
import { CONJUNCTION_OR, CONJUNCTION_AND, RULE_TYPES } from './constants';
import {
  addNewRule,
  findRule,
  insertNewRule,
  updateRuleCriteria,
  changeConjunction,
  changeRuleData,
  changeRuleTimeframe,
  groupRules,
  deleteRule,
  ungroupRules,
  duplicateRule,
  moveRule,
} from './helpers/rules';
import generateRulesOutput from './utils/generateRulesOutput';
import composeRules from './utils/composeRules';
import RuleElement from './rule-element';
import RuleOperand from './rule-element/rule-operand/RuleOperand';
import RulesBuilderContext from './RulesBuilderContext';

const { prefix } = settings;
const defaultClassName = `${prefix}--rules-builder`;

const ruleTypesMap = {
  [RULE_TYPES.custom]: CustomRule,
  [RULE_TYPES.date]: DateRule,
  [RULE_TYPES.number]: NumberRule,
  [RULE_TYPES.select]: SelectRule,
  [RULE_TYPES.string]: StringRule,
};

const defaultRuleConfig = {
  data: {},
  operators: [],
  placeholder: {},
};

const RulesBuilder = ({
  customLabels,
  initialRules,
  isLight,
  isReadOnly,
  maxDepth,
  maxOperands,
  oneConjunctionMode,
  onRulesChange,
  criteriaConfig,
  criteriaDropdown,
}) => {
  const { t } = useTranslation();
  const [rules, setRules] = useState({});
  const [activeRuleId, setActiveRuleId] = useState(null);
  const ruleBuildersClasses = classNames(defaultClassName, {
    [`${defaultClassName}--light`]: isLight,
  });

  const createRule = useCallback(
    (criteriaKey, data = {}, timeframeData = {}) => {
      const { type, hasTimeframe } = criteriaConfig[criteriaKey] || {};
      const ruleConfig = {
        ...defaultRuleConfig,
        ...criteriaConfig[criteriaKey],
        type,
      };

      const ruleData = {
        ...data,
        ...(ruleConfig.disableCriteriaReselect && {
          operator: ruleConfig?.operators[0]?.value || data?.operator,
        }),
      };

      return {
        RuleComponent: ruleTypesMap[type] || null,
        ruleConfig,
        ruleData,
        ruleTimeframe: hasTimeframe ? timeframeData : null,
      };
    },
    [criteriaConfig]
  );

  useEffect(() => {
    setRules(composeRules(initialRules, createRule, oneConjunctionMode));
  }, [initialRules, oneConjunctionMode, createRule]);

  const addNewRuleButtonLabel = customLabels.addNewRule || t('Add new rule');
  const isInitialState = rules.data?.length === 1 && !rules.data[0].data;
  const itemsOrder = useMemo(() => map(rules.data, 'id'), [rules]);

  const handleRulesChange = useCallback(
    newRules => {
      onRulesChange(generateRulesOutput(newRules));
    },
    [onRulesChange]
  );

  const updateRule = useCallback(
    (currentRules, changes) => {
      const newRules = update(currentRules, changes);
      handleRulesChange(newRules);
      return newRules;
    },
    [handleRulesChange]
  );

  const handleCriteriaChange = useCallback(
    (id, criteriaKey) => {
      setRules(currentRules => {
        const rule = findRule(currentRules, id);

        if (rule.data.criteriaKey === criteriaKey) {
          return currentRules;
        }

        return updateRule(currentRules, updateRuleCriteria(rule, criteriaKey, createRule));
      });
    },
    [createRule, updateRule]
  );

  const handleInsertNewRule = useCallback(
    (id, ruleToInsert, direction) => {
      setRules(currentRules => {
        const rule = findRule(currentRules, id);

        if (!rule.data) {
          return currentRules;
        }

        return updateRule(currentRules, insertNewRule(rule, ruleToInsert, direction));
      });
    },
    [updateRule]
  );

  const handleAddNewRule = useCallback(
    groupId => {
      setRules(currentRules => updateRule(currentRules, addNewRule(currentRules, groupId)));
    },
    [updateRule]
  );

  const handleDeleteRule = useCallback(
    ruleId =>
      setRules(currentRules => {
        const newRules = deleteRule(currentRules, ruleId);
        handleRulesChange(newRules);
        return newRules;
      }),
    [handleRulesChange]
  );

  const handleDuplicate = useCallback(
    ruleId => {
      setRules(currentRules => {
        const rule = findRule(currentRules, ruleId);

        if (!rule.data) {
          return currentRules;
        }

        return updateRule(currentRules, duplicateRule(rule, createRule));
      });
    },
    [updateRule, createRule]
  );

  const handleAddToTopLevel = useCallback(() => {
    setRules(currentRules => updateRule(currentRules, addNewRule(currentRules, currentRules.id)));
  }, [updateRule]);

  const handleConjunctionChange = useCallback(
    (ruleId, conjunction) => {
      setRules(currentRules => {
        const rule = findRule(currentRules, ruleId);

        if (rule.trace[0].index === 0) {
          return currentRules;
        }

        return updateRule(currentRules, changeConjunction(rule, conjunction));
      });
    },
    [updateRule]
  );

  const handleRuleChange = useCallback(
    (ruleId, ruleData) => {
      setRules(currentRules => {
        return updateRule(currentRules, changeRuleData(currentRules, ruleId, ruleData));
      });
    },
    [updateRule]
  );

  const handleTimeframeChange = useCallback(
    (ruleId, ruleData) => {
      setRules(currentRules => {
        return updateRule(currentRules, changeRuleTimeframe(currentRules, ruleId, ruleData));
      });
    },
    [updateRule]
  );

  const handleCreateGroup = useCallback(
    ruleId => {
      setRules(currentRules =>
        updateRule(currentRules, groupRules(currentRules, ruleId, oneConjunctionMode))
      );
    },
    [oneConjunctionMode, updateRule]
  );

  const handleRemoveBracket = useCallback(
    groupId =>
      setRules(currentRules => {
        const newRules = ungroupRules(currentRules, groupId);
        handleRulesChange(newRules);
        return newRules;
      }),
    [handleRulesChange]
  );

  const handleMoveUp = useCallback(
    ruleId => {
      setRules(currentRules => {
        const newRules = moveRule(currentRules, ruleId, 1);
        handleRulesChange(newRules);
        return newRules;
      });
    },
    [handleRulesChange]
  );

  const handleMoveDown = useCallback(
    ruleId => {
      setRules(currentRules => {
        const newRules = moveRule(currentRules, ruleId, -1);
        handleRulesChange(newRules);
        return newRules;
      });
    },
    [handleRulesChange]
  );

  const handleDragStart = ({ active }) => {
    setActiveRuleId(active.id);
  };

  const handleDragOver = useCallback(({ active, delta, over }) => {
    setRules(currentRules => {
      if (active.id === over.id) {
        return currentRules;
      }

      const activeRule = findRule(currentRules, active.id);
      const overRule = findRule(currentRules, over.id);

      if (!activeRule.data || !overRule.data) {
        return currentRules;
      }

      const rulesWithoutActive = deleteRule(currentRules, active.id);

      const direction = delta.y > 0 ? 1 : -1;
      return update(
        rulesWithoutActive,
        insertNewRule(rulesWithoutActive, overRule.data.id, activeRule.data, direction)
      );
    });
  }, []);

  const handleDragEnd = () => {
    setActiveRuleId(null);
    handleRulesChange(rules);
  };

  useEffect(() => {
    if (rules.data?.length === 0) {
      handleAddToTopLevel();
    }
  }, [handleAddToTopLevel, rules.data]);

  const renderAddNewRuleButton = () => {
    if (isReadOnly || maxOperands <= rules.operands) {
      return null;
    }

    return (
      <Button
        className={`${defaultClassName}--add-btn`}
        hasIconOnly
        iconDescription={addNewRuleButtonLabel}
        onClick={handleAddToTopLevel}
        preventDefaultOnMouseDown
        size="small"
        tooltipAlignment="center"
        tooltipPosition="right"
      >
        +
      </Button>
    );
  };

  const renderDragOverlay = () => {
    const { data } = findRule(rules, activeRuleId);

    if (!data) {
      return null;
    }

    return (
      <DragOverlay>
        <RuleOperand isDragging rule={findRule(rules, activeRuleId).data} />
      </DragOverlay>
    );
  };

  return (
    <RulesBuilderContext.Provider
      value={{
        criteriaDropdown,
        criteriaConfig,
        isLight,
        oneConjunctionMode,
        maxDepth,
        maxOperands,
        customLabels,
        isReadOnly,
        totalOperands: rules.operands,
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
      >
        <div className={ruleBuildersClasses}>
          <SortableContext items={itemsOrder} strategy={verticalListSortingStrategy}>
            {rules.data &&
              rules.data.map((rule, index, arr) => (
                <RuleElement
                  key={rule.id}
                  conjunction={rules.conjunction}
                  hideDeleteBtn={isInitialState}
                  isFirst={!index}
                  isLast={index === arr.length - 1}
                  onAddNewRule={handleAddNewRule}
                  onConjunctionChange={handleConjunctionChange}
                  onCreateGroup={handleCreateGroup}
                  onCriteriaChange={handleCriteriaChange}
                  onDeleteRule={handleDeleteRule}
                  onDuplicate={handleDuplicate}
                  onInsertNewRule={handleInsertNewRule}
                  onMoveDown={handleMoveDown}
                  onMoveUp={handleMoveUp}
                  onRemoveBracket={handleRemoveBracket}
                  onRuleChange={handleRuleChange}
                  onTimeframeChange={handleTimeframeChange}
                  rule={rule}
                  siblingCount={arr.length - 1}
                />
              ))}
            {renderAddNewRuleButton()}
          </SortableContext>
          {renderDragOverlay()}
        </div>
      </DndContext>
    </RulesBuilderContext.Provider>
  );
};

const RulePropType = PropTypes.shape({
  conjunction: PropTypes.string,
  criteriaKey: PropTypes.string,
});

RulePropType.data = PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(RulePropType)]);

RulesBuilder.propTypes = {
  criteriaConfig: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  criteriaDropdown: PropTypes.arrayOf(PropTypes.object).isRequired,
  customLabels: PropTypes.shape({
    addNewRule: PropTypes.string,
    criteriaDropdownLabel: PropTypes.string,
  }),
  initialRules: RulePropType,
  isLight: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  maxDepth: PropTypes.number,
  maxOperands: PropTypes.number,
  oneConjunctionMode: PropTypes.oneOf([CONJUNCTION_AND.id, CONJUNCTION_OR.id]),
  onRulesChange: PropTypes.func,
};

RulesBuilder.defaultProps = {
  customLabels: {},
  initialRules: {
    conjunction: CONJUNCTION_AND.id,
    data: [],
  },
  isLight: false,
  isReadOnly: false,
  maxDepth: Infinity,
  maxOperands: Infinity,
  oneConjunctionMode: null,
  onRulesChange: noop,
};

export default RulesBuilder;
