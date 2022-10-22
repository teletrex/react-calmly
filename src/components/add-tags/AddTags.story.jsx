/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs, number } from '@storybook/addon-knobs';

import AddTagsInMagicTable from './stories/AddTagsInMagicTable';

import AddTags from '.';

const shapeForm = {
  oval: 'oval',
  square: 'square',
};

export const longTags = [
  'marketing banner',
  'cats',
  'Lorem',
  `This is a very logs tag name with 100 characters and ~\`10!@#$%^&*()-_=+[]{}|:;""''<>../? тестÜß etc`,
  'Lorem ipsum',
  'dolor',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod',
  'adipiscing elit sed do eiusmod',
];

export const Container = ({ min, max, width, step, children }) => {
  const widthKnob = number('Container width', width, { range: true, step, min, max });

  return <div style={{ width: `${widthKnob}px` }}>{children}</div>;
};

const suggestions = ['marketing', 'market', 'macro', 'magic'];
/* eslint-disable */
const onInputChange = () => {
  console.log('onInputChange');
};
/* eslint-enable */
const tagProps = () => {
  return {
    shapeForm: select('tag shape (shapeForm)', shapeForm, 'oval'),
  };
};

const ApplicationAddTags = ({ inlineInputAlwaysOn = false, inline = false, tagsForStory }) => {
  const [tagsState, setTagsState] = useState(tagsForStory);
  return (
    <AddTags
      id="id-for-input"
      inline={inline}
      inlineInputAlwaysOn={inlineInputAlwaysOn}
      onAddTag={setTagsState}
      onDelete={tags => setTagsState(tags)}
      onInputChange={onInputChange}
      suggestions={suggestions}
      tags={tagsState}
      size={"sm"}
      {...tagProps()}
    />
  );
};

storiesOf('Components/AddTags', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <ApplicationAddTags tagsForStory={['marketing', 'banner', 'social media']} />
  ))
  .add('long tags', () => (
    <Container max={1000} min={280} step={1} width={300}>
      <ApplicationAddTags tagsForStory={longTags} />
    </Container>
  ))
  .add('inline', () => <ApplicationAddTags inline tagsForStory={[]} />)
  .add('inline with inlineInputAlwaysOn', () => (
    <ApplicationAddTags inline inlineInputAlwaysOn tagsForStory={[]} />
  ))
  .add('inside MagicTable', () => <AddTagsInMagicTable />);
