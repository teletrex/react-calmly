/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import * as Yup from 'yup';

// import NumberInput from '../../../../number-input';
import {NumberInput } from '@carbon/react';
import  {useTranslation}  from '../../../../../translation';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { PROPTYPES, VALIDATION_MESSAGES } from '../../constants';
import { getPrefixedClasses, useFormValidation } from '../../helpers';

const RangeValues = ({ id, onValueChange, operator, placeholder, value }) => {
  const { t } = useTranslation();
  const { isReadOnly } = useContext(RulesBuilderContext);
  const [lastTouchedInput, setLastTouchedInput] = useState(null);

  const INPUT_ID_1 = `${id}-1`;
  const INPUT_ID_2 = `${id}-2`;

  const RANGE_VALIDATION = {
    [INPUT_ID_1]: VALIDATION_MESSAGES.rangeFirst,
    [INPUT_ID_2]: VALIDATION_MESSAGES.rangeSecond,
  };

  const validateValues = fieldValues => {
    if (fieldValues[INPUT_ID_1] >= fieldValues[INPUT_ID_2]) {
      return { [lastTouchedInput]: t(RANGE_VALIDATION[lastTouchedInput]) };
    }

    return {};
  };

  const validationSchema = Yup.object().shape({
    [INPUT_ID_1]: Yup.number(),
    [INPUT_ID_2]: Yup.number(),
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
    validate: validateValues,
    validationSchema,
    onSubmit: values => {
      if (!isEqual(values, initialValues)) {
        onValueChange([values[INPUT_ID_1], values[INPUT_ID_2]]);
      }
    },
  });

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operator]);

  const handleInputBlur = e => {
    handleBlur(e);
    submitForm();
  };

  const handleValueChange = ({ imaginaryTarget: { value: newValue, id: inputId } }) => {
    setLastTouchedInput(inputId);
    setFieldValue(inputId, +newValue);
  };

  const renderReadOnly = ruleId => (
    <span className={getPrefixedClasses(['--rule-value-readonly', '--text-space-left'])}>
      {values[ruleId]}
    </span>
  );

  const renderNumberInput = (ruleId, initialValue) => (
    <NumberInput
      allowEmpty
      id={ruleId}
      invalid={!!errors[ruleId]}
      invalidText={errors[ruleId]}
      label=""
      name={ruleId}
      onBlur={handleInputBlur}
      onChange={handleValueChange}
      placeholder={placeholder || t('Enter value')}
      value={initialValue}
    />
  );

  if (isReadOnly) {
    return (
      <>
        {renderReadOnly(INPUT_ID_1)}
        <span className={getPrefixedClasses(['--text-space-left', '--text-space-right'])}>to</span>
        {renderReadOnly(INPUT_ID_2)}
      </>
    );
  }

  return (
    <>
      {renderNumberInput(INPUT_ID_1, value[0])}
      {renderNumberInput(INPUT_ID_2, value[1])}
    </>
  );
};

RangeValues.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  placeholder: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.number),
};

RangeValues.defaultProps = {
  operator: null,
  placeholder: '',
  value: [],
};

export default RangeValues;
