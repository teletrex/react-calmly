/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




/* eslint no-template-curly-in-string: 0 */

// comment needed for translation parsing
// t('Value must be greater than or equal to ${min}.')
// t('Value must be less than or equal to ${max}.')
// t('Value is required.')
// t('The first value must be smaller than the second.')
// t('The second value must be greater than the first.')

export const VALIDATION_MESSAGES = {
  min: 'Value must be greater than or equal to ${min}.',
  max: 'Value must be less than or equal to ${max}.',
  required: 'Value is required.',
  rangeFirst: 'The first value must be smaller than the second.',
  rangeSecond: 'The second value must be greater than the first.',
};
