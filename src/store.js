/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notifications/notificationsSlice';
import workspaceReducer from "./components/workspace/workspaceSlice";

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    workspaces: workspaceReducer
//    principal: principalReducer,
//    workspaces: workspaceReducer,
//    widgetLibrary: widgetLibraryReducer,
//    workspaceLibrary: workspaceLibraryReducer,

  },
})

export default store;
