import "./style.scss";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import InputLayout from "../../components/InputLayout";
import { useState } from "react";
import Box from "@mui/material/Box";

export default function Forgot() {
	const [input, setInput] = useState({
		email: "",
	});
	const [emailError, setEmailError] = useState(false);

	const specialCharacter = "<";

	const handleChange = event => {
		const { name, value } = event.target;
		if (name === "email") {
			setEmailError(false);
		}
		setInput({
			...input,
			[name]: value,
		});
	};
	const handleSubmit = event => {
		event.preventDefault();
		const { email } = input;
		if (!email) {
			setEmailError(true);
		}
	};
	return (
		<InputLayout>
			<div style={{ flex: 1 }}>
				<h1 className="forgot-title">Forgot password? 🔒</h1>
				<p className="forgot-instructions">
					Enter your email and we'll send you instructions to reset your
					password
				</p>
				<form className="forgot-form" onSubmit={handleSubmit}>
					<p>Email</p>
					<TextField
						type="email"
						name="email"
						placeholder="toto@example.com"
						size="small"
						onChange={handleChange}
						helperText={emailError ? "Your Email is invalid" : ""}
						error={emailError}
					/>
					<Button
						type="submit"
						variant="contained"
						className="forgot-submit"
						onSubmit={handleSubmit}>
						Send reset link
					</Button>
				</form>
				<Box className="forgot-create">
					<Link to="/"> {specialCharacter} Back to login</Link>
				</Box>
			</div>
		</InputLayout>
	);
}
