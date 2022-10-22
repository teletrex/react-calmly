/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


const util = require('util');
const path = require('path');
const childProcess = require('child_process');

const execPromise = util.promisify(childProcess.exec);

const babelPath = path.resolve(__dirname, '../node_modules/.bin/babel').replace(/ /g, '\\ ');

const exec = (command, extraEnv) =>
  execPromise(command, {
    stdio: 'inherit',
    env: { ...process.env, ...extraEnv },
  });

const ignoreGlobs = [
  '**/__tests__/*',
  '**/*.test.jsx',
  '**/*.story.jsx',
  '**/*.test.js',
  '**/*.story.js',
  '**/story/*',
  '**/Examples/*',
  'src/umdIndex.js',
].join(',');

async function build() {
  console.log('Starting ESM and CJS build...\n'); /* eslint-disable-line no-console */
  const esPromise = exec(`${babelPath} src -d lib/es --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'es',
  });
  const cjsPromise = exec(`${babelPath} src -d lib/cjs --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'cjs',
  });

  try {
    await esPromise;
  } catch (error) {
    console.log('ESM build failed \n\n', error.stderr); /* eslint-disable-line no-console */
  }

  try {
    await cjsPromise;
  } catch (error) {
    console.log('CJS build failed \n\n', error.stderr); /* eslint-disable-line no-console */
  }
  console.log('ESM and CSJ build complete'); /* eslint-disable-line no-console */
}

build();
