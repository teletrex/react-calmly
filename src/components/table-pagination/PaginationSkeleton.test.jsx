/* <LICENSE>
 *
 * Copyright (C) 2020 Acoustic, L.P. All rights reserved.
 *
 * NOTICE: This file contains material that is confidential and proprietary to
 * Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
 * industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
 * Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
 * prohibited.
 *
 * </LICENSE>
 *  */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { PaginationSkeleton } from './PaginationSkeleton';

describe('Not found page', () => {
  test('verify if created', () => {
    const wrapper = mount(<PaginationSkeleton />);
    expect(wrapper.find(PaginationSkeleton)).toHaveLength(1);
  });

  test('verify if class is passed', () => {
    const testClassName = 'test__class';
    const wrapper = shallow(<PaginationSkeleton className={testClassName} />);
    expect(wrapper.find(`.${testClassName}`)).toHaveLength(1);
  });
});
