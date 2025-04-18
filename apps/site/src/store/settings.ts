import { ThemeMode } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  theme: ThemeMode;
}

export const initialState: SettingsState = {
  theme: ThemeMode.auto,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
