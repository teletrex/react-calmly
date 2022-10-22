/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';

import PropTypes from "prop-types";

import ElevenTooltip from "../eleven-tooltip";

export const LabeledData = props => {
  const {
    label,
    data,
    className,
    format,
    id,
    currency,
    locale,
  } = props;

  let formattedData = data;
  let modifier = "";
  if (!!format) {
    if (format.toLowerCase() === "number") {
      modifier = "-right-align";
      formattedData = Intl.NumberFormat(locale).format(data);
    }
    if (format.toLowerCase() === "currency") {
      modifier = "-right-align";
      formattedData = Intl.NumberFormat(locale, {style: 'currency', currency: currency}).format(data);
    }
    if (format.toLowerCase() === "tight") {
      modifier = "-tight";
    }
  }

  return (
      <div id={id} key={id} className={"eleven--labeled-data"+ modifier}>
        <ElevenTooltip text={label}>{label}</ElevenTooltip>
        <div/>
        <div className={"eleven--labeled-data--data" + modifier}>{formattedData}</div>
      </div>
    ) ;
};

LabeledData.defaultProps = {
  id: 'labeledData',
  className: '',
  label: 'My Label',
  data: "$42.33"
};

LabeledData.propTypes = {
  /** text, which is shown until the text is written */
  id: PropTypes.string,
  /** text, which is shown until the text is written */
  className: PropTypes.string,
  /** text, which is shown until the text is written */
  label: PropTypes.string,
  /** text, which is shown until the text is written */
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  format: PropTypes.string //"number","string","currency","object"
};
