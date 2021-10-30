import React from "react";
import ReactQuill from "react-quill";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import Stack from "@mui/material/Stack";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import Button from "@mui/material/Button";
// import axios from "axios";
// import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

export const Editor = () => {
  //loading state used by submit button
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }
  //quill editor html content
  const [content, setContent] = React.useState({ value: null });
  const handleChange = (value) => {
    setContent({ value });
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    setContent({ value: null });
  };
  return (
    <Box className="text-editor" sx={{ px: 5/* , maxWidth: "1086px" */}}>
      <Stack direction="row" spacing={1} sx={{ mb: 1}}>
        <TextField
          fullWidth
          id="title"
          label="Title"
          variant="outlined"
          color="primary"
          size="small"
        />
        <Button variant="outlined">CANCEL</Button>
		<LoadingButton
          color="primary"
          onClick={handleSaveClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </LoadingButton>
      </Stack>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={content.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />

      {/* 	  <Form onSubmit={() => null}>
		  <div style={{ textAlign: 'center', margin: '2rem'}}>
			  <Button
			  	size="large"
				htmlType="submit"
				className=""
				onSubmit={onSubmit}
			>
				Submit
			</Button>
		  </div>
	  </Form> */}
    </Box>
  );
};

export default Editor;
