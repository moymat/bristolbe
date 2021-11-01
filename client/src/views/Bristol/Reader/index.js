import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Reader = () => {
    return (
        <Box sx={{ textAlign: "center", my: 2 }}>
            <Divider sx={{ m: 1}}>read-write or read-only</Divider>
            <Typography >you are currently reading the bristol with id {useSelector((state) => state.bristol.inReading.id)} </Typography >
            <Divider sx={{ m: 1, mt:2}}>read-write</Divider>
            <Typography >you have just moved the bristol with id {useSelector((state) => state.bristol.lastMovedItem.id)}, son parent est maitenant {useSelector((state) => state.bristol.lastMovedItem.parent)} et sa postion est {useSelector((state) => state.bristol.lastMovedItem.orderNo)} </Typography >
        </Box>
        
    )
}

export default Reader;