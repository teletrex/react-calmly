/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';

import { ScrollContainerScrollTypes } from '../scroll-container'; // TODO: scroll-container


import { WidgetContent, WidgetChartWrapper } from './components';
import Widget from './Widget';
import { ChartWidgetPropTypes, ChartWidgetDefaultProps } from './prop-types';

/**
 * Convenience special type of widget for displaying a chart as the only content
 */
const NotificationWidget = ({ children, ...props }) => (
  <Widget
    {...props}
    horizontalScrollType={ScrollContainerScrollTypes.hidden}
    verticalScrollType={ScrollContainerScrollTypes.hidden}
  >
    <WidgetContent overflowHidden>
    </WidgetContent>
  </Widget>
);

NotificationWidget.propTypes = ChartWidgetPropTypes;
NotificationWidget.defaultProps = ChartWidgetDefaultProps;

export default NotificationWidget;
