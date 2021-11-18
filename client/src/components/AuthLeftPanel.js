import Img from "../assets/img/nicole.jpg";
import { Box } from "@mui/system";

export default function AuthLeftPanel() {
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
			}}>
			<img
				src={Img}
				alt="logo"
				style={{ objectFit: "cover", width: "100%", height: "100vh" }}
			/>
		</Box>
	);
}
