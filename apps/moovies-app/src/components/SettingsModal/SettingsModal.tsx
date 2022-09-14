import ControlPointTwoToneIcon from "@mui/icons-material/ControlPointTwoTone";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { open } from "@tauri-apps/api/dialog";
import { parse } from "path-browserify";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  closeSettingsModal,
  saveSettings,
  setNewSettings,
  setSelectedSettingsTab,
} from "@/store";
import { ModalBodyWrapper, SettingsOptionButton, StyledCard } from "./Styled";

export const SettingsModal = () => {
  const dispatch = useAppDispatch();

  const { isSettingsModalOpen } = useAppSelector(({ app }) => app);
  const { newSettings, selectedTab } = useAppSelector(
    ({ settings }) => settings
  );

  const handleCancel = () => {
    dispatch(closeSettingsModal());
    dispatch(setNewSettings({}));
  };

  const handleSave = () => {
    dispatch(saveSettings(newSettings));
    dispatch(closeSettingsModal());
  };

  return (
    <Modal
      onClose={handleCancel}
      open={isSettingsModalOpen}
      style={{ display: "flex" }}
    >
      <ModalBodyWrapper>
        <StyledCard>
          <div style={{ background: "#eee" }}>
            <SettingsOption
              index={0}
              label={"Content"}
              targetOptions={["movieExtensions", "scanLocations"]}
            />
            <SettingsOption index={1} label={"Library"} targetOptions={[]} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0.25rem 1rem 1rem 1rem",
              width: "100%",
            }}
          >
            <div style={{ flex: 1 }}>
              {selectedTab === 0 ? <ContentSettings /> : "Library Settings"}
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button color="warning" onClick={handleCancel} variant="text">
                Cancel
              </Button>
              <Button
                disabled={!Object.keys(newSettings).length}
                onClick={handleSave}
                variant="contained"
              >
                Save
              </Button>
            </div>
          </div>
        </StyledCard>
      </ModalBodyWrapper>
    </Modal>
  );
};

export const SettingsOption = ({
  index,
  label,
  targetOptions,
}: {
  index: number;
  label: string;
  targetOptions: string[];
}) => {
  const dispatch = useAppDispatch();

  const { newSettings, selectedTab } = useAppSelector(
    ({ settings }) => settings
  );

  return (
    <SettingsOptionButton
      fullWidth
      isModified={
        !!Object.keys(newSettings).filter((newSetting) =>
          targetOptions.includes(newSetting)
        ).length
      }
      isSelected={index === selectedTab}
      onClick={() => {
        dispatch(setSelectedSettingsTab(index));
      }}
      variant="text"
    >
      {label}
    </SettingsOptionButton>
  );
};

export const ContentSettings = () => {
  const dispatch = useAppDispatch();

  const { newSettings, settings } = useAppSelector(({ settings }) => settings);

  return (
    <>
      <Typography variant="h6" fontWeight={"bold"}>
        Content Settings
      </Typography>
      <Divider style={{ marginTop: "0.5rem" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <div>
          <Typography>Scan Locations</Typography>
          <Typography variant="caption">
            What locations will be scanned?
          </Typography>
        </div>
        <div>
          {newSettings.scanLocations
            ? newSettings.scanLocations.map((scanLocation) => {
                return (
                  <Chip
                    key={scanLocation}
                    label={scanLocation}
                    {...(newSettings.scanLocations!.length > 1 && {
                      onDelete: () => {
                        console.log({ ...newSettings, scanLocation: [] });

                        dispatch(
                          setNewSettings({
                            ...newSettings,
                            scanLocations: newSettings.scanLocations?.filter(
                              (location) => location !== scanLocation
                            ),
                          })
                        );
                      },
                    })}
                  />
                );
              })
            : settings.scanLocations.map((scanLocation) => {
                return (
                  <Chip
                    key={scanLocation}
                    label={scanLocation}
                    {...(settings.scanLocations.length > 1 && {
                      onDelete: () => {
                        dispatch(
                          setNewSettings({
                            ...newSettings,
                            scanLocations: settings.scanLocations.filter(
                              (location) => location !== scanLocation
                            ),
                          })
                        );
                      },
                    })}
                  />
                );
              })}
        </div>
        <IconButton
          color="info"
          onClick={async () => {
            try {
              const newScanDirectory = await open({ directory: true });

              if (!!newScanDirectory) {
                if (!Array.isArray(newScanDirectory)) {
                  if (newSettings.scanLocations) {
                    dispatch(
                      setNewSettings({
                        ...newSettings,
                        scanLocations: Array.from(
                          new Set([
                            ...newSettings.scanLocations,
                            newScanDirectory,
                          ])
                        ),
                      })
                    );
                  } else {
                    dispatch(
                      setNewSettings({
                        ...newSettings,
                        scanLocations: Array.from(
                          new Set([...settings.scanLocations, newScanDirectory])
                        ),
                      })
                    );
                  }
                }
              }
            } catch (e) {
              console.log(`Error ${e}`);
              console.log("Could not pick a new scan directory...");
            }
          }}
        >
          <ControlPointTwoToneIcon />
        </IconButton>
      </div>
      <Divider style={{ marginTop: "0.5rem" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <div>
          <Typography>Target File Extensions</Typography>
          <Typography variant="caption">
            What movie extensions to look for?
          </Typography>
        </div>
        <div>
          {newSettings.movieExtensions
            ? newSettings.movieExtensions.map((extension) => {
                return (
                  <Chip
                    color="info"
                    key={extension}
                    label={extension}
                    {...(newSettings.movieExtensions!.length > 1 && {
                      onDelete: () => {
                        dispatch(
                          setNewSettings({
                            ...newSettings,
                            movieExtensions: [
                              ...newSettings.movieExtensions!.filter(
                                (currentExtension) =>
                                  currentExtension !== extension
                              ),
                            ],
                          })
                        );
                      },
                    })}
                  />
                );
              })
            : settings.movieExtensions.map((extension) => {
                return (
                  <Chip
                    color="info"
                    key={extension}
                    label={extension}
                    {...(settings.movieExtensions.length > 1 && {
                      onDelete: () => {
                        dispatch(
                          setNewSettings({
                            ...newSettings,
                            movieExtensions: [
                              ...settings.movieExtensions.filter(
                                (currentExtension) =>
                                  currentExtension !== extension
                              ),
                            ],
                          })
                        );
                      },
                    })}
                  />
                );
              })}
        </div>
        <IconButton
          color="info"
          onClick={async () => {
            try {
              const selectedFiles = await open({ multiple: true });

              if (selectedFiles) {
                if (Array.isArray(selectedFiles)) {
                  const newExtensions = selectedFiles.map((selectedFile) => {
                    const { ext } = parse(selectedFile);

                    return ext;
                  });

                  if (newSettings.movieExtensions) {
                    dispatch(
                      setNewSettings({
                        ...newSettings,
                        movieExtensions: Array.from(
                          new Set([
                            ...newSettings.movieExtensions,
                            ...newExtensions,
                          ])
                        ),
                      })
                    );
                  } else {
                    dispatch(
                      setNewSettings({
                        ...newSettings,
                        movieExtensions: Array.from(
                          new Set([
                            ...settings.movieExtensions,
                            ...newExtensions,
                          ])
                        ),
                      })
                    );
                  }
                }
              }
            } catch (e) {
              console.log(`Error ${e}`);
              console.log("Could not pick a file type...");
            }
          }}
        >
          <ControlPointTwoToneIcon />
        </IconButton>
      </div>
    </>
  );
};
