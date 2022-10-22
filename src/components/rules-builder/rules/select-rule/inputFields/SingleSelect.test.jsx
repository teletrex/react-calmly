/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SingleSelect from './SingleSelect';

const options = [
  { label: 'Option 1', value: 'OPTION_1' },
  { label: 'Option 2', value: 'OPTION_2' },
];
const initialValue = options[0].value;

const defaultProps = {
  id: 'TestSelectRuleElement',
  isReadOnly: false,
  options,
  onValueChange: jest.fn(),
};

describe('SingleSelect', () => {
  beforeEach(() => {
    defaultProps.onValueChange.mockReset();
  });

  it('should render correctly', () => {
    const { container } = render(<SingleSelect {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container } = render(<SingleSelect {...defaultProps} value={initialValue} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container, getByText } = render(
      <SingleSelect {...defaultProps} isReadOnly value={initialValue} />
    );
    expect(container).toMatchSnapshot();
    expect(getByText(options[0].label)).toBeInTheDocument();
  });

  it('should set the rule value when a value is entered', () => {
    const { getByRole, getByText } = render(<SingleSelect {...defaultProps} />);

    // expand the value dropdown:
    const dropdown = getByRole('listbox');
    const dropdownButton = within(dropdown).getByRole('button');
    userEvent.click(dropdownButton);

    // select a new value:
    userEvent.click(getByText(options[1].label));

    expect(defaultProps.onValueChange).toHaveBeenCalledWith(options[1].value);
  });

  it('should display the default placeholder', () => {
    const { getByText } = render(<SingleSelect {...defaultProps} />);

    expect(getByText('Choose an option')).toBeInTheDocument();
  });

  it('should display the provided placeholder', () => {
    const { getByText } = render(<SingleSelect {...defaultProps} placeholder="Test dropdown" />);

    expect(getByText('Test dropdown')).toBeInTheDocument();
  });
});
