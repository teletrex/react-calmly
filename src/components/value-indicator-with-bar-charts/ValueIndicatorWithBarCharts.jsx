/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Tag} from "@carbon/react";
import HoverPopup from "../hover-popup";

export const formattedTextToNumber = (value) => {
  return value && Number(value.replace(/[^0-9.-]+/g, ""));
}

const ValueIndicatorWithBarCharts = (props) => {
  const {
    t,
    itemKey,
    className,
    indicatorData,
    flexGrow
  } = props;


  const title = indicatorData.title;
  const mainValue = indicatorData.mainValue;
  const tagValue = indicatorData.tagValue;
  const tagSign = indicatorData.tagSign;
  const recommended = indicatorData.recommended;
  const current = indicatorData.current;

  const maximumBarWidth = 200;

  let expectedVal = mainValue ? formattedTextToNumber(mainValue) : 0;
  let recommendedVal = recommended ? formattedTextToNumber(recommended) : 0;
  let currentVal = current ? formattedTextToNumber(current) : 0;
  const isTpNp = itemKey === 'tp' || itemKey === 'np';
  const tagVal = tagValue ? tagValue : '0.0%';

  const highVal = Math.max(expectedVal, recommendedVal, currentVal);
  let expectedWidth = (expectedVal * maximumBarWidth / highVal);
  let recomWidth = (recommendedVal * maximumBarWidth / highVal);
  let currWidth = (currentVal * maximumBarWidth / highVal);

  const valueBar = (color, value, width) => <div className={"value-bar"} style={{
    backgroundColor: color,
    width: width,
  }}>{value}</div>

  const varianceRecom = itemKey === 'gm' ? (expectedVal - recommendedVal).toFixed(2) : parseFloat((expectedVal - recommendedVal) * 100 / recommendedVal).toFixed(2);
  const varianceCurr = itemKey === 'gm' ? (expectedVal - currentVal).toFixed(2) : parseFloat((expectedVal - currentVal) * 100 / currentVal).toFixed(2);

  return (
    <div className={classNames(className, 'cds--value-indicator-vis-'+flexGrow)}>
      <div className="cds--value-indicator">
        <div className="cds--value-indicator--header">
          <div className="cds--value-indicator--title">{title}</div>
          {!isTpNp && <Tag type={(tagSign > 0) ? "rc-green" : (tagSign < 0) ? "rc-red" : "rc-gray"}>{tagVal}</Tag>}

        </div>

        {(tagValue == null && isTpNp) &&
        <div id={title + "-Main"} className="rc--value-indicator--body">{mainValue}</div>
        }
      </div>

      {
        !isTpNp &&
      <HoverPopup narrow tooltip={
        <div id={'tooltip'} className="cds--value-indicator--tooltip">
          <div
            className="label" >{t('summary.expectedValue', 'Expected:')}</div><div className="tooltip-data"> {mainValue}</div>

          <div
            className="label">{t('summary.recommendedValue', 'Recommended:')}</div><div className="tooltip-data"style={{display:"grid",justifyContent:"end"}}> {recommended}</div>
          <div
            className="label">{t('summary.currentValue', 'Current:')}</div><div  className="tooltip-data" > {current}</div>
          <div
            className="label">{t('summary.variance.recommended', 'Expected to Recommended:')}</div><div  className="tooltip-data"> {isNaN(varianceRecom) ? 0.00 : varianceRecom}%
          </div>
          <div
            className="label">{t('summary.variance.current', 'Expected to Current:')}</div><div className="tooltip-data"> {isNaN(varianceCurr) ? 0.00 : varianceCurr}%
          </div>
        </div>} >

        <div className="cds--value-indicator">
          <div class="cds--bar-value-indicator--extra">
            <div class="label">{t('summary.expected', 'Expected')}</div>
            {valueBar("#10153A", mainValue, expectedWidth)}

            {recommended != null &&
            <>
              <div class="label">{t("summary.recommended.1", 'Recommended')}</div>
              {valueBar("#47A392", recommended, recomWidth)}
            </>
            }
            {current != null &&
            <>
              <div class="label">{t("summary.current.1", 'Current')}</div>
              {valueBar("#005175", current, currWidth)}
            </>
            }
          </div>
        </div>
      </HoverPopup>
      }
    </div>
  )
}

ValueIndicatorWithBarCharts.propTypes  = {
    itemKey: PropTypes.string,
    showSidebar: PropTypes.bool,
    className: PropTypes.string,
    mainValue: PropTypes.string,
    tagValue: PropTypes.string,
    tagSign: PropTypes.number,
    recommended: PropTypes.string,
    current: PropTypes.string,
    title: PropTypes.string,
};

ValueIndicatorWithBarCharts.defaultProps = {
    showSidebar: false,
    className: '',
    mainValue: null,
    tagValue: null,
    recommended: null,
    current: null,
    title: '',
};


export default ValueIndicatorWithBarCharts;
