/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, { memo, useCallback, useState, useEffect, useMemo, useRef } from 'react';

import settings from '../../settings';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import defaultTo from 'lodash/defaultTo';
import cloneDeep from 'lodash/cloneDeep';

import {
  Button,
  Tag,
} from '@carbon/react';

import { useTimeout }from '../../utils/hooks';

import MultiSelectComboBox from '../multi-select-combo-box';

import TreeItem from './TreeItem';

const { prefix } = settings;

const isExpandable = ({ nodes }) => !isEmpty(nodes);

export const UncontrolledTreeHierarchy = memo(
  ({
    children,
    className,
    data,
    isRoot,
    selectable,
    divided,
    selected,
    setSelected,
    onTreeCheckboxChange,
    level,
    treeItemClassName,
    renderIconByType,
    onHeadingClick,
    expandable,
    applyLabelText,
    cancelLabelText,
    emptyStateLabelText,
    emptyStateNoItemsText,
    headerLabelText,
    expandCollapseIconDescription,
    noResultsText,  //t('checkboxtree.noresults')
     ...domProps
  }) => {
    const rootClassName = `${prefix}--tree-hierarchy`;
    const finalLevel = !isNumber(level) ? 0 : level + 1;

    const onTreeItemCheckboxChange = (checked, id) => {
//      console.log(checked, id);
      onTreeCheckboxChange && onTreeCheckboxChange(checked, id);
    };

    return (
      <ul
        className={classNames(rootClassName, { [`${rootClassName}--root`]: isRoot }, className)}
        {...domProps}
      >
        {data.map((item, i) => {
          const expandable = defaultTo(get(item, 'expandable'), false);
          const expands = isExpandable(item) || expandable;
          const isRoot = expands || data.some(isExpandable);
          return (
            <TreeItem
              id={item.id}
              key={item.id}
              className={treeItemClassName + (item.display ? "" : " hidden-item")}
              disabled={item.disabled}
              divided={divided}
              expands={expands}
              isRoot={isRoot}
              isSelected={selected === item}
              isChecked={item.checked}
              onCheckboxChange={(checked, id) => onTreeItemCheckboxChange(checked, id)}
              isIndeterminate={item.indeterminate}
              level={finalLevel}
              onHeadingClick={() => onHeadingClick(item)}
              onSelect={() => setSelected(item)}
              open={item.open}
              renderIconByType={renderIconByType}
              selectable={selectable}
              title={item.label}
              type={item.type}
              iconDescription={expandCollapseIconDescription}
            >
              {expands && (
                <UncontrolledTreeHierarchy
                  data={item.nodes}
                  divided={divided}
                  isRoot={false}
                  level={finalLevel}
                  onHeadingClick={onHeadingClick}
                  renderIconByType={renderIconByType}
                  selectable={selectable}
                  selected={selected}
                  setSelected={setSelected}
                  onTreeCheckboxChange={(checked, id) => onTreeCheckboxChange(checked, id)}
                  emptyStateLabelText={emptyStateLabelText}
                  emptyStateNoItemsText={emptyStateNoItemsText}
                  applyLabelText={applyLabelText}
                  cancelLabelText={cancelLabelText}
                  headerLabelText={headerLabelText}
                />
              )}
            </TreeItem>
          );
        })}

      </ul>
    );
  }
  );


UncontrolledTreeHierarchy.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      id: PropTypes.string,
      label: PropTypes.node,
      nodes: PropTypes.arrayOf(PropTypes.object),
      open: PropTypes.bool,
      type: PropTypes.string,
    })
  ),
  divided: PropTypes.bool,
  isRoot: PropTypes.bool,
  level: PropTypes.number,
  onHeadingClick: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.shape({}),
  setSelected: PropTypes.func,
  onTreeCheckboxChange: PropTypes.func,
  emptyStateLabelText: PropTypes.string,
  emptyStateNoItemsText: PropTypes.string,
  headerLabelText: PropTypes.string,
  applyLabelText: PropTypes.string,
  cancelLabelText: PropTypes.string
};

UncontrolledTreeHierarchy.defaultProps = {
  children: null,
  className: '',
  data: [],
  divided: false,
  isRoot: true,
  level: undefined,
  onHeadingClick: noop,
  selectable: false,
  selected: undefined,
  setSelected: noop,
  onTreeCheckboxChange: noop,
  emptyStateLabelText:'',
  emptyStateNoItemsText:'',
  headerLabelText:'',
  applyLabelText:'',
  cancelLabelText:''
};



