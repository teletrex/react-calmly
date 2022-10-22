/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import  settings from '../../../../../settings';
import noop from 'lodash/noop';
import {useTranslation} from '../../../../../translation';
import {  Dropdown } from '@carbon/react';
// import { Dropdown } from '../../../../new-dropdown';
import RulesBuilderContext from '../../../RulesBuilderContext';

const { prefix } = settings;
const defaultClassName = `${prefix}--rule-criteria`;

const getCriteriaData = (items, key, value) => {
  let foundCriteria;
  items.some(function iter(item) {
    if (item[key] === value) {
      foundCriteria = item;
      return true;
    }
    return Array.isArray(item.sublist) && item.sublist.some(iter);
  });
  return foundCriteria;
};

const CriteriaDropdown = ({ className, selectedCriteriaKey, label, onChange }) => {
  const { t } = useTranslation();

  const { criteriaDropdown: items = [], isLight, isReadOnly } = useContext(RulesBuilderContext);

  const id = () => `CriteriaDropdown_${uniqueId()}`;

  const selectedCriteria = useMemo(() => getCriteriaData(items, 'id', selectedCriteriaKey), [
    items,
    selectedCriteriaKey,
  ]);

  const handleChangeCriteria = ({ selectedItem }) => onChange(selectedItem.id);

  if (isReadOnly) {
    return (
      <span className={`${defaultClassName}--readonly`}>
        {selectedCriteriaKey ? selectedCriteria.text : t('Select criteria')}
      </span>
    );
  }

  return (
    <Dropdown
      key={`select_criteria_${selectedCriteria}`}
      ariaLabel={t('Select criteria')}
      className={className}
      id={`${id}-rule-criteria`}
      initialSelectedItem={selectedCriteria}
      isInline
      isLight={isLight}
      items={items}
      onChange={handleChangeCriteria}
      placeholder={label || t('Select criteria')}
    />
  );
};

CriteriaDropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  selectedCriteriaKey: PropTypes.string,
};

CriteriaDropdown.defaultProps = {
  className: '',
  label: undefined,
  onChange: noop,
  selectedCriteriaKey: null,
};

export default CriteriaDropdown;
