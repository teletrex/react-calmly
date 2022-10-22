/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useState,useEffect} from 'react';

import ValueIndicatorWithBarCharts from './ValueIndicatorWithBarCharts';
import useTranslation from '../../translation/useTranslation';


export default {
  title: 'Components/ValueIndicatorWithBarCharts',
  component: ValueIndicatorWithBarCharts
}


const newSummaryIndicators =
  {
    "uv": {
      "mainValue": "3,184,423",
      "tagValue": "1.0%",
      "tagSign": 1,
      "recommended": "2,677,585",
      "current": "3,184,423",
      "title": "Unit Volume"
    },
    "sl": {
      "mainValue": "$29,615,726",
      "tagValue": "0.0%",
      "tagSign": 0,
      "recommended": "$32,596,774",
      "current": "$29,615,726",
      "title": "Sales"
    },
    "gmd": {
      "mainValue": "$16,760,233",
      "tagValue": "0.1%",
      "tagSign": 1,
      "recommended": "$122,333,222",
      "current": "$916,989,333",
      "title": "Gross Margin $"
    },
    "gm": {
      "mainValue": "55.6%",
      "tagValue": "-2.0%",
      "tagSign": -1,
      "recommended": "65.7%",
      "current": "55.6%",
      "title": "Gross Margin %"
    },
    "tp": {
      "mainValue": "136",
      "tagValue": null,
      "title": "Total Products"
    },
    "np": {
      "mainValue": "0",
      "tagValue": null,
      "title": "New Products"
    }
  }

export const Default = () => {
  const { t } = useTranslation();
  const [summaryIndicators, setSummaryIndicators] = useState (newSummaryIndicators);

  let scale = 1;  // 1, 1000, 1,000,000     (blank, K, M ) whatever the local says...
  let units = "";

  const formattedStringToNumber = (value) => {
    return value && Number(value.replace(/[^0-9.-]+/g, ""));
  }

  useEffect( () => {
    const syncScaleTheseIndicators = ["uv","gmd","sl"]  // sync these indicators to the same scale.

    let scaledSummaryIndicators = {...newSummaryIndicators};
    const lowestValue = syncScaleTheseIndicators.map(indicator =>
      Math.min(
        formattedStringToNumber(newSummaryIndicators[indicator].mainValue),
        formattedStringToNumber(newSummaryIndicators[indicator].recommended),
        formattedStringToNumber(newSummaryIndicators[indicator].current)
      )
    ).reduce((prev, curr, index, array) => Math.min(prev, curr));

    if (lowestValue > 1000000) {
      scale = 1000000;
      units = "M";
    } else if (lowestValue > 1000) {
      scale = 1000;
      units = "K";
    }

    const locale = "en-US";
    const currency = "USD";

    const currencyFormatter = Intl.NumberFormat(locale,{currency:currency, style: "currency"});

    syncScaleTheseIndicators.map(indicator => {
      scaledSummaryIndicators[indicator].mainValue = (formattedStringToNumber(newSummaryIndicators[indicator].mainValue)/scale).toFixed(2);
      scaledSummaryIndicators[indicator].recommended = (formattedStringToNumber(newSummaryIndicators[indicator].recommended)/scale).toFixed(2);
      scaledSummaryIndicators[indicator].current = (formattedStringToNumber(newSummaryIndicators[indicator].current)/scale).toFixed(2);

      if (indicator === "gmd" || indicator === "sl") {   //currency indicators, add formatting
        scaledSummaryIndicators[indicator].mainValue = currencyFormatter.format(scaledSummaryIndicators[indicator].mainValue)+units;
        scaledSummaryIndicators[indicator].recommended = currencyFormatter.format(scaledSummaryIndicators[indicator].recommended)+units;
        scaledSummaryIndicators[indicator].current = currencyFormatter.format(scaledSummaryIndicators[indicator].current)+units;
      }
      if (indicator === "uv" ) {   //currency indicators, add formatting
        scaledSummaryIndicators[indicator].mainValue = scaledSummaryIndicators[indicator].mainValue+units;
        scaledSummaryIndicators[indicator].recommended = scaledSummaryIndicators[indicator].recommended+units;
        scaledSummaryIndicators[indicator].current = scaledSummaryIndicators[indicator].current+units;
      }
    });

    setSummaryIndicators(scaledSummaryIndicators);

  },[newSummaryIndicators])

  return (

    <div className="review-content-summary-items">
      {
        ["uv", "sl","gmd","gm","tp","np"].map((itemKey, index) => (
          <ValueIndicatorWithBarCharts
            t={t}
            key={itemKey}
            itemKey={itemKey}
            flexGrow={["uv","sl","gmd","gm"].includes(itemKey) ? 2:1}
            indicatorData={summaryIndicators[itemKey]}
          />
          )
        )
      }
    </div>
)}
