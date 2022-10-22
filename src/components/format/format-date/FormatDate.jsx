/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';

import { useFormatDate } from './useFormatDate';
import { DATE_FORMAT } from './presets';

const FormatDate = ({ value, preset }) => {
  const { formatDate } = useFormatDate();

  const formattedValue = formatDate(value, preset);
  return <>{formattedValue}</>;
};

FormatDate.propTypes = {
  preset: PropTypes.oneOf([
    DATE_FORMAT.DATE,
    DATE_FORMAT.DATE_TIME,
    DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY,
    DATE_FORMAT.TIME,
    DATE_FORMAT.TIME_WITH_SECONDS,
    DATE_FORMAT.SHORT_DATE,
    DATE_FORMAT.TIME_AGO,
    DATE_FORMAT.MONTH_YEAR,
  ]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
};

FormatDate.displayName = 'FormatDate';

export default FormatDate;
