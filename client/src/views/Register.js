import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import PasswordVerification from "../components/PasswordVerification";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import InputLayout from "../components/InputLayout";
import axios from "../utils/axios";

const emailValidator = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const passwordValidator = new RegExp(
	/^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\d).{8,30}$/
);

export default function Register() {
	const [input, setInput] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		confirm: "",
	});
	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [emailUsed, setEmailUsed] = useState(false);
	const [confirmError, setConfirmError] = useState(false);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = event => {
		const { name, value } = event.target;

		switch (name) {
			case "email":
				emailUsed && setEmailUsed(false);
				setEmailError(!emailValidator.test(value));
				break;
			case "password":
				setPasswordError(!passwordValidator.test(value));
				break;
			case "confirm":
				setConfirmError(value !== input.password);
				break;
			case "firstName":
				setFirstNameError(!value);
				break;
			case "lastName":
				setLastNameError(!value);
				break;
			default:
				return;
		}
		setInput({
			...input,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();

		const { email, password, firstName, lastName, confirm } = input;

		if (!email || !password || !confirm || !firstName || !lastName) {
			!email && setEmailError(true);
			!password && setPasswordError(true);
			!firstName && setFirstNameError(true);
			!lastName && setLastNameError(true);
			!confirm && setConfirmError(true);
			return;
		}

		try {
			const { data } = await axios().post("/auth/register", {
				first_name: firstName.trim(),
				last_name: lastName.trim(),
				email: email.trim(),
				password,
				confirm,
			});

			if (data.errors) {
				return;
			}

			localStorage.setItem("refresh_token", data.refresh);
			dispatch({ type: "LOGIN", user: { ...data.user } });
			history.push("/validate");
		} catch (err) {
			const { error } = err.response.data;

			if (error.includes("user_email_key")) {
				setEmailError(true);
				setEmailUsed(true);
			}

			console.error(error);
		}
	};

	return (
		<InputLayout>
			<Box style={{ flex: 1 }}>
				<Typography variant="h4" component="h1" fontWeight={700} mb={2}>
					Adventure starts here 🚀
				</Typography>
				<Typography mb={2} width={"85%"}>
					Make your app management easy and fun!
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					gutterBottom={true}
					sx={{ display: "flex", flexDirection: "column" }}>
					<TextField
						type="text"
						name="firstName"
						label="First Name"
						placeholder="John"
						size="small"
						sx={{ mb: 2 }}
						onChange={handleChange}
						value={input.firstName}
						helperText={firstNameError ? "Your first name is required" : ""}
						error={firstNameError}
					/>
					<TextField
						type="text"
						name="lastName"
						label="Last Name"
						placeholder="Doe"
						size="small"
						sx={{ mb: 2 }}
						onChange={handleChange}
						value={input.lastName}
						helperText={lastNameError ? "Your last name is required" : ""}
						error={lastNameError}
					/>
					<TextField
						type="email"
						name="email"
						label="Email"
						placeholder="johndoe@example.com"
						size="small"
						sx={{ mb: 2 }}
						onChange={handleChange}
						value={input.email}
						helperText={
							emailError
								? emailUsed
									? "Email address already in use"
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
						sx={{ mb: 2 }}
						onChange={handleChange}
						value={input.password}
						helperText={passwordError ? "Your password is invalid" : ""}
						error={passwordError}
					/>
					<TextField
						type="password"
						name="confirm"
						label="Confirm Password"
						placeholder="Confirm Password"
						size="small"
						sx={{ mb: 2 }}
						onChange={handleChange}
						value={input.confirm}
						helperText={confirmError ? "Your confirm password is invalid" : ""}
						error={confirmError}
					/>
					<PasswordVerification input={input} />
					<Button type="submit" variant="contained" onSubmit={handleSubmit}>
						Sign up
					</Button>
				</Box>
				<Box display="flex" justifyContent="flex-end" mt={2}>
					<Button
						startIcon={<ArrowBackIcon />}
						size="small"
						onClick={() => history.push("/")}>
						Back to login
					</Button>
				</Box>
			</Box>
		</InputLayout>
	);
}
