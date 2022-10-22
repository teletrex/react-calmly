/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';

import RulesBuilder from '../rules-builder';
import useDataSelectionCriteria from "./useDataSelectionCriteria";

const DataSelectionRuleBuilder = (
  {
    value, // incoming rules
    onRulesChange,
    ...props
  }
) => {


  const dataSelectionCriteria = useDataSelectionCriteria();

  const handleRulesChange = rules => {
    onRulesChange  && onRulesChange(rules)
  }

  return (
    <RulesBuilder
      criteriaConfig={dataSelectionCriteria.criteriaConfig}
      criteriaDropdown={dataSelectionCriteria.criteriaDropdown}
      initialRules={value}
//      value={value}
//    customLabels={}
      isLight={false}
      isReadOnly={false}
      maxDepth={2}
      maxOperands={5}
      onRulesChange={handleRulesChange}
      oneConjunctionMode={"AND"}
    />
  )
}

export default DataSelectionRuleBuilder;
