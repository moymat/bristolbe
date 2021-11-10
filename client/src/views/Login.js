import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InputLayout from "../components/InputLayout";
import axios from "../utils/axios";
import { UserContext } from "../App";

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
						helperText={emailError ? "Your Email is invalid" : ""}
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
						sx={{ width: "fit-content", alignSelf: "end", marginBottom: 2 }}
						onClick={() => history.push("/forgot-password")}>
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
						sx={{ width: "fit-content", alignSelf: "end" }}
						onClick={() => history.push("/register")}>
						Create an account
					</Button>
				</Box>
			</Box>
		</InputLayout>
	);
}
