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
import RightsManagement from "./RightsManagement";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./styles.css";

const BristolEditor = ({ setBristol }) => {
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const dispatch = useDispatch();
	const isReadOnly = useSelector(state => state.bristol.editorIsReadOnly);
	const selectedBristol = useSelector(state => state.bristol.selectedBristol);
	const bristols = useSelector(state => state.bristol.bristols);
	const [isRoot, setIsRoot] = useState(false);
	const user = useSelector(state => state.user.user);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [editors, setEditors] = useState([]);
	const [viewers, setViewers] = useState([]);

	const handleContentChange = content => {
		setContent(content);
	};

	const handleTitleChange = e => {
		setTitle(e.target.value);
	};

	const handleSaveClick = () => {
		if (!title) return;

		const hasChanged =
			title !== selectedBristol.title || content !== selectedBristol.content;

		if (hasChanged)
			selectedBristol.id
				? dispatch({ type: "UPDATE_BRISTOL", content, title })
				: dispatch({ type: "ADD_NEW_BRISTOL", content, title });

		selectedBristol.id &&
			dispatch({ type: "UPDATE_BRISTOL_ROLES", editors, viewers, hasChanged });
	};

	const handleDeleteClick = () => {
		dispatch({ type: "DELETE_BRISTOL", bristolId: selectedBristol.id });
	};

	const handleEditClick = () => {
		dispatch({ type: "EDIT_CURRENT_BRISTOL" });
	};

	const handleCancel = () => {
		dispatch({ type: "CANCEL_UPDATE_EDITOR" });
	};

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

	useEffect(() => {
		setIsRoot(!!bristols.find(bristol => bristol.id === selectedBristol.id));
	}, [selectedBristol, bristols]);

	return (
		<Box
			className="text-editor"
			sx={{
				px: { xs: 0, sm: 5 },
				mx: "auto",
				mb: isSmallScreen ? 8 : 1,
			}}>
			<Stack
				direction="row"
				alignItems="center"
				spacing={isReadOnly ? 6 : 1}
				sx={{
					my: 2,
					display: "flex",
					width: "100%",
					justifyContent: isSmallScreen ? "space-between" : "initial",
				}}>
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
				{selectedBristol.role === "editor" &&
					(isReadOnly && selectedBristol.id ? (
						<Button
							sx={{
								position: "relative",
								right: 0,
								color: "white",
								px: { sx: 3, sm: 1 },
							}}
							onClick={handleEditClick}
							aria-label="edit"
							variant="contained"
							disabled={
								selectedBristol.inEditing.status &&
								selectedBristol.inEditing.userId !== user.id
							}
							size={isSmallScreen ? "small" : "medium"}
							startIcon={<EditIcon />}>
							Edit
						</Button>
					) : (
						!isReadOnly && (
							<>
								<Button variant="outlined" onClick={handleCancel}>
									CANCEL
								</Button>
								<Button
									color="primary"
									onClick={handleSaveClick}
									variant="contained"
									sx={{ color: "white" }}>
									Save
								</Button>
							</>
						)
					))}
			</Stack>
			{!isReadOnly && isRoot && (
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
				theme={isReadOnly || isSmallScreen ? "bubble" : "snow"}
				className={isReadOnly ? "readOnly" : "readwrite"}
				value={content}
				onChange={handleContentChange}
				modules={isReadOnly ? { toolbar: false } : modules}
				formats={formats}
				readOnly={isReadOnly}
				style={{ maxHeight: "100%" }}
			/>

			{!isReadOnly && selectedBristol.id && (
				<Button
					color="error"
					onClick={handleDeleteClick}
					variant="outlined"
					size="small"
					sx={{ mb: isSmallScreen ? 8 : 1, mt: 1, float: "right" }}>
					Delete this Bristol
				</Button>
			)}
		</Box>
	);
};

export default BristolEditor;
