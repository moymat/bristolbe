import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { modules, formats } from "./EditorToolbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import RightsManagement from "./RightsManagement";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./styles.css";

export const BristolEditor = ({ setBristol }) => {
	const dispatch = useDispatch();
	const isReadOnly = useSelector(state => state.bristol.editorIsReadOnly);
	const bristolId = useSelector(state => state.bristol.bristolId);
	const handleEditorChange = value => {
		dispatch({ type: "UPDATE_BRISTOL_CONTENT", bristolContent: value });
	};
	const handleTitleChange = event => {
		dispatch({
			type: "UPDATE_BRISTOL_TITLE",
			bristolTitle: event.target.value,
		});
	};
	const handleSaveClick = () => {
		bristolId
			? dispatch({ type: "UPDATE_BRISTOL" })
			: dispatch({ type: "ADD_NEW_BRISTOL" });
	};
	const handleEditClick = () => {
		dispatch({ type: "EDIT_CURRENT_BRISTOL" });
	};

	return (
		<Box
			className="text-editor"
			sx={{ px: 5, mx: "auto" /* , maxWidth: "1086px" */ }}>
			<Stack direction="row" spacing={1} sx={{ my: 2 }}>
				<TextField
					sx={{
						display: isReadOnly && "none",
					}}
					value={useSelector(state => state.bristol.bristolTitle)}
					onChange={handleTitleChange}
					fullWidth
					id="title"
					label={isReadOnly ? "" : "Untitled"}
					variant="outlined"
					color="primary"
					size="small"
					disabled={isReadOnly}
				/>
				<Typography
					sx={{
						display: isReadOnly ? "none" : "flex",
						justifyContent: "center",
						alignContent: "center",
						flexDirection: "column",
					}}
					variant="h3"
					children={useSelector(state => state.bristol.bristolTitle)}
				/>
				<IconButton
					onClick={handleEditClick}
					aria-label="delete"
					sx={{
						display:
							useSelector(
								state => !state.bristol.bristolCurrentUserIsEditor === "editor"
							) &&
							!isReadOnly &&
							"none",
					}}>
					<EditIcon />
				</IconButton>
				<Button
					sx={{
						display: isReadOnly && "none",
					}}
					variant="outlined"
					onClick={() => dispatch({ type: "CANCEL_UPDATE_EDITOR" })}>
					CANCEL
				</Button>
				<Button
					sx={{
						display: isReadOnly && "none",
					}}
					color="primary"
					onClick={handleSaveClick}
					variant="contained">
					Save
				</Button>
			</Stack>
			<Box
				sx={{
					mb: 1,
					display: isReadOnly && "none",
				}}>
				<RightsManagement permission="editors" />
			</Box>
			<Box
				sx={{
					mb: 1,
					display: isReadOnly && "none",
				}}>
				<RightsManagement permission="readers" />
			</Box>
			<ReactQuill
				theme={isReadOnly ? "bubble" : "snow"}
				value={useSelector(state => state.bristol.bristolContent)}
				onChange={handleEditorChange}
				modules={isReadOnly ? { toolbar: false } : modules}
				formats={formats}
				readOnly={isReadOnly}
			/>
		</Box>
	);
};

export default BristolEditor;
