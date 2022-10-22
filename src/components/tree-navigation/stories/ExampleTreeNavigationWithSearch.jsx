/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useCallback, useEffect, useRef, useState } from 'react';
import property from 'lodash/property';
import flow from 'lodash/flow';
import over from 'lodash/over';
import { text } from '@storybook/addon-knobs';

import { TreeNavigation } from '../TreeNavigation';
import {Search }from '@carbon/react';
import { useOnMount, useTimeout, useUnMount } from '../../../utils/hooks';
import { StringMatches } from '../../../utils/StringMatchUtils';
import EmptyStates from '../../empty-states';
import { current } from '../../../utils/fp';

import { TreeDataNavigationItems } from './ExampleTreeNavigation';
import { forEachItem, mapData, useTreeDataRequest } from './treeData';

const Matches = StringMatches({ ignoreCase: true });

const withLabelsStrongerBy = (needle, items) =>
  mapData(
    item => ({
      ...item,
      label: <Highlight needle={needle} source={item.label} withTag="strong" />,
      title: item.label,
    }),
    items
  );

const withMatchedNodesExpanded = (needle, items) => {
  const itemsToExpand = new Map();
  return mapData(
    item => {
      return {
        ...item,
        open: item.expands && itemsToExpand.has(item),
      };
    },
    forEachItem((item, index, srcArray, parentInfo) => {
      if (Matches.has(needle, item.label) && parentInfo) {
        let itemParentInfo = parentInfo;
        while (itemParentInfo?.item) {
          itemsToExpand.set(itemParentInfo.item, itemParentInfo.item);
          itemParentInfo = itemParentInfo?.parent;
        }
      }
    }, items ?? [])
  );
};

const Highlight = ({ needle, source, withTag = 'mark' }) => {
  const render = useCallback(
    (highlight, sourceString) =>
      Matches.has(highlight, sourceString)
        ? Matches.split(highlight, sourceString)
            .reduce(StringMatches.mergeSameNeighborsReducer, [])
            .map((matchItem, index) =>
              matchItem.matched
                ? React.createElement(withTag, { key: `${matchItem.value}[${index}]` }, [
                    matchItem.value,
                  ])
                : matchItem.value
            )
        : sourceString,
    [withTag]
  );

  return render(needle, source);
};

export const TreeNavigationWithSearchExample = () => {
  const [emptyView, setEmptyView] = useState(false);
  const [, setLoadingView] = useState(false);
  const [requestState, requestData] = useTreeDataRequest();
  const inputRef = useRef('');
  const REQUEST_SEARCH_MIN_LENGTH = 2;
  const [data, setData] = useState([]);

  useOnMount(requestData);

  useEffect(() => {
    const { isFetching, response } = requestState;
    setLoadingView(isFetching);

    if (response) {
      const items = response?.data ?? [];
      if (items.length) {
        setEmptyView(false);
        setData(
          withLabelsStrongerBy(
            current(inputRef),
            withMatchedNodesExpanded(current(inputRef), items)
          )
        );
      } else {
        setEmptyView(true);
        setData([]);
      }
    }
  }, [requestState]);

  const commitDebounceSearch = useCallback(
    input => {
      inputRef.current = input?.trim()?.length === 0 ? input.trim() : input || '';
      const charsCount = current(inputRef)?.length ?? 0;
      if (!charsCount || charsCount >= REQUEST_SEARCH_MIN_LENGTH) {
        requestData(current(inputRef), { delay: { min: 200, max: 800 } });
      }
    },
    [requestData]
  );

  const [debounceSearch, clearDebounceSearch] = useTimeout(commitDebounceSearch, 200);

  useUnMount(clearDebounceSearch);

  return (
    <>
      <Search
        aria-label="tree-navigation-with-search-input-label"
        id="tree-navigation-with-search-input"
        onChange={over([flow([property('target.value'), debounceSearch])])}
        placeHolderText={text('Placeholder text for "search" (placeHolderText)', 'Find a report')}
        small
      />
      {emptyView && (
        <EmptyStates buttonHidden state="design-100x100" text="No search results found" title="" />
      )}
      {!emptyView && (
        <TreeNavigation>
          <TreeDataNavigationItems data={data} />
        </TreeNavigation>
      )}
    </>
  );
};
