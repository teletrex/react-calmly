/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';

import  { OverflowMenu, OverflowMenuItem } from '@carbon/react';


export const OverflowMenuTreeNavigation = () => {
  const onClick = e => e.stopPropagation();
  return (
    <OverflowMenu ariaLabel="example" id="storybook-overflow-menu" onClick={onClick}>
      <OverflowMenuItem itemText="Option 1" onClick={onClick} />
      <OverflowMenuItem itemText="Option 2" onClick={onClick} />
      {/*      <OverflowSubmenu itemText="Option 3" onClick={onClick}>
        <OverflowMenuItem itemText="Option 1" onClick={onClick} />
        <OverflowMenuItem itemText="Option 2" onClick={onClick} />
      </OverflowSubmenu>
      */}
    </OverflowMenu>
  );
};
