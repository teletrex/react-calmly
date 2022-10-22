/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';

const RulesBuilderContext = React.createContext({
  criteriaConfig: {},
  criteriaDropdown: [],
  customLabels: {},
  isLight: false,
  isReadOnly: false,
  maxDepth: Infinity,
  maxOperands: Infinity,
  oneConjunctionMode: null,
  rulesLabels: {},
  totalOperands: null,
});

export default RulesBuilderContext;
