import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { chooseName } from './actions';

const state = createReducer({}, (builder) => {
  builder.addCase(chooseName, (state, action) => {
    state.name = action.payload;
  });
});

export default combineReducers({ state });
