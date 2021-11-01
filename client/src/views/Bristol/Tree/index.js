import { useState, useEffect } from "react";
import Nestable from "react-nestable";
import "./styles.css";
import { createNestedMenu, generateFlatMenu, menus } from "./helper.js";
//material import
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import Divider from "@mui/material/Divider";

const BristolView = () => {
  const [itemsTemp, setItemsTemp] = useState([]);

  useEffect(() => {
    setItemsTemp(createNestedMenu(menus));
  }, []);

  const handleOnChangeSort = (items) => {
    setItemsTemp(items);
  };

  const handleGenerate = () => {
    //const { itemsTemp } = this.state;
    const flatMenu = generateFlatMenu(itemsTemp);

    console.log(flatMenu);
  };

  const handleOnClick = (event) => {
    const targetedEl = event.target.parentNode.parentNode;
    const targetedElClassList = targetedEl.classList;
    let targetId;
    if (
      targetedElClassList.contains("nestable-item") &&
      !targetedElClassList.contains("listMenu")
    ) {
      targetedElClassList.forEach((value) => {
        if (value !== "nestable-item") {
          targetId = value.substring(14);
        }
      });
      //action
      console.log(+targetId);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 1, display: { xs: "none", sm: "flex" } }}
      >
        <Button variant="outlined" disabled={true}>
          CANCEL
        </Button>
        <Button
          startIcon={<SaveIcon />}
          fullWidth
          variant="contained"
          disabled={true}
        >
          SAVE POSITION
        </Button>
      </Stack>
      <Box onClick={handleOnClick}>
        {/* read-write tree */}
        <Divider>read-write</Divider>
        <Box sx={{ mt: 1, mb: 2 }}>
          <Nestable
            groupe={1}
            collapsed={true}
            maxDepth={15}
            items={itemsTemp}
            renderItem={({ item, collapseIcon }) => (
              <div className="listMenu">
                {collapseIcon}
                {item.label}
              </div>
            )}
            onChange={handleOnChangeSort}
            renderCollapseIcon={({ isCollapsed }) =>
              isCollapsed ? (
                <span className="iconCollapse">+</span>
              ) : (
                <span className="iconCollapse">-</span>
              )
            }
          />
        </Box>

        {/* read-only tree */}
        <Divider>read-only</Divider>
        <Box sx={{ mt: 1 }}>
          <Nestable
            groupe={2}
            collapsed={true}
            maxDepth={15}
            items={itemsTemp}
            renderItem={({ item, collapseIcon }) => (
              <div className="listMenuRead">
                {collapseIcon}
                {item.label}
              </div>
            )}
            renderCollapseIcon={({ isCollapsed }) =>
              isCollapsed ? (
                <span className="iconCollapse">+</span>
              ) : (
                <span className="iconCollapse">-</span>
              )
            }
          />
        </Box>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleGenerate}
          sx={{
            position: "fixed",
            bottom: 50,
            ml: "18%",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default BristolView;
