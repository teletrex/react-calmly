/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { buildClass } from '../components/className';
import { CircleFill } from '@carbon/icons-react';

export const LegendItem = ({ className, value }) => (
  <div className={buildClass('__legend__item')}>
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
};

LegendItem.defaultProps = {
  className: '',
  value: '',
};

const Legend = ({ items }) =>
  items.length ? (
    <div className={buildClass('__legend')}>
      {items.map(({ className, value }) => (
        <LegendItem key={className} className={className} value={value} />
      ))}
    </div>
  ) : null;

Legend.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

Legend.defaultProps = {
  items: [],
};

export default Legend;
