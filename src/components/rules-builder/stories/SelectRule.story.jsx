/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';

import RulesBuilder from '../RulesBuilder';
import { CONJUNCTION_AND } from '../constants';

import mdx from './docs/SelectRule.mdx';

export default {
  title: 'Components/RulesBuilder/SelectRule',
  component: RulesBuilder,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Usage = () => {
  const exampleOptions = [
    { label: 'Option 1', value: 'OPTION_1' },
    { label: 'Option 2', value: 'OPTION_2' },
    { label: 'Option 3', value: 'OPTION_3' },
    { label: 'Option 4', value: 'OPTION_4' },
  ];

  const CRITERIA_CONFIG = {
    SINGLE: {
      type: 'select',
      isMultiple: false,
      options: exampleOptions,
    },
    MULTIPLE: {
      type: 'select',
      isMultiple: true,
      options: exampleOptions,
    },
  };

  const CRITERIA_DROPDOWN = [
    {
      id: 'SINGLE',
      text: 'Single',
    },
    {
      id: 'MULTIPLE',
      text: 'Multiple',
    },
  ];

  const INITIAL_RULES = {
    conjunction: CONJUNCTION_AND.id,
    data: [
      {
        criteriaKey: 'SINGLE',
        data: { operator: 'IS', value: 'OPTION_3' },
      },
      {
        criteriaKey: 'MULTIPLE',
        data: { operator: 'IS', value: ['OPTION_2', 'OPTION_3'] },
      },
    ],
  };

  return (
    <RulesBuilder
      criteriaConfig={CRITERIA_CONFIG}
      criteriaDropdown={CRITERIA_DROPDOWN}
      initialRules={INITIAL_RULES}
      isReadOnly={boolean('isReadOnly', false)}
      maxDepth={number('Max. number of levels (nesting)', Infinity, {})}
      onRulesChange={action('onRulesChange')}
    />
  );
};
