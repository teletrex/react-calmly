/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';

// normally an svg would go in here at the top level.
const TeleTrexLogo = ({ fill, width, height, style }) => (

  <b> TELE-TREX</b>

);

TeleTrexLogo.defaultProps = {
  fill: '#13163C',
  height: 16,
  style: {},
  width: 86,
};

TeleTrexLogo.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};



export default TeleTrexLogo;
