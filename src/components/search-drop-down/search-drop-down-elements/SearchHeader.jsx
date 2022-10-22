/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../../settings';

const { prefix } = settings;

const SearchHeader = props => {
  const { children } = props;

  return <div className={`${prefix}--search-header`}>{children}</div>;
};

SearchHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchHeader;
