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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
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

		selectedBristol.id &&
			dispatch({ type: "UPDATE_BRISTOL_ROLES", editors, viewers });
	};

	const handleEditClick = () => {
		dispatch({ type: "EDIT_CURRENT_BRISTOL" });
	};

	const handleCancel = () => {
		dispatch({ type: "CANCEL_UPDATE_EDITOR" });
	};

	useEffect(() => {
		const addFullName = user => ({
			...user,
			full_name: `${user.first_name} ${user.last_name}`,
		});

		setTitle(selectedBristol.title);
		setContent(selectedBristol.content);
		setEditors(selectedBristol.editors.map(addFullName));
		setViewers(selectedBristol.viewers.map(addFullName));
	}, [selectedBristol]);

	const handleEditorsChange = newEditors => {
		setViewers(
			viewers.filter(
				viewer => !newEditors.some(editor => editor.id === viewer.id)
			)
		);
		setEditors(newEditors);
	};

	const handleViewersChange = newViewers => {
		setEditors(
			editors.filter(
				editor => !newViewers.some(viewer => editor.id === viewer.id)
			)
		);
		setViewers(newViewers);
	};

	const renderOption = permission => (props, option, state) => {
		const optionStyle = isInList => ({
			"&.MuiAutocomplete-option": {
				color: isInList ? "primary.main" : "dimgrey",
				transition: "all 0.15s ease-in",
				"&:hover": {
					backgroundColor: isInList ? "primary.main" : "grey",
					color: isInList ? "white" : "black",
					opacity: isInList ? 0.5 : 1,
				},
			},
		});

		if (permission === "editors") {
			const isViewer = viewers.find(user => user.id === option.id);
			return (
				<Box {...props} sx={optionStyle(isViewer)}>
					<Typography sx={{ marginRight: 1 }}>{option.full_name}</Typography>
					{isViewer && <RemoveRedEyeOutlinedIcon fontSize="small" />}
				</Box>
			);
		} else if (permission === "viewers") {
			const isEditor = editors.find(user => user.id === option.id);
			return (
				<Box {...props} sx={optionStyle(isEditor)}>
					<Typography sx={{ marginRight: 1 }}>{option.full_name}</Typography>
					{isEditor && <EditIcon fontSize="small" />}
				</Box>
			);
		}
	};

	return (
		<Box
			className="text-editor"
			sx={{ px: 5, mx: "auto" /* , maxWidth: "1086px" */ }}>
			<Stack direction="row" spacing={1} sx={{ my: 2 }}>
				{!isReadOnly ? (
					<TextField
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
						renderOption={renderOption}
					/>
					<RightsManagement
						permission="viewers"
						usersSelected={viewers}
						handleChange={handleViewersChange}
						renderOption={renderOption}
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
