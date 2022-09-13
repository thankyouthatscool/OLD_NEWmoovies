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

  const { movieExtensions, movieLibraryPath, scanLocations } = useAppSelector(
    ({ app }) => app
  );

  const handleOtherClick = useCallback(async () => {
    const res = await Promise.all(
      scanLocations.map(async (location) => {
        const locationRes = await Promise.all(
          movieExtensions.map(async (fileExtension) => {
            try {
              const res: string[] = await invoke("scan_dir_for_movies", {
                path: `${location}/**/*.${fileExtension}`,
              });

              return res;
            } catch (e) {
              console.log(e);

              return [];
            }
          })
        );

        return locationRes.reduce((acc, val) => {
          return [...acc, ...val];
        }, [] as string[]);
      })
    );

    const foundFilesResult = res.reduce((acc, val) => {
      return [...acc, ...val];
    }, [] as string[]);

    setFoundFiles(() => foundFilesResult);
  }, [movieExtensions, scanLocations]);

  return (
    <>
      <SettingsModal />
      <RootWrapper>
        <Button
          color="success"
          onClick={async () => {
            const open_di = await open({
              defaultPath: scanLocations[0],
              directory: true,
              title: "Pick a Scan Location",
            });

            console.log(open_di);
          }}
          variant="contained"
        >
          Open Sesame
        </Button>
        <Typography>
          We are looking for {movieExtensions.join(", ")} files in{" "}
          {scanLocations.join(", ")}, to move to {movieLibraryPath}.
        </Typography>
        <div>
          <Button
            color="warning"
            onClick={handleOtherClick}
            variant="contained"
          >
            Show me PDFeffers
          </Button>
          {foundFiles.map((file) => (
            <div key={file}>{file}</div>
          ))}
        </div>
        <Button
          color="error"
          onClick={() => {
            setFoundFiles(() => []);
          }}
          variant="contained"
        >
          Clear
        </Button>

        <Button onClick={() => process.exit()}>Exit</Button>
        <Button
          onClick={() => {
            dispatch(openSettingsModal());
          }}
        >
          Open Settings
        </Button>
      </RootWrapper>
    </>
  );
};
