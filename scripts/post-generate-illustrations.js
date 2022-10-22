/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


const fs = require('fs');
const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const yargs = require('yargs');

const { generatedWarningComment, parseFilename } = require('../config/svgr/utils');

const { argv } = yargs
  .option('input', {
    alias: 'i',
    type: 'string',
    description: 'Path to the input dir, containing raw svgs',
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'Path to the output dir',
  });

const indexJSXPath = path.resolve(__dirname, '..', argv.output, 'index.jsx');
const indexJSPath = path.resolve(__dirname, '..', argv.output, 'index.js');
const outputPath = path.resolve(__dirname, '..', argv.output);

const inputPath = path.resolve(__dirname, '..', argv.input);

const rawSvgFilenames = fs.readdirSync(inputPath);

const componentNames = rawSvgFilenames.map(parseFilename).map(({ name }) => name);

const testSVGRenderTemplate = name =>
  `test('renders correctly', () => {
  const { getByLabelText } = render(<${name} aria-label="empty icon" />);
  expect(getByLabelText('empty icon').tagName).toBe('svg');
});`;

const testSVGUniqIdTemplate = name =>
  `test('have unique instance id', () => {
  const {container} = render(<>
    <${name} aria-label="first svg" />
    <${name} aria-label="second svg" />
    </>
  );

  const svgIds = getListOfIds(container, 'svg');
  const gradientIds = getListOfIds(container, 'linearGradient');
  
  const ids = [ ...svgIds, ...gradientIds];

  expect(ids.length).toBe(new Set(ids).size);
});`;

const tests = componentNames.reduce(
  (acc, name) =>
    `${acc}  describe('${name}', () => {
    ${testSVGRenderTemplate(name)}
    ${testSVGUniqIdTemplate(name)}
  });
`,
  ''
);

const testFile = `${generatedWarningComment}
import React from 'react';
import { render } from '@testing-library/react';

import {
  ${componentNames.join(', ')}
} from '.';

const getListOfIds = (container, selector) => Array.from(container.querySelectorAll(selector))
  .map(element => element.id)
  .filter(id => id)

describe('Generated Illustration components', () => {
${tests}
});
${generatedWarningComment}
`;

fs.writeFileSync(path.join(outputPath, 'Illustrations.test.jsx'), testFile);

fs.renameSync(indexJSXPath, indexJSPath);
