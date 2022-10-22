/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState(false);

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
};

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchContextProvider;
