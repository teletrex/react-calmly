/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React  from 'react';
import PropTypes from 'prop-types';

export const BiLevelPercentileIndicator = props => {
  const {
    value,
    width,
    bucketPointWidth,
    showValue,
    ...other
  } = props;

  const bucketCount = Math.floor(100/bucketPointWidth);
  const bucket = Math.floor(value*bucketCount)+1;
  const higherOrderWidth = width * bucket/bucketCount * (typeof value != "undefined" ? 1 : 0);
  const lowerOrderPosition = higherOrderWidth * (value * bucketCount - bucket+1);

  const higherOrderStyle = () => ({
    position:"relative",
    width: higherOrderWidth + "px"
  })
  const lowerOrderStyle = () => ({
    minWidth:"3px",
    marginLeft: lowerOrderPosition +"px"
  })

  if (value >0 )  // negative numbers returned for nulls for db sort since
                  // db2 has no nulls sorting declaration.
    return (
      <div style={{ position:"relative"}}>{showValue && value}
        <div class={"blpi"} style={{ position:"relative", width:"100px"}}>
          <div class={"blpiHigherOrder"} style={higherOrderStyle()}>
            <div class={"blpiLowerOrder"} style={lowerOrderStyle()}>&nbsp;
            </div>
          </div>
        </div>
      </div>
    )
  return null;

}



BiLevelPercentileIndicator.propTypes = {
  value: PropTypes.number,
  width: PropTypes.number,
  bucketPointWidth: PropTypes.number
};

BiLevelPercentileIndicator.defaultProps = {
  value: -0.01,
  width: 100,   // width of indicator in pixels
  bucketPointWidth: 5,  // 5 percentage points per larger order bucket.
  showValue : false
};


