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

import { Dropdown } from '@carbon/react';

import { PERIODS, PROPTYPES, VALIDATION_MESSAGES, WHEN_RELATIONS } from '../../constants';
import RulesBuilderContext from '../../../RulesBuilderContext';
// import { useTranslation } from '../../../../translation';
import { getPrefixedClasses, useFormValidation } from '../../helpers';

import { NumberValue, PeriodDropdown } from './components';

const MIN_VALUE = 1;

const WhenRelation = ({ id, onValueChange, operator, value }) => {
  const { t } = useTranslation();
  const { isReadOnly } = useContext(RulesBuilderContext);
  const { period: periodName, whenRelation: whenRelationName, value: initialValue } = value;
  const [period, setPeriod] = useState(PERIODS.find(p => p.value === periodName));
  const [whenRelation, setWhenRelation] = useState(
    WHEN_RELATIONS.find(p => p.value === whenRelationName)
  );

  const handleValueChange = (newValueProps, currentValues) => {
    onValueChange({
      value: currentValues[id],
      period: period?.value,
      whenRelation: whenRelation?.value,
      ...newValueProps,
    });
  };

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
        handleValueChange({ value: values[id] }, values);
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
    handleValueChange({ period: selectedItem.value }, values);
  };

  const handleWhenRelationChange = newRelation => {
    const { selectedItem } = newRelation;
    setWhenRelation(selectedItem);
    handleValueChange({ whenRelation: selectedItem.value }, values);
  };

  const handleRelationValueChange = inputValue => {
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
    const leftSpacingClass = getPrefixedClasses('--text-space-left');

    return (
      <span className={getPrefixedClasses('--rule-value-readonly')}>
        <span className={leftSpacingClass}>{values[id]}</span>
        <span className={leftSpacingClass}>{period.label}</span>
        <span className={leftSpacingClass}>{whenRelation.label}</span>
      </span>
    );
  }

  return (
    <div
      className={getPrefixedClasses('--input-field-container')}
      data-testid="input-field-when-relation"
    >
      <NumberValue
        errors={errors}
        fieldName={id}
        id={id}
        onBlur={handleInputBlur}
        onChange={handleRelationValueChange}
        value={initialValue}
      />
      <PeriodDropdown idPrefix={id} onChange={handlePeriodChange} value={period} />
      <Dropdown
        ariaLabel="when-relation-dropdown"
        id={`${id}--when-relation-dropdown`}
        initialSelectedItem={whenRelation}
        items={WHEN_RELATIONS}
        onChange={handleWhenRelationChange}
        placeholder={t('Select...')}
      />
    </div>
  );
};

WhenRelation.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  value: PropTypes.shape({
    period: PropTypes.string,
    value: PropTypes.number,
    whenRelation: PropTypes.string,
  }),
};

WhenRelation.defaultProps = {
  operator: null,
  value: {
    period: PERIODS[0].value,
    value: undefined,
    whenRelation: WHEN_RELATIONS[0].value,
  },
};

export default WhenRelation;
