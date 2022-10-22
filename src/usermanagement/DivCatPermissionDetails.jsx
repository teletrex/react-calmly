/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import { Checkbox, ConfigurableTable } from '@carbon/react';  // TODO: Magic Grid
import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import useUserManagementService from './useUserManagementService';
import magictable  from '../components/magic-table/magictable';
import useTableFormatters from '../components/magic-table/useTableFormatters';
import useTranslation from '../../i18n';
import { isNumber, isString } from 'lodash-es';

const doSearch = (dataSet, searchTerm) => {
    if (dataSet && dataSet.length > 0) {
        return dataSet.filter(row =>
            Object.values(row).find(value => {
                return (
                    (isNumber(value) || isString(value)) &&
                    value
                        .toString()
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                );
            })
        );
    } else {
        return [];
    }
};

const getDataPage = (lPage, lPageSize, dataPool) => {
    if (dataPool && dataPool.rows) {
        return {
            rows: dataPool.rows.slice(lPage * lPageSize - lPageSize, lPage * lPageSize),
            total: dataPool.total,
        }
    } else {
        return {
            rows: [],
            total: 0,
        }
    }
}

const DivCatPermissionDetails = ({
    selectedUser,
    editType,
    saveDivCatHandler,
    userDetailsTypes,
    isSave
}) => {
    const { t } = useTranslation();
    const userManagementService = useUserManagementService();
    const [data, setData] = useState(null);
    const [dataPool, setDataPool] = useState(null);
    const [gridConfig, setGridConfig] = useState([])
    const [pageSize, setPageSize] = useState(50);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasAllAccess, setHasAllAccess] = useState(editType === userDetailsTypes.DIVISIONS ? selectedUser.hasAllDivPermission : selectedUser.hasAllCatPermission);
    const changes = useRef([]);

    useEffect(() => {
        if (hasAllAccess) {
            changes.current = [];
        }
    }, [hasAllAccess])


    const onCellChange = (evnt, col, rowId, row, checked, initialValue) => {
        const prevChangeIndex = changes.current.findIndex(c => c.id == rowId);
        if (prevChangeIndex !== -1) {
            const prevChange = changes.current[prevChangeIndex];
            prevChange.access = checked;
        } else {
            if (checked != initialValue) {
                changes.current.push({ id: row.id, access: checked, initialValue });
            }
        }
    }

    useEffect(() => {
        (async function () {
            const getData = editType === userDetailsTypes.DIVISIONS ? userManagementService.getUserDivisions : userManagementService.getUserCategories;
            const { data, gridAggregationLevelDefinition, userReportPreference } = (await getData(selectedUser.id)).data.result;

            setGridConfig(
                useTableFormatters({ onCellChange }).getTableConfig(
                    gridAggregationLevelDefinition,
                    userReportPreference
                )
            )
            setDataPool(data);
            setData(getDataPage(page, pageSize, data));
        })()
    }, [])

    useEffect(() => {
        if (dataPool) {
            if (searchText) {
                let filteredpage = page;
                const filteredData = doSearch(dataPool.rows, searchText);
                const currentFilteredDataLake = { rows: filteredData, total: filteredData.length };
                if (filteredData.length <= pageSize || Math.ceil(filteredData.length / pageSize) < page) {
                    filteredpage = 1;
                    setPage(filteredpage);
                }
                setData(getDataPage(filteredpage, pageSize, currentFilteredDataLake));
            } else {
                setData(getDataPage(page, pageSize, dataPool));
            }
        }
    }, [searchText, page, pageSize, dataPool]);

    useEffect(() => {
        if (data != null) {
            setIsLoading(false)
        }
    }, [data])

    useEffect(()=>{
        if(isSave){
            const finalChanges = changes.current.filter(change => change.initialValue != change.access).map(change=>({...change,initialValue:Boolean(change.initialValue)}));
            saveDivCatHandler(selectedUser,finalChanges,hasAllAccess,editType);
        }
    },[isSave])



    const onPageChange = useCallback(
        paginationData => {
            const { page, pageSize } = paginationData;
            setPage(page);
            setPageSize(pageSize);
        },
        []
    );

    const dataRows = useMemo(() => {
        const newData = data?.rows?.slice(0, pageSize).map(row => {
            if (hasAllAccess) {
                return {
                    ...row,
                    access: true,
                    disabled: true,
                    id: row.id + ';'
                }
            }
            const change = changes.current.find(c => c.id === row.id);
            if (change) {
                return { ...row, access: change.access }
            }
            return row;
        }) ?? [];
        return newData;
    }, [data, pageSize, hasAllAccess]);

    return <div className="user-detail-magic-grid">
        <magictable
            t={t}
            config={gridConfig}
            dataRows={dataRows}
            description=""
            hasPagination={true}
            isLoading={isLoading}
            searchPlaceholderText={t('search')}
            useConfigurableToolbar
            onSearch={setSearchText}
            onSearchChange={setSearchText}
            title=""
            page={page}
            pageSize={pageSize}
            scrollableRows={true}
            freezeFirstDataColumn={true}
            totalItems={data?.total ?? 0}
            pageSizes={[50, 100, 200]}
            onPageChange={onPageChange}
            customActions={[
                <div>
                    <Checkbox
                        id="hasAllAccess"
                        checked={hasAllAccess}
                        labelText={t(`usermanagement.users.edit.all.${editType}`)}
                        onChange={setHasAllAccess} />
                </div>
            ]}
        />
    </div>;
}

export { DivCatPermissionDetails }
