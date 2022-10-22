/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';

import { NumberInput} from '@carbon/react';
import {useTranslation} from '../../../../../../translation';

const NumberValue = ({ errors, fieldName, id, minValue, onBlur, onChange, value }) => {
  const { t } = useTranslation();
  const inputProps = {
    id,
    min: minValue,
    name: fieldName,
    onBlur,
    onChange,
    value,
  };

  return (
    <NumberInput
      {...inputProps}
      allowEmpty
      invalid={!!errors[fieldName]}
      invalidText={errors[fieldName]}
      label=""
      placeholder={t('Enter value')}
    />
  );
};

NumberValue.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  fieldName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  minValue: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

NumberValue.defaultProps = {
  minValue: 0,
  value: undefined,
};

export default NumberValue;