const CheckboxTree = memo(({
  onSelect,
  initialSelected,
  getIsApplyDisabled,
  getIsResetDisabled,
  title,
  data,
  checkList,
  search,
  fullNode,
  tags,
  onApply,
  onCancel,
  applyLabelText,
  cancelLabelText,
  emptyStateNoItemsText,
  emptyStateLabelText,
  headerLabelText,
  searchPlaceholderText,
  noResultsText,
  ...props
}) => {

  const { prefix } = settings;
  const [selected, setSelected] = useState(initialSelected);

  const handleSetSelected = useCallback(
    nextSelected => {
      const finalSelected = nextSelected === selected ? undefined : nextSelected;
      setSelected(finalSelected);
      onSelect(finalSelected);
    },
    [selected, onSelect]
  );

  const defaultSearchItemsMock = {
    group1: {
      count: 0,
      emptyStateLabelText: emptyStateLabelText,
      emptyStateNoItemsText: emptyStateNoItemsText,
      headerLabelText: headerLabelText,
      items: [],
    },
  };

  const [treeData, setTreeData] = useState(cloneDeep(data));
  const [initTreeData , setInitTreeData] = useState([]);
  const [treeCheckList, setTreeCheckList] = useState([]);
  const [searchItemsLake, setSearchItemsLake] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchItems, setSearchItems] = useState(defaultSearchItemsMock);
  const [emptyState, setEmptyState] = useState(false);

  const treeSearchFieldRef = useRef();
  const treeTitleRef = useRef();

  // 05-Aug-2021 : The code is to filter the tree only when the user click on the drop down item
  const onSearchItemClick = useCallback((element, id) => {
    setSearchValue(element.name);
    let result = buildDisplayItems(cloneDeep(treeData), element.name);
    setTreeData(result.nodes);
  }, [searchItemsLake, searchItems, treeData]);

  const handleValueChange = useCallback(value => {
    let searchItemsLakeTemp = cloneDeep(searchItemsLake);
    let searchItemsTemp = cloneDeep(searchItems);

    const isValidValue = (value && value !== '');
    if(isValidValue){
      setSearchValue(value);
      searchItemsTemp.group1.items = searchItemsLakeTemp.filter(item => (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1));

    }else{
      setSearchValue("");
      searchItemsTemp.group1.items = searchItemsLakeTemp;
      setTreeData(cloneDeep(initTreeData));
    }
    searchItemsTemp.group1.count = searchItemsTemp.group1.items.length;
    setSearchItems(searchItemsTemp);
    setEmptyState(searchItemsTemp.group1.count === 0);
    // Here you can make an API call to fetch matched items
    // setSearchItems(isEmptyState ? defaultSearchItemsMock : matchedItemsMock);
  }, [searchItemsLake, searchItems, treeData]);

  const buildDisplayItems = (nodes, value) => {
    let hasDisplay = false;
    let tempNodes = nodes.map(item => {
      item.display = true;
      if(item.label.toLowerCase() === value.toLowerCase()){
        hasDisplay = true;
      }else{
        if(item.nodes && item.nodes.length > 0){
          let result = buildDisplayItems(item.nodes, value);
          if(!result.hasDisplay){
            item.display = false;
          }else{
            item.open = true;
          }
          item.nodes = result.nodes;
          hasDisplay = hasDisplay || result.hasDisplay;
        }else{
          item.display = false;
        }
      }
      return item;
    })
    return {nodes: tempNodes, hasDisplay: hasDisplay};
  };

  const refreshDisplayItems = (nodes) => {
    let tempNodes = nodes.map(item => {
      item.display = true;
      if(item.nodes && item.nodes.length > 0){
        item.nodes = refreshDisplayItems(item.nodes);
      }
      return item;
    })
    return tempNodes;
  };

  const expandOrCollapseItems = (nodes, isOpen) => {
    let tempNodes = nodes.map(item => {
      item.open = isOpen;
      if(item.nodes && item.nodes.length > 0){
        item.nodes = expandOrCollapseItems(item.nodes, isOpen);
      }
      return item;
    })
    return tempNodes;
  };

  const buildSearchItemLake = (nodes) => {
    let searchItemsLakeTemp = [];
    nodes.map(item => {
      searchItemsLakeTemp.push({id: item.id, name: item.label, icon: "blank"});
      if(item.nodes && item.nodes.length > 0){
        searchItemsLakeTemp = searchItemsLakeTemp.concat(buildSearchItemLake(item.nodes));
      }
    });
    return searchItemsLakeTemp;
  };

  const validateSelection =  (nodes) => {
    let selectionNodes = [];
    nodes.map(item => {
      if(item.indeterminate){
        if(item.nodes && item.nodes.length > 0){
          selectionNodes = selectionNodes.concat(validateSelection(item.nodes));
        }
      }else{
        if(item.checked){
          selectionNodes.push(fullNode ? item : {id: item.id, label: item.label});
        }
      }
    });
    return selectionNodes;
  }

  const clearTreeCheckbox = (nodes) => {
    let tempNodes = nodes.map(item => {
      item.indeterminate = false;
      item.checked = false;
      if(item.nodes && item.nodes.length > 0){
        item.nodes = clearTreeCheckbox(item.nodes);
      }
      return item;
    })
    return tempNodes;
  }

  const validateTreeCheckboxChange = (nodes) => {
    let tempNodes = nodes.map(item => {
      if(item.nodes && item.nodes.length > 0){
        item.nodes = validateTreeCheckboxChange(item.nodes);

        let indeterms = item.nodes.map(node => node.indeterminate);
        if(indeterms.reduce((a,b) => a || b)){
          item.indeterminate = true;
        }else{
          //no indeterminate, only checked / non-checked
          let checks = item.nodes.map(node => node.checked);
          if(checks.reduce((a,b) => a && b)){
            item.indeterminate = false;
            item.checked = true;
          }else if(!checks.reduce((a,b) => a || b)){
            item.indeterminate = false;
            item.checked = false;
          }else{
            item.indeterminate = true;
            item.checked = false;
          }
        }
      }
      return item;
    })
    return tempNodes;
  };

  const applyTreeCheckboxChange = (nodes, checked) => {
    let tempNodes = nodes.map(item => {
      item.checked = checked;
      if(item.nodes && item.nodes.length > 0){
        item.nodes = applyTreeCheckboxChange(item.nodes, checked);
      }
      return item;
    })
    return tempNodes;
  };

  const applyTreeCheckboxChangeByID = (nodes, checked, id) => {
    let tempNodes = nodes.map(item => {
      if(item.id == id){
        item.checked = checked;
        if(item.nodes && item.nodes.length > 0){
          item.nodes = applyTreeCheckboxChange(item.nodes, checked);
        }
      }else if(item.nodes && item.nodes.length > 0){
        item.nodes = applyTreeCheckboxChangeByID(item.nodes, checked, id);
      }
      return item;
    })
    return tempNodes;
  };

  const applyCheckByIDs = (nodes, idList) => {
    let tempNodes = nodes.map(item => {
      if(idList.indexOf(item.id) > -1){
        item.checked = true;
        if(item.nodes && item.nodes.length > 0){
          item.nodes = applyTreeCheckboxChange(item.nodes, true);
        }
      }else if(item.nodes && item.nodes.length > 0){
        item.nodes = applyCheckByIDs(item.nodes, idList);
      }
      return item;
    })
    return tempNodes;
  };

  const validationTreeStatus = (tempTreeData) => {
    let tempTreeDataValidated = validateTreeCheckboxChange(cloneDeep(tempTreeData));
    setTreeData(tempTreeDataValidated);
    let selectionValidated = validateSelection(cloneDeep(tempTreeDataValidated));
    setTreeCheckList(selectionValidated);
  };

  const onTreeCheckboxChange = useCallback((checked, id) => {
    let tempTreeData = applyTreeCheckboxChangeByID(cloneDeep(treeData), checked, id);
    validationTreeStatus(tempTreeData);
  }, [treeData]);

  const handleDeleteTag = useCallback((id) => {
    onTreeCheckboxChange(false, id);
  }, [treeData, treeCheckList]);

  const onApplyData = useCallback((evt) => {
//    console.log(treeData);
//    console.log(treeCheckList);
    onApply(cloneDeep(treeData), cloneDeep(treeCheckList));
  }, [treeData, treeCheckList]);

  const onCancelData = useCallback((evt) => {
    let tempTreeData = clearTreeCheckbox(cloneDeep(treeData));
    setTreeData(tempTreeData);
    setTreeCheckList([]);
    onCancel(cloneDeep(tempTreeData), cloneDeep(treeCheckList));

  }, [treeData, treeCheckList]);

  //special handler
  const [searchDisplay, setSearchDisplay] = useState("none");
  const [searchDisplayCall] = useTimeout(function(){
    setSearchDisplay("block");
    // console.log(treeTitleRef);
    // treeTitleRef.current.focus();
  }, 60);

  useEffect(() => {
    let initData = cloneDeep(data);
    let initCheckList = cloneDeep(checkList);
    let initSearchItems = cloneDeep(defaultSearchItemsMock);

    let searchItemsLakeTemp = buildSearchItemLake(initData);
    setSearchItemsLake(searchItemsLakeTemp);

    initSearchItems.group1.items = searchItemsLakeTemp.map(item => ({
      text:item.name,
      value:item.id
    }));
    initSearchItems.group1.count = initSearchItems.group1.items.length;
    setSearchItems(initSearchItems);

    let tempTreeData = refreshDisplayItems(initData);
    setInitTreeData(tempTreeData);
    setTreeData(tempTreeData);

    if(initCheckList && initCheckList.length > 0){
      let tempTreeCheckData = applyCheckByIDs(tempTreeData, initCheckList);
      validationTreeStatus(tempTreeCheckData);
    }
    searchDisplayCall();
  }, []);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  return (
    <div class={`${prefix}--checkbox-tree-container`}>
      <div class={`${prefix}--checkbox-tree`}>
        <div class={`${prefix}--checkbox-tree-title ${prefix}--checkbox-tree-section`} ref={treeTitleRef}>
          {title}
        </div>
        <div class={`${prefix}--checkbox-tree-main`}>
          {search && (
            <div class={`${prefix}--checkbox-tree-search ${prefix}--checkbox-tree-section`} style={{ display: searchDisplay }}>

              <MultiSelectComboBox
                onChange={(options, updatedOptions, changedOption)=> onSearchItemClick({name:changedOption.text,id:changedOption.id}, changedOption.id)}
                searchPlaceholderText={searchPlaceholderText}
                items={searchItems.group1.items}
                hideTheCheckboxes={true}
                filterText={searchValue}
                onlyAddItems={true}
                returnChangedItemsSeparately={true}
                singleSelect={true}
                onAskForMore={()=>{}}
                optionLimit={6}
                />

            </div>
          )}
          {tags && (
            <div class={`${prefix}--checkbox-tree-tags ${prefix}--checkbox-tree-section`}>
              {treeCheckList && treeCheckList.length > 0 && treeCheckList.map((item) => (
                <Tag
                  key={item.id}
                  buttonTitle=""
                  className={`${prefix}--checkbox-tree-tag`}
                  disabled={false}
                  filter
                  onClick={(evt) => handleDeleteTag(item.id)}
                  shapeForm="oval"
                  title=""
                  type="gray"
                >
                  {item.label}
                </Tag>
              ))}
            </div>
          )}
          <div class={`${prefix}--checkbox-tree-content ${prefix}--checkbox-tree-section`}>
            <UncontrolledTreeHierarchy
              {...props}
              data={treeData}
              selected={selected}
              setSelected={handleSetSelected}
              onTreeCheckboxChange={(checked, id) => onTreeCheckboxChange(checked, id)}
            />
          </div>
        </div>
      </div>
      <div class={`${prefix}--checkbox-tree-actions ${prefix}--checkbox-tree-section`}>
        <Button
          kind="secondary"
          onClick={(evt) => onCancelData(evt)}
          size="large"
          disabled={getIsResetDisabled && getIsResetDisabled(data,treeCheckList)}
        >{cancelLabelText}</Button>
        <Button
          kind="primary"
          onClick={(evt) => onApplyData(evt)}
          size="large"
          disabled={getIsApplyDisabled && getIsApplyDisabled(data,treeCheckList)}
        >{applyLabelText}</Button>
      </div>
    </div>
  );
});

