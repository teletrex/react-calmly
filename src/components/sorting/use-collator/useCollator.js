/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import { useMemo } from 'react';

import {useLocalization} from '../../../translation';

import collator from './collator';

const useCollator = preset => {
  const { locale } = useLocalization();
  const { compare, includes } = useMemo(() => collator(locale, preset), [locale, preset]);

  return { compare, includes };
};

export default useCollator;
