/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import classNames from 'classnames';
import settings  from '../../settings';
import { CheckmarkOutline, Warning, WarningAlt } from '@carbon/icons-react';
import { keys, matches } from '../keyboard';
import noop from 'lodash/noop';

import { deprecate } from '../utils/prop-types';

const { prefix } = settings;

export const ProgressStep = ({ ...props }) => {
  const {
    label,
    description,
    className,
    tooltipContent,
    current,
    complete,
    invalid,
    invalidWarning,
    completed,
    secondaryLabel,
    disabled,
    interactive,
    onClick,
    stepButtonAriaLabel,
  } = props;

  const isInteractive = useMemo(() => !disabled && interactive, [disabled, interactive]);

  const classes = classNames({
    [`${prefix}--progress-step`]: true,
    [`${prefix}--progress-step--current`]: current,
    [`${prefix}--progress-step--complete`]: complete,
    [`${prefix}--progress-step--incomplete`]: !complete && !current,
    [`${prefix}--progress-step--disabled`]: disabled,
    [className]: className,
  });

  const tabIndex = isInteractive && !tooltipContent && !current && onClick ? 0 : -1;

  const handleKeyDown = useCallback(
    e => {
      if (isInteractive && matches(e, [keys.Enter, keys.Space])) {
        onClick();
      }
    },
    [isInteractive, onClick]
  );

  const handleOnClick = useCallback(() => {
    if (!current && isInteractive) {
      onClick();
    }
  }, [current, isInteractive, onClick]);

  // eslint-disable-next-line react/prop-types
  const SVGIcon = ({ complete, current, description, invalid, prefix, invalidWarning, completed }) => {
    if (invalid) {
      return <Warning size={16} className={`${prefix}--progress__warning`} />;
    }
    if (invalidWarning) {
      return <WarningAlt size={16} className={`${prefix}--progress__warn`} />;
    }
    if (completed) {
      return <CheckmarkOutline size={16} className={`${prefix}--progress__complete`} />;
    }
    if (current) {
      return (
        <svg>
          <path d="M 8 8 m -7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0" />
          <title>{description}</title>
        </svg>
      );
    }
    if (complete) {
      return (
        <CheckmarkOutline size={16} >
          <title>{description}</title>
        </CheckmarkOutline>
      );
    }
    return (
      <svg>
        <title>{description}</title>
        <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
      </svg>
    );
  };

  return (
    <li aria-disabled={disabled} className={classes}>
      <div
        aria-label={stepButtonAriaLabel || label}
        className={classNames(`${prefix}--progress-step-button`, {
          [`${prefix}--progress-step-button--unclickable`]: !onClick || current,
          [`${prefix}--progress-step-button--interactive`]: interactive,
        })}
        onClick={handleOnClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={tabIndex}
      >
        <SVGIcon
          complete={complete}
          current={current}
          description={description}
          invalid={invalid}
          invalidWarning={invalidWarning}
          completed={completed}
          prefix={prefix}
        />
        <p className={`${prefix}--progress-label`} title={label}>
          {label}
        </p>
        <span className={`${prefix}--progress-line`} />
      </div>
      {secondaryLabel !== null && secondaryLabel !== undefined ? (
        <p className={`${prefix}--progress-optional`}>{secondaryLabel}</p>
      ) : null}
    </li>
  );
};

ProgressStep.propTypes = {
  /**
   * Provide an optional className to be applied to the containing <li> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the step has been completed
   */
  complete: PropTypes.bool,

  /**
   * Specify whether the step is the current step
   */
  current: PropTypes.bool,

  /**
   * Provide a description for the <ProgressStep>
   */
  description: PropTypes.string,

  /**
   * Specify whether the step is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Index of the current step within the ProgressIndicator
   */
  index: PropTypes.number,

  /**
   * Specify whether the step is interactive
   */
  interactive: PropTypes.bool,

  /**
   * Specify whether the step is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify whether the step is invalid Warning
   */
   invalidWarning: PropTypes.bool,
   /**
   * Specify whether the step is completed
   */
    completed: PropTypes.bool,

  /**
   * Provide the label for the <ProgressStep>
   */
  label: PropTypes.string.isRequired,

  /**
   * A callback called if the step is clicked or the enter key is pressed
   */
  onClick: PropTypes.func,

  /**
   * Provide the props that describe a progress step tooltip
   */
  // eslint-disable-next-line react/require-default-props
  overflowTooltipProps: deprecate(
    PropTypes.shape({}),
    ' The `overflowTooltipProps` prop has been deprecated and will be remove in the next major release. Tooltips are not supported anymore in this component.'
  ),

  /*
   * An optional parameter to allow for overflow content to be rendered in a
   * tooltip.
   */
  // eslint-disable-next-line react/require-default-props
  renderLabel: deprecate(
    PropTypes.func,
    ' The `renderLabel` prop has been deprecated and will be remove in the next major release. Custom labels are not supported anymore in this component.'
  ),

  /**
   * Provide an optional secondary label
   */
  secondaryLabel: PropTypes.string,

  /**
   * aria-Label attribute for step button
   */
  stepButtonAriaLabel: PropTypes.string,

  /**
   * Provide an optional tooltipContent to render a HoverPopup as tooltip
   */
  // eslint-disable-next-line react/require-default-props
  tooltipContent: deprecate(
    PropTypes.node,
    ' The `tooltipContent` prop has been deprecated and will be remove in the next major release. Tooltips are not supported anymore in this component.'
  ),

  /**
   * The direction of the tooltip content.
   */
  // eslint-disable-next-line react/require-default-props
  tooltipDirection: deprecate(
    PropTypes.string,
    ' The `tooltipDirection` prop has been deprecated and will be remove in the next major release. Tooltips are not supported anymore in this component.'
  ),

  /**
   * The ID of the tooltip content.
   */
  // eslint-disable-next-line react/require-default-props
  tooltipId: deprecate(
    PropTypes.string,
    ' The `tooltipId` prop has been deprecated and will be remove in the next major release. Tooltips are not supported anymore in this component.'
  ),
};

ProgressStep.defaultProps = {
  className: '',
  complete: false,
  current: false,
  description: '',
  disabled: false,
  index: 0,
  interactive: true,
  invalid: false,
  invalidWarning:false,
  completed:false,
  onClick: noop,
  secondaryLabel: undefined,
  stepButtonAriaLabel: '',
};
