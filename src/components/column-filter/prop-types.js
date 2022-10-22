/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import PropTypes from 'prop-types';

export const optionsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    resultsCount: PropTypes.number,
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string, PropTypes.any]).isRequired,  // any means null, pretty much invalidates typechecking inside the array.
  })
);
