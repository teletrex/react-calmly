/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
    ConfigurableTable,  // TODO: Magic Grid
    useTimeout,
} from '@carbon/react';

import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';

import useTranslation from '../../i18n';
import useUserManagementService, { doSearch } from './useUserManagementService';
import useTableFormatters  from '../components/magic-table/useTableFormatters';

const UserRolesDetails = ({
    selectedUser,
    isSave,
    saveRolesHandler,
    size,
    withData,
}) => {

    const { t } = useTranslation();

    const gridPreference = {
        config: [],
        data: {
            rows: [],
            total: 0
        }
    }

    const baseUser = useMemo(
        () => {
            return {
                id: null,
                name: "",
                roles: []
            }
        },
        []
    );

    const [isDirty, setIsDirty] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [config, setConfig] = useState(gridPreference.config);
    const [dataPool, setDataPool] = useState({ ...gridPreference.data });
    const [data, setData] = useState({ ...gridPreference.data });
    const [isLoading, setIsLoading] = useState(true);
    const rolesGridData = useSelector(state => state.userManagementReducer.rolesGridData);
    const refRoles = useRef(null);
    const userManagementService = useUserManagementService({});
    const [searchText, setSearchText] = useState('');

    const  user = selectedUser;
    const onChange = (evnt, col, rowId, row, isChecked) => {
        setIsDirty(true);
        const role = find(refRoles.current, ['id', rowId]);
        role.hasChanged = true;


        if (isChecked) {
            role.users.push({ "id": user.id })
        } else {
            remove(role.users, u => u.id == user.id);
        }
    };

    const getInitialValue = (columnId, item) => {
        return !isEmpty(find(user.roles, ['id', item.id]));
    }

    function getConfig(config) {
        return config.map(header => {
            header["minWidth"] = header.defaultWidth;
            if (header.id == 'users' || header.id == 'permissions')
                header.defaultVisible = false;
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
        if (withData) {
            setIsLoading(true);
            userManagementService.getRolesGrid();
        } else {
            setData({ rows: [] });
        }
    }, [withData]);

    useEffect(() => {
        if (rolesGridData && rolesGridData.gridAggregationLevelDefinition) {
            const newGridDefinition = addColumn(rolesGridData.gridAggregationLevelDefinition);
            setConfig(
                useTableFormatters({ onCellChange: onChange, getInitialValue: getInitialValue }).getTableConfig(
                    newGridDefinition,
                    rolesGridData.userReportPreferences,
                    getConfig
                )
            );
            refRoles.current = cloneDeep(rolesGridData.data.rows);
            setDataPool(rolesGridData.data);
        }
        setIsLoading(false);
    }, [rolesGridData]);

    useEffect(() => {
        if (searchText) {
            let filteredpage = page;
            const filteredData = doSearch(dataPool.rows, searchText);
            const currentFilteredDataLake = { rows: filteredData, total: filteredData.length };
            if (filteredData.length <= pageSize || Math.ceil(filteredData.length / pageSize) < page) {
                filteredpage = 1;
                setPage(filteredpage);
            }
            setData(mockApiFetch(filteredpage, pageSize, currentFilteredDataLake));
        } else {
            setData(mockApiFetch(page, pageSize, dataPool));
        }
        setPageSize(pageSize);
    }, [searchText, page, pageSize, dataPool]);

    useEffect(() => {
        if (isSave) {
            saveRolesHandler(refRoles.current.filter((r) => r.hasChanged));
        }
    });


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
                useConfigurableToolbar
                renderToolbar={props => (
                    <div>
                        <div style={{
                            marginBottom: '0.5rem',
                            display: 'inline-flex',
                            alignItems: 'center'
                        }}>
                            {user?.userName}
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
            />
        </div>
    );
}

export { UserRolesDetails };
