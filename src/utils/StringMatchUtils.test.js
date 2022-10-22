/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { StringMatches } from './StringMatchUtils';

describe('StringMatchUtils', () => {
  const IN_STRING = 'Yep, Is this is a String to find matches correct to criteria[s] ?';
  const IN_STRING_WITH_REPEATS = 'HmmMMmm..., repeatable chars like ours "[loooOoooooong]" texts ?';
  const matched = true;
  const matchesDefault = StringMatches();
  const sensitive = StringMatches({ ignoreCase: false });
  const nonSensitive = StringMatches({ ignoreCase: true });
  const noTermEscape = StringMatches({ escapeTerm: false });
  const myEscapeFunction = str => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

  describe('methods should work safe by default', () => {
    it('if params are wrong and/or undefined', () => {
      expect(matchesDefault.has(undefined, undefined)).toBeFalsy();
      expect(matchesDefault.count(undefined, undefined)).toBe(0);

      expect(matchesDefault.find(undefined, undefined)).toEqual([]);
      expect(matchesDefault.find('Y', undefined)).toEqual([]);
      expect(matchesDefault.find(undefined, IN_STRING)).toEqual([]);

      expect(matchesDefault.split(undefined, undefined)).toEqual([]);
      expect(matchesDefault.split('Y', undefined)).toEqual([]);
      expect(matchesDefault.split(undefined, IN_STRING)).toMatchObject([{ start: 0, end: 65 }]);

      expect(StringMatches({ escapeTerm: () => undefined }).has('Yep', IN_STRING)).toBeTruthy();
      expect(StringMatches({ escapeTerm: "I don't know" }).has('Yep', IN_STRING)).toBeTruthy();

      expect(matchesDefault.has('', '')).toBeFalsy();
      expect(matchesDefault.count('', '')).toBe(0);
      expect(matchesDefault.find('', '')).toEqual([]);
      expect(matchesDefault.split('', '')).toEqual([]);

      expect(matchesDefault.has('', IN_STRING)).toBeFalsy();
      expect(matchesDefault.count('', IN_STRING)).toBe(0);
      expect(matchesDefault.find('', IN_STRING)).toEqual([]);
      expect(matchesDefault.split('', IN_STRING)).toMatchObject([{ start: 0, end: 65 }]);
    });
  });

  describe('has()', () => {
    it('sensitive', () => {
      expect(sensitive.has('y', IN_STRING)).toBeFalsy();
      expect(sensitive.has('Y', IN_STRING)).toBeTruthy();
      expect(sensitive.has('string', IN_STRING)).toBeFalsy();
      expect(sensitive.has('stRing', IN_STRING)).toBeFalsy();
      expect(sensitive.has('String', IN_STRING)).toBeTruthy();
      expect(sensitive.has('?', IN_STRING)).toBeTruthy();
      expect(sensitive.has('[s]', IN_STRING)).toBeTruthy();
    });

    it('non-sensitive', () => {
      expect(nonSensitive.has('y', IN_STRING)).toBeTruthy();
      expect(nonSensitive.has('Y', IN_STRING)).toBeTruthy();
      expect(nonSensitive.has('string', IN_STRING)).toBeTruthy();
      expect(nonSensitive.has('stRing', IN_STRING)).toBeTruthy();
      expect(nonSensitive.has('String', IN_STRING)).toBeTruthy();
      expect(nonSensitive.has('?', IN_STRING)).toBeTruthy();
      expect(nonSensitive.has('[s]', IN_STRING)).toBeTruthy();
    });

    it('non-term-escape', () => {
      expect(noTermEscape.has('Y', IN_STRING)).toBeTruthy();
      expect(noTermEscape.has('String', IN_STRING)).toBeTruthy();
      expect(() => noTermEscape.has('?', IN_STRING)).toThrow(Error);
      expect(() => noTermEscape.has('[', IN_STRING)).toThrow(Error);
    });

    it('using custom term-escape', () => {
      const myEscape = jest.fn(myEscapeFunction).mockName('myEscapeFunction::has');
      const myMatches = StringMatches({ escapeTerm: myEscape });
      expect(myMatches.has('Y', IN_STRING)).toBeTruthy();
      expect(myMatches.has('String', IN_STRING)).toBeTruthy();
      expect(myMatches.has('?', IN_STRING)).toBeTruthy();
      expect(myMatches.has('[', IN_STRING)).toBeTruthy();
      expect(myEscape).toHaveBeenCalledTimes(4);
    });
  });

  describe('count()', () => {
    it('sensitive', () => {
      expect(sensitive.count('y', IN_STRING)).toBe(0);
      expect(sensitive.count('Y', IN_STRING)).toBe(1);
      expect(sensitive.count('string', IN_STRING)).toBe(0);
      expect(sensitive.count('stRing', IN_STRING)).toBe(0);
      expect(sensitive.count('String', IN_STRING)).toBe(1);
      expect(sensitive.count('?', IN_STRING)).toBe(1);
      expect(sensitive.count('to', IN_STRING)).toBe(2);
      expect(sensitive.count('tO', IN_STRING)).toBe(0);
      expect(sensitive.count('To', IN_STRING)).toBe(0);
      expect(sensitive.count('is', IN_STRING)).toBe(2); // ..this is..
      expect(sensitive.count('[s]', IN_STRING)).toBe(1);
    });

    it('non-sensitive', () => {
      expect(nonSensitive.count('y', IN_STRING)).toBe(1);
      expect(nonSensitive.count('Y', IN_STRING)).toBe(1);
      expect(nonSensitive.count('string', IN_STRING)).toBe(1);
      expect(nonSensitive.count('stRing', IN_STRING)).toBe(1);
      expect(nonSensitive.count('String', IN_STRING)).toBe(1);
      expect(nonSensitive.count('?', IN_STRING)).toBe(1);
      expect(nonSensitive.count('to', IN_STRING)).toBe(2);
      expect(nonSensitive.count('tO', IN_STRING)).toBe(2);
      expect(nonSensitive.count('To', IN_STRING)).toBe(2);
      expect(nonSensitive.count('is', IN_STRING)).toBe(3); // Is ..this is..
      expect(nonSensitive.count('[s]', IN_STRING)).toBe(1);
    });

    it('non-term-escape', () => {
      expect(noTermEscape.count('Y', IN_STRING)).toBe(1);
      expect(noTermEscape.count('String', IN_STRING)).toBe(1);
      expect(() => noTermEscape.count('?', IN_STRING)).toThrow(Error);
      expect(() => noTermEscape.count('[', IN_STRING)).toThrow(Error);
    });

    it('using custom term-escape', () => {
      const myEscape = jest.fn(myEscapeFunction).mockName('myEscapeFunction::count');
      const myMatches = StringMatches({ escapeTerm: myEscape });
      expect(myMatches.count('Y', IN_STRING)).toBe(1);
      expect(myMatches.count('String', IN_STRING)).toBe(1);
      expect(myMatches.count('?', IN_STRING)).toBe(1);
      expect(myMatches.count('[', IN_STRING)).toBe(1);
      expect(myEscape).toHaveBeenCalledTimes(4);
    });
  });

  describe('find()', () => {
    it('should return [] if no matches', () => {
      expect(matchesDefault.find('there is no such text there, really', IN_STRING)).toEqual([]);
    });

    it('sensitive', () => {
      expect(sensitive.find('y', IN_STRING)).toEqual([]);
      expect(sensitive.find('Y', IN_STRING)).toMatchObject([{ start: 0, end: 1 }]);
      expect(sensitive.find('string', IN_STRING)).toEqual([]);
      expect(sensitive.find('stRing', IN_STRING)).toEqual([]);
      expect(sensitive.find('String', IN_STRING)).toMatchObject([{ start: 18, end: 24 }]);
      expect(sensitive.find('rin', IN_STRING)).toMatchObject([{ start: 20, end: 23 }]);
      expect(sensitive.find('is', IN_STRING)).toMatchObject([
        { start: 10, end: 12 },
        { start: 13, end: 15 },
      ]);
      expect(sensitive.find('Is', IN_STRING)).toMatchObject([{ start: 5, end: 7 }]);
      expect(sensitive.find('?', IN_STRING)).toMatchObject([{ start: 64, end: 65 }]);
      expect(sensitive.find('[s]', IN_STRING)).toMatchObject([{ start: 60, end: 63 }]);
      expect(sensitive.find(' ', 'I have three spaces')).toMatchObject([
        { start: 1, end: 2 },
        { start: 6, end: 7 },
        { start: 12, end: 13 },
      ]);
      expect(sensitive.find(' ', ' trim  me   better')).toMatchObject([
        { start: 0, end: 1 },
        { start: 5, end: 6 },
        { start: 6, end: 7 },
        { start: 9, end: 10 },
        { start: 10, end: 11 },
        { start: 11, end: 12 },
      ]);
      expect(
        sensitive
          .find(' ', ' trim  me   better')
          .sort(StringMatches.sort)
          .reduce(StringMatches.mergeSameNeighborsReducer, [])
      ).toMatchObject([
        { start: 0, end: 1 },
        { start: 5, end: 7 },
        { start: 9, end: 12 },
      ]);
      expect(sensitive.find('m', IN_STRING_WITH_REPEATS)).toMatchObject([
        { start: 1, end: 2 },
        { start: 2, end: 3 },
        { start: 5, end: 6 },
        { start: 6, end: 7 },
      ]);
      expect(
        sensitive
          .find('m', IN_STRING_WITH_REPEATS)
          .sort(StringMatches.sort)
          .reduce(StringMatches.mergeSameNeighborsReducer, [])
      ).toMatchObject([
        { start: 1, end: 3 },
        { start: 5, end: 7 },
      ]);
    });

    it('non-sensitive', () => {
      expect(nonSensitive.find('y', IN_STRING)).toMatchObject([{ start: 0, end: 1 }]);
      expect(nonSensitive.find('Y', IN_STRING)).toMatchObject([{ start: 0, end: 1 }]);
      expect(nonSensitive.find('string', IN_STRING)).toMatchObject([{ start: 18, end: 24 }]);
      expect(nonSensitive.find('stRing', IN_STRING)).toMatchObject([{ start: 18, end: 24 }]);
      expect(nonSensitive.find('String', IN_STRING)).toMatchObject([{ start: 18, end: 24 }]);
      expect(nonSensitive.find('rin', IN_STRING)).toMatchObject([{ start: 20, end: 23 }]);
      expect(nonSensitive.find('is', IN_STRING)).toMatchObject([
        { start: 5, end: 7 },
        { start: 10, end: 12 },
        { start: 13, end: 15 },
      ]);
      expect(nonSensitive.find('Is', IN_STRING)).toMatchObject([
        { start: 5, end: 7 },
        { start: 10, end: 12 },
        { start: 13, end: 15 },
      ]);
      expect(nonSensitive.find('?', IN_STRING)).toMatchObject([{ start: 64, end: 65 }]);
      expect(nonSensitive.find('[s]', IN_STRING)).toMatchObject([{ start: 60, end: 63 }]);
      expect(nonSensitive.find('m', IN_STRING_WITH_REPEATS)).toMatchObject([
        { start: 1, end: 2 },
        { start: 2, end: 3 },
        { start: 3, end: 4 },
        { start: 4, end: 5 },
        { start: 5, end: 6 },
        { start: 6, end: 7 },
      ]);
      expect(
        nonSensitive
          .find('m', IN_STRING_WITH_REPEATS)
          .sort(StringMatches.sort)
          .reduce(StringMatches.mergeSameNeighborsReducer, [])
      ).toMatchObject([{ start: 1, end: 7 }]);
    });

    it('non-term-escape', () => {
      expect(noTermEscape.find('Y', IN_STRING)).toMatchObject([{ start: 0, end: 1 }]);
      expect(() => noTermEscape.find('?', IN_STRING)).toThrow(Error);
    });

    it('using custom term-escape', () => {
      const myEscape = jest.fn(myEscapeFunction).mockName('myEscapeFunction::find');
      const myMatches = StringMatches({ escapeTerm: myEscape });
      expect(myMatches.find('Y', IN_STRING)).toMatchObject([{ start: 0, end: 1 }]);
      expect(myMatches.find('?', IN_STRING)).toMatchObject([{ start: 64, end: 65 }]);
      expect(myEscape).toHaveBeenCalledTimes(2);
    });
  });

  describe('split()', () => {
    it('should return [{start:0, end:[length of source]}] if no matches', () => {
      expect(matchesDefault.split('there is no such text there, really', IN_STRING)).toMatchObject([
        { start: 0, end: 65 },
      ]);
    });

    it('sensitive', () => {
      expect(sensitive.split('rin', IN_STRING)).toMatchObject([
        { start: 0, end: 20 },
        { start: 20, end: 23, matched },
        { start: 23, end: 65 },
      ]);
      expect(sensitive.split('is', IN_STRING)).toMatchObject([
        { start: 0, end: 10 },
        { start: 10, end: 12, matched },
        { start: 12, end: 13 },
        { start: 13, end: 15, matched },
        { start: 15, end: 65 },
      ]);
      expect(sensitive.split('Is', IN_STRING)).toMatchObject([
        { start: 0, end: 5 },
        { start: 5, end: 7, matched },
        { start: 7, end: 65 },
      ]);
      expect(sensitive.split('?', IN_STRING)).toMatchObject([
        { start: 0, end: 64 },
        { start: 64, end: 65, matched },
      ]);
      expect(sensitive.split('[s]', IN_STRING)).toMatchObject([
        { start: 0, end: 60 },
        { start: 60, end: 63, matched },
        { start: 63, end: 65 },
      ]);
      expect(sensitive.split('m', IN_STRING_WITH_REPEATS)).toMatchObject([
        { start: 0, end: 1 },
        { start: 1, end: 2, matched },
        { start: 2, end: 3, matched },
        { start: 3, end: 5 },
        { start: 5, end: 6, matched },
        { start: 6, end: 7, matched },
        { start: 7, end: 64 },
      ]);
      expect(
        sensitive
          .split('m', IN_STRING_WITH_REPEATS)
          .sort(StringMatches.sort)
          .reduce(StringMatches.mergeSameNeighborsReducer, [])
      ).toMatchObject([
        { start: 0, end: 1 },
        { start: 1, end: 3, matched },
        { start: 3, end: 5 },
        { start: 5, end: 7, matched },
        { start: 7, end: 64 },
      ]);
    });

    it('non-sensitive', () => {
      expect(nonSensitive.split('rin', IN_STRING)).toMatchObject([
        { start: 0, end: 20 },
        { start: 20, end: 23, matched },
        { start: 23, end: 65 },
      ]);
      expect(nonSensitive.split('is', IN_STRING)).toMatchObject([
        { start: 0, end: 5 },
        { start: 5, end: 7, matched },
        { start: 7, end: 10 },
        { start: 10, end: 12, matched },
        { start: 12, end: 13 },
        { start: 13, end: 15, matched },
        { start: 15, end: 65 },
      ]);
      expect(nonSensitive.split('Is', IN_STRING)).toMatchObject([
        { start: 0, end: 5 },
        { start: 5, end: 7, matched },
        { start: 7, end: 10 },
        { start: 10, end: 12, matched },
        { start: 12, end: 13 },
        { start: 13, end: 15, matched },
        { start: 15, end: 65 },
      ]);
      expect(nonSensitive.split('?', IN_STRING)).toMatchObject([
        { start: 0, end: 64 },
        { start: 64, end: 65, matched },
      ]);
      expect(nonSensitive.split('[S]', IN_STRING)).toMatchObject([
        { start: 0, end: 60 },
        { start: 60, end: 63, matched },
        { start: 63, end: 65 },
      ]);
      expect(nonSensitive.split('m', IN_STRING_WITH_REPEATS)).toMatchObject([
        { start: 0, end: 1 },
        { start: 1, end: 2, matched },
        { start: 2, end: 3, matched },
        { start: 3, end: 4, matched },
        { start: 4, end: 5, matched },
        { start: 5, end: 6, matched },
        { start: 6, end: 7, matched },
        { start: 7, end: 64 },
      ]);
      expect(
        nonSensitive
          .split('m', IN_STRING_WITH_REPEATS)
          .sort(StringMatches.sort)
          .reduce(StringMatches.mergeSameNeighborsReducer, [])
      ).toMatchObject([
        { start: 0, end: 1 },
        { start: 1, end: 7, matched },
        { start: 7, end: 64 },
      ]);
    });

    it('non-term-escape', () => {
      expect(noTermEscape.split('Y', IN_STRING)).toMatchObject([
        { start: 0, end: 1, matched },
        { start: 1, end: 65 },
      ]);
      expect(() => noTermEscape.split('?', IN_STRING)).toThrow(Error);
    });

    it('using custom term-escape', () => {
      const myEscape = jest.fn(myEscapeFunction).mockName('myEscapeFunction::split');
      const myMatches = StringMatches({ escapeTerm: myEscape });
      expect(myMatches.split('Y', IN_STRING)).toMatchObject([
        { start: 0, end: 1, matched },
        { start: 1, end: 65 },
      ]);
      expect(myMatches.split('?', IN_STRING)).toMatchObject([
        { start: 0, end: 64 },
        { start: 64, end: 65, matched },
      ]);
      expect(myEscape).toHaveBeenCalledTimes(2);
    });
  });
});
