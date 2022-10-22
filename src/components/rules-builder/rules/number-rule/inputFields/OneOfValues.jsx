/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import  {useTranslation}  from '../../../../../translation';
import AddTags from '../../../../add-tags';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { PROPTYPES } from '../../constants';
import { getPrefixedClasses } from '../../helpers';

const OneOfValues = ({ id, onValueChange, operator, placeholder, value }) => {
  const { t } = useTranslation();
  const { isReadOnly } = useContext(RulesBuilderContext);

  const [valueTags, setValueTags] = useState(map(value, String));
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
  }, [operator]);

  useEffect(() => {
    setValueTags(map(value, String));
  }, [value]);

  const handleAddTag = tags => {
    const newTags = uniq(map(tags, tag => tag.trim()));

    setValueTags(newTags);
    onValueChange(map(newTags, Number));
    setInputValue('');
  };

  const handleDeleteTag = tags => {
    setValueTags(tags);
    onValueChange(map(tags, Number));
  };

  const handleInputChange = newInputValue => {
    setInputValue(newInputValue);
  };

  if (isReadOnly) {
    return (
      <span className={getPrefixedClasses(['--rule-value-readonly', '--text-space-left'])}>
        {valueTags.join(', ')}
      </span>
    );
  }

  return (
    <AddTags
      allowTagSplitting={false}
      id={id}
      inline
      inlineInputAlwaysOn
      inputValue={inputValue}
      min={0}
      name={id}
      onAddTag={handleAddTag}
      onDelete={handleDeleteTag}
      onInputChange={handleInputChange}
      placeholder={placeholder || t('Enter value')}
      shapeForm="oval"
      tagExistsError={t('This value already exists')}
      tags={valueTags}
      type="number"
      validateInputValue
    />
  );
};

OneOfValues.propTypes = {
  id: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  operator: PROPTYPES.OPERATOR,
  placeholder: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

OneOfValues.defaultProps = {
  operator: null,
  placeholder: '',
  value: [],
};

export default OneOfValues;
