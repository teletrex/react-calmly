/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';

import * as StatusIcons from '../../badge/BadgeIcon';

const SquareIcon = ({ ...props }) => (
  <svg height="8" width="8" {...props}>
    <rect height="8" width="8" />
  </svg>
);

const LegendIcon = ({ item, ...props }) =>
  item.isSquare ? (
    <SquareIcon {...props} />
  ) : (
    <StatusIcons.GenericStatusIconShape {...props}></StatusIcons.GenericStatusIconShape>
  );

LegendIcon.propTypes = {
  item: PropTypes.shape({
    isSquare: PropTypes.bool,
  }).isRequired,
  props: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

LegendIcon.defaultProps = {
  props: {},
};

export default LegendIcon;
