/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';
import { HeaderGlobalAction } from '@carbon/react';
import classNames from 'classnames';
import { Search } from '@carbon/icons-react';

import { useTranslation } from '../../translation';

const { prefix } = settings;

const SearchButton = ({ onClick, active }) => {
  const { t } = useTranslation();
  const className = classNames(`${prefix}--search-button`, {
    [`${prefix}--search-button__active`]: active,
  });
  const searchButtonLabel = t('Search');
  return (
    <HeaderGlobalAction
      aria-label={searchButtonLabel}
      className={className}
      onClick={onClick}
      title={searchButtonLabel}
    >
      <Search size={20} />
    </HeaderGlobalAction>
  );
};

SearchButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

SearchButton.defaultProps = {
  active: false,
};

export default SearchButton;
