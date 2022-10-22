/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import { useMemo, useCallback } from 'react';
import { createIntl } from 'react-intl';

import useLocalization from '../../../translation/useLocalization';

import presets from './presets';

const useFormatNumber = () => {
  const { locale } = useLocalization();
  const intl = useMemo(() => createIntl({ locale }), [locale]);
  const formatNumber = useCallback(
    (value, preset) => {
      if (typeof value !== 'number') {
        return '';
      }
      const currentPreset =
        preset && Object.keys(presets).includes(preset.toString().toLowerCase)
          ? preset.toString().toLowerCase
          : 'default';
      try {
        return intl.formatNumber(value, presets[currentPreset]);
      } catch {
        return '';
      }
    },
    [intl]
  );

  return {
    formatNumber,
  };
};

export default useFormatNumber;
