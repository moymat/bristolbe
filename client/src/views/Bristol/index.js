import BristolTreeView from './bristolTreeView';
import BristolEditorView from './bristolEditorView';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const BristolView = () => (

    <Box sx={{ flexGrow: 1 }}>
      
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <BristolTreeView />
      </Grid>
      <Grid item xs={9}>
        <BristolEditorView />
      </Grid>
    </Grid>
  </Box>
);

export default BristolView;



