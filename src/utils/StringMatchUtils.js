/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import escapeRegExp from 'lodash/escapeRegExp';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';
import flow from 'lodash/flow';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';

import { ifFalse, isFalse, isTrue } from './fp';

/**
 *
 * @param {string} source
 * @param {boolean|function} escape
 * @returns {string}
 */
const escapeRegExpCharacters = (source, escape) => {
  if (isString(source) && source.length) {
    if (isTrue(escape)) {
      return escapeRegExp(source);
    }
    if (isFalse(escape)) {
      return source;
    }
    if (isFunction(escape)) {
      return escape(source) ?? source;
    }
    return escapeRegExp(source);
  }
  return '';
};

/**
 *
 * @param {string} source
 * @returns {RegExp}
 * @param {boolean} ignoreCase
 */
const getRegExp = (source, ignoreCase) => new RegExp(source, ignoreCase ? 'gi' : 'g');

/**
 *
 * @param source
 * @returns {string}
 */
const defaultSanitize = source => {
  if (isNil(source)) {
    return '';
  }
  return source.toString();
};

const OWNER = Symbol('StringMatchUtils::MatchItemsOwner');
const PIECE_DATA = Symbol('StringMatchUtils::MatchItemData');

const Piece = (owner, startPosition, endPosition, isMatched) => ({
  [OWNER]: owner,
  get owner() {
    return this[OWNER];
  },
  [PIECE_DATA]: {
    startPosition,
    endPosition,
    setInvalid() {
      this.invalid = true;
      return this;
    },
  },
  get start() {
    return this[PIECE_DATA].startPosition;
  },
  get end() {
    return this[PIECE_DATA].endPosition;
  },
  ...(isMatched ? { matchedCriteria: true } : undefined),
  get matched() {
    return this.matchedCriteria === true;
  },
  get source() {
    return this[OWNER]?.source;
  },
  get value() {
    return this.source?.slice(this.start, this.end);
  },
});

Piece.createContext = (sourceString, props = {}) => {
  return {
    source: sourceString,
    ...props,
  };
};

const appendValidInto = parts => (context, start, end, matched = undefined) => {
  const piece = Piece(context, start, end, matched);
  if (end - start > 0) {
    parts.push(piece);
  } else {
    piece[PIECE_DATA].setInvalid();
  }
  return piece;
};

/**
 * @param {boolean} ignoreCase
 * @param {boolean|function(src:string): string} escapeTerm
 * @returns {function(term:string, sourceString:string): boolean}}
 */
const hasMatches = ({ ignoreCase = false, escapeTerm = true } = {}) => (term, sourceString) => {
  const searchTerm = escapeRegExpCharacters(term, escapeTerm);
  const stringSrc = defaultSanitize(sourceString);
  if (stringSrc && searchTerm) {
    return getRegExp(searchTerm, ignoreCase).test(stringSrc);
  }
  return false;
};

/**
 * @param {boolean} ignoreCase
 * @param {boolean|function(src:string): string} escapeTerm
 * @returns {function(term:string, sourceString:string): number}}
 */
const matchesCount = ({ ignoreCase = false, escapeTerm = true } = {}) => (term, sourceString) => {
  const searchTerm = escapeRegExpCharacters(term, escapeTerm);
  const stringSrc = defaultSanitize(sourceString);
  if (stringSrc && searchTerm) {
    const match = stringSrc.match(getRegExp(searchTerm, ignoreCase));
    return match ? match.length : 0;
  }
  return 0;
};

/**
 * @param {boolean} ignoreCase
 * @param {boolean|function(src:string): string} escapeTerm
 * @returns {function(term:string, sourceString:string): []}}
 */
const findMatches = ({ ignoreCase = false, escapeTerm = true } = {}) => (term, sourceString) => {
  const matches = [];
  const searchTerm = escapeRegExpCharacters(term, escapeTerm);
  const stringSrc = defaultSanitize(sourceString);

  if (stringSrc && searchTerm) {
    const owner = Piece.createContext(sourceString, { term, method: 'findMatches' });
    const regex = getRegExp(searchTerm, ignoreCase);
    let match = regex.exec(stringSrc);
    while (match) {
      const start = match.index;
      const end = regex.lastIndex;
      appendValidInto(matches)(owner, start, end);
      // to prevent infinite loop,
      // http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
      if (match.index === regex.lastIndex) {
        regex.lastIndex += 1;
      }
      match = regex.exec(stringSrc);
    }
  }
  return matches;
};

