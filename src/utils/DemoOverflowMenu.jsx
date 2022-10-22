/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import react from 'react';

const overflowMenuDescription = "More actions";
const demoOverflowMenu  =
  <OverflowMenu
    ariaLabel={overflowMenuDescription}
    flipped
    iconDescription={overflowMenuDescription}
    onClick={action('widgetId[actions-and-menu][overflowMenu]::onClick', { depth: 1 })}
    onClose={action('widgetId[actions-and-menu][overflowMenu]::onClose')}
    onOpen={action('widgetId[actions-and-menu][overflowMenu]::onOpen')}
  >
    <OverflowMenuItem
      itemText="Option 1"
      onClick={action('widgetId[actions-and-menu][overflowMenu][option-1]::onClick', {
        depth: -1,
      })}
    />
    <OverflowMenuItem
      itemText="Option 2"
      onClick={action('widgetId[actions-and-menu][overflowMenu][option-2]::onClick', {
        depth: -1,
      })}
    />
  </OverflowMenu>

const DemoOverflowMenu = (props) =>
  ( demoOverflowMenu);

export default DemoOverflowMenu;
