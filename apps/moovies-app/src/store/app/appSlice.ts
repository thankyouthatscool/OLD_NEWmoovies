import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  movieExtensions: string[];
  movieLibraryPath: string;
  scanLocations: string[];
}

const initialState: AppState = {
  movieExtensions: ["mp4"],
  movieLibraryPath: "/mnt/d/Movies",
  scanLocations: ["/mnt/c/Users/Sasha/Downloads"],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
