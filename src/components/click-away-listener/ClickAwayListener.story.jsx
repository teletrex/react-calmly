/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { storiesOf } from '@storybook/react';

import ClickAwayListener from './ClickAwayListener';

storiesOf('Containers/ClickAwayListener', module)
  .add('default', () => <ClickAwayListener />);
