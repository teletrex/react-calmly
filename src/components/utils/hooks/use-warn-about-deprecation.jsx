/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { useEffect } from 'react';
import warning from 'warning';
/**
 * How to use:
 *
 * class component:
 *
 * class MyComponent extends Component {
 *    constructor() {
 *       warnAboutDeprecation('MyComponent', 'Use component XYZ instead');
 *    }
 *
 *    ...
 * }
 *
 * function component:
 *
 * const MyComponent = () => {
 *    useWarnAboutDeprecation('MyComponent', 'Use component XYZ instead');
 *
 *    ...
 * }
 */
const didWarnAboutDeprecation = {};
export const warnAboutDeprecation = (name, howToUpdateMessage) => {
  if (__DEV__) {
    if (!howToUpdateMessage) {
      throw new Error('Please provide instructions on how to update');
    }
    if (!didWarnAboutDeprecation[name]) {
      warning(
        false,
        `The \`${name}\` component has been deprecated. How to update: ${howToUpdateMessage}`
      );
      didWarnAboutDeprecation[name] = true;
    }
  }
};
export const useWarnAboutDeprecation = (name, howToUpdateMessage) => {
  useEffect(() => {
    warnAboutDeprecation(name, howToUpdateMessage);
  });
};
