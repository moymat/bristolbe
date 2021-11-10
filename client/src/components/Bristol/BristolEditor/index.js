import { useEffect, useState } from "react";
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
	const selectedBristol = useSelector(state => state.bristol.selectedBristol);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [editors, setEditors] = useState([]);
	const [viewers, setViewers] = useState([]);
	const [deleted, setDeleted] = useState([]);

	const handleContentChange = content => {
		setContent(content);
		/* dispatch({ type: "UPDATE_BRISTOL_CONTENT", bristolContent: value }) */
	};

	const handleTitleChange = e => {
		setTitle(e.target.value);
		/* dispatch({
			type: "UPDATE_BRISTOL_TITLE",
			bristolTitle: e.target.value,
		}); */
	};

	const handleSaveClick = () => {
		if (!title) return;

		if (
			title !== selectedBristol.title ||
			content !== selectedBristol.content
		) {
			selectedBristol.id
				? dispatch({ type: "UPDATE_BRISTOL" })
				: dispatch({ type: "ADD_NEW_BRISTOL" });
		}
	};

	const handleEditClick = () => {
		dispatch({ type: "EDIT_CURRENT_BRISTOL" });
	};

	const handleCancel = () => {
		dispatch({ type: "CANCEL_UPDATE_EDITOR" });
	};

	useEffect(() => {
		setTitle(selectedBristol.title);
		setContent(selectedBristol.content);
		setEditors(selectedBristol.editors);
		setViewers(selectedBristol.viewers);
	}, [selectedBristol]);

	const handleEditorsChange = newEditors => {
		setEditors(newEditors);
	};

	const handleViewersChange = newViewer => {
		setViewers(newViewer);
	};

	return (
		<Box
			className="text-editor"
			sx={{ px: 5, mx: "auto" /* , maxWidth: "1086px" */ }}>
			<Stack direction="row" spacing={1} sx={{ my: 2 }}>
				{!isReadOnly ? (
					<TextField
						sx={
							{
								// display: isReadOnly && "none",
							}
						}
						value={title}
						onChange={handleTitleChange}
						fullWidth
						id="title"
						label="Title"
						placeholder="Untitled"
						variant="outlined"
						color="primary"
						size="small"
					/>
				) : (
					<Typography
						sx={{
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
							flexDirection: "column",
						}}
						variant="h3"
						children={title}
					/>
				)}
				<IconButton
					onClick={handleEditClick}
					aria-label="edit"
					sx={{
						display: selectedBristol.role !== "editor" && !isReadOnly && "none",
					}}>
					<EditIcon />
				</IconButton>
				<Button
					sx={{
						display: isReadOnly && "none",
					}}
					variant="outlined"
					onClick={handleCancel}>
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
			{!isReadOnly && (
				<>
					<RightsManagement
						permission="editors"
						usersSelected={editors}
						handleChange={handleEditorsChange}
					/>
					<RightsManagement
						permission="viewers"
						usersSelected={viewers}
						handleChange={handleViewersChange}
					/>
				</>
			)}
			<ReactQuill
				theme={isReadOnly ? "bubble" : "snow"}
				value={content}
				onChange={handleContentChange}
				modules={isReadOnly ? { toolbar: false } : modules}
				formats={formats}
				readOnly={isReadOnly}
			/>
		</Box>
	);
};

export default BristolEditor;
