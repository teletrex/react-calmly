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

const useFormatCurrency = () => {
  const { locale } = useLocalization();
  const intl = useMemo(() => createIntl({ locale }), [locale]);
  const formatCurrency = useCallback(
    (value, currency, preset) => {
      if (typeof value !== 'number' || typeof currency !== 'string') {
        return '';
      }
      const currentCurrency = currency.toUpperCase();
      const currentPreset =
        preset && Object.keys(presets).includes(preset.toString().toLowerCase)
          ? preset.toString().toLowerCase
          : 'default';
      try {
        return intl.formatNumber(value, {
          style: 'currency',
          currency: currentCurrency,
          ...presets[currentPreset],
        });
      } catch {
        return '';
      }
    },
    [intl]
  );

  return {
    formatCurrency,
  };
};

export default useFormatCurrency;
