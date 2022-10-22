/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, select } from '@storybook/addon-knobs';

import RulesBuilder from '../RulesBuilder';
import RulesBuilderSkeleton from '../RulesBuilder.Skeleton';
import { CONJUNCTION_AND, CONJUNCTION_OR } from '../constants';

import mdx from './docs/RulesBuilder.mdx';

export default {
  title: 'Components/RulesBuilder',
  component: RulesBuilder,
  parameters: { chromatic: { disable: false }, docs: { page: mdx }, info: { disable: true } },
};

export const Default = () => {
  const CRITERIA_CONFIG = {
    AGE: {
      type: 'number',
      hasTimeframe: true,
    },
    NAME: {
      type: 'string',
    },
    DATE: {
      type: 'date',
    },
    NUMBER_RULE_GROUPED: {
      type: 'number',
    },
    STRING_RULE_GROUPED: {
      type: 'string',
      placeholder: { textInput: 'Custom String Placeholder' },
    },
    NUMBER_CUSTOMIZED_OPERATORS: {
      type: 'number',
      operators: [
        'IS',
        'BETWEEN',
        {
          label: 'custom operator',
          value: 'CUSTOM_OPERATOR',
        },
      ],
    },
    STRING_CUSTOMIZED_OPERATORS: {
      type: 'string',
      operators: [
        'IS',
        'CONTAINS',
        {
          label: 'custom operator',
          value: 'CUSTOM_OPERATOR',
        },
      ],
    },
  };

  const CRITERIA_DROPDOWN = [
    {
      id: 'AGE',
      text: 'Age',
    },
    {
      id: 'NAME',
      text: 'Name',
    },
    {
      id: 'DATE',
      text: 'Date',
    },
    {
      id: 'GROUP',
      text: 'Grouped',
      sublist: [
        {
          id: 'STRING_RULE_GROUPED',
          text: 'String',
        },
        {
          id: 'NUMBER_RULE_GROUPED',
          text: 'Number',
        },
      ],
    },
    {
      id: 'GROUP_CUSTOMIZED_OPERATORS',
      text: 'Customized operators',
      sublist: [
        {
          id: 'NUMBER_CUSTOMIZED_OPERATORS',
          text: 'Number',
        },
        {
          id: 'STRING_CUSTOMIZED_OPERATORS',
          text: 'String',
        },
      ],
    },
    {
      id: 'CUSTOM_RULE',
      text: 'Custom',
    },
  ];

  const handleRulesChange = args => {
    action('onRulesChange')(args);
    /* eslint-disable-next-line no-console */
    console.log(args);
  };

  return (
    <RulesBuilder
      criteriaConfig={CRITERIA_CONFIG}
      criteriaDropdown={CRITERIA_DROPDOWN}
      isReadOnly={boolean('isReadOnly', false)}
      maxDepth={number('Max. number of levels (nesting)', Infinity, {})}
      maxOperands={number('Max. number of elements (operands)', Infinity, {})}
      oneConjunctionMode={select(
        'Only one conjunction mode',
        [CONJUNCTION_OR.id, CONJUNCTION_AND.id, null],
        null
      )}
      onRulesChange={handleRulesChange}
    />
  );
};
Default.parameters = {
  chromatic: { disable: true },
};

export const Skeleton = () => <RulesBuilderSkeleton />;
