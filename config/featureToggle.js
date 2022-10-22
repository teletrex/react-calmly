/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */

import features from '../features.json';

const DEFAULT_ENV = 'development';

const env = process.env.NODE_ENV || DEFAULT_ENV;

const envFeatures = features[env] || features[DEFAULT_ENV];

const getComponentNameFromStoryPath = filename => {
  const storyPathRegEx = /^.*\/([a-z0-9-_]*)\/[a-z0-9-_]*\.story\.jsx$/gi;
  const componentName = storyPathRegEx.exec(filename);
  return componentName ? componentName[1] : filename;
};

const normalizeList = [].concat(envFeatures).map(feature => {
  const regExWildcardCheck = /^\/(.*)\/(g)?$/g;
  return featureName => {
    regExWildcardCheck.lastIndex = 0;
    const regExResult = regExWildcardCheck.exec(feature);
    return regExResult && regExResult[1]
      ? new RegExp(regExResult[1], [regExResult[2] || '']).test(featureName)
      : feature === featureName;
  };
});

const featureFilter = featureName => normalizeList.some(filterCheck => filterCheck(featureName));

export { getComponentNameFromStoryPath, featureFilter };
