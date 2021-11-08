import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Link from "@mui/material/Link";
import stringAvatar from "../../../utils/avatarsColors";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from "@mui/material/Tooltip";
import ManageAccessDialog from "./ManageAccessDialog";



const MembersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  p: 0.2,
}));

const MembersAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: 20,
}));

const handleEditorClick = () => {};
const handleReaderClick = () => {};

const ManageAccess = () => {
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const avatarNumber = isSmallScreen ? 4 : isMediumScreen ? 8 : 15;
  return (
    <Box
      sx={{
        display:
          useSelector(
            (state) =>
              state.bristol.EditorIsReadOnly ||
              state.bristol.EditorBristolParentId
          ) && "none",
      }}
    >
      <Link component="button" variant="caption" onClick={handleEditorClick}>
        Editor(s) :
      </Link>
      <ManageAccessDialog />
      <MembersContainer>
        <AvatarGroup max={avatarNumber}>
          {useSelector((state) => state.bristol.EditorBristolEditorsList).map(
            (editor, index) => (
              <Tooltip title={editor} key={editor}>
                <MembersAvatar
                  alt={editor}
                  {...stringAvatar(`${editor}`)}
                />
              </Tooltip>
            )
          )}
        </AvatarGroup>
      </MembersContainer>
      <Link component="button" variant="caption" onClick={handleReaderClick}>
        Reader(s) :
      </Link>
      <MembersContainer sx={{ mb: 1 }}>
        <AvatarGroup max={avatarNumber}>
          {useSelector((state) => state.bristol.EditorBristolReadersList).map(
            (reader, index) => (
              <Tooltip title={reader} key={reader}>
                <MembersAvatar
                  alt={reader}
                  {...stringAvatar(`${reader}`)}
                />
              </Tooltip>
            )
          )}
        </AvatarGroup>
      </MembersContainer>
    </Box>
  );
};

export default ManageAccess;
