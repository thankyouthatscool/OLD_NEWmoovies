import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { Button, IconButton, Typography } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useState } from "react";

import { SettingsModal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { openSettingsModal } from "@/store";
import { RootWrapper } from "./Styled";

export const App = () => {
  const [foundFiles, setFoundFiles] = useState<string[]>([]);

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
              const res: string[] = await invoke("scan_dir_for_movies", {
                path: `${scanLocation}/**/*${extension}`,
              });

              return res;
            })
          );

          return locationRes.reduce((acc, val) => {
            return [...acc, ...val];
          }, [] as string[]);
        } catch {
          return [];
        }
      })
    );

    const foundSceneMovies = res
      .reduce((acc, val) => {
        return [...acc, ...val];
      }, [] as string[])
      .filter((file) => /^(?<title>.*).?(?<year>\d{4}).?(\d{3,4})p/.test(file));

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
        <Button onClick={handleOtherClick}>SCAN</Button>
        <pre>{JSON.stringify({ foundFiles }, null, 2)}</pre>
      </RootWrapper>
    </>
  );
};
