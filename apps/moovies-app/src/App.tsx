import { Button, Typography } from "@mui/material";
import { invoke, process } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { useCallback, useState } from "react";

import { SettingsModal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { openSettingsModal } from "@/store";
import { RootWrapper } from "./Styled";

export const App = () => {
  const [foundFiles, setFoundFiles] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { newSettings, settings } = useAppSelector(({ settings }) => settings);

  // const handleOtherClick = useCallback(async () => {
  //   const res = await Promise.all(
  //     scanLocations.map(async (location) => {
  //       const locationRes = await Promise.all(
  //         movieExtensions.map(async (fileExtension) => {
  //           try {
  //             const res: string[] = await invoke("scan_dir_for_movies", {
  //               path: `${location}/**/*.${fileExtension}`,
  //             });

  //             return res;
  //           } catch (e) {
  //             console.log(e);

  //             return [];
  //           }
  //         })
  //       );

  //       return locationRes.reduce((acc, val) => {
  //         return [...acc, ...val];
  //       }, [] as string[]);
  //     })
  //   );

  //   const foundFilesResult = res.reduce((acc, val) => {
  //     return [...acc, ...val];
  //   }, [] as string[]);

  //   setFoundFiles(() => foundFilesResult);
  // }, [movieExtensions, scanLocations]);

  return (
    <>
      <SettingsModal />
      <RootWrapper>
        <Button
          onClick={() => {
            dispatch(openSettingsModal());
          }}
        >
          Open Settings
        </Button>
        <pre>
          {JSON.stringify(
            {
              newSettings,
              settings,
            },
            null,
            2
          )}
        </pre>
      </RootWrapper>
    </>
  );
};
