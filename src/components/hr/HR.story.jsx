/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/dist';

import mdx from './HR.mdx';

import HR from '.';

export default {
  title: 'Components/HorizontalLine',
  component: HR,
  decorators: [withKnobs],
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Default = () => <HR />;
