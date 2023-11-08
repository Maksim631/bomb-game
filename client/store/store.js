import * as rtk from '@reduxjs/toolkit/dist/index.js';
import * as rtkQuery from '@reduxjs/toolkit/dist/query/index.js';

import { api } from './api';
import rootReducer from './reducers';

const { configureStore } = rtk.default ?? rtk;
const { setupListeners } = rtkQuery.default ?? rtkQuery;

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    game: rootReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
