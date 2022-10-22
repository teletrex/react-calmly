/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { HAS_OPERATORS } from '../constants/operators';

import CustomRule from './CustomRule';

const FooComponent = ({ value, onChange }) => {
  const handleChange = ({ target }) => onChange(target.value);
  return <input aria-label="foo input" onChange={handleChange} value={value} />;
};

describe('CustomRule', () => {
  const defaultProps = {
    config: {
      inputComponent: FooComponent,
    },
    value: 'foo value',
    operator: HAS_OPERATORS[0],
    onValueChange: jest.fn(),
  };

  beforeEach(() => jest.resetAllMocks());

  it('should pass values to inputComponent', () => {
    const { getByDisplayValue } = render(<CustomRule {...defaultProps} />);

    expect(getByDisplayValue('foo value')).toBeInTheDocument();
  });

  it('should call onChange handler in inputComponent', () => {
    const { getByLabelText } = render(<CustomRule {...defaultProps} />);

    fireEvent.change(getByLabelText('foo input'), { target: { value: 'bar value' } });

    expect(defaultProps.onValueChange).toHaveBeenCalledWith('bar value');
  });

  it('should not render anything if no inputComponent was provided', () => {
    const props = {
      ...defaultProps,
      config: {},
    };
    const { container } = render(<CustomRule {...props} />);

    expect(container.innerHTML).toBe('');
  });
});
