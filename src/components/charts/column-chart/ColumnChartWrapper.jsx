/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer } from 'recharts';

const ColumnChartWrapper = ({ children, maximize }) => {
  if (!maximize) {
    return <>{children}</>;
  }

  return (
    <ResponsiveContainer height="90%" width="100%">
      {children}
    </ResponsiveContainer>
  );
};

ColumnChartWrapper.defaultProps = {
  maximize: false,
};

ColumnChartWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  maximize: PropTypes.bool,
};

export default ColumnChartWrapper;
