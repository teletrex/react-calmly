/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import { mount } from 'enzyme';

import TablePagination from './TablePagination';

describe('TablePagination', () => {
  test('it renders', () => {
    const component = mount(<TablePagination />);
    expect(component.find(TablePagination)).toHaveLength(1);
  });
});
