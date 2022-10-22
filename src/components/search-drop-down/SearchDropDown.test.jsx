/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { keys } from 'carbon-components-react/es/internal/keyboard';

import Badge from '../badge';

import SearchDropDown, { SearchDropDownPortalAnchor } from './SearchDropDown';
import SearchHeader from './search-drop-down-elements/SearchHeader';
import SearchElement from './search-drop-down-elements/SearchElement';
import SearchElementContent from './search-drop-down-elements/SearchElementContent';
import SearchElementStatus from './search-drop-down-elements/SearchElementStatus';
import SearchGroup from './search-drop-down-elements/SearchGroup';

describe('SearchDropDown', () => {
  const props = {
    handleSelect: jest.fn(),
    selectedElementCallback: jest.fn(),
    showDropdownOnInputFocus: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('verify if keydown work', () => {
    const { getByLabelText } = render(
      <SearchDropDown {...props}>
        <SearchGroup>
          <SearchElement clickable>
            <SearchElementContent>Lorem Ipsum</SearchElementContent>
          </SearchElement>
        </SearchGroup>
      </SearchDropDown>
    );

    fireEvent.keyDown(getByLabelText('search'), keys.Enter);

    expect(props.handleSelect).toHaveBeenCalledTimes(1);
  });

  it('verify if keydown work on sub element', () => {
    const { getByLabelText, getByText } = render(
      <SearchDropDown {...props}>
        <SearchGroup>
          <SearchElement clickable>
            <SearchElementContent>Lorem Ipsum</SearchElementContent>
          </SearchElement>
          <SearchElement clickable>
            <SearchElementContent>Dolor sit amet</SearchElementContent>
          </SearchElement>
          <SearchElement clickable>
            <SearchElementContent>Consectetur adipiscing</SearchElementContent>
          </SearchElement>
        </SearchGroup>
      </SearchDropDown>
    );

    fireEvent.change(getByLabelText('search'), { target: { value: 'test' } });
    expect(getByText('Lorem Ipsum')).toBeInTheDocument();
    expect(getByText('Dolor sit amet')).toBeInTheDocument();
    expect(getByText('Consectetur adipiscing')).toBeInTheDocument();
  });

  it('verify if SearchDropDown match snapshot', () => {
    const { container } = render(
      <SearchDropDown id="search_drop-down-1">
        <SearchGroup>
          <SearchHeader>Recent</SearchHeader>
          <SearchElement clickable>
            <SearchElementContent>Lorem Ipsum</SearchElementContent>
            <SearchElementStatus>
              <Badge label="New" />
            </SearchElementStatus>
          </SearchElement>
          <SearchElement clickable>
            <SearchElementContent>Dolor sit amet</SearchElementContent>
            <SearchElementStatus>Removed</SearchElementStatus>
          </SearchElement>
          <SearchElement clickable>
            <SearchElementContent>Consectetur adipiscing</SearchElementContent>
          </SearchElement>
        </SearchGroup>
      </SearchDropDown>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('verify if SearchDropDownPortalAnchor match snapshot', () => {
    const { container } = render(<SearchDropDownPortalAnchor className="tst-class" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
