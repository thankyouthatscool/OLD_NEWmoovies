import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { Button, IconButton, Typography } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { copyFile } from "@tauri-apps/api/fs";
import { useState } from "react";

import { SettingsModal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { openSettingsModal } from "@/store";
import { RootWrapper } from "./Styled";

interface MovieFile {
  extension: string;
  location: string;
  name: string;
}

export const App = () => {
  const [foundFiles, setFoundFiles] = useState<MovieFile[]>([]);

  const dispatch = useAppDispatch();

  const {
    settings: { movieExtensions, scanLocations },
  } = useAppSelector(({ settings }) => settings);

  const handleOtherClick = async () => {
    const res = await Promise.all(
      scanLocations.map(async (scanLocation) => {
        try {
          const locationRes = await Promise.all(
            movieExtensions.map(async (extension) => {
              const res: MovieFile[] = await invoke("scan_dir_for_movies", {
                path: `${scanLocation}/**/*${extension}`,
              });

              return res;
            })
          );

          return locationRes.reduce((acc, val) => {
            return [...acc, ...val];
          }, [] as MovieFile[]);
        } catch {
          return [];
        }
      })
    );

    const videoFilesArray = res.reduce((acc, val) => {
      return [...acc, ...val];
    }, [] as MovieFile[]);

    const foundSceneMovies = videoFilesArray.filter((file) =>
      /^(?<title>.*).?(?<year>\d{4}).?(\d{3,4})p/.test(file.name)
    );

    setFoundFiles(() => foundSceneMovies);
  };

  return (
    <>
      <SettingsModal />
      <RootWrapper>
        <IconButton
          onClick={() => {
            dispatch(openSettingsModal());
          }}
        >
          <SettingsTwoToneIcon />
        </IconButton>
        <Typography variant="caption">
          Looking for {movieExtensions.join(", ")} files in{" "}
          {scanLocations.join(", ")}.
        </Typography>
        <Button
          onClick={() => {
            handleOtherClick();
          }}
        >
          SCAN
        </Button>
        <pre>{JSON.stringify({ foundFiles }, null, 2)}</pre>
      </RootWrapper>
    </>
  );
};
