/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React,{useState,useCallback,useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import LazyLoadCheckboxTree from './LazyLoadCheckboxTree';
import {Search} from "@carbon/react";
import {useTranslation} from '../../translation';
import hierarchySourceMapDemo from "./productlocationhierarchysourcemap";
import cloneDeep from 'lodash/cloneDeep';
import FullPageTemplate from '../full-page-template';

export default {
  title: 'Components/LazyLoadCheckboxTree',
  component: LazyLoadCheckboxTree,
  parameters: {
    info: {
      text: `

LazyLoadCheckboxTree



**isEmptyView={false}**  New, same as ConfigurableTableToolbar
`
    }
  }
}

export const LazyLoadExample = ({}) => {

  const { t } = useTranslation();
  const [selectedHierarchy, setSelectedHierarchy] = useState('productHierarchy');
  const [open, setOpen] = useState(true);
  const treeRef = useRef();
  const [data,setData] = useState(hierarchySourceMapDemo['productHierarchy']);
  const [filterText, setFilterText] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedAttr, setSelectedAttr] = useState(1);

  const onTreeVerify = useCallback(
    (treeData, treeCheckList) => {
      let tgtNodes = selectedHierarchy === 'productHierarchy' ? 'prodHierNodes' : 'locHierNodes';
      setSelectedHierarchy('');
      setOpen(false);
      defaultChangeHandler(tgtNodes, treeCheckList);
    },
    [selectedHierarchy],
  );

  const onTreeCancel = () => {
    setSelectedHierarchy('');
    setOpen(false);
  };

  const handleSearchChange = useCallback(
    (searchText) => {
      setFilterText(searchText);
    }, [filterText]
  );

  const doSearch  = useCallback(
    (searchText) => {
      if (searchText.trim() != ""
        && selectedAttr != -1
      ) {
        let option = selectedAttr;
        generateTag(searchText.trim(),option);
      }

    },[selectedAttr, tagList]
    // [selectedAttr] means the call back will be called once selectedAttr is changed, if [] will not detect the change of selectedAttr
  );

  const generateTag = (text,option) => {
    let isMatched = false;
    for (let tag of tagList) {
      if (tag.name.toLowerCase() === text.toLowerCase() && tag.option === option) {
        isMatched = true;
        break;
      }
    }
    let data = {name:text, option:option, text:text};
    if (!isMatched && tagList!=undefined) {
      tagList.push(data);
      setTagList(cloneDeep(tagList));
    }
    getSearchData(tagList,text);
  }

  const getSearchData = async (tagList,text) => {
    treeRef.current.setCheckboxTreeData(tagList,text);

  };

  const getNextLevelNodes =  (item) => {
    item.isLoaded = true;
    item.open = true;
    let arr=[];
    setTimeout(()=>{
      let tempNodes = item.nodes.map(item => {
        if (!item.isLoaded) {
          if(item.nodes!=undefined){
            for (let nd of item.nodes) {
              nd.checked = item.checked;
            }
          }
          item.display = true;
          item.isLoaded = true;
        }
        else if(!item.open){
          item.isLoaded = false;
        }
      })
      treeRef.current.updateCheckboxStatus();
    },1500);
    item.open = false;
  };

  return (
    <FullPageTemplate>
      <div style={{width:"65%"}}>
        <Search
          id={"lgFilter"}
          autoComplete={"off"}
          labelText={'Filter'}
          onChange={evt => handleSearchChange(evt.target.value)}
          placeHolderText={'Search'}
          value={filterText}
          small
          onKeyDown={ (e) => {if (e.keyCode==13) {doSearch(filterText);}}}
        />
      </div>
      <LazyLoadCheckboxTree
        t = {t}
        ref={treeRef}
        title={"Select Products"}
        data={data}
        checkList={[]} //checklist
        //applyLabelText={"Apply"}
        //cancelLabelText={"Cancel"}
        searchPlaceholderText={"Search"}
        onExpanding={getNextLevelNodes}
        //onApply={(treeData, treeCheckList) => onTreeVerify(treeData, treeCheckList)}
        //onCancel={(treeData, treeCheckList) => onTreeCancel()}
        tags={true}
        search={false}
        fullNode={true}
        emptyStateLabelText={'Search Tree Items (no items)'}
        emptyStateNoItemsText= {'There are no items'}
        headerLabelText= {'Search Tree Items'}

      />
    </FullPageTemplate>
  );
}
