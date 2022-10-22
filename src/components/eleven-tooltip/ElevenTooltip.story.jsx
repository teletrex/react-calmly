/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';

import { ElevenTooltip } from './ElevenTooltip';
import { Tooltip, Button} from '@carbon/react';

export default {
  title: 'Components/ElevenTooltip',
  component: ElevenTooltip,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Default = () =>
    <div>
      <p>These tooltips are identical at the moment and too big.  They only work on buttons and icons, not plain text.</p>
      <ElevenTooltip text={"This is the tooltip"} align={"bottom"}><Button size={"sm"}>Eleven Tooltip This has a tooltip</Button></ElevenTooltip>
      <Tooltip align={"bottom"} label={"Carbon tooltip itself"} size={"sm"}><Button>Carbon Tooltip</Button></Tooltip>
    </div>

;

