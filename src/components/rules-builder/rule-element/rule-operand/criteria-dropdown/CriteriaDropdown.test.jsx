/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../../utils/testHelpers';

import CriteriaDropdown from './CriteriaDropdown';

const criteriaDropdown = [
  {
    id: 'foo-criteria',
    label: 'FooCriteria',
  },
];

const mockOnCriteriaChange = jest.fn();
const props = {
  onChange: mockOnCriteriaChange,
};

describe('CriteriaDropdown', () => {
  it('should render correctly', () => {
    const wrapper = renderWithContext(<CriteriaDropdown {...props} />, { criteriaDropdown });
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should render readOnly and behave like it', () => {
    const wrapper = renderWithContext(<CriteriaDropdown {...props} />, {
      criteriaDropdown,
      isReadOnly: true,
    });
    const readOnly = wrapper.container.querySelector('.bx--rule-criteria--readonly');

    expect(readOnly).not.toBe(null);
  });

  it('should render readOnly with selectedCriteriaKey', () => {
    const wrapper = renderWithContext(
      <CriteriaDropdown {...props} selectedCriteriaKey="foo-criteria" />,
      { criteriaDropdown, isReadOnly: true }
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should properly click on criteria option', async () => {
    const { getByText } = renderWithContext(<CriteriaDropdown {...props} />, { criteriaDropdown });

    const criteriaDropdownComponent = getByText('Select criteria');
    userEvent.click(criteriaDropdownComponent);

    const criteria = getByText('FooCriteria');
    userEvent.click(criteria);

    expect(mockOnCriteriaChange).toHaveBeenCalledWith('foo-criteria');
  });
});
