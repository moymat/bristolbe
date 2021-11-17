import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import BristolTree from "../components/Bristol/BristolTree";
import BristolEditor from "../components/Bristol/BristolEditor";
import useMediaQuery from "@mui/material/useMediaQuery";

const BristolView = () => {
	const editorIsVisible = useSelector(state => state.bristol.editorIsVisible);
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));

	return (
		<Box sx={{ display: "flex" }}>
			<Box
				sx={{
					minWidth: isSmallScreen ? 0 : 300,
				}}>
				<BristolTree />
			</Box>
			<Box flexGrow="1">{editorIsVisible && <BristolEditor />}</Box>
		</Box>
	);
};

export default BristolView;
