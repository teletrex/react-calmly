/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import NumberInput from '../../../../number-input';
import { NumberInput} from '@carbon/react';
import  {useTranslation}  from '../../../../../translation';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { PROPTYPES } from '../../constants';
import { getPrefixedClasses } from '../../helpers';

const NumberValue = ({ id, onValueChange, operator, placeholder, value }) => {
  const { t } = useTranslation();
  const { isReadOnly } = useContext(RulesBuilderContext);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [operator, value]);

  const handleBlur = ({ target }) => {
    const newValue = Number(target?.value);

    if (newValue !== value) {
      onValueChange(newValue);
    }
  };

  const handleOnChange = ({ imaginaryTarget }) => {
    setCurrentValue(Number(imaginaryTarget?.value));
  };

  if (isReadOnly) {
    return (
      <span className={getPrefixedClasses(['--rule-value-readonly', '--text-space-left'])}>
        {value}
      </span>
    );
  }

  return (
    <NumberInput
      allowEmpty
      id={id}
      label=""
      name={id}
      onBlur={handleBlur}
      onChange={handleOnChange}
      placeholder={placeholder || t('Enter value')}
      value={currentValue}
    />
  );
};

NumberValue.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  placeholder: PropTypes.string,
  value: PropTypes.number,
};

NumberValue.defaultProps = {
  operator: null,
  placeholder: '',
  value: undefined,
};

export default NumberValue;
