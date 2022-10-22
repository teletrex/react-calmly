/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */

const path = require('path');

/**
 *  Matches string ending with "_DDDpx.svg"
 *  where DDD is any number with at least one digit and where the "_" can also be "-"
 *  It has a capturing group around the digits so we can extract them.
 *  example:
 *    given "something_more_200_99px.svg" we will extract 99
 *    given "something_more_200_aaa_0px.svg" we will extract 0
 *    given "something_more_200_aaa_1000000px.svg" we will extract 1000000
 *    given "something_more_200_aaa999px.svg" nothing will match
 *    given "something_more_200_aaa_999px" nothing will match
 *    given "something_more_200_aaa_999.svg" nothing will match
 *    given "something_more_200_aaa_999px_abc.svg" nothing will match
 */
const sizeRegExp = /[_-](\d+)px\.svg$/g;
/**
 *  Matches string ending with "_DDDxDDDpx.svg"
 *  where DDD is any number with at least one digit and where the "_" can also be "-"
 *  It has two capturing groups around the digits so we can extract them.
 *  example:
 *    given "something_more_200_88x99px.svg" we will extract 88 and 99
 *    given "something_more_200_aaa_999x0px.svg" we will extract 999 and 0
 *    given "something_more_200_aaa_1000000x200px.svg" we will extract 1000000 and 200
 *    given "something_more_200_aaa999x123px.svg" nothing will match
 *    given "something_more_200_aaa_999x123px" nothing will match
 *    given "something_more_200_aaa_999x123.svg" nothing will match
 *    given "something_more_200_aaa_999x123px_abc.svg" nothing will match
 */
const widthHeightRegExp = /[_-](\d+)x(\d+)px\.svg$/g;

/**
 * Used to remove "_DDDxDDDpx" from the end of strings
 * where DDD is any number with at least one digit and where the "_" can also be "-"
 *
 * Will not match if found in the middle, beginning of string.
 */
const replaceDxDpxRegExp = /([_-]\d+x\d+px)$/g;

/**
 * Used to remove "_DDDpx" from the end of strings
 * where DDD is any number with at least one digit and where the "_" can also be "-"
 *
 * Will not match if found in the middle, beginning of string.
 */
const replaceDpxRegExp = /([_-]\d+px)$/g;

/**
 * Used to remove ".svg" from the end of strings
 * where svg is case insensitive
 *
 * Will not match if found in the middle, beginning of string.
 */
const replaceDotSvgRegExp = /\.svg$/gi;

/**
 * used to remove all "_" and "-" from anywhere in the string.
 */
const replaceHyphenUnderscoreRegExp = /[-_]/g;

/**
 * Used to remove "Acoustic_" from the beginning of the string
 * where Acoustic is case insensitive and where the "_" can also be "-"
 *
 * Will not match if found in the middle or end of string.
 */
const replaceAcousticPrefixRegExp = /^Acoustic[-_]/gi;

const compNameFromFilename = f => {
  const name = path.win32
    .basename(f)
    // fix know issue with this particular filename coming from designers.
    // when they fix the file on their side we can remove this.
    .replace('PublishingMyitemsinREVIEW', 'PublishingMyitemsInReview')
    .replace(replaceAcousticPrefixRegExp, '')
    .replace(replaceDotSvgRegExp, '')
    .replace(replaceDxDpxRegExp, '')
    .replace(replaceDpxRegExp, '')
    .replace(replaceHyphenUnderscoreRegExp, '');
  return `${name}Svg`;
};

const getSize = f => {
  const matches = [...f.matchAll(sizeRegExp)];
  let size;
  if (matches?.length) {
    size = parseInt(matches[0][1], 10);
  }
  // we need undefined as string to be used in the template
  // eslint-disable-next-line no-restricted-globals
  return isNaN(size) ? undefined : size;
};

const getWidthHeight = f => {
  const matches = [...f.matchAll(widthHeightRegExp)];
  // we need undefined as string to be used in the template
  let wh = { width: undefined, height: undefined };
  if (matches?.length) {
    wh.width = parseInt(matches[0][1], 10);
    wh.height = parseInt(matches[0][2], 10);
  }
  return wh;
};

module.exports.parseFilename = filename => {
  return {
    name: compNameFromFilename(filename),
    size: getSize(filename),
    ...getWidthHeight(filename),
  };
};

module.exports.generatedWarningComment = `/*
This file was automatically generated using the script:
"yarn generate:svg-components"

Manual changes to this file will eventually be lost.
*/`;
