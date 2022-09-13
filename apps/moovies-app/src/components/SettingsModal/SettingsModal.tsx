import {
  Button,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { open } from "@tauri-apps/api/dialog";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { closeSettingsModal } from "@/store";
import { ModalBodyWrapper, StyledCard } from "./Styled";

export const SettingsModal = () => {
  const [tabsValue, setTabsValue] = useState<number>(0);

  const dispatch = useAppDispatch();

  const { isSettingsModalOpen } = useAppSelector(({ settings }) => settings);

  const handleCancelClick = () => {
    dispatch(closeSettingsModal());
  };

  return (
    <Modal onClose={handleCancelClick} open={isSettingsModalOpen}>
      <ModalBodyWrapper>
        <StyledCard>
          <div
            style={{
              padding: "1rem 1rem",
            }}
          >
            <Typography variant="h5">Preferences</Typography>
          </div>
          <CardContent
            style={{
              flex: 1,
              overflow: "hidden auto",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              <Tabs
                onChange={(_, newValue) => {
                  setTabsValue(() => newValue);
                }}
                orientation="vertical"
                style={{
                  height: "100%",
                  width: "150px",
                }}
                value={tabsValue}
                variant="scrollable"
              >
                <Tab label="Library" />
                <Tab label="Search" />
              </Tabs>
              <div style={{ flex: "1", marginLeft: "1rem" }}>
                {tabsValue === 0 ? <LibrarySettings /> : <SearchSettings />}
              </div>
            </div>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button
              color="warning"
              onClick={handleCancelClick}
              variant="outlined"
            >
              Close
            </Button>
            <Button variant="contained">Save</Button>
          </CardActions>
        </StyledCard>
      </ModalBodyWrapper>
    </Modal>
  );
};

export const LibrarySettings = () => {
  const { movieLibraryPath } = useAppSelector(({ app }) => app);

  return (
    <>
      <Typography variant="h5">Library Location</Typography>
      <Divider />
      <Typography>{movieLibraryPath}</Typography>
      <Button>Change</Button>
    </>
  );
};

export const SearchSettings = () => {
  return (
    <>
      <Typography variant="body2">
        Settings related to scan location(s).
      </Typography>
    </>
  );
};
