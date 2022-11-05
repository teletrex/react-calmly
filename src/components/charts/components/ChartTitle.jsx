/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import PropTypes from 'prop-types';

import  settings  from '../../../settings';


const {prefix} = settings;

const ChartTitle = ({children, visible=true }) => (
  <div className={`${prefix}--chart__header`}>{children}</div>
);


ChartTitle.propTypes = {
  isVisible: PropTypes.bool,
};

ChartTitle.defaultProps = {
  isVisible: true,
};

export default ChartTitle;
