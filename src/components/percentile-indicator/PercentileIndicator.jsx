/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React  from 'react';
import PropTypes from 'prop-types';

export const PercentileIndicator = props => {
  const {
    value,
    width,
    bucketPointWidth,
    showValue,
    progress,
    ...other
  } = props;

  const bucketCount = Math.floor(100/bucketPointWidth);
  const bucket = Math.floor(value*bucketCount);
  const higherOrderWidth = width * bucket/bucketCount * (typeof value != "undefined" ? 1 : 0);
  const higherOrderStyle = () => ({
    width: higherOrderWidth + "%"
  })


  if (value >0 || progress )  // negative numbers returned for nulls for db sort since
                  // db2 has no nulls sorting declaration.
    return (
      <div className={"percentile-indicator " + (progress && "progress-background")}>{showValue && value}
        <div className={"percentile-indicator " + (!progress ? "pi"+ higherOrderWidth: "progress")} style={higherOrderStyle()}>
          {showValue ? higherOrderWidth : ""}</div>
      </div>
    )
  return null;
}



PercentileIndicator.propTypes = {
  value: PropTypes.number,
  width: PropTypes.number,
  bucketPointWidth: PropTypes.number
};

PercentileIndicator.defaultProps = {
  value: -0.01,
  width: 100,   // width of indicator in pixels
  bucketPointWidth: 5,  // 5 percentage points per larger order bucket.
  showValue : false
};


