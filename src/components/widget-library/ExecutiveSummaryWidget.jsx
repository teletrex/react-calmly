/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types/prop-types';


import {Edit} from '@carbon/icons-react';
import WidgetContent from "../widget/components/WidgetContent";
import MagicWidgetGrid from "../widget/MagicWidgetGrid";
import SimpleValueWidget from "./SimpleValueWidget";
import Widget from "../widget/Widget";
import PerformanceValueWidget from "./PerformanceValueWidget";

/* This widget show a current value and how it compares to zero, one, or two other values. */
//// TODO:  Not used yet.  It's a bit more complex

const ExecutiveSummaryWidget = props => {
  const {
    widgetId,
    title,
    actions,
    loading,
    overflowMenu,
    slim,
    valueText,
    values
  } = props;

  const valueWidgetActions = [
    {
      key: "edit",
      actionKey: "edit",
      onClick: () => alert("edit clicked"),
      renderIcon: <Edit size={24} />,
      iconDescription: "Edit"
    }
  ];

  const demoOverflowMenu  = overflowMenu;

  const current = 22;
  const previous = 20;

  const execSummaryWidgetData =
    [
      {
        widgetId: "a",
        widgetType : 'PerformanceValueWidget',
        title : "Total Sales",
        value :'$24 Million',
        values :  [
          {valueText: "$2 Million", change: current - previous, description: "vs last year"},
          {valueText: "$250K", change: -1, description: "against plan"}
        ],
      },
      {
        widgetId: "b",
        widgetType : 'PerformanceValueWidget',
        title : "Total Gross Margin",
        value :'$13.6 Million',
        values :  [
          {valueText: "$2.2 Million", change: current - previous, description: "vs last year"},
          {valueText: "$198K", change: -1, description: "against plan"}
        ],
      },
      {
        widgetId: "c",
        widgetType: "SimpleValueWidget",
        widgetView: "number",
        title : "Promotion Effectiveness",
        value :'88%',
      },
      {
        widgetId: "d",
        widgetType: "SimpleValueWidget",
        widgetView: "gauge",
        title : "Campaign Success",
        value :61,
      }

    ];

  const summaryLayouts = {
    lg: [
      {i: 'a', x: 0, y: 0, w: 2, h: 1},
      {i: 'b', x: 2, y: 0, w: 2, h: 1},
      {i: 'c', x: 4, y: 0, w: 2, h: 1},
      {i: 'd', x: 6, y: 0, w: 2, h: 1},
    ],
    md: [
      {i: 'a', x: 0, y: 0, w: 1, h: 1},
      {i: 'b', x: 2, y: 0, w: 1, h: 1},
      {i: 'c', x: 0, y: 1, w: 1, h: 1},
      {i: 'd', x: 2, y: 1, w: 1, h: 1}
    ]
  };
  return (
    <Widget
      widgetId="summary"
      title="Executive Summary"
      slim={false}
      footer={true}
//      {...(showActions ? getActionsProps({widgetId: 'notifications'}) : {})}
      {...props}
     >

      <WidgetContent>
        <MagicWidgetGrid
          layouts={summaryLayouts}
          {...props}
          minWidth={1}
        >
          {execSummaryWidgetData.map(instrumentData => {
              if (instrumentData.widgetType === "PerformanceValueWidget") {
                return (
                  <PerformanceValueWidget
                    key={instrumentData.widgetId}
                    widgetId={instrumentData.widgetId}
                    overflowMenu={demoOverflowMenu}
                    title={instrumentData.title}
                    valueText={instrumentData.value}
                    values={instrumentData.values}
                    actions={valueWidgetActions}
                  />
                )
              }
              if (instrumentData.widgetType === "SimpleValueWidget") {
                return (
                  <SimpleValueWidget
                    key={instrumentData.widgetId}
                    widgetId={instrumentData.widgetId}
                    overflowMenu={demoOverflowMenu}
                    title={instrumentData.title}
                    valueText={instrumentData.value}
                    actions={valueWidgetActions}
                    widgetView={instrumentData.widgetView}
                  />
                )
              }
            }
          )
          }
        </MagicWidgetGrid>
      </WidgetContent>

    </Widget>
  )
}


ExecutiveSummaryWidget.defaultProps = {};

export default ExecutiveSummaryWidget;

