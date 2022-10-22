/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import mdx from './ValueIndicator.mdx';

import ValueIndicator from '.';

export default {
  title: 'Components/ValueIndicator',
  component: ValueIndicator,
  decorators: [withKnobs],
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Default = () => (
  <ValueIndicator
    mainPostfix={text('Main postfix', '%')}
    mainValue={number('Main value', 41.4)}
    tagPostfix={text('Tag postfix', '%')}
    tagValue={number('Tag value', 1.4)}
    title={text('Text', 'Sent')}
  />
);
