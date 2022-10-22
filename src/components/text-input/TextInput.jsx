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

const TextInput = () => {
  return (
    <div className={`${prefix}--text-input`}>
      placeholder
    </div>
  );
};

TextInput.propTypes = {};

TextInput.defaultProps = {};

export default TextInput;
