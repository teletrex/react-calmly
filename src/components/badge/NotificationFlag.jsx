/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import  settings  from '../../settings';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';

import { useTranslation } from '../../translation';
import { SvgTitleTag } from '../svg-components';

import * as StatusIcons from './BadgeIcon';

const { prefix } = settings;

const NotificationFlag = ({
  children,
  className,
  notificationColor,
  showButton,
  svgTitle,
  handleNotificationBadgeClick,
}) => {
  const { t } = useTranslation();
  const svgTitleText = useMemo(() => (isEmpty(svgTitle) ? t('Activation badge') : svgTitle), [
    svgTitle,
    t,
  ]);
  return (
    <div className={classNames(className, `${prefix}--flag`)}>
      {showButton ? (
        <div className={`${prefix}--flag--notification`}>
          {children}
          {notificationColor !== 'transparent' && (
            <div
              className={`${prefix}--flag--notification--icon`}
              onClick={handleNotificationBadgeClick}
              onKeyDown={noop}
              role="button"
              tabIndex={0}
            >
              <StatusIcons.GenericStatusIconShape fill={notificationColor} size={8}>
                <SvgTitleTag titleValue={svgTitleText} />
              </StatusIcons.GenericStatusIconShape>
            </div>
          )}
        </div>
      ) : (
        <StatusIcons.GenericStatusIconShape fill={notificationColor} size={8} />
      )}
    </div>
  );
};

NotificationFlag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  handleNotificationBadgeClick: PropTypes.func,
  notificationColor: PropTypes.string,
  showButton: PropTypes.bool,
  svgTitle: PropTypes.string,
};

NotificationFlag.defaultProps = {
  children: null,
  className: '',
  handleNotificationBadgeClick: noop,
  notificationColor: '#49f9b9',
  showButton: true,
  svgTitle: '',
};

export default NotificationFlag;
