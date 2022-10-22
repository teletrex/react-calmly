/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import classNames from 'classnames';

import { widgetClassBuilder } from '../utils';

import { WidgetChartWrapperPropTypes, WidgetChartWrapperDefaultProps } from './prop-types';

/**
 * This components wraps the content with necessary elements/stylings to
 * make charts appear correctly inside widgets.
 *
 * Widgets use flex layout and charts depend of percentage height.
 * On other browsers you can have an element with flex-grow: 1 and it's child with height:100%,
 * but not on safari.
 */
const WidgetChartWrapper = ({ className, children, ...props }) => {
  const composedClassNames = classNames(className, widgetClassBuilder('--chart-wrapper'));

  return (
    <div className={composedClassNames} {...props}>
      {/* this div is necessary for the correct display of charts in safari. */}
      <div className={widgetClassBuilder('--chart-wrapper--overflow')}>{children}</div>
    </div>
  );
};

WidgetChartWrapper.propTypes = WidgetChartWrapperPropTypes;
WidgetChartWrapper.defaultProps = WidgetChartWrapperDefaultProps;

export default WidgetChartWrapper;
