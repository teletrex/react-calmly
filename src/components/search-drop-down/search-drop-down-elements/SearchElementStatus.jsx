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

const SearchElementStatus = props => {
  const { children } = props;

  return <div className={`${prefix}--search-element__status`}>{children}</div>;
};

SearchElementStatus.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchElementStatus;
