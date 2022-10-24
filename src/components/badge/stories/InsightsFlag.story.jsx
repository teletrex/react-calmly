/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { boolean } from '@storybook/addon-knobs/dist';
import { Notification } from '@carbon/icons-react';

import { InsightsFlag } from '../index';
import {Button} from '@carbon/react';

import mdx from './InsightsFlag.mdx';

export const Usage = () => (
  <InsightsFlag
    showButton={boolean('Display button (showButton)', true)}
    showFlag={boolean('Display notification icon (showFlag)', true)}
  >
    <Button
      hasIconOnly
      iconDescription="Button icon"
      renderIcon={()=><Notification size={16} />}
      style={{ background: '#13173d' }}
      tooltipAlignment="center"
      tooltipPosition="bottom"
    />
  </InsightsFlag>
);

export default {
  title: 'Components/Badge/Insights',
  component: InsightsFlag,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};
