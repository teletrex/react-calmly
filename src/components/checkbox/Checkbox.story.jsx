/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { storiesOf } from '@storybook/react';

import {Checkbox} from '@carbon/react';

storiesOf('Components/Checkbox', module)
  .add('default', () => <Checkbox />)
  .add('Disabled', ()=><Checkbox disabled />);
