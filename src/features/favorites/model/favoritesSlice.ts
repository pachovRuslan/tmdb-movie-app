import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FavoriteMovie } from "@/common/types";
import { STORAGE_KEYS } from "@/common/constants/constants"

const getInitialFavorites = (): FavoriteMovie[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.favorites);
    return stored ? JSON.parse(stored) : [];
};

type FavoritesState = {
  items: FavoriteMovie[];
}

const initialState: FavoritesState = {
  items: getInitialFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
