/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';
import {Button} from '@carbon/react';

const { prefix } = settings;

const ToolbarAction = ({children}) => {
  return (
    <div className={`${prefix}--toolbar-action`}>

      {children}
    </div>
  );
};

ToolbarAction.propTypes = {};

ToolbarAction.defaultProps = {};

export default ToolbarAction;
