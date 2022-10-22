/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';

import {ScrollContainerScrollTypes} from '../scroll-container';  // TODO: what is this really.

import { WidgetContent, WidgetChartWrapper } from './components';
import Widget from './Widget';
import { ChartWidgetPropTypes, ChartWidgetDefaultProps } from './prop-types';

/**
 * Convenience special type of widget for displaying a chart as the only content
 */
const ChartWidget = ({ children, ...props }) => (
  <Widget
    {...props}
    horizontalScrollType={ScrollContainerScrollTypes.hidden}
    verticalScrollType={ScrollContainerScrollTypes.hidden}
  >
    <WidgetContent overflowHidden>
      <WidgetChartWrapper>{children}</WidgetChartWrapper>
    </WidgetContent>
  </Widget>
);

ChartWidget.propTypes = ChartWidgetPropTypes;
ChartWidget.defaultProps = ChartWidgetDefaultProps;

export default ChartWidget;
