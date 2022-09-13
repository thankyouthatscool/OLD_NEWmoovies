import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NewSettings = Partial<Settings>;

interface Settings {
  movieExtensions: string[];
  movieLibraryPath: string;
  scanLocations: string[];
}

export interface SettingsState {
  newSettings: NewSettings;
  selectedTab: number;
  settings: Settings;
}

const initialState: SettingsState = {
  newSettings: {},
  selectedTab: 0,
  settings: {
    movieExtensions: ["mkv", "mp4"],
    movieLibraryPath: "/mnt/d/Movies",
    scanLocations: ["/mnt/c/Users/Sasha/Downloads"],
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    saveSettings: (state, { payload }: PayloadAction<NewSettings>) => {
      console.log(payload);

      state.settings = { ...state.settings, ...payload };
      state.newSettings = {};
    },
    setNewSettings: (state, { payload }: PayloadAction<NewSettings>) => {
      state.newSettings = payload;
    },
    setSelectedSettingsTab: (state, { payload }: PayloadAction<number>) => {
      state.selectedTab = payload;
    },
  },
});

export const { saveSettings, setNewSettings, setSelectedSettingsTab } =
  settingsSlice.actions;

export default settingsSlice.reducer;
