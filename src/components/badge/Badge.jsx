/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';
import classNames from 'classnames';

import { useTranslation } from '../../translation';
import { GRID_BREAKPOINTS } from '../constants';

import * as StatusIcons from './BadgeIcon';
import { VALID_STATUS, STATUS_ICON_POSITION } from './constants';

const { prefix } = settings;

function capitalizeFirstLetter(srcString) {
  return srcString.charAt(0).toUpperCase() + srcString.slice(1);
}

export const BadgePropTypes = {
  label: PropTypes.node,
  showLabel: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l']),
  status: PropTypes.oneOf(VALID_STATUS),
  statusIconPosition: PropTypes.oneOf([STATUS_ICON_POSITION.LEFT, STATUS_ICON_POSITION.RIGHT]),
  textOnly: PropTypes.bool,
  visibilityBreakpoint: PropTypes.oneOf(Object.values(GRID_BREAKPOINTS)),
};

export const BadgeDefaults = {
  label: '',
  showLabel: true,
  size: 's',
  status: 'published',
  statusIconPosition: STATUS_ICON_POSITION.LEFT,
  textOnly: false,
  visibilityBreakpoint: null,
};

const Badge = ({
  status,
  size,
  showLabel,
  label,
  className,
  textOnly,
  visibilityBreakpoint,
  statusIconPosition,
  ...otherProps
}) => {
  const { t } = useTranslation();

  const i18nStatuses = useMemo(
    () => ({
      disabled: t('disabled'),
      published: t('published'),
      approved: t('approved'),
      'draft , in Review': t('draft , in Review'),
      draft: t('draft'),
      pending: t('pending'),
      success: t('success'),
      cancelled: t('cancelled'),
      retired: t('retired'),
      scheduled: t('scheduled'),
      'draft / Open': t('draft / Open'),
      'inprogress / Sending': t('inprogress / Sending'),
      failed: t('failed'),
      complete: t('complete'),
      enabled: t('enabled'),
      routine: t('routine'),
      event: t('event'),
      paused: t('paused'),
    }),
    [t]
  );

  const getStatusIcon = useCallback(() => {
    if (!Object.keys(i18nStatuses).includes(status)) return null;

    const MyStatusIcon =
      StatusIcons[capitalizeFirstLetter(status.replace(/ .*/, '')) + size.toUpperCase()];
    return (
      <MyStatusIcon
        className={classNames(`${prefix}--status__icon`, `${prefix}--status__${size}icon`, {
          [`${prefix}--status__${size}icon-right`]:
            statusIconPosition === STATUS_ICON_POSITION.RIGHT,
        })}
      />
    );
  }, [i18nStatuses, size, status, statusIconPosition]);

  const actualLabel = useMemo(
    () => (showLabel && !label ? i18nStatuses[status].replace(/^\w/, c => c.toUpperCase()) : label),
    [i18nStatuses, label, showLabel, status]
  );

  return showLabel ? (
    <div
      {...otherProps}
      className={classNames(`${prefix}--status`, className, {
        [`${prefix}--status__icon-right`]: statusIconPosition === STATUS_ICON_POSITION.RIGHT,
        [`${prefix}--status__hide-${visibilityBreakpoint}`]: visibilityBreakpoint,
      })}
    >
      {!textOnly && statusIconPosition === STATUS_ICON_POSITION.LEFT && getStatusIcon()}
      <div className={`${prefix}--status__${size}text`}>
        <p className={`${prefix}--status__${size}text--content`}>{actualLabel}</p>
      </div>
      {!textOnly && statusIconPosition === STATUS_ICON_POSITION.RIGHT && getStatusIcon()}
    </div>
  ) : (
    !textOnly && getStatusIcon()
  );
};

Badge.propTypes = {
  ...BadgePropTypes,
};

Badge.defaultProps = {
  ...BadgeDefaults,
};

export default Badge;
