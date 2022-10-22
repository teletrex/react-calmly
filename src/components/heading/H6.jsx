/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import  settings  from '../../settings';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

const H6 = ({ children, forwardedRef, headingProps, className, ...props }) => (
  <h6
    ref={forwardedRef}
    {...props}
    {...headingProps}
    className={`${className} ${prefix}--heading_default_color ${prefix}--heading_6`}
  >
    {children}
  </h6>
);

H6.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  headingProps: PropTypes.shape({}),
};

H6.defaultProps = {
  children: null,
  className: '',
  headingProps: {},
};

export default React.forwardRef(function H6FowardRef(props, ref) {
  return <H6 forwardedRef={ref} {...props} />;
});
