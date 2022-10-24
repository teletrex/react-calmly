/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import { useCallback, useEffect, useReducer, useState } from 'react';
import identity from 'lodash/identity';

import { omitProperty } from '../../../utils';
import { filterTreeData, mapTreeData } from '../../../utils/TreeDataUtils';

import { forEachTreeItem } from '../../../utils/TreeDataUtils';

export const withAsyncMockedData = data => (onResolve = null) => async (
  {
    query = {},
    options = { delay: { value: undefined, min: undefined, max: undefined } },
  } = {}) => {
  const timeout = !isNil(options?.delay?.value)
    ? options.delay.value
    : getRandomInt(options?.delay?.min ?? 100, options?.delay?.max ?? 600);

  await new Promise(resolve => setTimeout(resolve, timeout));
  const pseudoData = onResolve ? onResolve({ query, data, options }) ?? data : data;
  return { data: pseudoData, withOptions: { query, delayed: timeout } };
};


export const treeDataExample = Object.freeze([
  {
    expands: true,
    label: 'Campaigns',
    open: true,
    items: [
      {
        label: 'Email',
        selected: true,
      },
      { label: 'Mobile push' },
      {
        expands: true,
        label: 'SMS',
        open: true,
        items: [
          { expands: true, label: 'Nested item', items: [{ label: "I'm very deeply" }] },
          { label: 'Additional' },
        ],
      },
    ],
  },
  {
    expands: true,
    label: 'Comparative',
    items: [{ label: 'Email' }, { label: 'Mobile push' }, { label: 'SMS' }],
  },
  {
    expands: true,
    label: 'Transactional',
    items: [{ label: 'Email' }, { label: 'Mobile push' }, { label: 'SMS' }],
  },
  {
    expands: true,
    label: 'Content',
    items: [{ label: 'Email' }, { label: 'Mobile push' }, { label: 'SMS' }],
  },
  {
    expands: true,
    label: 'My reports',
    items: [{ label: 'Email' }, { label: 'Mobile push' }, { label: 'SMS' }],
  },
  {
    expands: true,
    label: 'Shared labeeeeLLLLeeeeed',
    items: [
      {
        label: 'Email which is which is looooooooooooooooonger than usual',
      },
      { label: 'Mobile push which is looooooooooooooooonger than usuuual, but not unuuuusual' },
      {
        label: 'SMS which is unuuuuuuuuuuuusual',
        expands: true,
        items: [
          { label: 'Nested sms is longer than usuuuuuAlluuuuu...' },
          { label: 'Additional which is longer than usual' },
        ],
      },
    ],
  },
  {
    expands: true,
    label: 'Audiences',
    items: [{ label: 'Email' }, { label: 'Mobile push' }, { label: 'SMS' }],
  },
]);

export const mapData = (mapFunction, dataItems) =>
  mapTreeData({ mapFunction, subItemsPath: 'items' }, dataItems);

const filterData = (filterFunction, dataItems) =>
  filterTreeData({ filterFunction, subItemsPath: 'items' }, dataItems);

export const forEachItem = (forEachFunction, dataItems) =>
  forEachTreeItem({ forEachFunction, subItemsPath: 'items' }, dataItems);

const fetchData = withAsyncMockedData(treeDataExample)(({ query, data }) => {
  const { searchString = '' } = query;
  return searchString
    ? filterData(item => !!item?.label?.toLowerCase()?.includes(searchString?.toLowerCase()), data)
    : mapData(identity, data);
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...omitProperty('error', omitProperty('response', state)),
        isFetching: true,
      };
    case 'fetched':
      return {
        ...omitProperty('error', state),
        isFetching: false,
        response: action.payload,
      };
    case 'error':
      return {
        ...omitProperty('response', state),
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useTreeDataRequest = () => {
  const [requestPayload, setRequestPayload] = useState(null);
  const request = useCallback((searchString, options = { delay: { value: 0 } }) => {
    setRequestPayload({ query: { searchString }, options });
  }, []);

  const [state, dispatch] = useReducer(reducer, { isFetching: false });

  useEffect(() => {
    if (requestPayload) {
      dispatch({ type: 'fetching', payload: requestPayload });
      fetchData(requestPayload)
        .then(response => {
          dispatch({ type: 'fetched', payload: response });
        })
        .catch(error => {
          dispatch({ type: 'error', payload: error });
        });
    }
  }, [requestPayload]);

  return [state, request];
};
