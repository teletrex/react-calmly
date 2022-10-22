/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { buildClass } from './className';
import { CircleFill } from '@carbon/icons-react';

export const LegendItem = ({ className, value, isActive, onLegendClick }) => (
  <div
    className={buildClass('__legend__item')}
    style={{textDecoration: isActive ? 'none' : 'line-through',
    cursor: onLegendClick ? 'pointer' : 'default'}}
    onClick={() => onLegendClick ? onLegendClick(value) : null}>
      <CircleFill
        className={classNames(buildClass('__legend__icon'), buildClass(`__legend__icon${className}`))}
        size={8}
      />
    {value}
  </div>
);

LegendItem.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  isActive: PropTypes.bool,
  onLegendClick: PropTypes.func
};

LegendItem.defaultProps = {
  className: '',
  value: '',
  isActive: true,
  onLegendClick: null,
};

const Legend = ({ items, onLegendClick }) =>
  items.length ? (
    <div className={buildClass('__legend')}>
      {items.map(({ className, value, active }) => (
        <LegendItem key={className} className={className} value={value} isActive={active} onLegendClick={onLegendClick}/>
      ))}
    </div>
  ) : null;

Legend.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      value: PropTypes.string,
      active: PropTypes.bool
    })
  ),
  onLegendClick: PropTypes.func
};

Legend.defaultProps = {
  items: [],
};

export default Legend;
