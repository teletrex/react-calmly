/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import  {useTranslation}  from '../../../../../translation';
import { MultiSelect} from '@carbon/react';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { PROPTYPES } from '../../constants';
import { getPrefixedClasses } from '../../helpers';

const MultipleSelect = ({ id, isReadOnly, onValueChange, options, placeholder, value }) => {
  const { t } = useTranslation();
  const { isLight } = useContext(RulesBuilderContext);

  const items = useMemo(() => map(options, ({ label, value }) => ({ id: value, text: label })), [
    options,
  ]);

  const selectedItems = filter(items, item => value.includes(item.id));

  const handleOnChange = ({ selectedItems: newItems }) => {
    const formattedItems = map(newItems, item => item.id);
    if (!isEqual(formattedItems, value)) {
      onValueChange(formattedItems);
    }
  };

  if (isReadOnly) {
    return (
      <span className={getPrefixedClasses(['--rule-value-readonly', '--text-space-left'])}>
        {map(selectedItems, item => item.text).join(', ')}
      </span>
    );
  }

  return (
    <MultiSelect
      id={id}
      items={items}
      label={placeholder || t('Choose an option')}
      light={isLight}
      onChange={handleOnChange}
      selectedItems={selectedItems}
      withSearch
    />
  );
};

MultipleSelect.propTypes = {
  id: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  options: PROPTYPES.SELECT_OPTIONS,
  placeholder: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
};

MultipleSelect.defaultProps = {
  isReadOnly: false,
  options: [],
  placeholder: '',
  value: [],
};

export default MultipleSelect;
