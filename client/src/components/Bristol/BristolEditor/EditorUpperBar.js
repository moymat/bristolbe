import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const EditorUpperBar = ({
	title,
	isEditor,
	handleChange,
	handleSave,
	handleCancel,
	toggleEditMode,
	editMode,
}) => {
	return (
		<Stack direction="row" spacing={1} sx={{ my: 2 }}>
			{!editMode ? (
				<>
					<Typography variant="h3" sx={{ width: "100%" }}>
						{title}
					</Typography>
					{isEditor && (
						<IconButton onClick={toggleEditMode} aria-label="delete">
							<EditIcon />
						</IconButton>
					)}
				</>
			) : (
				<>
					<TextField
						value={title}
						onChange={handleChange}
						fullWidth
						id="title"
						label="Title"
						variant="outlined"
						color="primary"
						size="small"
					/>
					<Button variant="outlined" onClick={handleCancel}>
						Cancel
					</Button>
					<Button color="primary" onClick={handleSave} variant="contained">
						Save
					</Button>
				</>
			)}
		</Stack>
	);
};

export default EditorUpperBar;
