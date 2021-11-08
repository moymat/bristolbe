import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { modules, formats } from "./EditorToolbar";
import Box from "@mui/material/Box";
import RightsManagement from "./RightsManagement";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./styles.css";
<<<<<<< HEAD

export const BristolEditor = ({ setBristol }) => {
  const dispatch = useDispatch();
  const handleEditorChange = (value) => {
    dispatch({ type: "UPDATE_BRISTOL_CONTENT", bristolContent: value });
  };
  const handleTitleChange = (event) => {
    dispatch({ type: "UPDATE_BRISTOL_TITLE", bristolTitle: event.target.value });
  };
  const handleSaveClick = (event) => {
    dispatch({ type: "SAVE_UPDATE_EDITOR" });
  };
  const handleEditClick = (event) => {
    dispatch({ type: "EDIT_CURRENT_BRISTOL" });
  };

  return (
    <Box className="text-editor" sx={{ px: 5, mx: 'auto' /* , maxWidth: "1086px" */ }}>
      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <TextField
          sx={{ display: useSelector((state) => state.bristol.editorIsReadOnly) && "none"}}
          value={useSelector((state) => state.bristol.bristolTitle)}
          onChange={handleTitleChange}
          fullWidth
          id="title"
          label={
            useSelector((state) => state.bristol.editorIsReadOnly)
              ? ""
              : "Untitled"
          }
          variant="outlined"
          color="primary"
          size="small"
          disabled={useSelector((state) => state.bristol.editorIsReadOnly)}
        />
        <Typography 
          sx={{ display: useSelector((state) => !state.bristol.editorIsReadOnly) ? "none" : "flex", justifyContent: 'center',
          alignContent: 'center', flexDirection: 'column'}}
          variant="h3"
          children={useSelector((state) => state.bristol.bristolTitle)} 
        />
        <IconButton
          onClick={handleEditClick}
          aria-label="delete"
          sx={{
            display:
              useSelector(
                (state) =>
                  !(
                    state.bristol.editorIsReadOnly &&
                    state.bristol.bristolCurrentUserIsEditor
                  )
              ) && "none",
          }}
        >
          <EditIcon />
        </IconButton>
        <Button
          sx={{
            display:
              useSelector((state) => state.bristol.editorIsReadOnly) && "none",
          }}
          variant="outlined"
          onClick={() => dispatch({ type: "CANCEL_UPDATE_EDITOR" })}
        >
          CANCEL
        </Button>
        <Button
          sx={{
            display:
              useSelector((state) => state.bristol.editorIsReadOnly) && "none",
          }}
          color="primary"
          onClick={handleSaveClick}
          variant="contained"
        >
          Save
        </Button>
      </Stack>
      <Box
        sx={{
          mb: 1,
          display:
            useSelector((state) => state.bristol.editorIsReadOnly) && "none",
        }}
      >
        <RightsManagement permission="editors" />
      </Box>
      <Box
        sx={{
          mb: 1,
          display:
            useSelector((state) => state.bristol.editorIsReadOnly) && "none",
        }}
      >
        <RightsManagement permission="readers" />
      </Box>
      <ReactQuill
        theme={
          useSelector((state) => state.bristol.editorIsReadOnly)
            ? "bubble"
            : "snow"
        }
        value={useSelector((state) => state.bristol.bristolContent)}
        onChange={handleEditorChange}
        modules={
          useSelector((state) => state.bristol.editorIsReadOnly)
            ? { toolbar: false }
            : modules
        }
        formats={formats}
        placeholder={
          useSelector((state) => state.bristol.editorIsReadOnly)
            ? ""
            : "Start typing..."
        }
        readOnly={useSelector((state) => state.bristol.editorIsReadOnly)}
      />
    </Box>
  );
=======
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
>>>>>>> client-server-merge
};

export default BristolEditor;
