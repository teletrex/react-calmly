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

import RulesBuilderContext from '../../../RulesBuilderContext';
import { PERIODS, PROPTYPES, VALIDATION_MESSAGES } from '../../constants';
import { getPrefixedClasses, useFormValidation } from '../../helpers';

import { NumberValue, PeriodDropdown } from './components';

const MIN_VALUE = 1;

const Within = ({ id, onValueChange, operator, value }) => {
  const { period: periodName, value: initialValue } = value;
  const [period, setPeriod] = useState(PERIODS.find(p => p.value === periodName));
  const { isReadOnly } = useContext(RulesBuilderContext);

  const validationSchema = Yup.object().shape({
    [id]: Yup.number().min(MIN_VALUE, VALIDATION_MESSAGES.min),
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
      [id]: initialValue,
    },
    validationSchema,
    onSubmit: values => {
      if (!isEqual(values, initialValues)) {
        onValueChange({
          value: values[id],
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
      value: values[id],
      period: selectedItem.value,
    });
  };

  const handleWithinValueChange = inputValue => {
    const {
      imaginaryTarget: { value: newValue },
    } = inputValue;
    setFieldValue(id, +newValue);
  };

  const handleInputBlur = e => {
    handleBlur(e);
    submitForm();
  };

  if (isReadOnly) {
    return (
      <>
        <span className={getPrefixedClasses(['--text-space-left', '--rule-value-readonly'])}>
          {values[id]}
        </span>
        <span className={getPrefixedClasses(['--text-space-left', '--rule-value-readonly'])}>
          {period.label}
        </span>
      </>
    );
  }

  return (
    <div className={getPrefixedClasses('--input-field-container')} data-testid="input-field-within">
      <NumberValue
        errors={errors}
        fieldName={id}
        id={id}
        onBlur={handleInputBlur}
        onChange={handleWithinValueChange}
        value={initialValue}
      />
      <PeriodDropdown idPrefix={id} onChange={handlePeriodChange} value={period} />
    </div>
  );
};

Within.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  value: PropTypes.shape({
    period: PropTypes.string,
    value: PropTypes.number,
  }),
};

Within.defaultProps = {
  operator: null,
  value: {
    period: PERIODS[0].value,
    value: undefined,
  },
};

export default Within;
