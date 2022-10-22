/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useContext, useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import {
    Notification,
} from '@carbon/icons-react';
import {
  InlineLoading, InlineNotification
} from '@carbon/react';  // TODO:

import ClickAwayListener from '../components/click-away-listener';
import NumberNotificationFlag from '../components/badge';
import {useTranslation} from '../translation'

import { actions as notifActions } from "./notificationsSlice";
import { ExportTypes } from "./constants"
import {
    Download
} from '@carbon/icons-react';

const EXPORTING = 'exporting';
const EXPORTED = 'exported';
const ERROR = 'error';


function notificationSubTitle(notification) {
    let fileName = notification.fileName;
    let lastIndex = fileName.lastIndexOf('-');
    fileName = fileName.substring(0, lastIndex);
    switch (notification.exportStatus) {
        case EXPORTED:
            return <a className="bx--toast-notification__subtitle" href={notification.href}><Download size={16} />{`${fileName}.csv`}</a>;
        case EXPORTING:
            return <InlineLoading status={"active"} iconDescription={"Active loading indicator"} />;
        case ERROR:
            return <span className="bx--toast-notification__subtitle">{`${fileName}.csv`}</span>
        default:
            return null;
    }
}

function notificationCaption(notification) {
  return  notification.exportStatus + " "+ notification.exportTime;
}

const Notifications = ({ useHeaderService }) => {
    const { t } = useTranslation();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const notifications = useSelector(state => state.notifications.data);
    const numOfUnnotified = notifications.filter(({ notified, exportStatus }) => !notified && exportStatus === EXPORTED).length;
    const dispatch = useDispatch();
    const ref = useRef();

    const checkExportStatus = async () => {
        const exportStatusList = await useHeaderService.getExportStatus();
        if (exportStatusList && exportStatusList.length > 0) {
            let isChangeInNotifications = notifications.every((rep, i) => rep.fileName === exportStatusList[i].fileName && rep.exportStatus === exportStatusList[i].exportStatus);
            if (notifications.length !== exportStatusList.length || !isChangeInNotifications) {
                let newNotifications = [];
                let newExportingStatuses = {};
                for (let type in ExportTypes) {
                    newExportingStatuses[type] = false;
                }
                for (const report of exportStatusList) {
                    const { fileName, exportTime, exportStatus, exportType, notified } = report;
                    let title = null;
                    if (exportStatus === EXPORTING) {
                        newExportingStatuses[exportType] = true;

                    }
                    title = t(`export.${exportStatus}`);
                    newNotifications.push({
                        title,
                        fileName,
                        exportTime: new Date(exportTime),
                        notified,
                        exportStatus,
                        exportType,
                        href: exportStatus === 'exported' ? useHeaderService.createFileURL(exportType, fileName) : ''
                    });
                }
                dispatch(notifActions.setNotificationList({ newNotifications }));
                dispatch(notifActions.setIsExporting(newExportingStatuses));

            }
        }
    }

    const onClickDropDown = () => {
        setDropDownOpen(prev => !prev)
    };

    const verifyExportStatus = async (id) => {
        const exportStatusList = await useHeaderService.getExportStatus();
        if (exportStatusList && exportStatusList.length > 0) {
            let nonProcessing = exportStatusList.every(item => {
                return item.exportStatus !== "exporting";
            });
            if(nonProcessing){
                clearInterval(id);
            }
        }else{
            clearInterval(id);
        }
    }

    useEffect(() => {
        const id = setInterval(checkExportStatus, 5000);

        setTimeout(() => {
            verifyExportStatus(id);
        }, 12000);

        return () => {
            clearInterval(id);
        }
    }, [notifications]);

    useEffect(() => {
        if (dropDownOpen && notifications.some(notification => !notification.notified)) {
//            useHeaderService.userNotified();
//            dispatch(notifActions.notificationsRead());
        }
    }, [notifications, dropDownOpen]);

    return (
      <ClickAwayListener onClickAway={()=> setDropDownOpen(false)}>
        <div ref={ref} className={`pop-up-modal__icon-wrapper notifications ${dropDownOpen ? 'active' : ''}`}
            onClick={onClickDropDown}>
          <NumberNotificationFlag showButton={numOfUnnotified>0} numberOfNotifications={numOfUnnotified}>
                <Notification size={24} style={{
                    fill: '#ffffff',
                    pointerEvents: 'none'
                }}
                />

          </NumberNotificationFlag>
            {dropDownOpen &&
                <div className="notifications-list" style={{position:"absolute",top:"40px",right:"0px"}}>
                    {notifications.map((notification, i) => {
                      return (
                      <InlineNotification
                        inLineNotificationMultiline={true}
                        title={notification.title}
                        subtitle={notificationSubTitle(notification)}
                        caption={notificationCaption(notification)}
                        kind={"info"}
//                        actions={<NotificationActionButton color={"white"}>Download</NotificationActionButton>}
                        />
                      )
                    })}
                </div>}
        </div>
      </ClickAwayListener>
    );
}

export default React.memo(Notifications);
