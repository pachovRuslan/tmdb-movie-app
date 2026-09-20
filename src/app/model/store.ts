import { configureStore } from "@reduxjs/toolkit"; 
import { themeReducer } from "@/features/theme/model/themeSlice";
import { favoritesReducer } from "@/features/favorites/model/favoritesSlice";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    theme: themeReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
