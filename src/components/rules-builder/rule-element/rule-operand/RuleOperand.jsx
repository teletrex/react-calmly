/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import noop from 'lodash/noop';
import settings from '../../../../settings';

import {
  TextIndentLess,
  TextIndentMore,
  SubtractAlt,
  Draggable,
  ErrorFilled,
} from '@carbon/icons-react';

import classNames from 'classnames';

import RulesBuilderContext from '../../RulesBuilderContext';
import { useTranslation } from '../../../../translation';
import RuleContainer from '../../rules/components/RuleContainer';

import CriteriaDropdown from './criteria-dropdown';
import RuleElementMenu from './rule-element-menu';

const { prefix } = settings;
const defaultClassName = `${prefix}--rule-element--item`;

const RuleOperand = ({
  hideDeleteBtn,
  isDragging,
  isOnlyElement,
  isFirst,
  isLast,
  listeners,
  onCreateGroup,
  onDeleteRule,
  onDuplicate,
  onMoveDown,
  onMoveUp,
  onRemoveBracket,
  onCriteriaChange,
  onRuleChange,
  onTimeframeChange,
  rule,
}) => {
  const { t } = useTranslation();
  const {
    maxDepth,
    isLight,
    isReadOnly,
    customLabels: { criteriaDropdownLabel = '' },
  } = useContext(RulesBuilderContext);

  const { data: ruleComponentData = {}, errorMessage } = rule;
  const { RuleComponent, ruleConfig, ruleData, ruleTimeframe } = ruleComponentData || {};

  const timeframe = isNull(ruleTimeframe)
    ? {}
    : {
        data: ruleTimeframe,
        onChange: onTimeframeChange,
      };

  const handleRemoveBracket = useCallback(() => onRemoveBracket(rule.id), [
    onRemoveBracket,
    rule.id,
  ]);

  const handleDeleteRule = useCallback(() => onDeleteRule(rule.id), [onDeleteRule, rule.id]);

  const handleCreateGroup = useCallback(() => {
    onCreateGroup(rule.id);
  }, [onCreateGroup, rule.id]);

  const handleCriteriaChange = useCallback(criteriaKey => onCriteriaChange(rule.id, criteriaKey), [
    onCriteriaChange,
    rule.id,
  ]);

  const handleDuplicate = useCallback(() => onDuplicate(rule.id), [onDuplicate, rule.id]);

  const handleMoveUp = useCallback(() => onMoveUp(rule.id), [onMoveUp, rule.id]);

  const handleMoveDown = useCallback(() => onMoveDown(rule.id), [onMoveDown, rule.id]);

  const renderDragHandler = () => (
    <button
      {...listeners}
      aria-label={t('Draggable item')}
      className={`${defaultClassName}--draggable-btn`}
      type="button"
    >
      <Draggable size={16} className={`${defaultClassName}--btn--icon`} />
    </button>
  );

  const renderCriteriaDropdown = () => {
    if (ruleConfig?.disableCriteriaReselect) {
      return null;
    }

    return (
      <CriteriaDropdown
        className={`${defaultClassName}--criteria-dropdown`}
        label={criteriaDropdownLabel}
        onChange={handleCriteriaChange}
        selectedCriteriaKey={rule.criteriaKey}
      />
    );
  };

  return (
    <>
      <div
        className={classNames(`${defaultClassName}`, {
          [`${defaultClassName}--error`]: !!errorMessage,
          [`${defaultClassName}--readonly`]: isReadOnly,
          [`${defaultClassName}--dragging`]: isDragging,
          [`${defaultClassName}--light`]: isLight,
        })}
      >
        {renderDragHandler()}
        <div className={`${defaultClassName}--content`}>
          {renderCriteriaDropdown()}
          {RuleComponent && ruleConfig && (
            <RuleContainer
              config={ruleConfig}
              data={ruleData}
              onRuleChange={onRuleChange}
              ruleComponent={RuleComponent}
              timeframe={timeframe}
            />
          )}
        </div>

        <div className={`${defaultClassName}--controls`}>
          {isOnlyElement && rule.level > 1 && (
            <button
              aria-label={t('Remove bracket')}
              className={classNames(
                `${defaultClassName}--overflow-menu`,
                `${prefix}--overflow-menu`
              )}
              onClick={handleRemoveBracket}
              type="button"
            >
              <TextIndentLess size={16} className={`${defaultClassName}--btn--icon`} />
            </button>
          )}
          {!isOnlyElement && rule.level < maxDepth && (
            <button
              aria-label={t('Create group')}
              className={classNames(
                `${defaultClassName}--overflow-menu`,
                `${prefix}--overflow-menu`
              )}
              onClick={handleCreateGroup}
              type="button"
            >
              <TextIndentMore size={16} className={`${defaultClassName}--btn--icon`} />
            </button>
          )}
          {!hideDeleteBtn && (
            <button
              aria-label={t('Delete rule')}
              className={classNames(
                `${defaultClassName}--overflow-menu`,
                `${prefix}--overflow-menu`
              )}
              data-testid="delete-rule"
              onClick={handleDeleteRule}
              type="button"
            >
              <SubtractAlt size={16} className={`${defaultClassName}--btn--icon`} />
            </button>
          )}
          <RuleElementMenu
            className={`${defaultClassName}--overflow-menu`}
            duplicateDisabled={!rule.criteriaKey}
            moveDownDisabled={isLast && rule.level === 1}
            moveUpDisabled={isFirst && rule.level === 1}
            onDuplicate={handleDuplicate}
            onMoveDown={handleMoveDown}
            onMoveUp={handleMoveUp}
          />
          {errorMessage && <ErrorFilled size={16} className={`${defaultClassName}--error-icon`} />}
        </div>
      </div>
      {errorMessage && <p className={`${defaultClassName}--error-text`}>{errorMessage}</p>}
    </>
  );
};

const RulePropType = {
  criteriaKey: PropTypes.string,
  id: PropTypes.string,
  level: PropTypes.number.isRequired,
};

RulePropType.data = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.arrayOf(PropTypes.shape(RulePropType)),
]);

RuleOperand.propTypes = {
  hideDeleteBtn: PropTypes.bool,
  isDragging: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  isOnlyElement: PropTypes.bool,
  listeners: PropTypes.shape({ onKeyDown: PropTypes.func, onPointerDown: PropTypes.func }),
  onCreateGroup: PropTypes.func,
  onCriteriaChange: PropTypes.func,
  onDeleteRule: PropTypes.func,
  onDuplicate: PropTypes.func,
  onMoveDown: PropTypes.func,
  onMoveUp: PropTypes.func,
  onRemoveBracket: PropTypes.func,
  onRuleChange: PropTypes.func,
  onTimeframeChange: PropTypes.func,
  rule: PropTypes.shape(RulePropType).isRequired,
};

RuleOperand.defaultProps = {
  hideDeleteBtn: false,
  isDragging: false,
  isFirst: false,
  isLast: false,
  isOnlyElement: false,
  listeners: {},
  onCreateGroup: noop,
  onCriteriaChange: noop,
  onDeleteRule: noop,
  onDuplicate: noop,
  onMoveDown: noop,
  onMoveUp: noop,
  onRemoveBracket: noop,
  onRuleChange: noop,
  onTimeframeChange: noop,
};

export default RuleOperand;
