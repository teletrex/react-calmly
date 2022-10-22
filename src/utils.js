/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import  settings  from './settings';
import classNames from 'classnames';

const { prefix } = settings;

export const createCssClassBuilder = base => (suffix = '') => `${prefix}--${base}${suffix}`;

export const fastScssTransformer = {
  extensions: ['.scss'],
  transform(rawFile) {
    const reg = /(@import ')((..?\/){1,}|(~carbon-components\/scss\/))(globals\/scss\/vendor\/@carbon)/gi;
    return rawFile.replace(
      reg,
      (str, g1, g2, g3, g4, g5) => `${g1}~@carbon/styles/lib/scss/${g5}`
    );
  },
};

export const humanFileSize = size => {
  if (!size) return '0 kB';
  if (!Number.isInteger(size)) return '';
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / 1024 ** i).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
};

export const addMarginForCommonLabel = isMultiple =>
  classNames({
    [`${prefix}--common-label--isMultiple`]: isMultiple,
  });

export const omitProperty = (propertyName, srcProps) => {
  if (propertyName && srcProps) {
    const { [propertyName]: propDataToExclude, ...newProps } = srcProps;
    return newProps;
  }
  return srcProps;
};

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const minimum = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - minimum + 1)) + minimum;
};

/**
 * doublesEquality compares 2 floating point numbers with optional epsilon
 * @param {number} a
 * @param {number} b
 * @param {number} epsilon
 * @returns {boolean}
 */
export const areDoublesEqual = (a, b, epsilon = 0.000001) => {
  return Math.abs(a - b) < epsilon;
};

export const unfocusableElementProps = Object.freeze({
  unselectable: 'on',
  tabIndex: -1,
  focusable: false,
});

export const selectOuterWrapperSvgIcon = node => node.props.children?.[1];
