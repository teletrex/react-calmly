/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { ProgressIndicator as CarbonProgressIndicator } from '@carbon/react';
import  settings  from '../../settings';

const { prefix } = settings;

export const ProgressIndicator = ({ vertical, ...props }) => (
  <CarbonProgressIndicator
    {...props}
    className={classNames({
      [`${prefix}--progress--vertical`]: vertical,
    })}
  />
);

ProgressIndicator.propTypes = {
  /**
   * Optionally specify the current step array index
   */
  currentIndex: PropTypes.number,
  /**
   * Determines whether or not the ProgressIndicator should be rendered vertically.
   */
  vertical: PropTypes.bool,
};

ProgressIndicator.defaultProps = {
  currentIndex: 1,
  vertical: false,
};
