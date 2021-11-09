import Typography from "@mui/material/Typography";

const SectionTitle = ({ children }) => (
	<Typography variant="h4" component="h1" fontWeight={700} mb={2}>
		{children}
	</Typography>
);

export default SectionTitle;
