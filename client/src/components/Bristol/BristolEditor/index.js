import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { modules, formats } from "./EditorToolbar";
import Box from "@mui/material/Box";
import RightsManagement from "./RightsManagement";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./styles.css";
import EditorUpperBar from "./EditorUpperBar";

export const BristolEditor = () => {
	const selectedBristol = useSelector(state => state.bristol.selectedBristol);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const editMode = useSelector(state => state.bristol.isEditMode);
	const dispatch = useDispatch();

	const handleCancel = () => {
		dispatch({ type: "TOGGLE_EDIT_MODE" });
	};

	const handleSave = () => {
		console.log("save");
		dispatch({
			type: "CREATE_BRISTOL",
			newBristol: {
				title,
				content,
			},
		});
	};

	useEffect(() => {
		console.log(selectedBristol.content);
		setContent(selectedBristol.content || "");
		setTitle(selectedBristol.title || "");
	}, [selectedBristol]);

	return (
		<Box
			className="text-editor"
			sx={{ px: 5, mx: "auto" /* , maxWidth: "1086px" */ }}>
			<EditorUpperBar
				handleSave={handleSave}
				editMode={editMode}
				handleCancel={handleCancel}
				title={title}
				isEditor={selectedBristol.role === "editor"}
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
				value={content}
				modules={editMode ? modules : { toolbar: false }}
				formats={formats}
				placeholder={editMode ? "Start typing" : ""}
				readOnly={!editMode}
			/>
		</Box>
	);
};

export default BristolEditor;
