import { Button, Card } from "@mui/material";
import styled from "styled-components";

export const ModalBodyWrapper = styled.div`
  align-self: center;

  display: flex;

  justify-content: center;

  height: 75%;

  margin: 0 2rem;
  min-height: 700px;
  min-width: 500px;

  user-select: none;

  width: 100%;
`;

export const SettingsOptionButton = styled(Button)<{
  isModified: boolean;
  isSelected: boolean;
}>`
  background-color: #${(props) => (props.isSelected ? "ddd" : "eee")};
  border-radius: 0;

  color: ${(props) =>
    props.isModified ? "dodgerBlue" : "rgba(25, 23, 17, 0.6)"};

  font-weight: bold;

  justify-content: flex-start;

  &:hover {
    background-color: #ddd;
  }
`;

export const StyledCard = styled(Card)`
  display: flex;

  width: 100%;
`;
