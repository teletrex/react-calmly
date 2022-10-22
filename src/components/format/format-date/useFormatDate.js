/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import { useMemo, useCallback } from 'react';
import moment from 'moment-timezone';
import isNull from 'lodash/isNull';
import { createIntl } from 'react-intl';
import isUndefined from 'lodash/isUndefined';

import useLocalization from '../../../translation/useLocalization';
import { FALLBACK_LOCALE } from '../../../translation/moment';

import { DATE_FORMAT } from './presets';
import { getFormats } from './utils';

const OPTIONS = { customTimeZone: null };

const formatDateFactory = (locale, timeZone, intl) => (value, preset, options = OPTIONS) => {
  if (isNull(value) || isUndefined(value)) {
    return '';
  }

  const instance = moment(value);
  if (!instance.isValid()) {
    return String(value);
  }

  const targetTimeZone = options.customTimeZone || timeZone;
  if (targetTimeZone) {
    instance.tz(targetTimeZone);
  }

  instance.locale([locale, FALLBACK_LOCALE]);

  if (preset === DATE_FORMAT.TIME_AGO) {
    return instance.fromNow();
  }

  if (preset === DATE_FORMAT.MONTH_YEAR) {
    return intl.formatDate(value, {
      year: 'numeric',
      month: 'long',
    });
  }
  return instance.format(preset);
};

export const useFormatDate = () => {
  const { locale, timeZone } = useLocalization();
  const intl = useMemo(() => createIntl({ locale }), [locale]);
  const formatDate = useMemo(() => formatDateFactory(locale, timeZone, intl), [
    locale,
    timeZone,
    intl,
  ]);

  return { formatDate };
};

export const useParseDate = () => {
  const { locale } = useLocalization();
  const re = /^([\d]{1,2})[.,/-]([\d]{1,2})[.,/-]([\d]{1,2})$/;

  const { format, reverseFormat, shortYearFormat } = useMemo(
    () => getFormats(locale, DATE_FORMAT.SHORT_DATE),
    [locale]
  );

  const parseDate = useCallback(
    value => {
      const found = re.exec(value.trim());
      const formatDate = moment(value, format);

      const date =
        found === null
          ? formatDate.isValid()
            ? formatDate
            : moment(value, reverseFormat, true)
          : moment(value, shortYearFormat);

      return date.isValid() ? date.toDate() : '';
    },
    [format, re, shortYearFormat, reverseFormat]
  );

  return { parseDate };
};
