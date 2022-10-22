/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { storiesOf } from '@storybook/react';

import TablePagination from './TablePagination';

storiesOf('Table/TablePagination', module)
  .add('default', () => <TablePagination />);
