/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, number, boolean, select} from '@storybook/addon-knobs';

import mdx from './ProgressBar.mdx';

import ProgressBar from './ProgressBar';
const ACTIONS_OPTIONS = Object.freeze({ depth: -1 });
export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: { page: mdx }, // Need to add this param to show the mdx docs
  }
}


export const Default = () => {
  const value = number('Value (value)',.65);

  return (
      <ProgressBar value={value}  onClick={action('onClick',ACTIONS_OPTIONS)}/>
  )
}



