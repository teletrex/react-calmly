/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import memoize from 'lodash/memoize';
import values from 'lodash/values';

import PRESETS, { COLLATION_TYPE } from './presets';

const coll = (locale, preset) => {
  const { SORT } = COLLATION_TYPE;

  const currentPreset = preset && Object.keys(PRESETS).includes(preset) ? preset : SORT;
  const opt = PRESETS[currentPreset];

  const { compare } = new Intl.Collator(locale, opt);

  const includes = (search, source) => {
    const { length } = search;
    if (length > source.length) {
      return false;
    }
    for (let i = 0; i <= source.length - length; i += 1) {
      const itemPart = source.substring(i, i + length);
      const result = compare(itemPart, search) === 0;
      if (result) {
        return true;
      }
    }
    return false;
  };

  return { compare, includes };
};

const collator = memoize(coll, (...args) => values(args).join('_'));

export default collator;
