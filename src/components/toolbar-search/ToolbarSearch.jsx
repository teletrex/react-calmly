/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import PropTypes from 'prop-types';
import  settings from '../../settings';

const { prefix } = settings;

const ToolbarSearch = () => {
  return (
    <div className={`${prefix}--toolbar-search`}>
Toolbar Search
    </div>
  );
};

ToolbarSearch.propTypes = {};

ToolbarSearch.defaultProps = {};

export default ToolbarSearch;
