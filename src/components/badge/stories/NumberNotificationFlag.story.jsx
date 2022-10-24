/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { boolean, number } from '@storybook/addon-knobs/dist';
import { Notification } from '@carbon/icons-react';

import { NumberNotificationFlag } from '../index';
import {Button} from '@carbon/react';

import mdx from './NumberNotificationFlag.mdx';

export const Usage = () => (
  <NumberNotificationFlag
    numberOfNotifications={number('Notification value (numberOfNotifications)', 3)}
    showButton={boolean('Display button (showButton)', true)}
  >
    <Button
      hasIconOnly
      iconDescription="Button icon"
      renderIcon={()=><Notification size={16} />}
      style={{ background: '#13173d' }}
      tooltipAlignment="center"
      tooltipPosition="bottom"
    />
  </NumberNotificationFlag>
);

export default {
  title: 'Components/Badge/NumberNotification',
  component: NumberNotificationFlag,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};
