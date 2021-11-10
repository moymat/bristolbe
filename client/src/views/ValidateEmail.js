import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { UserContext } from "../App";
import axios from "../utils/axios";

const inputProps = {
	maxLength: 1,
	style: { fontSize: "20px", textAlign: "center", textTransform: "uppercase" },
};

const ValidateEmail = () => {
	const { user, setUser } = useContext(UserContext);
	const [code, setCode] = useState(Array(4).fill(null));
	const [error, setError] = useState(false);

	const handleChange = ({ target }) => {
		const nb = +target.name.replace("code", "");
		const newCode = [...code];
		newCode[nb] = target.value;
		setCode(newCode);
		// Automaticaly focus on the next case if not the last
		if (nb < 3 && target.value) {
			const next = document.querySelector(`input[name="code${nb + 1}"]`);
			next.focus();
		}
	};

	const handleFocus = ({ target }) => {
		target.select();
	};

	const handleSubmit = async e => {
		try {
			e.preventDefault();

			if (code.some(val => !val)) return;

			const codeData = code.join("").toUpperCase();
			const { data } = await axios().post("/auth/verify", {
				code: codeData,
			});

			console.log(data);
			if (data.error) {
				return setError(true);
			}

			setUser({ ...user, verified: true });
		} catch (error) {
			setError(true);
			console.error(error.message);
		}
	};

	const handleResend = async () => {
		try {
			await axios().get("/auth/verify/resend");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			Width: "750px",
			height: "750px",
			margin: "auto",
		}}>
			<Typography
				variant="h6"
				component="h1"
				gutterBottom={true}
				align="center">
				Please enter the code that was sent to your email address
			</Typography>
			<Box
				component="form"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "100%",
				}}
				onSubmit={handleSubmit}>
				<Box
					sx={{
						width: "250px",
						display: "flex",
						justifyContent: "space-between",
					}}>
					<TextField
						inputProps={inputProps}
						name="code0"
						onChange={handleChange}
						onFocus={handleFocus}
						sx={{ width: "50px" }}>
						{code[0]}
					</TextField>
					<TextField
						inputProps={inputProps}
						name="code1"
						onChange={handleChange}
						onFocus={handleFocus}
						sx={{ width: "50px" }}>
						{code[1]}
					</TextField>
					<TextField
						inputProps={inputProps}
						name="code2"
						onChange={handleChange}
						onFocus={handleFocus}
						sx={{ width: "50px" }}>
						{code[2]}
					</TextField>
					<TextField
						inputProps={inputProps}
						name="code3"
						onChange={handleChange}
						onFocus={handleFocus}
						sx={{ width: "50px" }}>
						{code[3]}
					</TextField>
				</Box>
				{error && (
					<Typography
						sx={{ marginTop: "18px", fontSize: "18px", fontWeight: 700 }}
						color="error">
						Wrong code
					</Typography>
				)}
				<Box
					sx={{
						postion: "relative",
						display: "flex",
						justifyContent: "center",
						width: "100%",
						marginTop: "18px",
						
					}}>
					<Button
						type="submit"
						color="success"
						variant="contained"
						sx={{ width: 150 }}>
						Validate
					</Button>
					<Button
						variant="contained"
						onClick={handleResend}
						color="info"
						sx={{ width: 150, marginLeft: "18px" }}>
						Resend code
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default ValidateEmail;
