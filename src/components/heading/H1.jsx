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

const H1 = ({ children, extra, forwardedRef, productiveHeadingProps, className, ...props }) => (
  <h1
    ref={forwardedRef}
    {...props}
    {...productiveHeadingProps}
    className={`${className} ${prefix}--heading_default_color ${prefix}--heading_1${
      extra ? '__extra' : ''
    }`}
  >
    {children}
  </h1>
);

H1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  extra: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  productiveHeadingProps: PropTypes.shape({}),
};

H1.defaultProps = {
  children: null,
  className: '',
  extra: false,
  productiveHeadingProps: {},
};

export default React.forwardRef(function H1FowardRef(props, ref) {
  return <H1 forwardedRef={ref} {...props} />;
});
