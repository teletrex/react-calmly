/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { SearchContext } from '../contexts/SearchContext'; // TODO:

import SearchButtonContainer from './SearchButtonContainer';

describe('SearchButtonContainer', () => {
  it('should call setSearch onClick', () => {
    const setSearch = jest.fn();
    const { getByRole } = render(
      <SearchContext.Provider value={{ setSearch }}>
        <SearchButtonContainer />
      </SearchContext.Provider>
    );

    fireEvent.click(getByRole('button'));
    expect(setSearch).toHaveBeenCalledTimes(1);
    expect(setSearch.mock.calls[0][0](true)).toBeFalsy();
  });
});
