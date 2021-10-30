import React from "react";
import Nestable from "react-nestable";
import "./styles.css";
import { createNestedMenu, generateFlatMenu, menus } from "./helper.js";
//material import
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from '@mui/icons-material/Save';

export default class BristolView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsTemp: [],
    };

    this.handleOnChangeSort = this.handleOnChangeSort.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  componentDidMount() {
    this.setState({
      itemsTemp: createNestedMenu(menus),
    });
  }

  handleOnChangeSort(items) {
    this.setState({
      itemsTemp: items,
    });
  }

  handleGenerate() {
    const { itemsTemp } = this.state;
    const flatMenu = generateFlatMenu(itemsTemp);

    console.log(flatMenu);
  }

  render() {
    return (
      <Box >
        <Stack direction="row" spacing={1} sx={{ mb: 1}}>
        <Button variant="outlined" disabled={true}>CANCEL</Button>
        <Button startIcon={<SaveIcon />} fullWidth variant="contained" disabled={true} >
            SAVE POSITION
          </Button>
          
        </Stack>
        <Box>
          <Nestable
            collapsed={true}
            maxDepth={15}
            items={this.state.itemsTemp}
            renderItem={({ item, collapseIcon }) => (
              <div className="listMenu">
                {collapseIcon}
                {item.label}
              </div>
            )}
            onChange={this.handleOnChangeSort}
            renderCollapseIcon={({ isCollapsed }) =>
              isCollapsed ? (
                <span className="iconCollapse">+</span>
              ) : (
                <span className="iconCollapse">-</span>
              )
            }
          />

          {/* <button onClick={this.handleGenerate}>Generate</button> */}
          <Fab
            color="primary"
            aria-label="add"
            onClick={this.handleGenerate}
            sx={{ position: "fixed", bottom: 50, ml: "18%" }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    );
  }
}
