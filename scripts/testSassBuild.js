/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


/* eslint-disable */
const sass = require('node-sass');
const magicImporter = require('node-sass-magic-importer');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const postCssReplace = require('postcss-replace');
const postCssDuplicates = require('postcss-discard-duplicates');

const { argv } = require('yargs')
  .command('$0 <sassFile>', 'test sass build')
  .option('verbose', {
    alias: 'v',
    type: 'bool',
    description: 'Output css',
  })
  .options('compare', {
    alias: 'c',
    type: 'string',
    description: 'css file to compare with',
  })
  .help();
try {
  const result = sass.renderSync({
    file: argv.sassFile,
    importer: magicImporter({ disableImportOnce: false }),
    includePaths: [path.resolve(__dirname, '../node_modules')],
  });

  const processor = postcss([autoprefixer, postCssDuplicates]).use(
    postCssReplace({
      pattern: /(teletrex-theme\/fonts\/(National_2|Tiempos_Fine))/gi,
      data: {
        'teletrex-theme/fonts/National_2': 'scss/teletrex-theme/fonts/National_2',
        'teletrex-theme/fonts/Tiempos_Fine': 'scss/teletrex-theme/fonts/Tiempos_Fine',
      },
    })
  );

  const processed = processor.process(result.css).css;

  if (argv.v) {
    console.log(processed);
  } else {
    console.log('React-calmly sass output sucessfully built.');
  }
} catch (e) {
  console.log(
    'React-calmly sass output failed to build. Most common cause is missing copy of sass file in rollup.config.js'
  );
  console.log(e.formatted);
  process.exit(1);
}
