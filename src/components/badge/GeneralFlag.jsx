/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import  settings from '../../settings';

import { GenericStatusIconShape } from './BadgeIcon';

const { prefix } = settings;

const GeneralFlag = ({ color, children }) => {
  return (
    <div className={`${prefix}--generalflag`}>
      <GenericStatusIconShape fill={color} size={8} />
      <span className={`${prefix}--generalflag--label`}>{children}</span>
    </div>
  );
};

GeneralFlag.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
};

GeneralFlag.defaultProps = {
  children: null,
  color: '#1bf7a8',
};

export default GeneralFlag;
