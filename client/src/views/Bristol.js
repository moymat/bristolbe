import { useRef } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import BristolTree from "../components/Bristol/BristolTree";
import BristolEditor from "../components/Bristol/BristolEditor";
import useMediaQuery from "@mui/material/useMediaQuery";

const BristolView = () => {
	const editorIsVisible = useSelector(state => state.bristol.editorIsVisible);
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const drawerIntercepter = useRef();

	return (
		<Box sx={{ display: "flex" }}>
			<Box
				sx={{
					minWidth: isSmallScreen ? 0 : 300,
				}}>
				<BristolTree intercepter={drawerIntercepter} />
			</Box>
			<Box sx={{ width: "100%" }}>{editorIsVisible && <BristolEditor />}</Box>
			<Box
				ref={drawerIntercepter}
				className="drawer-intercepter"
				style={{
					position: "fixed",
					left: 0,
					bottom: 0,
					width: "100%",
					height: 56,
				}}></Box>
		</Box>
	);
};

export default BristolView;
