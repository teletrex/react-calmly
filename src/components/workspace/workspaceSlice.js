/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */





import { createSlice } from '@reduxjs/toolkit';

export const initialState = () => ({
  myWorkspaces: {},
});

const { reducer: workspaceReducer, actions } = createSlice({
  name: 'workspaces',
  initialState: initialState(),
  reducers: {
    successWorkspaces: (state, action) => {
      state.myWorkspaces = action.payload ? action.payload.data : {result: null};
    },
    failedWorkspaces: (state, action) => {
      state.myWorkspaces = null;
    },
  },
});

export { actions };

export default {workspaceReducer} ;
