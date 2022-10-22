/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from '../../../../translation';
import { getInitialOperator, getPrefixedClasses } from '../helpers';
import { DEFAULT_PROPS, PROPTYPES, VALUES } from '../constants';
import { RULE_INPUT_TYPES } from '../../constants';

import TimeframeOperatorDropdown from './OperatorDropdown';
import { TIMEFRAME_OPERATORS } from './constants';
import { RangeDatePicker, SingleDatePicker, WhenRelation, Within } from './inputFields';

const getTimeframeOutput = (operator, value) => ({ operator, value });

const TimeframeSelector = ({ id: idPrefix, timeframe }) => {
  const { t } = useTranslation();
  const { onChange, data: { operator, value: initialValue } = {} } = timeframe;
  const id = `${idPrefix}--timeframe`;

  const initialTimeframeOperator = getInitialOperator(operator, TIMEFRAME_OPERATORS);

  const [timeframeValue, setTimeframeValue] = useState(initialValue);
  const [timeframeOperator, setTimeframeOperator] = useState(initialTimeframeOperator);

  const handleTimeframeOperatorChange = ({ selectedItem: newOperator }) => {
    const currentValue =
      newOperator.inputType === RULE_INPUT_TYPES.NONE ? VALUES.BLANK : VALUES.UNPROVIDED;

    setTimeframeValue(currentValue);
    setTimeframeOperator(newOperator);
    onChange(getTimeframeOutput(newOperator.value, currentValue));
  };

  const handleTimeframeValueChange = newValue => {
    setTimeframeValue(newValue);
    onChange(getTimeframeOutput(timeframeOperator.value, newValue));
  };

  const renderInputFields = () => {
    const commonProps = {
      onValueChange: handleTimeframeValueChange,
      id,
      operator: timeframeOperator,
      value: timeframeValue,
    };

    switch (timeframeOperator?.inputType) {
      case RULE_INPUT_TYPES.RANGE:
        return <RangeDatePicker {...commonProps} />;

      case RULE_INPUT_TYPES.SINGLE_VALUE:
        return <SingleDatePicker {...commonProps} />;

      case RULE_INPUT_TYPES.WHEN_RELATION:
        return <WhenRelation {...commonProps} />;

      case RULE_INPUT_TYPES.WITHIN_PERIOD:
        return <Within {...commonProps} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={getPrefixedClasses('--timeframe')}
      data-testid="timeframe-selector"
      id={`${id}-container`}
    >
      <TimeframeOperatorDropdown
        id={id}
        label={t('select timeframe')}
        onOperatorChange={handleTimeframeOperatorChange}
        operator={timeframeOperator}
        operators={TIMEFRAME_OPERATORS}
      />
      {renderInputFields()}
    </div>
  );
};

TimeframeSelector.propTypes = {
  id: PropTypes.string.isRequired,
  timeframe: PROPTYPES.TIMEFRAME,
};

TimeframeSelector.defaultProps = {
  timeframe: DEFAULT_PROPS.TIMEFRAME,
};

export default TimeframeSelector;
