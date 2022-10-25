/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { mount } from 'enzyme';
import settings from '../../settings';
import { Edit } from '@carbon/icons-react';
import { render } from '@testing-library/react';

import ActionIconDropdown from './ActionIconDropdown';

const { prefix } = settings;
const mockProps = {
  items: [
    {
      id: 'option1',
      text: 'Option 1',
      icon:  () => <Edit size={16} />,
      iconAction: () => {},
    },
    { id: 'option2', text: 'Option 2' },
  ],
  onChange: jest.fn(),
  type: 'default',
  disabled: false,
};

describe('ActionIconDropdown', () => {
  test('verify if created', () => {
    const wrapper = mount(<ActionIconDropdown {...mockProps} />);
    expect(wrapper.find(ActionIconDropdown)).toHaveLength(1);
  });

  test('check if dropdown disabled', () => {
    const { getByTestId } = render(<ActionIconDropdown {...mockProps} disabled />);
    expect(
      getByTestId(`${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--arrow`)
    ).toHaveClass(
      `${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--arrow--disabled`
    );
  });
});
