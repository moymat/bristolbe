import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const countBristols = (arr) =>
  arr.reduce((acc, el) => {
    if (el.children) acc += countBristols(el.children);
    return acc + 1;
  }, 0);

function SwipeableEdgeDrawer({
  window,
  children,
  newBristol,
  handleOpen,
  open,
}) {
  const bristols = useSelector((state) => state.bristol.bristols);
  const [bristolsNb, setBristolsNb] = useState("0 bristol");

  const toggleDrawer = (newOpen) => () => {
    handleOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    const nb = countBristols(bristols);
    setBristolsNb(`${nb} bristol${nb > 1 ? "s" : ""}`);
  }, [bristols]);

  return (
    <Root>
      <SwipeableDrawer
        sx={{
          "& .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            boxShadow: "0 -1px 1px 1px lightgrey",
            visibility: { xs: "visible", sm: "hidden" },
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              {bristolsNb}
            </Typography>
          </Box>
        </StyledBox>
        <StyledBox sx={{}}>
          <Button
            sx={{ px: 2, float: "right" }}
            variant="text"
            onClick={newBristol}
            size="small"
          >
            New Bristol
          </Button>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
