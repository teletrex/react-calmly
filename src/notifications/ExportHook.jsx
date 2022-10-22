/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React, { useContext, useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { axios } from 'axios';  //TODO:  when do I call a backend?
import { useDispatch, useSelector, connect } from 'react-redux';
import {useTranslation} from '../translation';
import serviceApi from '../services/serviceApi';
import { actions } from './notificationsSlice'
const exportURL = serviceApi.exporting.newExport.api;

const useExport = (exportType) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isExporting = useSelector(state => state.notifications.isExporting[exportType]);

    const startExport = useCallback(async (exportData) => {
        dispatch(actions.setIsExporting({ [exportType]: true }));
        const { data: exportFile } = await axios.post(exportURL, {
            type: exportType,
            ...exportData
        }, {
            headers: {
                'content-type': 'application/json'
            },
        });

        dispatch(actions.addNewNotification({ title: t('export.exporting'), exportFile }));
    }, [exportType])


    return { startExport, isExporting }
}

export default useExport;
