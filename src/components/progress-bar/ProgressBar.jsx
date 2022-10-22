/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React , {useMemo} from 'react';
import PropTypes, {arrayOf} from 'prop-types';
import PercentileIndicator from "../percentile-indicator";

const ProgressBar = ({
  value,
  onClick
}) => {

  return (
    <PercentileIndicator progress={true} bucketPointWidth={1} value={value} onClick={onClick}/>)
};

export default React.memo(ProgressBar);

ProgressBar.propTypes = {
  value : PropTypes.number,
  onClick:PropTypes.func
}

ProgressBar.defaultProps = {
  value : 0.0
}
