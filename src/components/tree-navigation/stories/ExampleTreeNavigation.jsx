/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { TreeNavigation, TreeNavigationItem } from '../TreeNavigation';
import { omitProperty } from '../../../utils';
import { withTreeDataItems } from '../../../utils/TreeDataUtils';

export const TreeDataNavigationItems = withTreeDataItems({
  itemRenderer: TreeNavigationItem,
  subItemsPath: 'items',
  itemRendererProps: itemData => {
    const { item, index, parent } = itemData;
    const key = `[${index}](${parent?.label ?? ''}->${item.label})`;
    return {
      key,
      onHeadingClick: action('onHeadingClick', { depth: -1 }),
      ...omitProperty('items', item),
    };
  },
});

export const LongTreeNavigationItem = props => (
  <TreeNavigationItem
    {...props}
    expands
    label="Shared reports lorem ipsum dolor sit with looooooooooooooong labeeeeeeeeeeeeeeeeeeeeeeeeels"
    selected={boolean('Long root selected', false)}
  >
    <TreeNavigationItem
      label="Email which is which is looooooooooooooooonger than usuuuuuuuuuuuuuuuual"
      selected={boolean('Long first level selected', false)}
    />
    <TreeNavigationItem label="Mobile push which is looooooooooooooooonger than usuuuuuuuuuuuuuuuual" />
    <TreeNavigationItem
      expands
      label="SMS which is loooooooooooooooooooooooooonger than usuuuuuuuuuuuuuuuual"
      selected={boolean('Long first level group selected', false)}
    >
      <TreeNavigationItem
        label="Nested item which is looooooooooooooooonger than usuuuuuuuuuuuuuuuual"
        selected={boolean('Long second level selected', false)}
      />
      <TreeNavigationItem label="Additional which is looooooooooooooooonger than usuuuuuuuuuuuuuuuual" />
    </TreeNavigationItem>
  </TreeNavigationItem>
);

export const TreeNavigationExample = () => (
  <TreeNavigation>
    <TreeNavigationItem expands label="Campaings" open>
      <TreeNavigationItem label="Email" selected />
      <TreeNavigationItem label="Mobile push" />
      <TreeNavigationItem expands label="SMS">
        <TreeNavigationItem label="Nested item" />
        <TreeNavigationItem label="Additional" />
      </TreeNavigationItem>
    </TreeNavigationItem>
    <TreeNavigationItem expands label="Comparative">
      <TreeNavigationItem label="Email" />
      <TreeNavigationItem label="Mobile push" />
      <TreeNavigationItem label="SMS" />
    </TreeNavigationItem>
    <TreeNavigationItem expands label="Automated">
      <TreeNavigationItem label="Email" />
      <TreeNavigationItem label="Mobile push" />
      <TreeNavigationItem label="SMS" />
    </TreeNavigationItem>
    <TreeNavigationItem expands label="Transactional">
      <TreeNavigationItem label="Email" />
      <TreeNavigationItem label="Mobile push" />
      <TreeNavigationItem label="SMS" />
    </TreeNavigationItem>
    <TreeNavigationItem expands label="Content">
      <TreeNavigationItem label="Email" />
      <TreeNavigationItem label="Mobile push" />
      <TreeNavigationItem label="SMS" />
    </TreeNavigationItem>
    <TreeNavigationItem expands label="My reports">
      <TreeNavigationItem label="Email" />
      <TreeNavigationItem label="Mobile push" />
      <TreeNavigationItem label="SMS" />
    </TreeNavigationItem>
    <LongTreeNavigationItem />
    <TreeNavigationItem expands label="Audiences">
      <TreeNavigationItem label="Email" />
      <TreeNavigationItem label="Mobile push" />
      <TreeNavigationItem label="SMS" />
    </TreeNavigationItem>
  </TreeNavigation>
);
