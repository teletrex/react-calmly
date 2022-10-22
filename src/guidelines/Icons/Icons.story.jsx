/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { storiesOf } from '@storybook/react';
import React from 'react';

import { iconElements } from './iconElements';

import Icons from '.';

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};

storiesOf('Guidelines/Icons', module).add(
  'default',
  () => (
    <div style={rowStyle}>
      {iconElements.map((iconElement, index) => {
        return (
          <Icons
            key={index}
            element={iconElement.element}
            iconName={iconElement.label}
            iconVariable={iconElement.variable}
          />
        );
      })}
    </div>
  ),
  { chromatic: { disable: true } }
);
