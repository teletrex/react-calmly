/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import  settings  from '../../settings';

const { prefix } = settings;

export const TRUNCATE_TEXT_CLASS = `${prefix}--text-truncate--end`;

export const INPUT_TYPES = {
  password: 'password',
  text: 'text',
  email: 'email',
  number: 'number',
};

// comment needed for translation parsing
// t('{{fieldName}} must be at least {{minChars}} characters.')
// t('{{fieldName}} cannot exceed {{maxChars}} characters.')

export const DEFAULT_ERROR_MESSAGES = {
  minChars: '{{fieldName}} must be at least {{minChars}} characters.',
  maxChars: '{{fieldName}} cannot exceed {{maxChars}} characters.',
};
