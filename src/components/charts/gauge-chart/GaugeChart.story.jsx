/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { storiesOf } from '@storybook/react';

import GaugeChart from '.';

const chartProps = {
  data: 61,
  title: 'Gauge chart title',
};

storiesOf('Charts/Gauge Chart', module)
  .add('default', () => <GaugeChart {...chartProps} />)
  .add('with formatted data', () => (
    <GaugeChart {...chartProps} dataFormatter={value => `$${value}`} />
  ));
