/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '@carbon/react';

import Types from './Types';
import { tokens } from './tokens';

storiesOf('Guidelines/Types', module).add('Tokens', () => (
  <StructuredListWrapper>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Example</StructuredListCell>
        <StructuredListCell head>Tokens</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      {Object.keys(tokens[0]).map(token => {
        return (
          <Types
            key={token}
            body={tokens[0][token].text}
            textStyle={tokens[0][token].style}
            variable={token}
          />
        );
      })}
    </StructuredListBody>
  </StructuredListWrapper>
));
