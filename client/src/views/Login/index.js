import "./style.scss";
import { Link } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import InputLayout from "../../components/InputLayout";

export default function Login() {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);

	const handleChange = event => {
		const { name, value } = event.target;
		if (name === "email") {
			setEmailError(false);
		}
		if (name === "password") {
			setPasswordError(false);
		}
		setInput({
			...input,
			[name]: value,
		});
	};
	const handleSubmit = event => {
		event.preventDefault();
		const { email, password } = input;
		if (!email) {
			setEmailError(true);
		}
		if (!password) {
			setPasswordError(true);
		}
	};
	return (
		<InputLayout>
			<div className="log-rightpage">
				<h1 className="log-title">Welcome to Bristol! 👋</h1>
				<p>Please sign-in to your account</p>
				<form className="log-form" onSubmit={handleSubmit}>
					<p>Email</p>
					<TextField
						type="email"
						name="email"
						placeholder="toto@example.com"
						className="log-email"
						size="small"
						onChange={handleChange}
						value={input.email}
						helperText={emailError ? "Your Email is invalid" : ""}
						error={emailError}
					/>
					<div className="log-text">
						<p>Password</p>
						<Link to="/forgot-password" className="log-forgot">
							Forgot password ?
						</Link>
					</div>
					<TextField
						type="password"
						name="password"
						placeholder="Password"
						className="log-password"
						size="small"
						onChange={handleChange}
						value={input.password}
						helperText={passwordError ? "Your password is invalid" : ""}
						error={passwordError}
					/>
					<FormControlLabel control={<Checkbox />} label="Remember me" />
					<Button
						type="submit"
						variant="contained"
						className="log-submit"
						onSubmit={handleSubmit}>
						Sign in
					</Button>
				</form>
				<p className="log-create">
					New on our platform ?<Link to="/register">Create an account</Link>
				</p>
			</div>
		</InputLayout>
	);
}
