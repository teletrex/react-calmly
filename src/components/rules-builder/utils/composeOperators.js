/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import compact from 'lodash/compact';
import map from 'lodash/map';
import isString from 'lodash/isString';
import find from 'lodash/find';

export const composeOperators = (operators, allowedOperators) =>
  compact(
    map(operators, operator => {
      if (isString(operator)) {
        return find(allowedOperators, ({ value }) => value === operator);
      }

      return operator;
    })
  );
