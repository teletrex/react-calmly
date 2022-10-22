/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { Sector } from 'recharts';
import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../../settings';
import noop from 'lodash/noop';

const RADIAN = Math.PI / 180;
const { prefix } = settings;

export const PieChartActiveShape = props => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    midAngle,
    color,
    stroke,
    onMouseLeave,
    onMouseOver,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + 5 * cos;
  const sy = cy + 5 * sin;

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <Sector
      className={`${prefix}--pie-chart-active-shape`}
      color={color}
      cx={sx}
      cy={sy}
      endAngle={endAngle}
      innerRadius={innerRadius}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      outerRadius={outerRadius}
      startAngle={startAngle}
      stroke={stroke}
    />
  );
};

PieChartActiveShape.propTypes = {
  color: PropTypes.string.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number,
  midAngle: PropTypes.number.isRequired,
  onMouseLeave: PropTypes.func,
  onMouseOver: PropTypes.func,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
};

PieChartActiveShape.defaultProps = {
  innerRadius: 0,
  onMouseLeave: noop,
  onMouseOver: noop,
};
