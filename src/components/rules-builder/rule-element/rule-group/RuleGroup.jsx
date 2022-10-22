/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import settings from '../../../../settings';

import { Close } from '@carbon/icons-react';
import classNames from 'classnames';
import map from 'lodash/map';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import {useTranslation} from '../../../../translation';
import RulesBuilderContext from '../../RulesBuilderContext';
import { Button } from '@carbon/react';

const { prefix } = settings;
const defaultClassName = `${prefix}--rule-element--group`;

const RuleGroup = ({
  onAddNewRule,
  onConjunctionChange,
  onCreateGroup,
  onDeleteRule,
  onDuplicate,
  onInsertNewRule,
  onMoveDown,
  onMoveUp,
  onRemoveBracket,
  onCriteriaChange,
  onRuleChange,
  rule,
  RuleElement,
}) => {
  const { t } = useTranslation();
  const { customLabels, maxOperands, isReadOnly, totalOperands } = useContext(RulesBuilderContext);

  const addNewRuleButtonLabel = customLabels.addNewRule || t('Add new rule');

  const itemsOrder = useMemo(() => map(rule.data, 'id'), [rule]);

  const handleAddNewRule = useCallback(() => onAddNewRule(rule.id), [onAddNewRule, rule.id]);

  const handleRemoveBracket = useCallback(() => onRemoveBracket(rule.id), [
    onRemoveBracket,
    rule.id,
  ]);

  const { setNodeRef } = useDroppable({
    id: rule.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames(`${defaultClassName}`, {
        [`${defaultClassName}--readonly`]: isReadOnly,
      })}
    >
      {!isReadOnly && (
        <button
          aria-label={t('Rule bracket')}
          className={`${defaultClassName}--bracket`}
          data-testid="rule-bracket"
          onClick={handleRemoveBracket}
          tabIndex={0}
          type="button"
        >
          <div className={`${defaultClassName}--bracket--remove-btn`}>
            <Close size={16} className={`${defaultClassName}--bracket--remove-btn--icon`} />
          </div>
        </button>
      )}
      <SortableContext items={itemsOrder} strategy={verticalListSortingStrategy}>
        {rule.data.map((item, index, arr) => (
          <RuleElement
            key={item.id}
            conjunction={rule.conjunction}
            isFirst={!index}
            onAddNewRule={onAddNewRule}
            onConjunctionChange={onConjunctionChange}
            onCreateGroup={onCreateGroup}
            onCriteriaChange={onCriteriaChange}
            onDeleteRule={onDeleteRule}
            onDuplicate={onDuplicate}
            onInsertNewRule={onInsertNewRule}
            onMoveDown={onMoveDown}
            onMoveUp={onMoveUp}
            onRemoveBracket={onRemoveBracket}
            onRuleChange={onRuleChange}
            rule={item}
            siblingCount={arr.length - 1}
          />
        ))}
      </SortableContext>
      {!isReadOnly && maxOperands > totalOperands && (
        <Button
          className={`${prefix}--rules-builder--add-btn`}
          hasIconOnly
          iconDescription={addNewRuleButtonLabel}
          onClick={handleAddNewRule}
          preventDefaultOnMouseDown
          size="small"
          tooltipAlignment="center"
          tooltipPosition="bottom"
        >
          +
        </Button>
      )}
    </div>
  );
};

const RulePropType = {
  key: PropTypes.string,
};

RulePropType.data = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.arrayOf(PropTypes.shape(RulePropType)),
]);

RuleGroup.propTypes = {
  onAddNewRule: PropTypes.func,
  onConjunctionChange: PropTypes.func,
  onCreateGroup: PropTypes.func,
  onCriteriaChange: PropTypes.func,
  onDeleteRule: PropTypes.func,
  onDuplicate: PropTypes.func,
  onInsertNewRule: PropTypes.func,
  onMoveDown: PropTypes.func,
  onMoveUp: PropTypes.func,
  onRemoveBracket: PropTypes.func,
  onRuleChange: PropTypes.func,
  rule: PropTypes.shape(RulePropType).isRequired,
  RuleElement: PropTypes.func.isRequired,
};

RuleGroup.defaultProps = {
  onAddNewRule: noop,
  onConjunctionChange: noop,
  onCreateGroup: noop,
  onCriteriaChange: noop,
  onDeleteRule: noop,
  onDuplicate: noop,
  onInsertNewRule: noop,
  onMoveDown: noop,
  onMoveUp: noop,
  onRemoveBracket: noop,
  onRuleChange: noop,
};

export default RuleGroup;
