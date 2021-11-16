import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InputLayout from "../components/InputLayout";
import axios from "../utils/axios";

export default function Login() {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [notUsedAccount, setNotUsedAccount] = useState(false);

	const dispatch = useDispatch();

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
				setPasswordError(true);
				return;
			}
			if (data.error) {
				console.log("je suis l'erreur", data.error);
				return;
			}

			dispatch({ type: "LOGIN", ...data });
		} catch (err) {
			const { error } = err.response.data;

			if (error.includes("wrong password")) {
				setPasswordError(true);
			} else if (error.includes("no user found with email")) {
				setEmailError(true);
				setNotUsedAccount(true);
			}
		}
	};

	return (
		<InputLayout>
			<Box style={{ flex: 1 }}>
				<Typography variant="h4" component="h1" fontWeight={700} mb={2}>
					Welcome to Bristol! 👋
				</Typography>
				<Typography mb={2} width={"85%"}>
					Please sign-in to your account
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					gutterBottom={true}
					sx={{ display: "flex", flexDirection: "column" }}>
					<TextField
						type="email"
						name="email"
						label="Email"
						placeholder="toto@example.com"
						size="small"
						sx={{ marginBottom: 2 }}
						onChange={handleChange}
						value={input.email}
						helperText={
							emailError
								? notUsedAccount
									? "The email you entered isn’t connected to an account"
									: "Your Email is invalid"
								: ""
						}
						error={emailError}
					/>
					<TextField
						type="password"
						name="password"
						label="Password"
						placeholder="Password"
						size="small"
						sx={{ marginBottom: 2 }}
						onChange={handleChange}
						value={input.password}
						helperText={passwordError ? "Your password is invalid" : ""}
						error={passwordError}
					/>
					<Button
						endIcon={<ArrowForwardIosIcon />}
						size="small"
						sx={{
							width: "fit-content",
							alignSelf: "flex-end",
							marginBottom: 2,
						}}
						component={Link}
						to="/forgot-password">
						Forgot password
					</Button>
					<Button
						type="submit"
						variant="contained"
						sx={{ marginBottom: 2 }}
						onSubmit={handleSubmit}>
						Sign in
					</Button>
					<Button
						endIcon={<ArrowForwardIosIcon />}
						size="small"
						component={Link}
						to="/register"
						sx={{ width: "fit-content", alignSelf: "flex-end" }}>
						Create an account
					</Button>
				</Box>
			</Box>
		</InputLayout>
	);
}
