import Box from "@mui/material/Box";
import AuthLeftPanel from "./AuthLeftPanel";

export default function InputLayout({ children }) {
	return (
		<Box sx={{ display: "flex", minHeight: "100vh", width: "100vw" }}>
			<Box
				sx={{
					display: { xs: "none", md: "flex" },
					flex: 1,
				}}>
				<AuthLeftPanel />
			</Box>
			<Box
				sx={{
					width: 600,
					margin: "auto",
					padding: " 30px 60px",
				}}>
				{children}
			</Box>
		</Box>
	);
}