CheckboxTree.propTypes = {
  ...UncontrolledTreeHierarchy.propTypes,
  checkList: PropTypes.arrayOf(PropTypes.object),
  initialSelected: PropTypes.shape({}),
  title: PropTypes.string,
  onSelect: PropTypes.func,
  search: PropTypes.bool,
  tags: PropTypes.bool,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  emptyStateLabelText: PropTypes.string,
  emptyStateNoItemsText: PropTypes.string,
  headerLabelText: PropTypes.string,
  applyLabelText: PropTypes.string,
  cancelLabelText: PropTypes.string,
  searchPlaceholderText: PropTypes.string,
  noResultsText: PropTypes.string,
  treeItemClassName: PropTypes.string,
};

CheckboxTree.defaultProps = {
  ...UncontrolledTreeHierarchy.defaultProps,
  checkList: [],
  initialSelected: undefined,
  title: '',
  onSelect: () => {},
  search: false,
  tags: false,
  onApply: () => {},
  onCancel: () => {},
  emptyStateLabelText:'',
  emptyStateNoItemsText:'',
  headerLabelText:'',
  applyLabelText:'',
  cancelLabelText:'',
  searchPlaceholderText: '',
  noResultsText: '',
  treeItemClassName: ''
};

export default CheckboxTree;
