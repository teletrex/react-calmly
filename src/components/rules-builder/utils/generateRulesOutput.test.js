/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import cloneDeep from 'lodash/cloneDeep';

import { CONJUNCTION_AND } from '../constants';

import generateRulesOutput from './generateRulesOutput';

const INITIAL_RULES = {
  conjunction: CONJUNCTION_AND.id,
  data: [
    {
      criteriaKey: 'NAME',
      data: {
        ruleData: { operator: 'IS', value: 'John Doe' },
      },
    },
    {
      criteriaKey: 'NAME',
      data: {
        ruleData: { operator: 'IS_BLANK' },
      },
    },
  ],
};

const EXPECTED_OUTPUT = {
  conjunction: CONJUNCTION_AND.id,
  data: [
    {
      criteriaKey: 'NAME',
      data: { operator: 'IS', value: 'John Doe' },
    },
    {
      criteriaKey: 'NAME',
      data: { operator: 'IS_BLANK' },
    },
  ],
};

describe('generateRulesOutput', () => {
  let rules;
  let expectedOutput;

  beforeEach(() => {
    rules = cloneDeep(INITIAL_RULES);
    expectedOutput = cloneDeep(EXPECTED_OUTPUT);
  });

  it('should properly generate output', () => {
    expect(generateRulesOutput(rules)).toEqual(expectedOutput);
  });

  it('should properly generate output with nested rules', () => {
    rules.data.push({
      conjunction: CONJUNCTION_AND.id,
      data: [
        {
          criteriaKey: 'NAME',
          data: {
            ruleData: { operator: 'IS_ONE_OF_THE_FOLLOWING', value: ['John Doe', 'Foo Bar'] },
          },
        },
      ],
    });

    expectedOutput.data.push({
      conjunction: CONJUNCTION_AND.id,
      data: [
        {
          criteriaKey: 'NAME',
          data: { operator: 'IS_ONE_OF_THE_FOLLOWING', value: ['John Doe', 'Foo Bar'] },
        },
      ],
    });

    expect(generateRulesOutput(rules)).toEqual(expectedOutput);
  });

  it('should output only the specified values', () => {
    rules.level = 0;
    rules.id = 'testId1';
    rules.operands = 2;
    rules.data[0].level = 1;
    rules.data[1].maxLevelInside = 0;

    expect(generateRulesOutput(rules)).toEqual(expectedOutput);
  });

  it('should include timeframe in the output', () => {
    const testTimeframe = {
      operator: 'WITHIN_THE_LAST',
      value: {
        value: 7,
        period: 'DAYS',
      },
    };

    rules.data = rules.data.map(item => ({
      ...item,
      data: {
        ...item.data,
        ruleTimeframe: testTimeframe,
      },
    }));

    expectedOutput.data = expectedOutput.data.map(item => ({ ...item, timeframe: testTimeframe }));

    expect(generateRulesOutput(rules)).toEqual(expectedOutput);
  });

  it('should not include timeframe in the output if timeframe is empty', () => {
    rules.data = rules.data.map(item => ({
      ...item,
      data: {
        ...item.data,
        ruleTimeframe: {},
      },
    }));

    expect(generateRulesOutput(rules)).toEqual(expectedOutput);
  });
});
