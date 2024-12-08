import { configureStore } from '@reduxjs/toolkit';
import { apiErrorHandler } from '../api/apiErrorHandler.ts';
import { modalSlice } from './modalSlice';
import {api} from "../api/api.ts";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiErrorHandler, api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;