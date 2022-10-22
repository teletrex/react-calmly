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

const H4 = ({ children, bold, forwardedRef, panelheadingProps, className, ...props }) => (
  <h4
    ref={forwardedRef}
    {...props}
    {...panelheadingProps}
    className={`${className} ${prefix}--heading_default_color ${prefix}--heading_4${
      bold ? '__bold' : ''
    }`}
  >
    {children}
  </h4>
);

H4.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  panelheadingProps: PropTypes.shape({}),
};

H4.defaultProps = {
  bold: false,
  children: null,
  className: '',
  panelheadingProps: {},
};

export default React.forwardRef(function H4FowardRef(props, ref) {
  return <H4 forwardedRef={ref} {...props} />;
});
