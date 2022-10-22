/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { Filter } from '@carbon/icons-react';

import { defaultClassName } from '../constants';
import { CircleFill } from '@carbon/icons-react';  // TODO:

const SearchIcon = props => {
  return (
    <>
      <CircleFill className={`${defaultClassName}__status`} size={8} />
      <Filter size={32} {...props} />
    </>
  );
};

export default SearchIcon;
