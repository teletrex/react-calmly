/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import TeleTrexLogo  from './TeleTrexLogo';

export default {
  title: 'Components/TeleTrexLogo',
  component: TeleTrexLogo,
  parameters: {
    backgrounds: {
      default: 'teletrex',
      values: [
        {name: 'teletrex', value: '#353963'}
      ]
    }
  }
}

export const Default = () =>
  <TeleTrexLogo />


