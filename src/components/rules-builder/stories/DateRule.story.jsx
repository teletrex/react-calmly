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

import mdx from './docs/DateRule.mdx';

export default {
  title: 'Components/RulesBuilder/DateRule',
  component: RulesBuilder,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Usage = () => {
  const CRITERIA_CONFIG = {
    OPT_IN: { type: 'date' },
  };

  const CRITERIA_DROPDOWN = [
    {
      id: 'OPT_IN',
      text: 'Opt-in date',
    },
  ];

  const INITIAL_RULES = {
    conjunction: CONJUNCTION_AND.id,
    data: [
      {
        criteriaKey: 'OPT_IN',
        data: { operator: 'YEAR_IS', value: 2021 },
      },
      {
        criteriaKey: 'OPT_IN',
        data: { operator: 'IS_AFTER', value: 1640991600000 },
      },
      {
        criteriaKey: 'OPT_IN',
        data: {
          operator: 'IS_WITHIN_THE_LAST',
          value: { period: 'WEEKS', value: 3 },
        },
      },
      {
        criteriaKey: 'OPT_IN',
        data: {
          operator: 'IS_WITHIN_THE_RANGE_OF_THE_LAST',
          value: {
            period: 'WEEKS',
            value: [4, 6],
          },
        },
      },
      {
        criteriaKey: 'OPT_IN',
        data: {
          operator: 'ANNIVERSARY_IS',
          value: { period: 'MONTHS', value: 3, whenRelation: 'AGO' },
        },
      },
      {
        criteriaKey: 'OPT_IN',
        data: {
          operator: 'IS_ONE_OF_THE_FOLLOWING',
          value: [1620165600000, 1620252000000],
        },
      },
      {
        criteriaKey: 'OPT_IN',
        data: {
          operator: 'IS_BETWEEN',
          value: [1640991600000, 1643410800000],
        },
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
