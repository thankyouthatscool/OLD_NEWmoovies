import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  isSettingsModalOpen: boolean;
}

const initialState: AppState = {
  isSettingsModalOpen: true,
};

export const appSlice = createSlice({
  name: "app",
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

export const { closeSettingsModal, openSettingsModal } = appSlice.actions;

export default appSlice.reducer;
