/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React,{useState,useCallback} from 'react';
import PropTypes from 'prop-types';
import CheckboxTree from './CheckboxTree';
import {useTranslation} from "../../translation";
import hierarchySourceMapDemo from "./productlocationhierarchysourcemap";


export default {
  title: 'Components/CheckboxTree',
  component: CheckboxTree,
  parameters: {
    info: {
      text: `

CheckboxTree



**isEmptyView={false}**  New, same as ConfigurableTableToolbar
`
    }
  }
}

export const Default = ({}) => {

  const { t } = useTranslation();
  const [selectedHierarchy, setSelectedHierarchy] = useState('productHierarchy');
  const [open, setOpen] = useState(true);


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

  return (
    <CheckboxTree
      t = {t}
      title={"Select Products"}
      data={hierarchySourceMapDemo['productHierarchy']}
      checkList={[]} //checklist
      applyLabelText={"Apply"}
      cancelLabelText={"Cancel"}
      searchPlaceholderText={"Search"}
      onApply={(treeData, treeCheckList) => onTreeVerify(treeData, treeCheckList)}
      onCancel={(treeData, treeCheckList) => onTreeCancel()}
      tags={true}
      search={true}
      fullNode={true}
      emptyStateLabelText={'Search Tree Items (no items)'}
      emptyStateNoItemsText= {'There are no items'}
      headerLabelText= {'Search Tree Items'}
    />
  );
}


export const WithApplyResetValidation = ({}) => {

  const { t } = useTranslation();
  const [selectedHierarchy, setSelectedHierarchy] = useState('productHierarchy');
  const [open, setOpen] = useState(true);

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

  const handleIsApplyDisabled = (data,treeCheckList) => {
    return !treeCheckList.length > 0;
  }

  const handleIsResetDisabled = (data,treeCheckList) => {
    return false;  // always enabled. allows closing dialog if nothing was clicked.
//    return !treeCheckList.length > 0;   // enabled only when something is selected.
  }

  return (
    <CheckboxTree
      t = {t}
      title={"Select Products"}
      data={hierarchySourceMapDemo['productHierarchy']}
      checkList={[]} //checklist
      applyLabelText={"Apply"}
      cancelLabelText={"Cancel"}
      searchPlaceholderText={"Search"}
      onApply={(treeData, treeCheckList) => onTreeVerify(treeData, treeCheckList)}
      onCancel={(treeData, treeCheckList) => onTreeCancel()}
      tags={true}
      search={true}
      fullNode={true}
      getIsApplyDisabled={handleIsApplyDisabled}
      getIsResetDisabled={handleIsResetDisabled}
      emptyStateLabelText={'Search Tree Items (no items)'}
      emptyStateNoItemsText= {'There are no items'}
      headerLabelText= {'Search Tree Items'}
    />
  );
}
