/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import settings from '../../settings';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

const HR = ({ className }) => <div aria-hidden="true" className={`${className} ${prefix}--hr`} />;

HR.propTypes = {
  className: PropTypes.string,
};

HR.defaultProps = {
  className: '',
};

export default HR;
