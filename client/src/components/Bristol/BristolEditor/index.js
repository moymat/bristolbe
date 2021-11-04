import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { modules, formats } from "./EditorToolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccess from "./ManageAccess";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./styles.css";
// import axios from "axios";

export const BristolEditor = ({ setBristol }) => {
  const dispatch = useDispatch();
  const handleEditorChange = (value) => {
    dispatch({ type: "CHANGE_EDITOR_CONTEN", editorContent: value });
  };
  const handleTitleChange = (event) => {
    dispatch({ type: "CHANGE_EDITOR_TITLE", editorTitle: event.target.value });
  };
  const handleSaveClick = (event) => {};
  const handleEditClick = (event) => {
    dispatch({ type: "TOGGLE_EDITOR_EDIT_MODE" });
  };

  return (
    <Box className="text-editor" sx={{ px: 5 /* , maxWidth: "1086px" */ }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <TextField
          value={useSelector((state) => state.bristol.EditorTitle)}
          onChange={handleTitleChange}
          fullWidth
          id="title"
          label={
            useSelector((state) => state.bristol.EditorIsReadOnly)
              ? ""
              : "Untitled"
          }
          variant="outlined"
          color="primary"
          size="small"
          disabled={useSelector((state) => state.bristol.EditorIsReadOnly)}
        />
        <IconButton
          onClick={handleEditClick}
          aria-label="delete"
          sx={{
            display:
              useSelector(
                (state) =>
                  !(
                    state.bristol.EditorIsReadOnly &&
                    state.bristol.EditorBristolEditOption
                  )
              ) && "none",
          }}
        >
          <EditIcon />
        </IconButton>
        <Button
          sx={{
            display:
              useSelector((state) => state.bristol.EditorIsReadOnly) && "none",
          }}
          variant="outlined"
          onClick={() => dispatch({ type: "HIDE_BRISTOL_EDITOR" })}
        >
          CANCEL
        </Button>
        <Button
          sx={{
            display:
              useSelector((state) => state.bristol.EditorIsReadOnly) && "none",
          }}
          color="primary"
          onClick={handleSaveClick}
          variant="contained"
        >
          Save
        </Button>
      </Stack>
      <ManageAccess />
      <ReactQuill
        theme="snow"
        value={useSelector((state) => state.bristol.EditorContent)}
        onChange={handleEditorChange}
        modules={
          useSelector((state) => state.bristol.EditorIsReadOnly)
            ? { toolbar: false }
            : modules
        }
        formats={formats}
        placeholder={
          useSelector((state) => state.bristol.EditorIsReadOnly)
            ? ""
            : "Start typing..."
        }
        readOnly={useSelector((state) => state.bristol.EditorIsReadOnly)}
      />
    </Box>
  );
};

export default BristolEditor;
