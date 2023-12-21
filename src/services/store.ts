import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { metersApi } from "./meters";

export const store = configureStore({
  reducer: {
    [metersApi.reducerPath]: metersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(metersApi.middleware),
});

setupListeners(store.dispatch);
