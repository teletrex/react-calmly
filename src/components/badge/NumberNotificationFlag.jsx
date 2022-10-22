/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import settings from '../../settings';
import classnames from 'classnames';

import { useFormat } from '../format';

const { prefix } = settings;

const NumberNotificationFlag = ({ children, numberOfNotifications, showButton, className }) => {
  const { formatNumber } = useFormat();

  const numberOfNotificationsStr =
    numberOfNotifications > 9999 ? `${formatNumber(9999)}+` : formatNumber(numberOfNotifications);

  return (
    <div className={`${prefix}--flag`}>
      {showButton ? (
        <div className={`${prefix}--flag--notification`}>
          {children}
          <div className={classnames(`${prefix}--flag--notification--texticon`, className)}>
            <div className={`${prefix}--flag--notification--texticon--counter`}>
              {numberOfNotificationsStr}
            </div>
          </div>
        </div>
      ) : (
        <div className={`${prefix}--flag--counter`}>{numberOfNotifications}</div>
      )}
    </div>
  );
};

NumberNotificationFlag.propTypes = {
  children: PropTypes.node,
  numberOfNotifications: PropTypes.number,
  showButton: PropTypes.bool,
};

NumberNotificationFlag.defaultProps = {
  children: null,
  numberOfNotifications: 1,
  showButton: true,
};

export default NumberNotificationFlag;