/**
 * @param {boolean} ignoreCase
 * @param {boolean|function(src:string): string} escapeTerm
 * @returns {function(term:string, sourceString:string): []}}
 */
const splitWith = ({ ignoreCase = false, escapeTerm = true } = {}) => (term, sourceString) => {
  const result = [];
  const stringSrc = defaultSanitize(sourceString);
  const sourceLength = stringSrc ? stringSrc.length : 0;
  const matchedParts = findMatches({ ignoreCase, escapeTerm })(term, sourceString);
  const owner = Piece.createContext(sourceString, { term, method: 'splitWith' });
  if (matchedParts.length > 0) {
    let lastIndex = 0;
    matchedParts.forEach(matchedItem => {
      appendValidInto(result)(owner, lastIndex, matchedItem.start);
      appendValidInto(result)(owner, matchedItem.start, matchedItem.end, true);
      lastIndex = matchedItem.end;
    });
    appendValidInto(result)(owner, lastIndex, sourceLength);
  } else {
    appendValidInto(result)(owner, 0, sourceLength);
  }
  return result;
};

const defaultSortMatches = (first, second) => first?.start ?? 0 - second?.start ?? 0;

/**
 *
 * @param {Array} processedItems
 * @param {object} current
 * @returns {<{object>[]}
 */
const mergeSameNeighborsReducer = (processedItems, current) => {
  if (processedItems.length === 0) {
    return [current];
  }

  const prev = processedItems.pop();
  if (prev && current && prev.matched === current.matched && prev.end === current.start) {
    processedItems.push(Piece(prev.owner, prev.start, current.end, current.matched));
  } else {
    processedItems.push(prev, current);
  }
  return processedItems;
};
/**
 *
 * @param {{owner: *, start: *, end: *, matched: *, source: *, value: *}[]} pieces
 * @returns {{owner: *, start: *, end: *, matched: *, source: *, value: *}[]}
 */
const toMutable = pieces => {
  return [...(pieces ?? [])].map(({ source, start, end, matched, value, [OWNER]: owner }) => {
    return {
      owner,
      source,
      start,
      end,
      matched,
      value,
    };
  });
};

/* Inspired by https://github.com/bvaughn/highlight-words-core/blob/master/src/utils.js */

/**
 *
 * @param {boolean} ignoreCase
 * @param {boolean|function(src:string): string} escapeTerm
 * @param {boolean} immutable
 * @returns
 * {
 * {has: (function(term:string, sourceString:string): boolean)},
 * {count: (function(term:string, sourceString:string): number)},
 * {find: (function(term:string, sourceString:string): [])},
 * {split: (function(term:string, sourceString:string): [])},
 * }
 */
export const StringMatches = ({ ignoreCase = false, escapeTerm = true, immutable = true } = {}) => {
  StringMatches.regExpEscape = escapeRegExp;
  StringMatches.sanitize = defaultSanitize;

  StringMatches.sort = defaultSortMatches;
  StringMatches.mergeSameNeighborsReducer = mergeSameNeighborsReducer;

  const thisHas = hasMatches({ ignoreCase, escapeTerm });
  const thisCount = matchesCount({ ignoreCase, escapeTerm });

  const thisFind = cond([
    [ifFalse(immutable), flow([findMatches({ ignoreCase, escapeTerm }), toMutable])],
    [stubTrue, findMatches({ ignoreCase, escapeTerm })],
  ]);

  const thisSplit = cond([
    [ifFalse(immutable), flow([splitWith({ ignoreCase, escapeTerm }), toMutable])],
    [stubTrue, splitWith({ ignoreCase, escapeTerm })],
  ]);

  return Object.freeze({
    has: thisHas,
    count: thisCount,
    find: thisFind,
    split: thisSplit,
  });
};
