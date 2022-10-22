/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import  settings from '../../settings';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

const H2 = ({ children, forwardedRef, headingProps, className, ...props }) => (
  <h2
    ref={forwardedRef}
    {...props}
    {...headingProps}
    className={`${className} ${prefix}--heading_default_color ${prefix}--heading_2`}
  >
    {children}
  </h2>
);

H2.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  headingProps: PropTypes.shape({}),
};

H2.defaultProps = {
  children: null,
  className: '',
  headingProps: {},
};

export default React.forwardRef(function H2FowardRef(props, ref) {
  return <H2 forwardedRef={ref} {...props} />;
});
