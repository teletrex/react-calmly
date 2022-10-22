/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { text } from '@storybook/addon-knobs';

import { GeneralFlag } from '../index';

import mdx from './GeneralFlag.mdx';

export const Usage = () => (
  <GeneralFlag color={text('Color (color)', '#1bf7a8')}>Label</GeneralFlag>
);

export default {
  title: 'Components/Badge/General',
  component: GeneralFlag,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};
