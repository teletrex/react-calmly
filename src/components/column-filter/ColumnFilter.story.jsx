/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { useTranslation} from "../../translation";

import ColumnFilter from './ColumnFilter';

const options = [
  { text: 'Standard', checked: true, value: 'standard', resultsCount: 4 },
  { text: 'CityCool', checked: true, value: 'city-cool', resultsCount: 4 },
  { text: 'Lorem ipsum', checked: false, value: 'lorem-ipsum', disabled: true, resultsCount: 0 },
  { text: 'Dolor sit', checked: true, value: 'dolor-sit', resultsCount: 4 },
  {
    text: 'Amet consectetur adipisicing elit',
    checked: false,
    value: 'amet',
    disabled: true,
    resultsCount: 0,
  },
];



const defaultProps = () => ({
  onApply: action('Apply'),
  onReset: action('Reset'),
  title: text('Title', 'Filter by tags'),
  subtitle: text('Subtitle', 'Tags'),
  showTags: boolean('Show tags', true),
  searchFieldPlaceholder: text('Search field placeholder', 'Find tags'),
  singleSelection: boolean('Single selection', false),
  overflowMenuProps: {
    flipped: boolean('Flip menu position', false),
  },
});

export const generateOptions = (number = 10) =>
  Array.from({ length: number }).map((_, index) => ({
    text: `Option ${index + 1}`,
    checked: false,
    value: index,
  }));

storiesOf('Components/Column Filter', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const {t} = useTranslation();
      return <ColumnFilter {...defaultProps()} options={options} t={t} />;
    }
  )
  .add('with many options', () => {
      const {t} = useTranslation();
      return <ColumnFilter {...defaultProps()} options={generateOptions(200)} t={t}/>;
    }
  );
