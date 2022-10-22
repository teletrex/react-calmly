/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import { Edit16, Filter16 } from '@carbon/icons-react';
import { OverflowMenu } from 'carbon-components-react';

import Button from '../button/Button';
import Checkbox from '../checkbox';
import { dependencyIssueTag, relegateErrors } from '../utils/test-helpers/relegate-errors';

import ActionToolbar, {
  ActionToolbarItem,
  ActionToolbarTitle,
  ActionToolbarOption,
} from './ActionToolbar';

const actionToolbarStructure = props => (
  <ActionToolbar {...props}>
    <ActionToolbarItem>
      <Button
        hasIconOnly
        iconDescription="Button icon"
        onClick={() => {}}
        renderIcon={Edit16}
        tooltipAlignment="center"
        tooltipPosition="top"
      />
    </ActionToolbarItem>
    <ActionToolbarItem>
      <OverflowMenu renderIcon={Filter16}>
        <ActionToolbarTitle title="FILTER BY" />
        <ActionToolbarOption>
          <Checkbox id="opt-1" labelText="option 1" />
        </ActionToolbarOption>
      </OverflowMenu>
    </ActionToolbarItem>
  </ActionToolbar>
);

describe('ActionToolbar', () => {
  test('verify if created', () => {
    relegateErrors(
      {
        reasonTag: dependencyIssueTag('carbon-components-react'),
        reason: 'Toolbar component deprecated. Additional research needed.',
        expectedErrorCount: 1,
      },
      () => {
        const actionToolbar = mount(actionToolbarStructure());
        expect(actionToolbar.find(ActionToolbar)).toHaveLength(1);
      }
    );
  });

  test('verify if the component has propper class', () => {
    const actionToolbar = mount(actionToolbarStructure({ layout: 'vertical' }));

    expect(
      actionToolbar
        .find(ActionToolbar)
        .childAt(0)
        .childAt(0)
        .hasClass('action-toolbar-vertical')
    ).toBeTruthy();
  });

  test('verify if default layout is applied', () => {
    const actionToolbar = mount(actionToolbarStructure({ layout: 'horizontal' }));
    expect(
      actionToolbar
        .find(ActionToolbar)
        .childAt(0)
        .childAt(0)
        .hasClass('action-toolbar-horizontal')
    ).toBeTruthy();
  });
});
