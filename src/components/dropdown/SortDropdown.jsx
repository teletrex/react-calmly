/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ExtendedDropdown from './ExtendedDropdown';

export const sortStates = {
  NONE: 'NONE',
  DESC: 'DESC',
  ASC: 'ASC',
};

const SortDropDown = ({ onChange, dropdownProps }) => {
  const [sortDirection, setSortDirection] = useState(sortStates.NONE);
  const [sortBy, setSortBy] = useState(null);

  const handleOnSelect = item => {
    let newSortDirection = sortStates.ASC;
    if (sortBy === item.id) {
      newSortDirection = sortDirection === sortStates.DESC ? sortStates.ASC : sortStates.DESC;
    } else {
      setSortBy(item.id);
    }
    setSortDirection(newSortDirection);

    onChange(item.id, newSortDirection);
  };

  return (
    <ExtendedDropdown
      ariaLabel="sort dropdown"
      downshiftProps={{ onSelect: handleOnSelect }}
      itemToString={item => (item ? item.text : '')}
      {...dropdownProps}
    />
  );
};

SortDropDown.propTypes = {
  dropdownProps: PropTypes.shape(ExtendedDropdown.propTypes).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SortDropDown;
