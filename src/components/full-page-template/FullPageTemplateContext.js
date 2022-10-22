/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import noop from 'lodash/noop';

const FullPageTemplateContext = React.createContext({
  tableWrapperRef: null,
  registerTable: noop,
  unregisterTable: noop,
});

export default FullPageTemplateContext;
