/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import  settings  from '../../settings';

import {Button} from '@carbon/react';

import {NotificationFlag} from "../badge";


import { ConfigurableActionPropTypes, ConfigurableActionDefaultProps } from './prop-types';

const { prefix } = settings;

/**
 * Multi purpose component to create buttons based on configuration.
 * Used primarily by ConfigurableTableToolbar and Widget
 */
const ConfigurableAction = ({
  actionKey,
  buttonRef,
  children,
  notificationFlag,
  onAction,
  onClick,
  renderIcon,
  size,
  text,
  iconDescription,
  ...action
}) => {
  const kind = useMemo(() => (text || children ? 'primary' : 'ghost'), [text, children]);

  const handleOnClick = useCallback(
    e => {
      onClick(e);
      if (onAction) {
        onAction(actionKey, e);
      }
    },
    [onAction, onClick, actionKey]
  );

  return (
    <NotificationFlag
      className={classNames(`${prefix}--configurable-action`, {
        [`${prefix}--flag--visible`]: notificationFlag,
      })}
      handleNotificationBadgeClick={handleOnClick}
      notificationColor="transparent"
    >
      <Button
        hasIconOnly={!text && !children}
        iconDescription={iconDescription}
        kind={kind}
        preventDefaultOnMouseDown
        renderIcon={renderIcon}
        size={size}
        {...action}
        ref={buttonRef}
        onClick={handleOnClick}
      >
        {text || children}
      </Button>
    </NotificationFlag>
  );
};

ConfigurableAction.propTypes = ConfigurableActionPropTypes;

ConfigurableAction.defaultProps = ConfigurableActionDefaultProps;

export default ConfigurableAction;
