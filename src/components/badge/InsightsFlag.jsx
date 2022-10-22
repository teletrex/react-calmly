/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import settings from '../../settings';
import classNames from 'classnames';

const { prefix } = settings;

const InsightsFlag = ({ children, className, showButton, showFlag }) => {
  const pulseClassName = `${prefix}--pulse`;

  return (
    <>
      {showButton ? (
        <div className={`${prefix}--insightflag--notification ${className}`}>
          {children}
          <div className={`${prefix}--insightflag--notification--icon`}>
            {showFlag && <span className={classNames(pulseClassName, className)} />}
          </div>
        </div>
      ) : showFlag ? (
        <span className={classNames(`${prefix}--insightflag--icon`, pulseClassName, className)} />
      ) : (
        ''
      )}
    </>
  );
};

InsightsFlag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  showButton: PropTypes.bool,
  showFlag: PropTypes.bool,
};

InsightsFlag.defaultProps = {
  children: null,
  className: '',
  showButton: true,
  showFlag: true,
};

export default InsightsFlag;
