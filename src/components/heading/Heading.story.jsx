/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/dist';

import mdx from './Heading.mdx';

import { H1, H2, H3, H4, H5, H6 } from '.';

export default {
  title: 'Components/Heading',
  component: H1,
  decorators: [withKnobs],
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Default = () => (
  <>
    <H1 extra>This is for layout headings</H1>
    <br />
    <H1>This is for layout headings</H1>
    <br />
    <H2>This is for layout headings</H2>
    <br />
    <H3>This is for layout headings</H3>
    <br />
    <H4 bold>This is for navigation headings</H4>
    <br />
    <H4>This is for component and layout headings</H4>
    <br />
    <H5>This is for component and layout headings</H5>
    <br />
    <H6>This is for component and layout headings</H6>
  </>
);
