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

import mdx from './docs/StringRule.mdx';

export default {
  title: 'Components/RulesBuilder/StringRule',
  component: RulesBuilder,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Usage = () => {
  const CRITERIA_CONFIG = {
    NAME: { type: 'string' },
    CRM: {
      type: 'string',
      operators: [
        {
          value: 'IS_ASSOCIATED',
          label: 'Is associated with any CRM opportunities at this stage',
          inputType: 'singleValue',
        },
        {
          value: 'IS_NOT_ASSOCIATED',
          label: 'Is not associated with any CRM opportunities at this stage',
          inputType: 'singleValue',
        },
      ],
      disableCriteriaReselect: true,
    },
  };

  const CRITERIA_DROPDOWN = [
    {
      id: 'NAME',
      text: 'Name',
    },
    {
      id: 'CRM',
      text: 'CRM opportunities',
    },
  ];

  const INITIAL_RULES = {
    conjunction: CONJUNCTION_AND.id,
    data: [
      {
        criteriaKey: 'NAME',
        data: { operator: 'IS', value: 'John Doe' },
      },
      {
        criteriaKey: 'NAME',
        data: { operator: 'IS_ONE_OF_THE_FOLLOWING', value: ['John Doe', 'Foo Bar'] },
      },
      {
        criteriaKey: 'NAME',
        data: { operator: 'IS_BLANK' },
      },
      {
        criteriaKey: 'CRM',
        data: { operator: 'IS_ASSOCIATED', value: 'Foo opportunity' },
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
