/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import * as Yup from 'yup';

// import NumberInput from '../../../../number-input';
import { NumberInput } from '@carbon/react';
import { useTranslation} from  '../../../../../translation';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { PROPTYPES, VALIDATION_MESSAGES } from '../../constants';
import { getPrefixedClasses, useFormValidation } from '../../helpers';

const defaultInputProps = {
  DAY_IS: {
    min: 1,
    max: 31,
  },
  MONTH_IS: {
    min: 1,
    max: 12,
  },
  YEAR_IS: {
    min: 1900,
    max: 3000,
  },
};

const getValueSchema = periodValue => {
  const { max, min } = defaultInputProps[periodValue];
  return Yup.number()
    .min(min, VALIDATION_MESSAGES.min)
    .max(max, VALIDATION_MESSAGES.max);
};

const PeriodEqual = ({ id, onValueChange, operator, value }) => {
  const { t } = useTranslation();
  const { isReadOnly } = useContext(RulesBuilderContext);

  const validationSchema = Yup.object().shape({
    [id]: getValueSchema(operator.value),
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
      [id]: value,
    },
    validationSchema,
    onSubmit: values => {
      if (!isEqual(values, initialValues)) {
        onValueChange(values[id]);
      }
    },
  });

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operator]);

  const handleValueChange = ({ imaginaryTarget: { value: newValue, id: inputId } }) => {
    setFieldValue(inputId, +newValue);
  };

  const handleInputBlur = e => {
    handleBlur(e);
    submitForm();
  };

  if (isReadOnly) {
    return (
      <span className={getPrefixedClasses(['--text-space-left', '--rule-value-readonly'])}>
        {values[id]}
      </span>
    );
  }

  return (
    <NumberInput
      allowEmpty
      data-testid="date-rule-period-equal"
      id={id}
      invalid={!!errors[id]}
      invalidText={errors[id]}
      label=""
      name={id}
      onBlur={handleInputBlur}
      onChange={handleValueChange}
      placeholder={t('Enter value')}
      value={value}
    />
  );
};

PeriodEqual.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR.isRequired,
  value: PropTypes.number,
};

PeriodEqual.defaultProps = {
  value: undefined,
};

export default PeriodEqual;
