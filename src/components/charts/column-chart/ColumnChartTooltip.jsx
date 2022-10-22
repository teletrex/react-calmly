/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../../settings';

const { prefix } = settings;

const ColumnChartTooltip = ({ data, label }) => {
  const barData = useMemo(() => {
    if (label) {
      const singleBarData = data.filter(item => item.name === label);
      return singleBarData[0];
    }
    return null;
  }, [data, label]);

  if (barData) {
    const { name, value } = barData;

    return (
      <div className={`${prefix}--column-chart__tooltip`}>
        <div className={`${prefix}--column-chart__tooltip-name`}>{name}</div>
        <div className={`${prefix}--column-chart__tooltip-value`}>{value}</div>
      </div>
    );
  }

  return null;
};

ColumnChartTooltip.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  label: PropTypes.string,
};

ColumnChartTooltip.defaultProps = {
  data: [],
  label: '',
};

export default ColumnChartTooltip;
