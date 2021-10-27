import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import axios from "../../utils/axios";
import { UserContext } from "../App/App";
import "./style.scss";
import Logo from "../Logo";
import InputLayout from "../InputLayout";

export default function Login() {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const { setUser } = useContext(UserContext);

	const handleChange = event => {
		const { name, value } = event.target;

		if (name === "email") {
			setEmailError(false);
		} else if (name === "password") {
			setPasswordError(false);
		}

		setInput({
			...input,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const { email, password } = input;

		if (!email || !password) {
			return;
		}

		try {
			const { data, errors, error } = await axios.post("/auth/login", {
				email,
				password,
			});

			if (errors) {
				console.log(errors);
				return;
			}

			if (error) {
				console.log(error);
				return;
			}

			console.log(data.user);

			setUser(data.user);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<InputLayout>
			<div className="input-layout-rightpage">
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
