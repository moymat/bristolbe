import Paper from "@mui/material/Paper";
import Img from "../../assets/img/nicole.jpg"


export default function AuthLeftPanel() {
	return (
		<Paper
			sx={{
				width: "100%",
				display: "flex",	
			}}>
			<img src={Img} alt="logo" style={{objectFit: "cover", width: "100%", height: "100vh"}}/>
		</Paper> 
	);
}
