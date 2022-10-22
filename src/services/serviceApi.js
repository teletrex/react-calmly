/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React, { useContext, useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import shellConfig from '../shellConfig';


const forceSelection = "mock"; //"api", "mock"

const serviceApi = {
  principal: {
    getUser: {
      api: `${shellConfig.routerCfg.basename}/api/v1/iam/user`,
      mock: "assets/mockdata/iam/user.json",
      selection: forceSelection || "mock",
    }
  },

  user: {
    getCategories: {
      api: `${shellConfig.routerCfg.basename}/api/user/getCategories`,
      mock: "assets/mockdata/categories.json",
      selection: forceSelection || "mock",
    },

    userReportPref: {
      api: `${shellConfig.routerCfg.basename}/api/user/userReportPref`,
      mock: "assets/mockdata/user-pref-data.json",
      selection: "api"  //forceSelection || "mock",
    },

    getUsername: {
      api: `${shellConfig.routerCfg.basename}/api/user/getUsername`,
      mock: 'assets/mockdata/user-info.json',
      selection: forceSelection || "mock",
    },
    getUserProfile: {
      api: `${shellConfig.routerCfg.basename}/api/user/userProfile`,
      mock: 'assets/mockdata/user-profile.json',
      selection: forceSelection || ' mock',
    },

    getUserGroup: {
      api: `${shellConfig.routerCfg.basename}/api/user/getUserRole`,
      mock: 'assets/mockdata/user-group.json',
      selection: forceSelection || 'mock',
    },

    getTimeZones: {
      api: `${shellConfig.routerCfg.basename}/api/user/getTimeZones`,
      mock: 'assets/mockdata/timezones.json',
      selection: forceSelection || 'mock',
    }
  },
  workspaces: {
    getWorkspace: {
      url: `${shellConfig.routerCfg.basename}/api/v1/ui/workspace/`,
      method: 'GET',
      mock: "assets/mockdata/workspaces/workspace-overview-default.json",
      selection: forceSelection || "mock",
    }
  },
  exporting:{
    checkExportStatus:{
      api:`${shellConfig.routerCfg.basename}/api/exports/checkStatus`
    },
    userNotified:{
      api:`${shellConfig.routerCfg.basename}/api/exports/userNotified`
    },
    newExport:{
      api:`${shellConfig.routerCfg.basename}/api/exports/newExport`
    },
    downloadFile:{
      api:`${shellConfig.routerCfg.basename}/api/exports/download`
    }
  },
}

export default serviceApi;
