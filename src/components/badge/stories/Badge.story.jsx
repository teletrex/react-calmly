/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';

import { STATUS_ICON_POSITION, VALID_STATUS } from '../constants';
import Badge from '../index';

import mdx from './Badge.mdx';

const STATUS_ICON_POSITION_ARRAY = Object.values(STATUS_ICON_POSITION);

export default {
  title: 'Components/Badge',
  component: Badge,
  decorators: [withKnobs, story => <div style={{ width: 150 }}>{story()}</div>],
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Default = () => (
  <Badge
    showLabel={boolean('Display label (showLabel)', true)}
    size={select('Size', ['xs', 's', 'm', 'l'], 's')}
    status={select('Status', VALID_STATUS, 'published')}
    statusIconPosition={select('Status Position', STATUS_ICON_POSITION_ARRAY, 'left')}
    textOnly={boolean('Display label only (textOnly)', false)}
  />
);

Default.parameters = {
  'in-dsm': {
    id: '5fa4088d3af120f21a39a4f8',
  },
};
