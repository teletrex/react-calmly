/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { text, boolean } from '@storybook/addon-knobs/dist';
import { Notification } from '@carbon/icons-react';

import { NotificationFlag } from '../index';
import {Button} from '@carbon/react';

import mdx from './NotificationFlag.mdx';

export const Usage = () => (
  <NotificationFlag
    notificationColor={text('Notification icon color (notificationColor)', '#49f9b9')}
    showButton={boolean('Display button (showButton)', true)}
  >
    <Button
      hasIconOnly
      iconDescription="Button icon"
      renderIcon={()=><Notification size={16}/>}
      style={{ background: '#13173d' }}
      tooltipAlignment="center"
      tooltipPosition="bottom"
    />
  </NotificationFlag>
);

export default {
  title: 'Components/Badge/Notification',
  component: NotificationFlag,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};
