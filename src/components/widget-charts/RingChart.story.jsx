/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { storiesOf } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import RingChart from "./RingChart";


const data = [
  {
    value: 900,
    label:"Deals in process",
  },
  {
    value: 864,
    label:"Deals to approve",
  },
  {
    value: 423,
    label:"Deals proposed",
  }
]

storiesOf('Charts/Ring Chart', module)
  .add('RingChart', () => (
    <div style={{"width":"300px","height":"300px"}}>
      <RingChart width={"100%"}
                 height={"100%"}
                 centerText={"1000"}
                 data={data}
                 maxValue={1000}
      />
    </div>

  )
);
