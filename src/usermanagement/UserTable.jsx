/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ConfigurableTable,   /// TODO: magictable
  ConfigurableTableToolbar,
  Modal,
  OverflowMenu,
  OverflowMenuItem,
  useTimeout,
} from '@carbon/react';

import useTranslation from '../../i18n';
import useUserManagementService, { doSearch } from './useUserManagementService';

import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';

import UserDetails,{UserDetailsTypes} from './UserDetails';

import { actions } from './reducers';

import {useGridFormatters} from '@ppmd-ui/components';


const UserTable = ({
  size,
  withData,
  ...otherProps
}) => {

  const refRole = useRef(null);

  const gridPreference = useMemo(
    () => {
      return {
        config: [],
        data: {
          rows: [],
          total: 0
        }
      }
    },
    []
  );


  const [selectedEdit, setSelectedEdit] = useState({user:null,editType:null});

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState( 50 );
  const [config, setConfig] = useState(gridPreference.config);
  const [dataPool, setDataPool] = useState({ ...gridPreference.data });
  const [data, setData] = useState({ ...gridPreference.data });
  const [isLoading, setIsLoading] = useState(true);
  const [save, setSave] = useState(false);

  const usersGridData = useSelector(state => state.userManagementReducer.usersGridData);
  const userManagementService = useUserManagementService({});

  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();


  function getConfig(config) {
    return config.map(header => {
      header["minWidth"]= header.defaultWidth;

      if (header.id == 'roles') {
        header.defaultVisible = true;
        return {
          ...header,
          renderCol: item => {
            return (item.roles.map(r => r.label).join(", "))
          }
        };
      }
      if(header.id === 'categoryNames' || header.id === 'divisionNames'){
        return {
          ...header,
          renderCol: item =>{
            const isCategory = header.id === 'categoryNames';
            let str = null;
            let hasFullAccess = isCategory ? item.hasAllCatPermission : item.hasAllDivPermission;
            if(hasFullAccess)
              return isCategory ? t("usermanagement.users.allCategories") : t("usermanagement.users.allDivisions");
            const list = (isCategory ? item.categoryNames : item.divisionNames) ?? [];
            return list.join(", ");
          }
        }
      }
      return {
        ...header
      };
    });
  }

  const saveRolesHandler = async (roles) => {
    setSave(false);
    setSelectedEdit({user:null,editType:null})
    setIsLoading(true);
    const resp = await userManagementService.saveRoles(roles);
    if (resp.status == 200) {
        userManagementService.getUsersGrid();
    }
    else {
        console.error("Roles save failed.");
      }
    };

  const saveDivCatHandler = async (user,changes,hasAllAccess,editType) => {
    setSave(false);
    setSelectedEdit({user:null,editType:null})
    const isEditCategories = editType === UserDetailsTypes.CATEGORIES;
    const hadAllAccess = isEditCategories ? user.hasAllCatPermission : user.hasAllDivPermission;
    if(changes.length == 0 && hadAllAccess == hasAllAccess)
    return;
    setIsLoading(true);
    const resp = await userManagementService.saveDivCatPermissions(user,changes,hasAllAccess,editType);
    if (resp.status == 200){
      userManagementService.getUsersGrid();
    } else {
      console.error(`${editType} save failed.`);
    }
  }

  const resetData = useCallback(() => {
    dispatch(actions.failedUsersGridData());
  }, []);

  const onChange = (event, row, column, isChecked) => {
    const role = find(refRole.current, ['id', +column]);
    role.hasChanged = true;

    if (isChecked) {
        role.users.push({"id": row.id})
    } else {
      remove(role.users, r => r.id == row.id);
    }
  };

  const getInitialValue = (columnId, item, obj) => {
    return !isEmpty(find(item.roles, ['id', +columnId]))
  }

  const handleSearchChange = useCallback(
    value => {
      setSearchText(value);
    }
  );

  const [pendingSearchChange] = useTimeout(handleSearchChange, 300);

  const debouncedHandleSearchChange = useCallback(
    e => {
      pendingSearchChange(e.target.value);
    },
    [pendingSearchChange]
  );

  const mockApiFetch = (page, pageSize, dataLakeCache) => {
    const dataSource = dataLakeCache || dataPool;
    return {
      rows: dataSource.rows.slice(page * pageSize - pageSize, page * pageSize),
      total: dataSource.total,
    }
  };

  const onPageChange = useCallback(
    paginationData => {
      const { page, pageSize } = paginationData;
      setPage(page);
      setPageSize(pageSize);
    },
    [setPage, setPageSize]
  );

  useEffect(() => {
    if (withData) {
      setIsLoading(true);
      userManagementService.getUsersGrid();
    } else {
      setData({ rows: [] });
    }
  }, [withData]);

  useEffect(() => {
    if (usersGridData && usersGridData.gridAggregationLevelDefinition){
      setConfig(useGridFormatters().getTableConfig(
        usersGridData.gridAggregationLevelDefinition,
        usersGridData.userReportPreferences,
        getConfig
        )
      );
      setDataPool(usersGridData.data);
    }
    setIsLoading(false);
  }, [usersGridData]);

  useEffect(() => {
    if (searchText) {
      let filteredpage = page;
      const filteredData = doSearch(dataPool.rows, searchText);
      const currentFilteredDataLake = {rows: filteredData, total: filteredData.length};
      if (filteredData.length <= pageSize || Math.ceil(filteredData.length / pageSize) < page ) {
        filteredpage = 1;
        setPage(filteredpage);
      }
      setData(mockApiFetch(filteredpage, pageSize, currentFilteredDataLake));
    } else {
      setData(mockApiFetch(page, pageSize, dataPool));
    }
    setPageSize(pageSize);
  }, [ searchText, page, pageSize, dataPool ]);

  useEffect(() => {
    return () => {
      resetData();
    }
  }, []);

  const renderOverFlowMenu = useCallback((currentRow) => {
    return (
      <div>
        <OverflowMenu flipped>
          <OverflowMenuItem id={currentRow.row.id} itemText={t('usermanagement.menu.edit.roles')} disabled={currentRow.row.disabled} onClick={()=> editUser(currentRow.row,UserDetailsTypes.ROLES)}/>
          <OverflowMenuItem id={currentRow.row.id} itemText={t('usermanagement.menu.edit.category')} disabled={currentRow.row.disabled} onClick={()=> editUser(currentRow.row,UserDetailsTypes.CATEGORIES)}/>
          <OverflowMenuItem id={currentRow.row.id} itemText={t('usermanagement.menu.edit.division')} disabled={currentRow.row.disabled} onClick={()=> editUser(currentRow.row,UserDetailsTypes.DIVISIONS)}/>
        </OverflowMenu>
      </div>
    );
  }, [usersGridData]);

  const editUser = useCallback(
    (item,editType) => {
      const user = find(usersGridData.data.rows, ['id', item.id]);
      setSelectedEdit({user,editType});
    },
    [usersGridData]
  );

  const closeUserDetailModal = () => {
    setSelectedEdit({user:null,editType:null})
    setSave(false);
  };

  const submitUserDetailModal = async (e) => {
      setSave(true);
  };


  return (
    <div>
      <ConfigurableTable
        className="users-content-grid"
        config={config}
        data={withData ? data.rows.slice(0, pageSize) : []}
        description=""
        isLoading={isLoading}
        hasViewModeChange={false}
        hasSelection={false}
        hasFixedLayout={false}
        hasPagination={true}
        isExpandable={false}
        overflowMenuOnHover={true}
        renderRowActions={renderOverFlowMenu}
        useConfigurableToolbar
        renderToolbar={props => (
          <ConfigurableTableToolbar
            {...props}
            searchPlaceholderText={t('usermanagement.users.search.placeHolder')}
            onSearchChange={debouncedHandleSearchChange}
            isEmptyView={false}
          />
        )}
        size={size}
        title=""
        scrollableRows={true}
        totalItems={data.total}
        page={page}
        pageSize={pageSize}
        pageSizes={[50, 100, 200]}
        onPageChange={onPageChange}
        {...otherProps}
      />

      <Modal
        modalHeading={t(`usermanagement.users.edit.${selectedEdit.editType}`)}
        isLarge={true}
        onRequestClose={closeUserDetailModal}
        onRequestSubmit={submitUserDetailModal}
        primaryButtonText={t('save')}
        secondaryButtonText={t('cancel')}
        className="modal-lg user-table-modal"
        open={selectedEdit.user !== null}>
          <UserDetails
            selectedEdit={selectedEdit}
            isSave={save}
            saveRolesHandler={saveRolesHandler}
            saveDivCatHandler={saveDivCatHandler}
            size
          />
      </Modal>
    </div>
  );
};

export default UserTable;

