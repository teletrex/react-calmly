/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import ValueWidget from "./ValueWidget";
import GaugeChart from "../charts/gauge-chart";

import classNames from 'classnames';

const SimpleValueWidget = props => {
  const {
    widgetId,
    widgetView,
    actions,
    children,
    emptyStateProps,
    horizontalScrollType,
    loading,
    loadingIndicatorProps,
    overflowMenu,
    slim,
    title,
    valueText,
  } = props;



  return (
    // design shows Widgets as focusable
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-static-element-interactions

    <ValueWidget
      widgetId={widgetId}
      title={title}
      loading={loading}
      slim={slim}
      overflowMenu={overflowMenu}
      actions={actions}
      valueText={valueText}
    >
      <div align={"center"}>
      {
        widgetView === "gauge"
        &&

        <GaugeChart data={valueText} textColor="#FFFFFF" />
      }
{/*        <div className="recharts-wrapper" style={{"position":"relative", "cursor": "default","width": "350px","height": "205px"}}><svg className="recharts-surface" width="350" height="205" viewBox="0 0 350 205" version="1.1"><defs><clipPath id="recharts283-clip"><rect x="5" y="5" height="195" width="340"></rect></clipPath></defs><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#047970"></stop><stop offset="60%" stop-color="#23deb8"></stop></linearGradient></defs></svg></div> */}

      {
        widgetView === "number"
        &&
        <h1>{valueText}</h1>
      }
      </div>
    </ValueWidget>
  );
}

SimpleValueWidget.propTypes = {};
SimpleValueWidget.defaultValues = {};
export default SimpleValueWidget;

