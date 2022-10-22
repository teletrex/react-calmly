/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MultipleSelect from './MultipleSelect';

const options = [
  { label: 'Option 1', value: 'OPTION_1' },
  { label: 'Option 2', value: 'OPTION_2' },
  { label: 'Option 3', value: 'OPTION_3' },
];
const initialValue = [options[2].value];

const defaultProps = {
  id: 'TestSelectRuleElement',
  isReadOnly: false,
  options,
  onValueChange: jest.fn(),
};

describe('MultipleSelect', () => {
  beforeEach(() => {
    defaultProps.onValueChange.mockReset();
  });

  it('should render correctly', () => {
    const { container } = render(<MultipleSelect {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a provided value', () => {
    const { container } = render(<MultipleSelect {...defaultProps} value={initialValue} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container, getByText } = render(
      <MultipleSelect {...defaultProps} isReadOnly value={initialValue} />
    );
    expect(container).toMatchSnapshot();
    expect(getByText(options[2].label)).toBeInTheDocument();
  });

  it('should set the rule value when a value is selected', () => {
    const { getAllByRole, getByText } = render(<MultipleSelect {...defaultProps} />);
    const triggerButton = getAllByRole('button')[1];

    // expand the value dropdown:
    fireEvent.click(triggerButton);

    // select a new value:
    fireEvent.click(getByText(options[0].label));
    expect(defaultProps.onValueChange).toHaveBeenCalledWith([options[0].value]);
  });

  it('should add newly selected values to the exiting ones', () => {
    const { getAllByRole, getByText } = render(
      <MultipleSelect {...defaultProps} value={initialValue} />
    );
    const triggerButton = getAllByRole('button')[1];

    // expand the value dropdown:
    fireEvent.click(triggerButton);

    // select a new value:
    fireEvent.click(getByText(options[0].label));
    expect(defaultProps.onValueChange).toHaveBeenCalledWith([options[2].value, options[0].value]);
  });

  it('should properly deselect a value', () => {
    const { getAllByRole, getByText } = render(
      <MultipleSelect {...defaultProps} value={initialValue} />
    );
    const triggerButton = getAllByRole('button')[1];

    // expand the value dropdown:
    fireEvent.click(triggerButton);

    // deselect a value:
    fireEvent.click(getByText(options[2].label));
    expect(defaultProps.onValueChange).toHaveBeenCalledWith([]);
  });

  it('should display the default placeholder', () => {
    const { getByText } = render(<MultipleSelect {...defaultProps} />);

    expect(getByText('Choose an option')).toBeInTheDocument();
  });

  it('should display the provided placeholder', () => {
    const { getByText } = render(<MultipleSelect {...defaultProps} placeholder="Test dropdown" />);

    expect(getByText('Test dropdown')).toBeInTheDocument();
  });
});
