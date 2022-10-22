/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';

const ImageProfileSVG = ({ height, width, ...props }) => {
  return (
    <svg
      height={height}
      version="1.1"
      viewBox="0 0 30 38"
      width={width}
      xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-638.000000, -696.000000)">
          <g transform="translate(633.000000, 695.000000)">
            <rect fill="#D8D8D8" height="40" opacity="0" width="40" x="0" y="0" />
            <g fill="#5A5D77" transform="translate(5.000000, 0.500000)">
              <g transform="translate(0.000000, 0.500000)">
                <path d="M18.75,11.25 C20.8210678,11.25 22.5,9.57106781 22.5,7.5 C22.5,5.42893219 20.8210678,3.75 18.75,3.75 C16.6789322,3.75 15,5.42893219 15,7.5 C15,9.57106781 16.6789322,11.25 18.75,11.25 L18.75,11.25 Z M18.75,6.25 C19.4403559,6.25 20,6.80964406 20,7.5 C20,8.19035594 19.4403559,8.75 18.75,8.75 C18.0596441,8.75 17.5,8.19035594 17.5,7.5 C17.5,6.80964406 18.0596441,6.25 18.75,6.25 Z M27.5,0 L2.5,0 C1.11928813,0 0,0.932740105 0,2.08333333 L0,22.9166667 C0,24.0672599 1.11928813,25 2.5,25 L27.5,25 C28.8807119,25 30,24.0672599 30,22.9166667 L30,2.08333333 C30,0.932740105 28.8807119,0 27.5,0 Z M2.5,22.5 L2.5,17.5 L8.75,11.25 L15.7375,18.2375 C16.7125936,19.206809 18.2874064,19.206809 19.2625,18.2375 L21.25,16.25 L27.5,22.5 L2.5,22.5 Z M27.5,18.9625 L23.0125,14.475 C22.0374064,13.505691 20.4625936,13.505691 19.4875,14.475 L17.5,16.4625 L10.5125,9.475 C9.53740636,8.50569101 7.96259364,8.50569101 6.9875,9.475 L2.5,13.9625 L2.5,2.5 L27.5,2.5 L27.5,18.9625 Z" />
              </g>
              <g transform="translate(0.000000, 27.500000)">
                <polygon points="24.9535714 0 23.4428571 1.6581741 25.8964286 4.33227176 4.10357143 4.33227176 6.55714286 1.6581741 5.04642857 0 0 5.5 5.04642857 11 6.55714286 9.3418259 4.10357143 6.66772824 25.8964286 6.66772824 23.4428571 9.3418259 24.9535714 11 30 5.5" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

ImageProfileSVG.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

ImageProfileSVG.defaultProps = {
  height: 20,
  width: 20,
};

export default ImageProfileSVG;
