/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  Link,
} from '@carbon/react';

import {
  Add,
} from '@carbon/icons-react';


import {    // TODO:
  ConfigurableTable,
  ConfigurableTableToolbar,
  useTimeout,
  TextArea,
  TextInput,
  Modal,
} from '@carbon/react';

import cloneDeep from 'lodash/cloneDeep';
import hasIn from 'lodash/hasIn';
import trim from 'lodash/trim';

import prefix from '../settings';

import RoleDetails from './RoleDetails';

import useAuthorizations from './useAuthorizations';
import {useTranslation} from '../translation';
import useUserManagementService, { doSearch } from './useUserManagementService';
import useTableFormatters from '../components/magic-table/useTableFormatters';


const RoleTable = ({
  size,
  withData,
  ...otherProps
}) => {

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

  const [tableKey, setTableKey] = useState(1);
  const [selectedRole, updateSelectedRole] = useState(baseRole);
  const [roleAddOpen, setRoleAddOpen] = useState(false);
  const [roleDetailOpen, setRoleDetailOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [saveError, setSaveError] = useState("");
  const [save, setSave] = useState(false);

  const { roles, permissions, hasRole, hasPermission } = useAuthorizations();
  const isAdmin = hasRole("admin");
  const isPermitted= hasPermission("admin.admin_menu");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState( 50 );
  const [config, setConfig] = useState([]);
  const [dataPool, setDataPool] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const rolesGridData = useSelector(state => state.userManagementReducer.rolesGridData);
  const [workingRoles, updateWorkingRoles] = useState({});
  const [savedRoles, updateSavedRoles] = useState({});
  const userManagementService = useUserManagementService({});
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();

  function getConfig(config) {
    return config.map(header => {
      header["minWidth"]= header.defaultWidth;
      if (header.id == 'users')
        return {
          ...header,
          renderCol: item => {
            return (
              <Link
                disabled={false}
                inline={false}
                href={window.location.href}
                onClick={(evt) => {
                  editRole(item, "users");
                }}
                renderIcon={function noRefCheck() {}}
                type="default"
              >
                {t('usermanagement.menu.viewEdit')}
              </Link>)
            }
        };

      if (header.id == 'permissions')
        return {
          ...header,
          renderCol: item => {
            return (
              <Link
                disabled={false}
                href={window.location.href}
                inline={true}
                onClick={(evt) => {
                  editRole(item, "permissions");
                }}
                renderIcon={function noRefCheck() {}}
                type="default"
              >
                {t('usermanagement.menu.viewEdit')}
              </Link>)
            }
        };
      return {
        ...header,
        renderCol: item => item[header.id],
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
    return dataSource.slice(page * pageSize - pageSize, page * pageSize);
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
    } else {
      setData({ rows: [] });
    }
  }, [withData, tableKey]);

  useEffect(() => {
    if (rolesGridData && rolesGridData.gridAggregationLevelDefinition) {
      updateSavedRoles(cloneDeep(rolesGridData.data.rows));
      updateWorkingRoles(cloneDeep(rolesGridData.data.rows));
      setConfig(
        useTableFormatters().getTableConfig(
          rolesGridData.gridAggregationLevelDefinition,
          rolesGridData.userReportPreferences,
          getConfig
        )
      );
      setDataPool(rolesGridData.data.rows);
    }
    setIsLoading(false);
  }, [rolesGridData]);

  useEffect(() => {
    if (searchText) {
      let filteredpage = page;
      const filteredData = doSearch(dataPool, searchText);
      if (filteredData.length <= pageSize || Math.ceil(filteredData.length / pageSize) < page ) {
        filteredpage = 1;
        setPage(filteredpage);
      }
      setData(mockApiFetch(filteredpage, pageSize, filteredData));
    } else {
      setData(mockApiFetch(page, pageSize, dataPool));
    }
    setPageSize(pageSize);
  }, [ searchText, page, pageSize, dataPool ]);

  const textInputChangeHandler = (e) => {
    const { name, value } = e.target;
    defaultRoleChangeHandler(name, value);
  };

  const resetSelectedRole = (role) => {
    updateSelectedRole((oldRole) => (role));
  };

  const defaultRoleChangeHandler = (name, value) => {
    updateSelectedRole(
      (prevState) => (
        {
          ...prevState,
          [name]: value
        }
      )
    );
  };

  const addRole = () => {
    resetSelectedRole(cloneDeep(baseRole));
    setRoleAddOpen(true);
  };

  const closeRoleAddModal = () => {
    setSaveError("");
    setRoleAddOpen(false);
  };

  const submitRoleAddModal = async (e) => {
    e.preventDefault();
    if (trim(selectedRole.name) == "") {
      setSaveError(t('usermanagement.roles.save.error.required'));
      return;
    }

    const resp = await userManagementService.saveRole(selectedRole);
    if (resp.status == 200) {
      setRoleAddOpen(false);
      setTableKey(prev => prev + 1);
    }
    else {
      const err = hasIn(resp, 'data.message') ? resp.data.message : "Role save failed."
      setSaveError(err);
      console.error("Role save failed.");
    }
  };

  const editRole = (item, attribute) => {
    updateSelectedRole(item);
    setSelectedAttribute(attribute);
    setRoleDetailOpen(true);
  };

  const closeRoleDetailModal = () => {
    setSave(false);
    setRoleDetailOpen(false);
    updateWorkingRoles(cloneDeep(savedRoles));
  };

  const submitRoleDetailModal = async (e) => {
      setSave(true);
      setRoleDetailOpen(false);
  };

  const saveRolesHandler = async () => {
    const resp = await userManagementService.saveRoles(workingRoles.filter((r) => r.hasChanged));
    if (resp.status == 200) {
        updateSavedRoles(resp.data);
        updateWorkingRoles(cloneDeep(resp.data));
        setDataPool(resp.data);
    }
    else {
        console.error("Roles save failed.");
    }
  };


  return (
    <div>
      <ConfigurableTable
        config={config}
        data={withData ? data.slice(0, pageSize) : []}
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
            actions={[
              ...props.actions,
              {
                key: 'addRole',
                'aria-label': t('usermanagement.roles.add'),
                renderIcon: <Add size={16}/>,
                text: t('usermanagement.roles.add'),
                className: `my-custom-classname`,
                iconDescription: t('usermanagement.roles.add'),
                showTooltip:false,
                tooltipPosition: 'left',
              }
            ]}
            searchPlaceholderText={t('usermanagement.roles.search.placeHolder')}
            onSearchChange={debouncedHandleSearchChange}
            onAction={addRole}
            isEmptyView={false}
          />
        )}
        size={size}
        title=""
        scrollableRows={true}
        totalItems={data.length}
        page={page}
        pageSize={pageSize}
        pageSizes={[50, 100, 200]}
        onPageChange={onPageChange}
        {...otherProps}
      />
      <Modal
        modalHeading={t('usermanagement.roles.add')}
        isLarge={true}
        onRequestClose={closeRoleAddModal}
        onRequestSubmit={submitRoleAddModal}
        primaryButtonText={t('save')}
        secondaryButtonText={t('cancel')}
        className="modal-sm"
        open={roleAddOpen}>

        <div
          style={{
            paddingBottom: '1rem',
            paddingTop: '1rem',
          }}>

          <TextInput
            id="name"
            name="name"
            required
            invalidText={saveError}
            invalid={saveError != ""}
            labelText={t('usermanagement.roles.name')}
            placeholder={t('usermanagement.roles.name.placeHolder')}
            type="text"
            value={selectedRole.name}
            onChange={textInputChangeHandler}
          />
          <TextArea
            maxLength="-1"
            carbonTextAreaProps={{
              labelText: t('usermanagement.roles.desc'),
              name: 'description',
              onChange: textInputChangeHandler
            }}
            rows="4"
            cols="50"
            class="#${prefix}--text-area"
          >
          </TextArea>
        </div>
      </Modal>

      <Modal
        modalHeading={t('usermanagement.roles.edit')}
        isLarge={true}
        onRequestClose={closeRoleDetailModal}
        onRequestSubmit={submitRoleDetailModal}
        primaryButtonText={t('save')}
        secondaryButtonText={t('cancel')}
        className="edit-role-permission__modal modal-lg"
        open={roleDetailOpen}>
          <RoleDetails
            selectedRoleId={selectedRole.id}
            selectedAttribute={selectedAttribute}
            setSelectedAttribute={setSelectedAttribute}
            workingRoles={workingRoles}
            updateWorkingRoles={updateWorkingRoles}
            save={save}
            saveRolesHandler={saveRolesHandler}
            size
            withData
          />
      </Modal>
    </div>
  );
};

export default RoleTable;

