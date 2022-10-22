/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import omitBy from 'lodash/omitBy';
import pick from 'lodash/pick';

const generateRulesOutput = rules => {
  const { conjunction: topLevelConjunction, data: rulesData } = rules;

  const outputData = map(filter(rulesData, 'data'), rule => {
    const { data, conjunction, criteriaKey } = rule;
    const isGroup = isArray(data) && conjunction && !criteriaKey;

    return isGroup
      ? generateRulesOutput(rule)
      : omitBy(
          {
            criteriaKey,
            data: pick(data.ruleData, 'operator', 'value'),
            timeframe: pick(data.ruleTimeframe, 'operator', 'value'),
          },
          isEmpty
        );
  });

  return {
    conjunction: topLevelConjunction,
    data: outputData,
  };
};

export default generateRulesOutput;
