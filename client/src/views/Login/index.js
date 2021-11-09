import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InputLayout from "../../components/InputLayout";
import axios from "../../utils/axios";
import { UserContext } from "../../App";
import "./style.scss";

export default function Login() {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const { setUser } = useContext(UserContext);
	const history = useHistory();

	const handleChange = event => {
		const { name, value } = event.target;

		name === "email" && emailError && setEmailError(false);
		name === "password" && passwordError && setPasswordError(false);

		setInput({
			...input,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const { email, password } = input;

		if (!email || !password || emailError || passwordError) {
			!email && setEmailError(true);
			!password && setPasswordError(true);
			return;
		}

		try {
			const { data } = await axios().post("/auth/login", {
				email,
				password,
			});

			if (data.errors) {
				console.log(data.errors);
				return;
			}

			if (data.error) {
				console.log(data.error);
				return;
			}

			localStorage.setItem("refresh_token", data.refresh);

			setUser(data.user);
		} catch (err) {
			const { error } = err.response.data;

			if (error.includes("wrong password")) {
				setPasswordError(true);
			} else if (error.includes("no user found with email")) {
				setEmailError(true);
			}

			console.error(error);
		}
	};

	return (
		<InputLayout>
			<div style={{ flex: 1 }}>
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
					<Box className="log-text" mb={2}>
						<Typography>Password</Typography>
						<Button
							endIcon={<ArrowForwardIosIcon />}
							variant="text"
							size="small"
							onClick={() => history.push("/forgot-password")}>
							Forgot password
						</Button>
					</Box>
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
					<Button
						type="submit"
						variant="contained"
						className="log-submit"
						onSubmit={handleSubmit}>
						Sign in
					</Button>
				</form>
				<Box className="log-text">
					<Typography>New on our platform ?</Typography>
					<Button
						endIcon={<ArrowForwardIosIcon />}
						size="small"
						onClick={() => history.push("/register")}>
						Create an account
					</Button>
				</Box>
				{/* <p className="log-create">
					New on our platform ?<Link to="/register">Create an account</Link>
				</p> */}
			</div>
		</InputLayout>
	);
}
