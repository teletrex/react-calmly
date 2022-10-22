/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import { renderWithContext } from '../../utils/testHelpers';
import { IS_OPERATORS, IS_ONE_OF_OPERATORS } from '../constants/operators';

import StringRule from './StringRule';

const defaultInitialOperator = IS_OPERATORS[0];
const defaultInitialValue = 'abc';

describe('StringRule', () => {
  const onValueChange = jest.fn();
  let defaultProps;

  beforeEach(() => {
    onValueChange.mockReset();

    defaultProps = {
      id: 'TestStringRuleElement',
      onValueChange,
      operator: defaultInitialOperator,
      value: defaultInitialValue,
    };
  });

  it('should render correctly', () => {
    const { container } = render(<StringRule {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only', () => {
    const { container } = renderWithContext(<StringRule {...defaultProps} />, { isReadOnly: true });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for read-only and oneOfValues operator', () => {
    const props = {
      ...defaultProps,
      operator: IS_ONE_OF_OPERATORS[0],
      value: ['Foo', 'Bar'],
    };
    const { container } = renderWithContext(<StringRule {...props} />, { isReadOnly: true });
    expect(container).toMatchSnapshot();
  });

  it('should properly render the one of values component', () => {
    const initialValue = ['test', 'abc'];
    const props = {
      ...defaultProps,
      operator: IS_ONE_OF_OPERATORS[0],
      value: initialValue,
    };
    const { getByPlaceholderText, getByText } = render(<StringRule {...props} />);

    expect(getByText(initialValue[0])).toBeInTheDocument();
    expect(getByText(initialValue[1])).toBeInTheDocument();
    expect(getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('should not render any values if the provided operator is empty', () => {
    const props = {
      ...defaultProps,
      operator: null,
    };
    const { container } = render(<StringRule {...props} />);

    expect(container.innerHTML).toBe('');
  });
});
