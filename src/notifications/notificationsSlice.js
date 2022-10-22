/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [{
    title:"File exported",
    exportTime:"Just now",
    fileName:"newprices-fifteeen.csv",
    href:"/files/newprices.csv",
    exportStatus:"exported",
    notified: false
  },
    {
      title:"File exported",
      exportTime:"A bit ago",
      fileName:"previousprices-fifteeen.csv",
      href:"/files/previousprices.csv",
      exportStatus:"exported",
      notified: false
    }],
  isExporting: {}
}

const getId = state =>
  state.notifications.reduce((maxId, notification) => Math.max(notification.id, maxId), -1) + 1;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const newNotification = {
        id: getId(state),
        title: action.payload,
        completed: false
      };

      state.notifications.push(newNotification);
    },
    completeNotification: (state, action) => {
      const notification = state.notifications.find(notification => notification.id === action.payload);
      notification.completed = !notification.completed;
    },
    addNewNotification: (state, action) => {
      let { exportFile, title } = action.payload;
      let { exportTime, ...exportData } = exportFile;
      let newNotification = {
        title,
        ...exportData,
        exportTime: new Date(exportTime),
        notified: false
      }
      let newNotifications = [newNotif, ...state.data];
      state.data = newNotifications.splice(0, 6);
    },
    notificationsRead: (state, action) => {
      state.data = state.data.map(notification => { notification.notified = true; return notification; })
    },
    setNotificationList: (state, action) => {
      state.data = action.payload.newNotifications;
    },
    setIsExporting: (state, action) => {
      let newExportingStates = { ...state.isExporting, ...action.payload };
      state.isExporting = newExportingStates;
    }
  }
})

export const actions = notificationSlice.actions

export default notificationSlice.reducer
