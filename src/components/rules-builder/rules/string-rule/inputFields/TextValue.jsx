/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//import TextInput from '../../../../text-input';
import  {useTranslation}  from '../../../../../translation';
import { TextInput } from '@carbon/react';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { PROPTYPES } from '../../constants';
import { getPrefixedClasses } from '../../helpers';

const TextValue = ({ id, onValueChange, operator, placeholder, value }) => {
  const { t } = useTranslation();
  const { isLight, isReadOnly } = useContext(RulesBuilderContext);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [operator, value]);

  const handleBlur = ({ target }) => {
    const { value: newValue } = target || {};

    if (newValue !== value) {
      onValueChange(newValue);
    }
  };

  const handleOnChange = ({ target }) => {
    setCurrentValue(target?.value);
  };

  if (isReadOnly) {
    return (
      <span className={getPrefixedClasses(['--rule-value-readonly', '--text-space-left'])}>
        {value}
      </span>
    );
  }

  return (
    <TextInput
      hideLabel
      id={id}
      labelText={t('String rule')}
      light={isLight}
      name={id}
      onBlur={handleBlur}
      onChange={handleOnChange}
      placeholder={placeholder || t('Enter value')}
      value={currentValue}
    />
  );
};

TextValue.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

TextValue.defaultProps = {
  operator: null,
  placeholder: '',
  value: '',
};

export default TextValue;
