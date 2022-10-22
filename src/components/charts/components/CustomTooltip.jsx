/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../../settings';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

import { DomElement } from '../../../utils/DomUtils';

import {
  defaultTooltipLabelFormatter,
  defaultTooltipValueFormatter,
} from './defaultTooltipFormatters';

const { prefix } = settings;

const generateClass = suffix => classNames(`${prefix}--recharts-${suffix}`, `recharts-${suffix}`);

const CustomTooltip = props => {
  const { active, activeDataKey, payload, label, formatter, labelFormatter } = props;

  if (active) {
    const currentItem = payload.find(({ dataKey }) => dataKey === activeDataKey);
    const entry = currentItem || payload[0];
    const { name, value } = entry;
    const valueLabel = activeDataKey ? label : '';

    return (
      <div className={generateClass('default-tooltip')} data-testid="custom-tooltip">
        <p className={generateClass('tooltip-label')} data-testid="custom-tooltip-label">
          {labelFormatter(name, entry)}
        </p>
        <div className={generateClass('tooltip-item')}>
          <span className={generateClass('tooltip-item-value')} data-testid="custom-tooltip-value">
            {formatter(value, valueLabel, entry)}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  activeDataKey: PropTypes.string,
  formatter: PropTypes.func,
  label: PropTypes.string,
  labelFormatter: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.any,
      type: PropTypes.arrayOf(PropTypes.string),
      unit: PropTypes.any,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
    })
  ),
};

CustomTooltip.defaultProps = {
  activeDataKey: '',
  formatter: defaultTooltipValueFormatter,
  label: '',
  labelFormatter: defaultTooltipLabelFormatter,
};

export const withNativeClientPos = event => {
  const evt = event?.nativeEvent;
  return { left: evt?.clientX, top: evt?.clientY };
};

export const applyTransform = ({ tooltip, position }) => {
  if (position && tooltip) {
    // eslint-disable-next-line no-param-reassign
    tooltip.style.transform = `translate(${position.left}px, ${position.top}px)`;
  }
};

export const withOffset = ({ left = 0, top = 0 } = {}) => ({ chart, tooltip, position }) => {
  const { left: positionLeft, top: positionTop } = position;
  return {
    chart,
    tooltip,
    position: {
      left: positionLeft + left,
      top: positionTop + top,
    },
  };
};

export const translateUsingTip = ({
  height = { multiplier: 0 },
  width = { multiplier: 0 },
} = {}) => ({ chart, tooltip, position }) => {
  if (position && tooltip) {
    const { left: positionLeft, top: positionTop } = position;
    const { height: tipHeight, width: tipWidth } = DomElement(tooltip).getBounds();
    const translate = {
      left: 0,
      top: 0,
    };
    if (width && width.multiplier !== 0) {
      translate.left = tipWidth * width.multiplier;
    }
    if (height && height.multiplier !== 0) {
      translate.top = tipHeight * height.multiplier;
    }

    return {
      chart,
      tooltip,
      position: {
        left: positionLeft + translate.left,
        top: positionTop + +translate.top,
      },
    };
  }
  return { chart, tooltip, position };
};

export const calculatePosition = ({ chart, tooltip, position }) =>
  position && chart
    ? {
        chart,
        tooltip,
        position: {
          ...DomElement.globalToLocal(position, DomElement(chart).getBounds()),
        },
      }
    : { chart, tooltip, position };

export const processCursorPosition = adjustFn => (chartElement, tooltipElement) => ({
  left = 0,
  top = 0,
} = {}) => {
  if (adjustFn && chartElement && tooltipElement) {
    adjustFn({
      chart: isFunction(chartElement) ? chartElement() : chartElement,
      tooltip: isFunction(tooltipElement) ? tooltipElement() : tooltipElement,
      position: { left, top },
    });
  }
};

export default CustomTooltip;
