/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import settings  from '../../settings';
import * as ReactIcons from '@carbon/icons-react';

const { prefix } = settings;

const Icons = ({ element, iconName, iconVariable }) => {
  return (
    <div className={`${prefix}--icon`}>
      <div className={`${prefix}--icon-name`}>
        <span className={`${prefix}--icon-name_label`}>{iconName}</span>
      </div>
      <div className={`${prefix}--icon-element`}>
        {React.createElement(element, { 'aria-label': iconVariable }, null)}
      </div>
      <div className={`${prefix}--icon-variable`}>
        <span>{iconVariable}</span>
      </div>
    </div>
  );
};

Icons.propTypes = {
  /**
   * element create icon element
   */
  element: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /**
   * iconName display the icon name
   */
  iconName: PropTypes.string,

  /**
   * iconVariable display the icon variable name
   */
  iconVariable: PropTypes.string,
};

Icons.defaultProps = {
  element: ReactIcons.Add32,
  iconName: 'Add',
  iconVariable: 'Add',
};

export default Icons;
