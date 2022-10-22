/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ConfigurableTable,  // TODO magictable
  Checkbox,
  ConfigurableTableToolbar,
  useTimeout,
} from '@carbon/react';

import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import hasIn from 'lodash/hasIn';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';

import RoleDetails from './RoleDetails';

import useTranslation from '../../i18n';
import useUserManagementService, { doSearch } from './useUserManagementService';

import { actions } from './reducers';
import {useGridFormatters} from "@ppmd-ui/components";


const PermissionTable = ({
  size,
  withData,
  ...otherProps
}) => {

  const refRole = useRef(null);

  const gridPreference = {
    config: [],
    data: {
      rows: [],
      total: 0
    }
  }

  const [tableKey, setTableKey] = useState(1);
  const [isDirty, setIsDirty] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState( 50 );
  const [config, setConfig] = useState(gridPreference.config);
  const [dataPool, setDataPool] = useState({ ...gridPreference.data });
  const [data, setData] = useState({ ...gridPreference.data });
  const [isLoading, setIsLoading] = useState(false);

  const rolesGridData = useSelector(state => state.userManagementReducer.rolesGridData);
  const permissionsGridData = useSelector(state => state.userManagementReducer.permissionsGridData);

  const [savedPermissions, updateSavedPermissions] = useState({});

  const userManagementService = useUserManagementService({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState('');

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const addRoleColumns = (gridDefinition) => {
    let newGridDefinition = cloneDeep(gridDefinition);

    rolesGridData.data.rows.map(role => {
      newGridDefinition.columns.push(
      {
        id: role.id + "",
        title: role.label,
        defaultVisible: true,
        editorType: "checkbox",
        defaultWidth: "100px"
      });
    });
    return newGridDefinition;
  }

  const resetData = useCallback(() => {
    dispatch(actions.failedRolesGridData());
    dispatch(actions.failedPermissionsGridData());
  }, []);

  const onChange = (event, row, column, isChecked) => {
    setIsDirty(true);
    const role = find(refRole.current, ['id', +column]);
    role.hasChanged = true;

    if (isChecked) {
        role.permissions.push({"name": row.name, "id": +row.id})
    } else {
      remove(role.permissions, r => r.name == row.name);
    }
  };

  const getInitialValue = (columnId, item, obj) => {
    return !isEmpty(find(item.roles, ['id', +columnId]))
  }

  function getConfig(config) {
    return config.map(header => {
      header["minWidth"]= header.defaultWidth;
      return {
        ...header
      };
    });
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
      userManagementService.getRolesGrid();
      userManagementService.getPermissionsGrid();
    } else {
      setData({ rows: [] });
    }
  }, [withData]);

  useEffect(() => {
    if (rolesGridData && rolesGridData.gridAggregationLevelDefinition && permissionsGridData && permissionsGridData.gridAggregationLevelDefinition) {
      //const newGridDefinition = addRoleColumns(permissionsGridData.gridAggregationLevelDefinition);
      setConfig(
        useGridFormatters({onCellChange: onChange, getInitialValue: getInitialValue}).getTableConfig(
          permissionsGridData.gridAggregationLevelDefinition,
          permissionsGridData.userReportPreferences,
          getConfig
        )
      );
      setDataPool(permissionsGridData.data);
      updateSavedPermissions(permissionsGridData.data);
      refRole.current = cloneDeep(rolesGridData.data.rows);
    }
    setIsLoading(false);
  }, [permissionsGridData, rolesGridData]);

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

  const resetSelectedRole = (role) => {
    updateSelectedRole((oldRole) => (role));
  };

  const cancelHandler = () => {
    setTableKey(prev => prev + 1);
    setDataPool(savedPermissions);
    setIsDirty(false);
  };

  const saveRolesHandler = async () => {
      const resp = await userManagementService.saveRoles(refRole.current.filter((r) => r.hasChanged));
      if (resp.status === 200) {
          refRole.current = cloneDeep(resp.data);
          setIsDirty(false);
          const permissionsData = await userManagementService.getPermissionsData();
          if (permissionsData.status === 200) {
            updateSavedPermissions({rows: permissionsData.data, total: permissionsData.data.length});
          }
          else {
            console.error("Permissions data load failed.");
          }
      }
      else {
          console.error("Roles save failed.");
      }
  };


  return (
    <div>
      <ConfigurableTable
        className="permissions-content-grid"
        config={config}
        data={withData ? data.rows.slice(0, pageSize) : []}
        description=""
        key={tableKey}
        isLoading={isLoading}
        hasViewModeChange={false}
        hasSelection={false}
        hasFixedLayout={false}
        hasPagination={true}
        isExpandable={false}
        isLoading={isLoading}
        useConfigurableToolbar
        renderToolbar={props => (
          <ConfigurableTableToolbar
            {...props}
            /*actions={[
              ...props.actions,
                {
                key: 'cancel',
                'aria-label': 'Cancel',
                text: t('cancel'),
                kind: 'secondary',
                className: `my-custom-classname`,
                iconDescription: 'Cancel',
                showTooltip:false,
                tooltipPosition: 'left',
                disabled: !isDirty,
                onClick: cancelHandler
              },
              {
                key: 'saveRoles',
                'aria-label': 'Save',
                kind: 'primary',
                text: t('save'),
                className: `my-custom-classname`,
                iconDescription: 'Save',
                showTooltip:false,
                tooltipPosition: 'left',
                disabled: !isDirty,
                onClick: saveRolesHandler
              }
            ]}*/
            searchPlaceholderText={t('usermanagement.permissions.search.placeHolder')}
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
    </div>
  );
};

export default PermissionTable;

