/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';

const { prefix } = settings;

const Theme = ({ colorVariable, colorCode }) => {
  return (
    <div className={`${prefix}--theme`}>
      <div className={classNames(`${prefix}--theme-color`)} style={{ background: colorCode }} />
      <div className={classNames(`${prefix}--theme-color-variable`)}>{colorVariable}</div>
      <div className={classNames(`${prefix}--theme-color-code`)}>{colorCode}</div>
    </div>
  );
};

Theme.propTypes = {
  /**
   * Color name displayed below color
   */
  colorCode: PropTypes.string,

  /**
   * Color code displayed below color
   */
  colorVariable: PropTypes.string,
};

Theme.defaultProps = {
  colorCode: '#ffffff',
  colorVariable: '$ui-background',
};

export default Theme;
