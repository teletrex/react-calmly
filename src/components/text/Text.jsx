/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const {prefix}  = settings;

const Text = ({children, onClick}) => {

  const handleClick = useCallback(
    (event, action, selectedRows) => {
      if (onClick) onClick(event);
    },
    []
  );

  return (
    <div className={`${prefix}--Text`} onClick={(event)=>handleClick(event)}>
      {children}
    </div>
  );
};

Text.propTypes = {};

Text.defaultProps = {};

export default Text;


