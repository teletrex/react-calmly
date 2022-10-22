/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import noop from 'lodash/noop';
import settings from '../../../settings';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useTranslation } from '../../../translation';
import RulesBuilderContext from '../RulesBuilderContext';

import RuleConjunction from './rule-conjunction';
import RuleGroup from './rule-group';
import RuleOperand from './rule-operand';

const { prefix } = settings;
const defaultClassName = `${prefix}--rule-element`;

const RuleElement = ({
  conjunction,
  hideDeleteBtn,
  isFirst,
  isLast,
  onAddNewRule,
  onConjunctionChange,
  onCreateGroup,
  onCriteriaChange,
  onDeleteRule,
  onDuplicate,
  onInsertNewRule,
  onMoveDown,
  onMoveUp,
  onRemoveBracket,
  onRuleChange,
  onTimeframeChange,
  rule,
  siblingCount,
}) => {
  const { isLight, isReadOnly, maxDepth } = useContext(RulesBuilderContext);

  const { t } = useTranslation();

  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: rule.id,
    transition: null,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleRuleChange = ruleData => {
    onRuleChange(rule.id, ruleData);
  };

  const handleTimeframeChange = ruleTimeframe => {
    onTimeframeChange(rule.id, ruleTimeframe);
  };

  const handleConjunctionChange = newConjunction => onConjunctionChange(rule.id, newConjunction);

  const containerClasses = classNames(`${defaultClassName}-container`, {
    [`${defaultClassName}-container--light`]: isLight,
  });

  return (
    <div>
      {!isFirst && (
        <RuleConjunction
          disableBracketConjunction={siblingCount <= 1 || rule.level >= maxDepth}
          initialConjunction={conjunction}
          onConjunctionChange={handleConjunctionChange}
        />
      )}
      {isArray(rule.data) ? (
        <RuleGroup
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
          rule={rule}
          RuleElement={RuleElement}
        />
      ) : (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          className={containerClasses}
          data-testid="rule-container"
        >
          <RuleOperand
            hideDeleteBtn={hideDeleteBtn}
            isFirst={isFirst}
            isLast={isLast}
            isOnlyElement={!siblingCount}
            listeners={listeners}
            onCreateGroup={onCreateGroup}
            onCriteriaChange={onCriteriaChange}
            onDeleteRule={onDeleteRule}
            onDuplicate={onDuplicate}
            onMoveDown={onMoveDown}
            onMoveUp={onMoveUp}
            onRemoveBracket={onRemoveBracket}
            onRuleChange={handleRuleChange}
            onTimeframeChange={handleTimeframeChange}
            rule={rule}
          />
          {!isReadOnly && (isDragging || rule.isForDrag) && (
            <div
              className={`${defaultClassName}-container ${defaultClassName}__screen ${defaultClassName}__drop`}
            >
              <span>{t('Drop here')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const RulePropType = {
  id: PropTypes.string,
  level: PropTypes.number.isRequired,
  maxLevelInside: PropTypes.number.isRequired,
};

RulePropType.data = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.arrayOf(PropTypes.shape(RulePropType)),
]);

RuleElement.propTypes = {
  conjunction: PropTypes.string.isRequired,
  hideDeleteBtn: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
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
  onTimeframeChange: PropTypes.func,
  rule: PropTypes.shape(RulePropType).isRequired,
  siblingCount: PropTypes.number,
};

RuleElement.defaultProps = {
  hideDeleteBtn: false,
  isFirst: false,
  isLast: false,
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
  onTimeframeChange: noop,
  siblingCount: 0,
};

export default RuleElement;
