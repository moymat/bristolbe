import { useState } from "react";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { modules, formats } from "./EditorToolbar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
// import axios from "axios";
// import { useSelector } from "react-redux";

export const BristolEditor = ({ setBristol }) => {
	//loading state used by submit button
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	//quill editor html content
	const [content, setContent] = useState({ value: null });

	function handleClick() {
		setLoading(true);
	}

	const handleChange = value => {
		setContent({ value });
	};

	const handleSaveClick = event => {
		event.preventDefault();
		console.log(content);
		setContent({ value: null });
	};

	return (
		<Box className="text-editor" sx={{ px: 5 /* , maxWidth: "1086px" */ }}>
			<CssBaseline />
			<Stack direction="row" spacing={1} sx={{ mb: 1 }}>
				<TextField
					fullWidth
					id="title"
					label="Title"
					variant="outlined"
					color="primary"
					size="small"
				/>
				<Button
					variant="outlined"
					onClick={() => dispatch({ type: "HIDE_BRISTOL_EDITOR" })}>
					CANCEL
				</Button>
				<LoadingButton
					color="primary"
					onClick={handleSaveClick}
					loading={loading}
					loadingPosition="start"
					startIcon={<SaveIcon />}
					variant="contained">
					Save
				</LoadingButton>
			</Stack>
			<ReactQuill
				theme="snow"
				value={content.value}
				onChange={handleChange}
				modules={modules}
				formats={formats}
				// placeholder={"Write something awesome..."}
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

export default BristolEditor;
