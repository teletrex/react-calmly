/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import PropTypes from 'prop-types';
import settings  from '../../settings';

const { prefix } = settings;

const Checkbox = (
  {
    checked,
    disabled,
    id,
    onClick
  } ) => {
  return (
    <div className={`${prefix}--Checkbox`}>
      <input type="checkbox" disabled={disabled} checked={checked} id={id} onClick={onClick} />
    </div>
  );
};

Checkbox.propTypes = {};

Checkbox.defaultProps = {};

export default Checkbox;
