/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext } from 'react';
import PropTypes from 'prop-types';

// import { Dropdown } from '../../../new-dropdown';
import {Dropdown } from '@carbon/react';
import { useTranslation} from '../../../../translation';
import RulesBuilderContext from '../../RulesBuilderContext';
import { getPrefixedClasses } from '../helpers';

const OperatorDropdown = ({ id, label, onOperatorChange, operator, operators }) => {
  const { t } = useTranslation();
  const { isLight, isReadOnly } = useContext(RulesBuilderContext);
  const dropdownLabel = label || t('Select operator');

  if (isReadOnly) {
    return <span className={getPrefixedClasses('--text-space-left')}>{operator?.label}</span>;
  }
  return (
    <Dropdown
      ariaLabel={t('Operator dropdown')}
      id={`${id}--operator-dropdown`}
      isInline
      isLight={isLight}
      items={operators}
      onChange={onOperatorChange}
      placeholder={dropdownLabel}
      selectedItem={operator}
      withSearch
    />
  );
};

const operatorShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

OperatorDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onOperatorChange: PropTypes.func.isRequired,
  operator: operatorShape,
  operators: PropTypes.arrayOf(operatorShape).isRequired,
};

OperatorDropdown.defaultProps = {
  label: null,
  operator: null,
};

export default OperatorDropdown;
