/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';

const { prefix } = settings;

const TablePagination = () => {
  return (
    <div className={`${prefix}--table-pagination`}>
      Paginations
    </div>
  );
};

TablePagination.propTypes = {};

TablePagination.defaultProps = {};

export default TablePagination;
