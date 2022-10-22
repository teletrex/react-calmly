/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { mount } from 'enzyme/build';
import React from 'react';
import { settings } from 'carbon-components';

import SortDropdown, { sortStates } from './SortDropdown';

const { prefix } = settings;

const props = {
  dropdownProps: {
    id: 'carbon-dropdown-example',
    label: 'label',
    items: [
      {
        id: 'column-A',
        text: 'Column A',
      },
      {
        id: 'column-B',
        text: 'Column B',
      },
      {
        id: 'column-C',
      },
    ],
  },
};

describe('SortDropdown', () => {
  let wrapper;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    wrapper = mount(<SortDropdown {...props} onChange={onChangeMock} />);
  });

  test('verify if created', () => {
    expect(wrapper.find(SortDropdown)).toHaveLength(1);

    // open menu
    expect(wrapper.find("div[role='button'].bx--list-box__field")).toHaveLength(1);
    wrapper.find("div[role='button'].bx--list-box__field").simulate('click');
  });

  test('verify opened list', () => {
    const buttonWrapper = wrapper.find("div[role='button'].bx--list-box__field");
    expect(buttonWrapper).toHaveLength(1);

    // open menu
    buttonWrapper.simulate('click');
    expect(wrapper.find(`.${prefix}--list-box__menu-item__option`)).toHaveLength(3);
  });

  test('verify change method', () => {
    wrapper.find("div[role='button'].bx--list-box__field").simulate('click');
    wrapper
      .find(`.${prefix}--list-box__menu-item__option`)
      .first()
      .simulate('click');
    expect(onChangeMock).toHaveBeenCalledWith('column-A', sortStates.ASC);
    wrapper.find("div[role='button'].bx--list-box__field").simulate('click');

    wrapper
      .find(`.${prefix}--list-box__menu-item__option`)
      .first()
      .simulate('click');
    expect(onChangeMock).toHaveBeenCalledWith('column-A', sortStates.DESC);

    wrapper.find("div[role='button'].bx--list-box__field").simulate('click');

    wrapper
      .find(`.${prefix}--list-box__menu-item__option`)
      .first()
      .simulate('click');
    expect(onChangeMock).toHaveBeenCalledWith('column-A', sortStates.ASC);
  });
});
