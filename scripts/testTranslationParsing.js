/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


const path = require('path');
const { execSync } = require('child_process');

const enJsonPath = path.resolve(__dirname, '../src/resources/translation/en.json');

const parseCmd = 'yarn parse-i18n';
const diffCmd = `git diff --exit-code ${enJsonPath}`;

const info = `\nThis script will parse translations and fail the en.json file changes.
Keep in mind that if you are running in local environment, you might have changes in the file: ${enJsonPath}\n`;

const parseErrorMsg = `\nError while trying to parse translations "${parseCmd}" \n\n`;

const diffErrorMsg = `\n
Parsing translations caused en.json file to change.
That normally means developer forgot to run "${parseCmd}" and commiting the changes.
If that is not the case, check the error log above or the following error message for more information. \n\n`;

const testTranslation = () => {
  // eslint-disable-next-line no-console
  console.log(info);
  try {
    execSync(parseCmd, { stdio: ['ignore', 'ignore', 'inherit'] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(parseErrorMsg, error.toString());
    process.exit(1);
  }

  try {
    execSync(diffCmd, { stdio: 'inherit' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(diffErrorMsg, error.toString());
    process.exit(1);
  }
};

testTranslation();
