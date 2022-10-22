/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import axios from 'axios';
import serviceApi from '../../services/serviceApi';
import { useMemo } from 'react';

const useHeaderService = (params) => {
  const userUrl = serviceApi.user.getUsername[serviceApi.user.getUsername.selection];

  const getUserDataApi = parameters => {
    return axios
      .get(userUrl, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(
        res => {
          return res.data.result;
        },
        err => {
          console.log(err);
          return '';
        },
      );
  };

  const userProfileUrl = serviceApi.user.getUserProfile[serviceApi.user.getUserProfile.selection];

  const getUserProfileApi = parameters => {
    return axios
      .get(userProfileUrl, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(
        res => {
          return res.data.result;
        },
        err => {
          console.log(err);
          return '';
        },
      );
  };

  const userGroupUrl = serviceApi.user.getUserGroup[serviceApi.user.getUserGroup.selection];

  const getUserGroupDataApi = name => {
    return axios
      .get(userGroupUrl, {
        params: {
          username: name,
        },
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(
        res => {
          return res.data.result.isAdmin || false;
        },
        err => {
          console.log(err);
          return false;
        },
      );
  };

  const checkExportStatusAPI = serviceApi.exporting.checkExportStatus.api;

  const getExportStatus = () => {
    return axios.get(checkExportStatusAPI)
      .then(
        res => res.data,
        err => {
          console.log(err);
          return [];
        }
      )
  }

  const userNotifiedAPI = serviceApi.exporting.userNotified.api;
  const userNotified = () => {
    return axios.get(userNotifiedAPI)
      .catch(
        err => {
          console.log(err);
        }
      )
  }

  const createFileURL = (exportType,fileName) => {
    return `${serviceApi.exporting.downloadFile.api}/${exportType}?fileName=${fileName}`;
  }

  return ()=>({
    getUserDataApi: getUserDataApi,
    getUserProfileApi: getUserProfileApi,
    getUserGroupDataApi: getUserGroupDataApi,
    getExportStatus,
    userNotified,
    createFileURL
  });
};

export default useHeaderService;
