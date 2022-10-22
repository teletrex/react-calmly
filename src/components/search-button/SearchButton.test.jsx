/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SearchButton from './SearchButton';

describe('SearchButtonContainer', () => {
  it('should render', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(<SearchButton onClick={handleClick} />);

    expect(getByLabelText('Search')).toBeInTheDocument();
  });
  it('should call handle click onClick', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(<SearchButton onClick={handleClick} />);

    fireEvent.click(getByLabelText('Search'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
