import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
  isSettingsModalOpen: boolean;
}

const initialState: SettingsState = {
  isSettingsModalOpen: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    closeSettingsModal: (state) => {
      state.isSettingsModalOpen = false;
    },
    openSettingsModal: (state) => {
      state.isSettingsModalOpen = true;
    },
  },
});

export const { closeSettingsModal, openSettingsModal } = settingsSlice.actions;

export default settingsSlice.reducer;
