/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import isEqual from 'lodash/isEqual';

import { useTranslation } from '../../../../../translation';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { NumberValue, PeriodDropdown } from '../../components/inputFields/components';
import { PERIODS, PROPTYPES, VALIDATION_MESSAGES } from '../../constants';
import { getPrefixedClasses, useFormValidation } from '../../helpers';

const MIN_VALUE1 = 0;
const MIN_VALUE2 = 1;

const WithinRange = ({ id, onValueChange, operator, value: { value, period: periodName } }) => {
  const INPUT_ID_1 = `${id}-1`;
  const INPUT_ID_2 = `${id}-2`;

  const RANGE_VALIDATION = {
    [INPUT_ID_1]: VALIDATION_MESSAGES.rangeFirst,
    [INPUT_ID_2]: VALIDATION_MESSAGES.rangeSecond,
  };

  const { t } = useTranslation();
  const { isReadOnly } = useContext(RulesBuilderContext);
  const [period, setPeriod] = useState(PERIODS.find(p => p.value === periodName));
  const [lastTouchedInput, setLastTouchedInput] = useState(null);

  const validateValues = fieldValues => {
    if (fieldValues[INPUT_ID_1] >= fieldValues[INPUT_ID_2]) {
      return { [lastTouchedInput]: t(RANGE_VALIDATION[lastTouchedInput]) };
    }

    return {};
  };

  const validationSchema = Yup.object().shape({
    [INPUT_ID_1]: Yup.number().min(MIN_VALUE1, VALIDATION_MESSAGES.min),
    [INPUT_ID_2]: Yup.number().min(MIN_VALUE2, VALIDATION_MESSAGES.min),
  });

  const {
    errors,
    handleBlur,
    initialValues,
    resetForm,
    setFieldValue,
    submitForm,
    values,
  } = useFormValidation({
    initialValues: {
      [INPUT_ID_1]: value[0],
      [INPUT_ID_2]: value[1],
    },
    validationSchema,
    validate: validateValues,
    onSubmit: values => {
      if (!isEqual(values, initialValues)) {
        onValueChange({
          value: [values[INPUT_ID_1], values[INPUT_ID_2]],
          period: period?.value,
        });
      }
    },
  });

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operator]);

  const handlePeriodChange = newPeriod => {
    const { selectedItem } = newPeriod;
    setPeriod(selectedItem);

    onValueChange({
      value: [values[INPUT_ID_1], values[INPUT_ID_2]],
      period: selectedItem.value,
    });
  };

  const handleValueChange = ({ imaginaryTarget: { value: newValue, id: inputId } }) => {
    setLastTouchedInput(inputId);
    setFieldValue(inputId, +newValue);
  };

  const handleInputBlur = e => {
    handleBlur(e);
    submitForm();
  };

  if (isReadOnly) {
    const leftSpacingClass = getPrefixedClasses('--text-space-left');

    return (
      <span className={getPrefixedClasses('--rule-value-readonly')}>
        <span className={leftSpacingClass}>{values[INPUT_ID_1]}</span>
        <span className={leftSpacingClass}>to</span>
        <span className={leftSpacingClass}>{values[INPUT_ID_2]}</span>
        <span className={leftSpacingClass}>{period.label}</span>
      </span>
    );
  }

  return (
    <div
      className={getPrefixedClasses('--input-field-container')}
      data-testid="date-rule-range-of-last"
    >
      <NumberValue
        errors={errors}
        fieldName={INPUT_ID_1}
        id={INPUT_ID_1}
        onBlur={handleInputBlur}
        onChange={handleValueChange}
        value={value[0]}
      />
      <span
        className={getPrefixedClasses(['--text-space-left', '--text-space-right', '--rule-text'])}
      >
        to
      </span>

      <NumberValue
        errors={errors}
        fieldName={INPUT_ID_2}
        id={INPUT_ID_2}
        onBlur={handleInputBlur}
        onChange={handleValueChange}
        value={value[1]}
      />
      <PeriodDropdown idPrefix={id} onChange={handlePeriodChange} value={period} />
    </div>
  );
};

WithinRange.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  value: PropTypes.shape({
    period: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.number),
  }),
};

WithinRange.defaultProps = {
  operator: null,
  value: {
    period: PERIODS[0].value,
    value: [],
  },
};

export default WithinRange;
