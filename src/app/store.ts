import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import { themeReducer } from '../features/theme/themeSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        theme: themeReducer,
        favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;