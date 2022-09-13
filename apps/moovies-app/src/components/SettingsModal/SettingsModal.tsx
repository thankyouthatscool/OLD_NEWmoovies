import { Button, Chip, Divider, Modal, Typography } from "@mui/material";

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
            Locations that will be scanned
          </Typography>
        </div>
        <Button>Add</Button>
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
        <Button
          onClick={() => {
            dispatch(setNewSettings({ movieExtensions: [".mp4", ".mkv"] }));
          }}
        >
          Add
        </Button>
      </div>
      <pre>
        {JSON.stringify(
          {
            newSettings,
            newSettingsKeys: Object.keys(newSettings),
            settings,
          },
          null,
          2
        )}
      </pre>
    </>
  );
};
