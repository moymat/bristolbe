import { useState } from "react";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import { modules, formats } from "./EditorToolbar";
import Box from "@mui/material/Box";
import RightsManagement from "./RightsManagement";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./styles.css";
import EditorUpperBar from "./EditorUpperBar";

export const BristolEditor = ({
	selectedBristol,
	editMode,
	toggleEditMode,
	resetSelectedBristol,
}) => {
	const [title, setTitle] = useState(
		selectedBristol ? selectedBristol.title : ""
	);
	const [content, setContent] = useState(
		selectedBristol ? selectedBristol.content : ""
	);
	const dispatch = useDispatch();

	const handleTitleChange = e => {
		setTitle(e.target.value);
	};

	const handleContentChange = value => {
		setContent(value);
	};

	const handleCancel = () => {
		toggleEditMode();
		resetSelectedBristol();
	};

	const handleSave = () => {
		console.log("save");
		toggleEditMode();
		dispatch({
			type: "CREATE_BRISTOL",
			newBristol: {
				title,
				content,
			},
		});
		resetSelectedBristol();
	};

	return (
		selectedBristol && (
			<Box
				className="text-editor"
				sx={{ px: 5, mx: "auto" /* , maxWidth: "1086px" */ }}>
				<EditorUpperBar
					handleChange={handleTitleChange}
					handleSave={handleSave}
					toggleEditMode={toggleEditMode}
					editMode={editMode}
					handleCancel={handleCancel}
					title={title}
					isEditor={selectedBristol.isEditor}
				/>
				{/* <RightsManagement
				permission="editors"
				defaultUsers={bristol.editors_id}
			/>
			<RightsManagement
				permission="readers"
				defaultUsers={bristol.viewers_id}
			/> */}
				<ReactQuill
					theme={editMode ? "snow" : "bubble"}
					defaultValue={content}
					onChange={handleContentChange}
					modules={editMode ? modules : { toolbar: false }}
					formats={formats}
					placeholder={editMode ? "Start typing" : ""}
					readOnly={!editMode}
				/>
			</Box>
		)
	);
};

export default BristolEditor;
