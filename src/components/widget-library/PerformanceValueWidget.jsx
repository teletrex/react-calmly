/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import {CaretUp, CaretDown} from '@carbon/icons-react';
import ValueWidget from "./ValueWidget";
import FlexBox from "../../containers/FlexBox";

/* This widget show a current value and how it compares to zero, one, or two other values. */

const ValueDatum = ({valueText, valueDescription, valueChange}) => {
  return (
    <div key={valueDescription}>
    <div key={valueDescription+"a"} className="value-grid"  >
      <div key={"vc"} className={"value-change"}>{valueChange}</div>
      <div key={"vt"} className={"value-text"}>{valueText}</div>
    </div>
    <div key={valueDescription+"b"} className={"value-description"}>{valueDescription}</div>
    </div>


  )
};

const PerformanceValueWidget = props => {
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

  return (

    <ValueWidget
      widgetId={widgetId}
      title={title}
      loading={loading}
      slim={slim}
      overflowMenu={overflowMenu}
      actions={actions}
    >

      {
        <div className={"main-value"}>{valueText}</div>
      }

      {
        values
        &&
        values.length > 0
        &&
        <FlexBox flexDirection={"row"}>
          {
            values.map((value) => (
              <ValueDatum
                key={value.description}
                valueChange={value.change > 0 ? <CaretUp size={24} fill={"white"}/> : value.change < 0 ? <CaretDown size={24} fill={"white"}/> : " "}
                valueText={value.valueText}
                valueDescription={value.description}
              />)
            )
          }
        </FlexBox>
      }
    </ValueWidget>
  );
}
/*
PerformanceValueWidget.propTypes = {
  widgetId: PropType.string,
  title: PropTypes.string,
  loading: PropTypes.bool,
  overflowMenu: PropTypes.component,
  slim:PropTypes.bool,
  actions:PropType.arrayOf(PropTypes.object),
  valueText:PropTypes.string,
  values: PropTypes.arrayOf(
    PropTypes.shape(
      { valueText: PropType.string,
        description: PropTypes.string,
        change: PropTypes.number
      }
    )
  )
};
*/
PerformanceValueWidget.defaultProps = {};

export default PerformanceValueWidget;

