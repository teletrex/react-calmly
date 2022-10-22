/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  ConfigurableTable,  // TODO:  magictable
  Checkbox,
  ExtendedDropdown,
  useTimeout
} from '@carbon/react';

import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import hasIn from 'lodash/hasIn';
import intersectionBy from 'lodash/intersectionBy';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';

import useTranslation from '../../i18n';
import useUserManagementService, { doSearch } from './useUserManagementService';
import useTableFormatters from "../components/magic-table/useTableFormatters";


const RoleDetails = ({
  selectedRoleId,
  selectedAttribute,
  setSelectedAttribute,
  workingRoles,
  updateWorkingRoles,
  save,
  saveRolesHandler,
  size,
  withData,
  ...otherProps
}) => {

  const refRole = useRef(null);
  const { t } = useTranslation();

  const gridPreference = {
    config: [],
    data: {
      rows: [],
      total: 0
    }
  }

  const baseRole = useMemo(
    () => {
      return {
        id: null,
        name: "",
        description: "",
        users: [],
        permissions: []
      }
    },
    []
  );

  const attributes = useMemo(
    () => {
      return [
        {
          name: "users",
          label: t('usermanagement.users')
        },
        {
          name: "permissions",
          label: t('usermanagement.permissions')
        }
      ]
    },
    []
  );

  const [isDirty, setIsDirty] = useState(false);
  const [selectedRole, updateSelectedRole] = useState(baseRole);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState( 50 );
  const [config, setConfig] = useState(gridPreference.config);
  const [dataPool, setDataPool] = useState({ ...gridPreference.data });
  const [data, setData] = useState({ ...gridPreference.data });
  const [isLoading, setIsLoading] = useState(false);

  const usersGridData = useSelector(state => state.userManagementReducer.usersGridData);
  const rolesGridData = useSelector(state => state.userManagementReducer.rolesGridData);
  const permissionsGridData = useSelector(state => state.userManagementReducer.permissionsGridData);
  const userManagementService = useUserManagementService({});

  const [searchText, setSearchText] = useState('');

  const onChange = (evnt, col, rowId, row, isChecked) => {
    setIsDirty(true);
    let role = refRole.current
    role.hasChanged = true;

    let { permissions, users } = role;
    if (isChecked) {
      if (selectedAttribute == "users") {
        role.users.push({"id": row.id})
      } else {
        role.permissions.push({"id": row.id, "name": row.name})
      }
    } else {
      remove(role[selectedAttribute], r => r.id == rowId);
    }
  };

  const getInitialValue = (columnId, item) => {
    const { permissions, users } = refRole.current;
    if (selectedAttribute == "users") {
        return !isEmpty(find(users, ['id', item.id]));
    } else {
        return !isEmpty(find(permissions, ['name', item.name]));
    }
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

  const loadData = () => {
    setIsLoading(true);
    if (selectedAttribute == "users") {
       userManagementService.getUsersGrid();
    }
    else {
      userManagementService.getPermissionsGrid();
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

  const addColumn = (gridDefinition) => {
    let newGridDefinition = cloneDeep(gridDefinition);
    newGridDefinition.columns.push(
      {
        title: t('usermanagement.roles.enabled'),
        format: "string",
        defaultVisible: true,
        editorType: "checkbox"
      }
    );
    return newGridDefinition;
  }

  useEffect(() => {
    let role = find(workingRoles, ['id', selectedRoleId])
    refRole.current = role;
    resetSelectedRole(role);
  }, []);

  useEffect(() => {
    if (withData) {
      loadData();
    } else {
      setData({ rows: [] });
    }
  }, [selectedAttribute, refRole.current]);

  useEffect(() => {
    let dataSource;
    if (selectedAttribute == "users") {
      dataSource = usersGridData;
    }
    else {
      dataSource = permissionsGridData;
    }
    if (dataSource && dataSource.gridAggregationLevelDefinition) {
      const newGridDefinition = addColumn(dataSource.gridAggregationLevelDefinition);
      setConfig(
        useTableFormatters({onCellChange: onChange, getInitialValue: getInitialValue}).getTableConfig(
          newGridDefinition,
          dataSource.userReportPreferences,
          getConfig
        )
      );
      setDataPool(dataSource.data);
    }
    setIsLoading(false);
  }, [usersGridData, permissionsGridData]);

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
      if (save) {
        saveRolesHandler();
      }
    }
  }, []);

  const resetSelectedRole = (role) => {
    updateSelectedRole((oldRole) => (role));
  };

  const attributesDropdownChangeHandler = (evt) => {
    const name = evt.selectedItem ? evt.selectedItem.name : "";
    setSelectedAttribute(name);
    setPage(1);
  }

  const rolesDropdownChangeHandler = (evt) => {
    let index = findIndex(workingRoles, {id: refRole.current.id});

    // Replace item at index using native splice
    workingRoles.splice(index, 1, refRole.current);

    refRole.current = evt.selectedItem;
    updateSelectedRole(evt.selectedItem);
  }


  return (
    <div>
      <ConfigurableTable
        config={config}
        data={withData ? data.rows.slice(0, pageSize) : []}
        description=""
        isLoading={isLoading}
        hasViewModeChange={false}
        hasSelection={false}
        hasFixedLayout={false}
        hasPagination={true}
        isExpandable={false}
        isLoading={isLoading}
        useConfigurableToolbar
        renderToolbar={props => (
          <div>
            <div style={{
              marginBottom: '0.5rem',
              display: 'inline-flex',
              alignItems: 'center'
             }}>
              <ExtendedDropdown
                id="attributes"
                label=""
                ariaLabel={t('usermanagement.attributes')}
                itemToString={
                  (items) => items ? items.label : ""
                }
                onChange={
                  (item) => {
                    attributesDropdownChangeHandler(item);
                  }
                }
                items={attributes}
                selectedItem={find(attributes, ['name', selectedAttribute])}
              />

              <div style={{
                  marginLeft: '0.5rem',
              }}>
                of role
              </div>

              <div style={{
                  marginLeft: '0.5rem',
              }}>
                <ExtendedDropdown
                  id="roles"
                  label=""
                  ref={refRole}
                  ariaLabel={t('usermanagement.roles')}
                  itemToString={
                    (item) => item ? item.label : ""
                  }
                  onChange={
                    (item) => {
                      rolesDropdownChangeHandler(item);
                    }
                  }
                  items={workingRoles}
                  selectedItem={find(workingRoles, ['id', selectedRole.id])}
                />
              </div>
            </div>
          </div>
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

export default RoleDetails;

