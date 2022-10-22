/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React, { useContext } from 'react';

import { SearchContext } from '../../contexts/SearchContext';
import  SearchButton  from './SearchButton';

const SearchButtonContainer = () => {
  const { setSearch } = useContext(SearchContext);

  const handleClick = () => {
    setSearch(search => !search);
  };

  return <SearchButton onClick={handleClick} />;
};

export default SearchButtonContainer;
