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

const HoverPopup = (
  {children}
) => {
  return (
    <div className={`${prefix}--hover-popup`}>
      {children}
    </div>
  );
};

HoverPopup.propTypes = {};

HoverPopup.defaultProps = {};

export default HoverPopup;
