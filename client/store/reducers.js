import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { addTodo } from './actions';

const state = createReducer([], (builder) => {
  builder.addCase(addTodo, (state, action) => {
    // "mutate" the array by calling push()
    state.push(action.payload);
  });
});

export default combineReducers({ state });
