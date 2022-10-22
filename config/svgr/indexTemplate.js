/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */

const path = require('path');
const utils = require('./utils');

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map(filePath => {
    const basename = path.basename(filePath, path.extname(filePath));
    return `export * from './${basename}'`;
  });
  return `${utils.generatedWarningComment}\n${exportEntries.join('\n')}\n${
    utils.generatedWarningComment
  }`;
}
module.exports = defaultIndexTemplate;
