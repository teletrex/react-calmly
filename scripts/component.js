#!/usr/bin/env node
/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


/* eslint-disable */
/**
 * Eleven - Component Generator
 *
 * Use this app to generate new component files:
 * index.js, _component.scss, Component.story.jsx, Component.jsx, Component.test.jsx.
 *
 * Basic usage from project's root folder:
 * $ scripts/component.js --name component-name --dir src/components
 * - This command will generate all files inside the src/components/component-name folder.
 *
 * For more info:
 * $ component.js --help
 *
 */
const { argv } = require('yargs')
  .option('name', {
    alias: 'v',
    type: 'string',
    description: 'Component name in kebab-case format',
  })
  .option('dir', {
    alias: 'd',
    type: 'string',
    description: "Folder where component's folder should be created",
  })
  .option('skip-dir', {
    type: 'boolean',
    description: "Skips component's folder generation and puts files inside the provided directory",
  });
const fs = require('fs');
const chalk = require('chalk');

const basicFilesNames = [
  'index.js',
  '_{kebab}.scss',
  '{BigCamel}.jsx',
  '{BigCamel}.story.jsx',
  '{BigCamel}.test.jsx',
];

const basicFilesContent = {
  'index.js': `export default from './{BigCamel}';`,
  '_{kebab}.scss': `\n\n@mixin {kebab} {\n  .#{$prefix}--{kebab} {\n    // styles\n  }\n}\n\n@include exports('{kebab}') {\n @include {kebab};\n}`,
  '{BigCamel}.jsx': `import React from 'react';\nimport PropTypes from 'prop-types';\nimport settings from '../../settings';\n\nconst { prefix } = settings;\n\nconst {BigCamel} = () => {\n  return (\n    <div className={\`\${prefix}--{kebab}\`}>\n\n    </div>\n  );\n};\n\n{BigCamel}.propTypes = {};\n\n{BigCamel}.defaultProps = {};\n\nexport default {BigCamel};`,
  '{BigCamel}.story.jsx': `import React from 'react';\nimport { storiesOf } from '@storybook/react';\n\nimport {BigCamel} from './{BigCamel}';\n\nstoriesOf('{BigCamel}', module)\n  .add('default', () => <{BigCamel} />);`,
  '{BigCamel}.test.jsx': `import React from 'react';\nimport { mount } from 'enzyme';\n\nimport {BigCamel} from './{BigCamel}';\n\ndescribe('{BigCamel}', () => {\n  test('it renders', () => {\n    const component = mount(<{BigCamel} />);\n    expect(component.find({BigCamel})).toHaveLength(1);\n  });\n});`,
};

const name = argv.name || argv.n;
const dir = argv.dir || argv.d;
const { skipDir } = argv;

if (name && dir) {
  const bigCamelName = name
    .split('-')
    .map(s => `${s.charAt(0).toUpperCase()}${s.substr(1)}`)
    .join('');
  const replaceWildcards = str =>
    str.replace(/{kebab}/gi, name).replace(/{BigCamel}/gi, bigCamelName);

  const fileNames = basicFilesNames.map(replaceWildcards);

  const dirHasSlash = dir[dir.length - 1] === '/';
  const componentFolder = skipDir ? '' : name;
  const componentFolderPath = `${dir}${
    dirHasSlash || !componentFolder ? '' : '/'
  }${componentFolder}`;

  // checking if folder exists
  if (!fs.existsSync(componentFolderPath)) {
    fs.mkdirSync(componentFolderPath, { recursive: true });
  } else {
    console.log(chalk.red('ERROR:'), 'Component not generated, provided directory already exists!');
    process.exit(1);
  }

  const fileContent = {
    ...basicFilesContent,
  };
  for (prop in fileContent) {
    if (fileContent.hasOwnProperty(prop)) {
      fileContent[replaceWildcards(prop)] = replaceWildcards(fileContent[prop]);
    }
  }

  // writing component files
  fileNames.forEach(fileName =>
    fs.writeFileSync(`${componentFolderPath}/${fileName}`, fileContent[fileName] || '')
  );

  // success message
  console.log(chalk.green('SUCCESS!'), `Files generated for ${name} component:`);
  fileNames.forEach(fileName =>
    console.log(chalk.green('+', `${componentFolderPath}/${fileName}`))
  );
} else if (!name) {
  console.log(chalk.red('ERROR:'), 'Please provide a component name in kebab-case format!');
} else if (!dir) {
  console.log(
    chalk.red('ERROR:'),
    'Please provide the directory where component folder should be created!'
  );
}
