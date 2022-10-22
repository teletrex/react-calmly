/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import { Dropdown} from '@carbon/react';
 import { useTranslation } from '../../../../../translation';
import RulesBuilderContext from '../../../RulesBuilderContext';
import { PROPTYPES, VALUES } from '../../constants';
import { getPrefixedClasses } from '../../helpers';

const SingleSelect = ({ id, isReadOnly, onValueChange, options, placeholder, value }) => {
  const { t } = useTranslation();
  const { isLight } = useContext(RulesBuilderContext);

  const selectedItem = find(options, { value }) || null;

  const handleOnChange = ({ selectedItem: newItem }) => {
    if (newItem.value !== value) {
      onValueChange(newItem.value);
    }
  };

  if (isReadOnly) {
    return (
      <span className={getPrefixedClasses(['--rule-value-readonly', '--text-space-left'])}>
        {selectedItem?.label}
      </span>
    );
  }

  return (
    <Dropdown
      ariaLabel={t('Select dropdown')}
      id={id}
      isInline
      isLight={isLight}
      items={options}
      onChange={handleOnChange}
      placeholder={placeholder || t('Choose an option')}
      selectedItem={selectedItem}
      withSearch
    />
  );
};

SingleSelect.propTypes = {
  id: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  options: PROPTYPES.SELECT_OPTIONS,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

SingleSelect.defaultProps = {
  isReadOnly: false,
  options: [],
  placeholder: '',
  value: VALUES.UNPROVIDED,
};

export default SingleSelect;
