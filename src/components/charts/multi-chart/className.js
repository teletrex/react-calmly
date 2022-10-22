/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import  settings  from '../../../settings';

const { prefix } = settings;
export const buildClass = (sufix = '') => `${prefix}--multi-chart${sufix}`;
