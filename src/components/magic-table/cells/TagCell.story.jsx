/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, number, boolean, select} from '@storybook/addon-knobs';

import mdx from './TagCell.mdx';

import TagCell from './TagCell';

export default {
  title: 'Components/TagCell',
  component: TagCell,
  parameters: {
    docs: { page: mdx }, // Need to add this param to show the mdx docs
  }
}
const ACTIONS_OPTIONS = Object.freeze({ depth: -1 });

export const AllModes = () => (
  <>
    <Positive/>
    <Negative/>
    <Neutral/>
    <Purple/>
  </>
)


export const WithKnobs = () => {
  const status = text('Status','Completed');
  const state = select(
      'Select State',
      {
        Positive : 'green',
        Negative: 'red',
        Neutral: 'gray',
        Purple: 'purple'
      },
      8
    );
  return (
      <TagCell text={ status} color={state}  onClick={action('onClick')} />
  )
}

export const Positive = () => <TagCell text={"Positive"} color={'green'} onClick={action('onClick',ACTIONS_OPTIONS)}/>

export const Negative = () => <TagCell  text={"Negative"} color={'red'} />

export const Neutral = () => <TagCell  text={"Neutral"} color={'gray'} />

export const Purple = () => <TagCell  text={"Purple"} color={'purple'} />



