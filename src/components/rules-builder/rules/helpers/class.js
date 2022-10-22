/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import classNames from 'classnames';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import  settings  from '../../../../settings';

const { prefix } = settings;

export const getPrefixedClasses = (classes = []) =>
  classNames(map(isArray(classes) ? classes : [classes], className => `${prefix}${className}`));
