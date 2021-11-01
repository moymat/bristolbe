import BristolTreeView from './Tree';
import BristolEditorView from './Editor';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// import SwipeableEdgeDrawer from './SwipeableDrawer'

const BristolView = () => (

    <Box sx={{ flexGrow: 1 }}>
      
    <Grid container spacing={2}>
      <Grid item xs={3} >
       {/*  <Box sx={{ display: { xs: "block", sm: "none" }}}>
        <SwipeableEdgeDrawer />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" }}}> */}
        <BristolTreeView />
        {/* </Box> */}
      </Grid>
      <Grid item xs={9}>
        {true && <BristolEditorView />}
      </Grid>
    </Grid>
  </Box>
);

export default BristolView;



