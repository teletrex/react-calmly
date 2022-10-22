/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */





import get from 'lodash/get';
import split from 'lodash/split';
import { useCallback, useRef, useState } from 'react';
import { COLLATION_TYPE, useCollator } from './use-collator';

export const SORT_STATES = {
   NONE: 'NONE',
   DESC: 'DESC',
   ASC: 'ASC',
};

export function sortingObjToString(sorting) {
  const sortingFieldID = get(sorting, 'sortingFieldID', '');
  const sortingDir = get(sorting, 'sortingDir', '');

  return `${sortingFieldID},${sortingDir}`;
}

const { SORT } = COLLATION_TYPE;

const getNextSortType = sortType => {
  if (sortType === SORT_STATES.NONE) {
    return SORT_STATES.ASC;
  }
  if (sortType === SORT_STATES.ASC) {
    return SORT_STATES.DESC;
  }
  return SORT_STATES.NONE;
};

export const useSortRowsByColumn = () => {
  const { compare } = useCollator(SORT);

  return useCallback(
    (rows, column, sortDirection) => {
      if (rows && column && [SORT_STATES.ASC, SORT_STATES.DESC].includes(sortDirection)) {
        return sortDirection === SORT_STATES.ASC
          ? [...rows].sort((rowA, rowB) => compare(rowA[column], rowB[column]))
          : [...rows].sort((rowA, rowB) => compare(rowB[column], rowA[column]));
      }
      return rows;
    },
    [compare]
  );
};

export const useSortColumn = (
  sortField = '',
  sortDirection = SORT_STATES.NONE,
  defaultSortDirection = SORT_STATES.NONE
) => {
  const sortOrderDefault = useRef(defaultSortDirection);
  const [sortColumn, setSortColumn] = useState(sortField);
  const [sortOrder, setSortOrder] = useState(sortDirection || defaultSortDirection);

  const adjustSortChange = useCallback(
    column => {
      let nextSortOrder;
      if (column !== sortColumn) {
        setSortColumn(column);
        if (sortOrderDefault.current === SORT_STATES.NONE) {
          nextSortOrder = getNextSortType(sortOrderDefault.current);
        } else {
          nextSortOrder = sortOrderDefault.current;
        }
      } else {
        nextSortOrder = getNextSortType(sortOrder);
      }
      setSortOrder(nextSortOrder);
      return nextSortOrder;
    },
    [sortColumn, sortOrder]
  );

  return {
    sortColumn,
    sortOrder,
    setSortColumn: adjustSortChange,
  };
}

export function sortingStringToObj(sortString) {
  const [sortingFieldID, sortingDir] = split(sortString, ',');

  return {
    sortingFieldID,
    sortingDir,
  };
}



