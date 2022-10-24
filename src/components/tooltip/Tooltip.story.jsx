/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';

// import { Tooltip } from './Tooltip';
import { Tooltip, Button, Link} from '@carbon/react';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Default = () =>
    <div>
      <p>These tooltips are identical at the moment and too big.  They only work on buttons and icons, not plain text.</p>
      <Tooltip text={"This is the tooltip"} label={"Tooltip"} align={"bottom"}><Button size={"sm"}>This has a tooltip</Button></Tooltip>
      <Tooltip align={"bottom"} label={"Tooltip itself"} size={"sm"}><Button>So does this</Button></Tooltip>
    </div>

;

