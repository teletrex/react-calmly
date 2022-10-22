/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React from 'react';
import PropTypes from 'prop-types';

import { commonAttributes } from './constants';

const OverlayElementsViewport = ({ forwardedRef, attributeName, children, ...props }) => {
  return (
    <div
      ref={forwardedRef}
      {...props}
      {...(attributeName ? { [attributeName]: true.toString() } : undefined)}
    >
      {children}
    </div>
  );
};

OverlayElementsViewport.propTypes = {
  attributeName: PropTypes.string,
  children: PropTypes.node,
  // eslint-disable-next-line react/require-default-props
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

OverlayElementsViewport.defaultProps = {
  attributeName: commonAttributes.viewportContainer,
  children: null,
};

export default React.forwardRef(function OverlayElementsViewportFwdRef(props, ref) {
  return <OverlayElementsViewport forwardedRef={ref} {...props} />;
});
