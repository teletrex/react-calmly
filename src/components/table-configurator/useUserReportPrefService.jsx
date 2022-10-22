/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from "react";

import axios from 'axios';

/* preferenceParams
    reportName:
    aggregationLevel:
*/


const useUserReportPrefService = (dispatch, userReportPrefUrl) => {

  const saveColumnWidths = async (userReportPreference, successAction, errorAction) => {
    userReportPreference.userName = 'unsafe'; //backend fills this in for security
    userReportPreference.org = 'unsafe'; //backend fills this in for security
    const res = await axios.post(userReportPrefUrl, userReportPreference)
    if (res.data.status === "ok") {
      dispatch(successAction(res))
    }
    else {
      dispatch(errorAction(res))
    }
    return "request sent";
  };

  const saveUserReportPref = async (userReportPreference, successAction, errorAction) => {
    userReportPreference.userName = 'unsafe'; //backend fills this in for security
    userReportPreference.org = 'unsafe'; //backend fills this in for security
    const res = await axios.post(userReportPrefUrl, userReportPreference)
    if (res.data.status === "ok") {
      // refetch whole report. Then dispatch.
      dispatch(successAction(res))
    }
    else {
      dispatch(errorAction(res))
    }
    return "request sent";
  };

  const savePageSizePref = async (userReportPreference, successAction, errorAction) => {
    userReportPreference.aggregationLevel = "--all--";  // force to --all--
    userReportPreference.userName = "unsafe";   // force backend to securely supply `
    userReportPreference.org = "unsafe";
    const res = await axios.post(userReportPrefUrl, userReportPreference)
    if (res.data.status === "ok")
    {
//      dispatch(successAction(res))
    }
    else {
//      dispatch(errorAction(res));
    }
    return "request sent";
  }


  return {
    saveUserReportPref: saveUserReportPref,
    savePageSizePref: savePageSizePref,
    saveColumnWidths: saveColumnWidths
  };
};

export default useUserReportPrefService;
