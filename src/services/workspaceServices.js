/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import react from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import {actions} from '../components/workspace/workspaceSlice';
import shellConfig from "../shellConfig";



export const makeQuery = queryObject => {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join('='))
      return result
    }, []).join('&')
  return `?${query}`
};

// This is a super helper for creating services
// example
//       url: `${sdtUrl}${makeQuery(reviewTableParams)}`,
//       method: "GET",
//       headers: {'X-Requested-With-Custom': 'XMLHttpRequest-Custom'},
//       successType: actions.successReviewTableData.type,
//       failType: actions.failedReviewTableData.type,
//       data: {},


// all responses need to have a status:"ok" in the repsonse json at the top level to be a success.

const useDispatchRequest = async (
  {
    url,
    method,
    headers,
    successAction,
    failureAction,
    data,
  }) => {


  const dispatch = useDispatch();
  const axios = axios;

  const methodFunction = (method) => {
    const methods = {
      'GET': axios.get,
      'POST': axios.post,
      'PATCH': axios.patch,
      'PUT': axios.put
    }
    return methods[method.toUpperCase()];
  }

  let response = await methodFunction(method)(url);
  if (response.data.status === "ok") dispatch(successAction(response));
  else dispatch(failureAction(response));
  return "request sent";
};

const workspaceServices = (serviceApi) => {

  const basepath = shellConfig.routerCfg.basename;

  const actions = actions;

  const getWorkspace = async (workspaceId) => {
    useDispatchRequest(
      {
        url: basepath + serviceApi.workspaces.getWorkspace + workspaceId,
        method: 'GET',
        successAction: actions.successWorkspaces,
        failureAction: actions.failedWorkspaces,
        data: {}
      })

    const getWorkspaces = async () => {
      useDispatchRequest(
        {
          url: basepath + serviceApi.workspaces.getWorkspace + workspaceId,
          method: 'GET',
          successAction: actions.successWorkspaces,
          failureAction: actions.failedWorkspaces,
          data: {}
        })
    }

    return {
      getWorkspace
    }
  }
}

export default workspaceServices;
