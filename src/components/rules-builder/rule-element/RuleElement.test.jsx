/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { mount } from 'enzyme';

import DragAndDropProvider from '../../drag-and-drop/DragAndDropProvider';
import { CONJUNCTION_AND } from '../constants';
import RulesBuilderContext from '../RulesBuilderContext';

import RuleElement from './RuleElement';

const criteriaDropdown = [
  {
    id: 'AGE',
    text: 'Age',
  },
  {
    id: 'NAME',
    text: 'Name',
  },
];

const criteriaConfig = {
  AGE: {
    type: 'number',
  },
  NAME: {
    type: 'string',
  },
};

describe('RuleElement', () => {
  test('should render correctly', () => {
    const props = {
      isFirst: true,
      conjunction: CONJUNCTION_AND.id,
      rule: {
        id: '1',
        key: 'AGE',
        level: 1,
        maxLevelInside: 2,
        data: {
          maxLevelInside: 1,
          level: 2,
          render: () => 'mock rule',
        },
      },
    };

    const component = mount(
      <RulesBuilderContext.Provider
        value={{
          criteriaConfig,
          criteriaDropdown,
          customLabels: {},
          isReadOnly: false,
          maxDepth: Infinity,
          maxOperands: Infinity,
          oneConjunctionMode: null,
        }}
      >
        <DragAndDropProvider>
          <RuleElement {...props} />
        </DragAndDropProvider>
      </RulesBuilderContext.Provider>
    );
    expect(component.find(RuleElement)).toHaveLength(1);
  });
});
