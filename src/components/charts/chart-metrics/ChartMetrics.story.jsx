/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ChartMetrics from './ChartMetrics';

const props = () => ({
  items: [
    { id: 'checkbox-1', name: 'Metric 1', checked: false },
    { id: 'checkbox-2', name: 'Metric 2', checked: true },
    { id: 'checkbox-3', name: 'Metric 3', checked: false },
  ],
  onChange: action('onChange'),
  placeholder: text('placeholder', 'items'),
  label: text('label', ''),
  helperText: text('helper text', ''),
  limit: number('limit', 2),
});

storiesOf('Charts/ChartMetrics', module).add('default', () => <ChartMetrics {...props()} />);
