/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import PropTypes from 'prop-types';
import React from 'react';
import { ProgressIndicator } from '@carbon/react';
import  settings  from '../../settings';

import { useWarnAboutDeprecation } from '../utils/hooks/use-warn-about-deprecation';

const { prefix } = settings;

export const VerticalProgressIndicator = props => {
  useWarnAboutDeprecation(
    'VerticalProgressIndicator',
    'This component is deprecated. Use vertical variant prop in ProgressIndicator instead.'
  );
  return <ProgressIndicator {...props} className={`${prefix}--progress--vertical`} />;
};

VerticalProgressIndicator.propTypes = {
  currentIndex: PropTypes.number,
};

VerticalProgressIndicator.defaultProps = {
  currentIndex: 1,
};
