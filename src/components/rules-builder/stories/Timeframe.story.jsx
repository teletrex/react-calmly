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

import mdx from './docs/Timeframe.mdx';

export default {
  title: 'Components/RulesBuilder/Timeframe',
  component: RulesBuilder,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Usage = () => {
  const CRITERIA_CONFIG = {
    NAME: { type: 'string', hasTimeframe: true },
    SCORE: { type: 'number', hasTimeframe: true },
    OPT_IN: { type: 'date', hasTimeframe: true },
  };

  const CRITERIA_DROPDOWN = [
    {
      id: 'SCORE',
      text: 'Scoring score',
    },
    {
      id: 'NAME',
      text: 'Name',
    },
    {
      id: 'OPT_IN',
      text: 'Opt-in date',
    },
  ];

  const INITIAL_RULES = {
    conjunction: CONJUNCTION_AND.id,
    data: [
      {
        criteriaKey: 'SCORE',
        data: { operator: 'IS', value: 30 },
        timeframe: {
          operator: 'WITHIN_THE_LAST',
          value: {
            value: 7,
            period: 'DAYS',
          },
        },
      },
      {
        criteriaKey: 'NAME',
        data: { operator: 'IS_ONE_OF_THE_FOLLOWING', value: ['John Doe', 'Foo Bar'] },
        timeframe: {
          operator: 'EXACTLY',
          value: {
            value: 2,
            period: 'DAYS',
            whenRelation: 'AWAY',
          },
        },
      },
      {
        criteriaKey: 'OPT_IN',
        data: { operator: 'IS_AFTER', value: 1640991600000 },
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
