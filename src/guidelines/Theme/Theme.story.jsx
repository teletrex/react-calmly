/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { storiesOf } from '@storybook/react';
import React from 'react';

import { colors } from './colors';

import Theme from '.';

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};

storiesOf('Guidelines/Theme', module).add('Color', () => (
  <div style={rowStyle}>
    {colors.map(color => {
      return <Theme colorCode={color.colorCode} colorVariable={color.colorVariable} />;
    })}
  </div>
));
