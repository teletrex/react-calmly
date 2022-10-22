/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { mount } from 'enzyme';

import { CONJUNCTION_AND } from '../../constants';
import DragAndDropProvider from '../../../drag-and-drop/DragAndDropProvider';
import RuleElement from '../RuleElement';

import RuleGroup from './RuleGroup';

describe('RuleGroup', () => {
  test('should render correctly', () => {
    const props = {
      RuleElement,
      rule: {
        id: '1',
        conjunction: CONJUNCTION_AND.id,
        data: [
          {
            id: '2',
            key: 'AGE',
            conjunction: CONJUNCTION_AND.id,
            level: 1,
            maxLevelInside: 1,
            data: {
              render: () => 'mock rule',
            },
          },
        ],
      },
    };

    const component = mount(
      <DragAndDropProvider>
        <RuleGroup {...props} />
      </DragAndDropProvider>
    );
    expect(component.find(RuleGroup)).toHaveLength(1);
  });
});
