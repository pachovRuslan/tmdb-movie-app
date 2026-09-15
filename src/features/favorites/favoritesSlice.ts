import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoriteMovie } from '../../types/favorite';

const STORAGE_KEY = 'favorites';

const getInitialFavorites = (): FavoriteMovie[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

interface FavoritesState {
    items: FavoriteMovie[];
}

const initialState: FavoritesState = {
    items: getInitialFavorites(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
            const exists = state.items.find((item) => item.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;