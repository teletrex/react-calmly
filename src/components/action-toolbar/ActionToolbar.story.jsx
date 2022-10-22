/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Add,
  TrashCan,
  Download,
  Edit,
  Filter,

  Link,
  OverflowMenuVertical,
  Run,
  Search,
} from '@carbon/icons-react';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';

import  { OverflowMenuItem, OverflowMenu, Button } from '@carbon/react';
import { FlagFilled as InsightsFlag } from '@carbon/icons-react';


import ActionToolbar, { ActionToolbarItem } from '.';

const actionToolbarStructure = ({ layout, renderIcon, numberOfItems, disabled, showFlag }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <ActionToolbar layout={layout}>
      <ActionToolbarItem>
        <Button
          hasIconOnly
          iconDescription="Button icon"
          onClick={() => {
            action('Button::onClick')();
          }}
          renderIcon={renderIcon}
          tooltipAlignment="center"
          tooltipPosition="top"
        />
      </ActionToolbarItem>

      {numberOfItems > 1 && (
        <ActionToolbarItem>
          <Button
            disabled={disabled}
            hasIconOnly
            iconDescription="Button disabled"
            onClick={() => {
              action('Button::onClick')();
            }}
            renderIcon={()=><Run size={20} />}
            tooltipAlignment="center"
            tooltipPosition="top"
          />
        </ActionToolbarItem>
      )}

      {numberOfItems > 2 && (
        <ActionToolbarItem>
          <Button
            hasIconOnly
            iconDescription="Button icon"
            onClick={() => {
              action('Button::onClick')();
            }}
            renderIcon=<Link size={20}/>
            tooltipAlignment="center"
            tooltipPosition="top"
          />
        </ActionToolbarItem>
      )}

      {numberOfItems > 3 && (
        <ActionToolbarItem>
          <Button
            hasIconOnly
            iconDescription="Button icon"
            onClick={() => {
              action('Button::onClick')();
            }}
            renderIcon=<Download size={20} />
            tooltipAlignment="center"
            tooltipPosition="top"
          />
        </ActionToolbarItem>
      )}

      {numberOfItems > 4 && (
        <ActionToolbarItem>
          <OverflowMenu
            flipped
            renderIcon={() => (
              <InsightsFlag showFlag={showFlag}>
                <OverflowMenuVertical size={20} aria-label="menu" />
              </InsightsFlag>
            )}
          >
            <OverflowMenuItem itemText="Option" />
            <OverflowMenuItem itemText="Option" />
            <OverflowMenuItem itemText="Option" />
            <OverflowMenuItem itemText="Option" />
          </OverflowMenu>
        </ActionToolbarItem>
      )}
    </ActionToolbar>
  </div>
);

const actionToolbarSingle1 = ({ layout, renderIcon, disabled }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <ActionToolbar layout={layout}>
      <ActionToolbarItem>
        <Button
          disabled={disabled}
          hasIconOnly
          iconDescription="Button icon"
          onClick={() => {}}
          renderIcon={renderIcon}
          tooltipAlignment="center"
          tooltipPosition="bottom"
        />
      </ActionToolbarItem>
    </ActionToolbar>
  </div>
);

const actionToolbarSingle2 = ({ layout, disabled, showFlag }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <ActionToolbar layout={layout}>
      <ActionToolbarItem disabled={disabled}>
        <OverflowMenu
          disabled={disabled}
          flipped
          renderIcon={() => (
            <InsightsFlag showFlag={showFlag && !disabled}>
              <OverflowMenuVertical size={20} aria-label="menu" />
            </InsightsFlag>
          )}
        >
          <OverflowMenuItem itemText="Option" />
          <OverflowMenuItem itemText="Option" />
          <OverflowMenuItem itemText="Option" />
          <OverflowMenuItem itemText="Option" />
        </OverflowMenu>
      </ActionToolbarItem>
    </ActionToolbar>
  </div>
);

const icons = {
  'Run (Run from `@carbon/icons-react`)': 'Run',
  'Add (Add from `@carbon/icons-react`)': 'Add',
  'Search (Search from `@carbon/icons-react`)': 'Search',
  'TrashCan(TrashCan from `@carbon/icons-react`)': 'TrashCan',
  'Edit (Edit from `@carbon/icons-react`)': 'Edit',
  'Filter (Filter from `@carbon/icons-react`)': 'Filter',
};

const iconMap = {
  Run,
  Add,
  TrashCan,
  Edit,
  Filter,
  Search,
};

const props = () => {
//  const iconToUse = iconMap[select('Icon (icon)', icons, <Run size={20}/>  )];
  const iconToUse = <Run size={20}/>
  return {
    renderIcon: !iconToUse || iconToUse.svgData ? <Run size={20}/> : iconToUse,
    numberOfItems: select('Element number', [2, 3, 4, 5], 5),
    disabled: boolean('disabled', true),
    showFlag: boolean('show flag', true),
  };
};

const propsSingle1 = () => {
  const iconToUse = iconMap[select('Icon (icon)', icons, <Run size={20}/> )];
  return {
    renderIcon: !iconToUse || iconToUse.svgData ? <Run size={20}/>  : iconToUse,
    disabled: boolean('disabled', true),
  };
};

const propsSingle2 = () => {
  return {
    disabled: boolean('disabled', false),
    showFlag: boolean('show flag', false),
  };
};

storiesOf('WIP/ActionToolbar', module).add('horizontal', () =>
  actionToolbarStructure({ ...props(), layout: 'horizontal' })
);
storiesOf('WIP/ActionToolbar', module).add('vertical', () =>
  actionToolbarStructure({ ...props(), layout: 'vertical' })
);
storiesOf('WIP/ActionToolbar', module).add('single1', () =>
  actionToolbarSingle1({ ...propsSingle1(), layout: 'single' })
);
storiesOf('WIP/ActionToolbar', module).add('single2', () =>
  actionToolbarSingle2({ ...propsSingle2(), layout: 'single' })
);
