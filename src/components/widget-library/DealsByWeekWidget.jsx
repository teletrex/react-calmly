/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types/prop-types';

import RingChart from "../widget-charts/RingChart";
import Widget from "../widget/Widget";
import ChartWidget from "../widget/ChartWidget"

const DealsByWeekWidget = props => {
  const {
    widgetId,
    title,
    actions,
    maxValueText,
    maxValue,
    data,  // list of { label: string, value: number}
    showActions
  } = props;

  const demoValueText = "1000";

  return (
    <ChartWidget
      widgetId={widgetId}
      title={title}
      slim={false}
      footer={true}
 //     {...(showActions ? actions: []) }
      {...props}
    >
      <RingChart
        data={data}
        maxValue={maxValue}
        centerText={demoValueText}
        height={250}
        width={"100%"}
      />
    </ChartWidget>
  )
}

DealsByWeekWidget.defaultProps = {};

export default DealsByWeekWidget;

