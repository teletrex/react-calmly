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

const EmptyStates = () => {
  return (
    <div className={`${prefix}--emptystates`}>

    </div>
  );
};

EmptyStates.propTypes = {};

EmptyStates.defaultProps = {};

export default EmptyStates;
