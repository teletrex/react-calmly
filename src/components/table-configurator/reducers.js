/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import { createSlice } from '@reduxjs/toolkit';


export const initialState = () => ({
  userReportPref: {},
});

const { reducer: gridConfiguratorReducer, actions } = createSlice({
  name: 'gridConfiguratorReducer',
  initialState: initialState(),
  reducers: {
    successUserReportPref: (state, action) => {
      state.userReportPref = action.payload ? action.payload.data : {result: null};
    },
    failedUserReportPref: (state, action) => {
      state.userReportPref = null;
    },
  },
});

export { actions };

export default { gridConfiguratorReducer };
