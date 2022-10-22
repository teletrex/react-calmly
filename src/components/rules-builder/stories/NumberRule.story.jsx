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

import mdx from './docs/NumberRule.mdx';

export default {
  title: 'Components/RulesBuilder/NumberRule',
  component: RulesBuilder,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Usage = () => {
  const CRITERIA_CONFIG = {
    SCORE: { type: 'number' },
  };

  const CRITERIA_DROPDOWN = [
    {
      id: 'SCORE',
      text: 'Scoring score',
    },
  ];

  const INITIAL_RULES = {
    conjunction: CONJUNCTION_AND.id,
    data: [
      {
        criteriaKey: 'SCORE',
        data: { operator: 'IS', value: 30 },
      },
      {
        criteriaKey: 'SCORE',
        data: { operator: 'IS_ONE_OF_THE_FOLLOWING', value: [5, 10, 15] },
      },
      {
        criteriaKey: 'SCORE',
        data: { operator: 'IS_BETWEEN', value: [5, 10] },
      },
      {
        criteriaKey: 'SCORE',
        data: { operator: 'IS_BLANK' },
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
