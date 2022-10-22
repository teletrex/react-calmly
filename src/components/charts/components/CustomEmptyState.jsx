/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import settings from '../../../settings';

import { ContentSvg } from '../../svg-components';

const { prefix } = settings;
const buildClass = (suffix = '') => `${prefix}--recharts-empty-state${suffix}`;

const CustomEmptyState = ({ height, padding, width }) => {
  return (
    <div
      className={buildClass('__wrapper')}
      style={{
        height,
        padding,
        width,
      }}
    >
      <ContentSvg />
      <span className={buildClass('__text')}>No data available</span>
    </div>
  );
};

CustomEmptyState.defaultProps = {
  height: '100%',
  padding: 0,
  width: '100%',
};

CustomEmptyState.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default CustomEmptyState;
