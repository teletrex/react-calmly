/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';


import ComboButton from './ComboButton';
import {Add} from '@carbon/icons-react';
import {OverflowMenuItem} from "@carbon/react";
import { action } from '@storybook/addon-actions';


export default {
  title: 'Components/ComboButton',
  component: ComboButton
}

export const Default = () =>
<>
  <ComboButton
    renderIcon={<Add size={16} />}
    onClick={action('Default Action::onClick', { depth: -1 })}
  >
    <OverflowMenuItem itemText="Upload Products" onClick={action('Item2::onClick', { depth: -1 })}/>
    <OverflowMenuItem itemText="Enter Items" onClick={action('Item3::onClick', { depth: -1 })} />

  </ComboButton>
  <br />
  <ComboButton
    renderIcon={<Add size={16} />}
    caption={"Select"}
    onClick={action('Default Action::onClick', { depth: -1 })}
  >
    <OverflowMenuItem itemText="Upload Products" onClick={action('Item2::onClick', { depth: -1 })}/>
    <OverflowMenuItem itemText="Enter Items" onClick={action('Item3::onClick', { depth: -1 })} />

  </ComboButton>
</>
