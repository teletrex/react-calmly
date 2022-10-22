/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import {Link } from '@carbon/react';

import { LongTreeNavigationItem, TreeDataNavigationItems } from './stories/ExampleTreeNavigation';
import { OverflowMenuTreeNavigation } from './stories/ExampleOverflowMenuTreeNavigation';
import { treeDataExample } from './stories/treeData';

import { TreeNavigation, TreeNavigationItem } from '.';

const TreeNavigationMenu = ({ onSelect = () => {}, withExpands }) => {
  return (
    <TreeNavigation>
      <TreeNavigationItem
        expands={withExpands}
        label="Campaings"
        onHeadingClick={onSelect}
        open
        selected={boolean('Campaings', false)}
      >
        <TreeNavigationItem
          label="Email"
          onHeadingClick={onSelect}
          selected={boolean('Campaings > Email', false)}
        />
        <TreeNavigationItem
          label="Mobile push"
          selected={boolean('Campaings > Mobile push', false)}
        />
        <TreeNavigationItem
          expands={withExpands}
          label="SMS"
          onHeadingClick={onSelect}
          open
          selected={boolean('Campaings > SMS', false)}
        >
          <TreeNavigationItem
            label="Nested item"
            onHeadingClick={onSelect}
            selected={boolean('Campaings > SMS > Nested item', false)}
          />
          <TreeNavigationItem
            label="Additional"
            onHeadingClick={onSelect}
            selected={boolean('Campaings > SMS > Additional', false)}
          />
        </TreeNavigationItem>
      </TreeNavigationItem>
      <TreeNavigationItem
        expands={withExpands}
        label="Comparative"
        onHeadingClick={onSelect}
        open
        selected={boolean('Comparative', false)}
      >
        <TreeNavigationItem heading hideChevron label="SMS" open>
          <TreeNavigationItem
            label="Nested item"
            onHeadingClick={onSelect}
            selected={boolean('Comparative > SMS > Nested item', false)}
          />
          <TreeNavigationItem
            label="Additional"
            onHeadingClick={onSelect}
            selected={boolean('Comparative > SMS > Additional', false)}
          />
        </TreeNavigationItem>
        <TreeNavigationItem
          elementType={Link}
          label="Mobile push"
          onHeadingClick={onSelect}
          selected={boolean('Comparative > Mobile push', false)}
        />
      </TreeNavigationItem>
      <TreeNavigationItem
        expands={withExpands}
        label="Automated"
        onHeadingClick={onSelect}
        selected={boolean('Automated', false)}
      />
      <TreeNavigationItem
        expands={withExpands}
        label="Transactional"
        onHeadingClick={onSelect}
        selected={boolean('Transactional', false)}
      />
      <TreeNavigationItem
        expands={withExpands}
        label="Content"
        onHeadingClick={onSelect}
        selected={boolean('Content', false)}
      />
      <TreeNavigationItem
        expands={withExpands}
        label="My reports"
        onHeadingClick={onSelect}
        selected={boolean('My reports', false)}
      />
      <LongTreeNavigationItem />
    </TreeNavigation>
  );
};

const TreeNavigationMenuWithOverflowMenu = ({ onSelect = () => {}, withExpands }) => {
  return (
    <TreeNavigation>
      <TreeNavigationItem
        chevronLeft
        expands={withExpands}
        label="Campaings"
        onHeadingClick={onSelect}
        open
        selected={boolean('Campaings', false)}
      >
        <TreeNavigationItem
          label="Email"
          onHeadingClick={onSelect}
          selected={boolean('Campaings > Email', false)}
        />
        <TreeNavigationItem
          label="Mobile push"
          onHeadingClick={onSelect}
          selected={boolean('Campaings > Mobile push', false)}
        />
        <TreeNavigationItem
          chevronLeft
          decorator={<OverflowMenuTreeNavigation />}
          expands={withExpands}
          label="SMS"
          onHeadingClick={onSelect}
          open
          selected={boolean('Campaings > SMS', false)}
        >
          <TreeNavigationItem
            label="Nested item"
            onHeadingClick={onSelect}
            selected={boolean('Campaings > SMS > Nested item', false)}
          />
          <TreeNavigationItem
            label="Additional"
            onHeadingClick={onSelect}
            selected={boolean('Campaings > SMS > Additional', false)}
          />
        </TreeNavigationItem>
      </TreeNavigationItem>
    </TreeNavigation>
  );
};

storiesOf('Components/TreeNavigation', module)
  .add('tree item states', () => (
    <TreeNavigationMenu
      onSelect={action('onHeadingClick', { depth: -1 })}
      withExpands={boolean('Items expandable', true)}
    />
  ))
  .add('tree item with overflow menu', () => (
    <div style={{ width: '50%' }}>
      <TreeNavigationMenuWithOverflowMenu
        onSelect={action('onHeadingClick', { depth: -1 })}
        withExpands={boolean('Items expandable', true)}
      />
    </div>
  ))
  .add('tree items from data', () => (
    <TreeNavigation>
      <TreeDataNavigationItems data={treeDataExample} />
    </TreeNavigation>
  ));
