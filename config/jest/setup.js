'use strict';
/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */

import React from 'react';

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

// To support storybooks inside jest
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
registerRequireContextHook();

enzyme.configure({ adapter: new Adapter() });

// Needed to support enzyme mount
require('./setupJSDom');

// https://github.com/facebook/react/issues/14050
// Needed to support useEffect in jest tests
React.useEffect = React.useLayoutEffect;

// Needed to use d3 in tests
class SVGPathElement extends HTMLElement {}

window.SVGPathElement = SVGPathElement;

// Needed so that any component that uses sizeme can be jest tested
import sizeMe from 'react-sizeme';

sizeMe.noPlaceholders = true;

// Force the timezone to be the same everywhere
const moment = require.requireActual('moment-timezone');
moment.fn.local = moment.fn.utc; // mock the local function to return utc
jest.doMock('moment', () => {
  moment.tz.setDefault('America/Chicago');
  return moment;
});

Date.now = jest.fn(() => 1537538254000); // mock internal date
Date.prototype.getLocaleString = () => 'Mock Date!';

// Provide global i18next configuration for tests
import { initI18Next } from '../../src/i18n';
initI18Next({ debug: false });

console.error = (error, ...args) => {
  let errorMessage = typeof error === 'string' ? error : error.message;
  args.forEach(argument => {
    errorMessage = errorMessage.replace(/%(s|d|i|o|O)/, argument);
  });
  throw new Error(errorMessage);
};
