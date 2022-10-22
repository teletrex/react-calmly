/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


//import { createSlice } from '@reduxjs/toolkit';

export const initialState = () => ({
  activeAccordionTab: 0,
  usersGridData: {},
  rolesGridData: {},
  permissionsGridData: {}
});

const { reducer: userManagementReducer, actions } = createSlice({
  name: 'umReducer',
  initialState: initialState(),
  reducers: {
    changeAccordionTab: (state, action) => {
      state.activeAccordionTab = action.payload;
    },
    successUsersGridData: (state, action) => {
      state.usersGridData = action.payload.data.result;
    },
    failedUsersGridData: (state, action) => {
      state.usersGridData = {};
    },
    successRolesGridData: (state, action) => {
      state.rolesGridData = action.payload ? action.payload.data.result : null;
    },
    failedRolesGridData: (state, action) => {
      state.rolesGridData = {};
    },
    successPermissionsGridData: (state, action) => {
      state.permissionsGridData = action.payload ? action.payload.data.result : null;
    },
    failedPermissionsGridData: (state, action) => {
      state.permissionsGridData = {};
    },
  },
});


export default { userManagementReducer };

export { actions };
