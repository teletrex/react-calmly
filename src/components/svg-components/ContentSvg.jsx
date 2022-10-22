/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';

const ContentSVG = ({ height, width, ...props }) => {
  return (
    <svg
      height={height}
      version="1.1"
      viewBox="0 0 36 30"
      width={width}
      xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-547.000000, -700.000000)">
          <g transform="translate(545.000000, 695.000000)">
            <rect fill="#D8D8D8" height="40" opacity="0" width="40" x="0" y="0" />
            <path
              d="M35,5 C36.3807119,5 37.5,6.11928813 37.5,7.5 L37.5,32.5 C37.5,33.8807119 36.3807119,35 35,35 L5,35 C3.61928813,35 2.5,33.8807119 2.5,32.5 L2.5,7.5 C2.5,6.11928813 3.61928813,5 5,5 L35,5 Z M35,7.5 L5,7.5 L5,32.5 L35,32.5 L35,7.5 Z"
              fill="#5A5D77"
              fillRule="nonzero"
            />
            <polygon fill="#5A5D77" fillRule="nonzero" points="32.5 22.5 32.5 25 7.5 25 7.5 22.5" />
            <polygon fill="#5A5D77" fillRule="nonzero" points="20 27.5 20 30 7.5 30 7.5 27.5" />
            <path
              d="M32.5,10 L32.5,20 L7.5,20 L7.5,10 L32.5,10 Z M30,12.5 L10,12.5 L10,17.5 L30,17.5 L30,12.5 Z"
              fill="#5A5D77"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

ContentSVG.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

ContentSVG.defaultProps = {
  height: 20,
  width: 20,
};

export default ContentSVG;
