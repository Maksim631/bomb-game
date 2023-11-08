// import { combineReducers, createReducer } from '@reduxjs/toolkit';
import * as rtk from '@reduxjs/toolkit/dist/index.js';

import { chooseName } from './actions';
const { combineReducers, createReducer } = rtk.default ?? rtk;

const state = createReducer({}, (builder) => {
  builder.addCase(chooseName, (state, action) => {
    state.name = action.payload;
  });
});

export default combineReducers({ state });
