import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { UserContext } from "../App/App";
import axios from "../../utils/axios";
import "./style.scss";
import InputLayout from "../InputLayout";

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
	const [validLength, hasNumber, upperCase, lowerCase, match] =
		usePasswordValidation({
			firstPassword: input.password,
			secondPassword: input.confirmPassword,
		});
	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [emailUsed, setEmailUsed] = useState(false);
	const [confirmError, setConfirmError] = useState(false);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [touch, setTouch] = useState(false);
	const { setUser } = useContext(UserContext);

	const handleChange = event => {
		const { name, value } = event.target;

		if (name === "email") {
			emailUsed && setEmailUsed(false);
			setEmailError(!emailValidator.test(value));
		} else if (name === "password") {
			setPasswordError(!passwordValidator.test(value));
		} else if (name === "confirm") {
			setConfirmError(value !== input.password);
		} else if (name === "firstName") {
			setFirstNameError(!value.length);
		} else if (name === "lastName") {
			setLastNameError(!value.length);
		}

		setInput({
			...input,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();

		if (
			emailError ||
			passwordError ||
			confirmError ||
			firstNameError ||
			lastNameError
		) {
			return;
		}

		const { email, password, firstName, lastName, confirm } = input;

		try {
			const { data } = await axios.post("/auth/register", {
				first_name: firstName,
				last_name: lastName,
				email,
				password,
				confirm,
			});

			if (data.errors) {
				return;
			}

			if (data.error) {
				setEmailError(true);
				return setEmailUsed(true);
			}

			localStorage.setItem("refresh_token", data.refresh);
			setUser(data.user);
		} catch (err) {
			console.error(err);
		}
	};

	const handleTouch = () => {
		setTouch(true);
	};

	return (
		<InputLayout>
			<div className="input-layout-rightpage">
				<h1 className="reg-title">Adventure starts here 🚀</h1>
				<p>Make your app management easy and fun!</p>
				<form className="reg-form" onSubmit={handleSubmit}>
					<p>First name</p>
					<TextField
						type="text"
						name="firstName"
						placeholder="john"
						size="small"
						onChange={handleChange}
						value={input.firstName}
						helperText={firstNameError ? "Your first name is required" : ""}
						error={firstNameError}
					/>
					<p>Last name</p>
					<TextField
						type="text"
						name="lastName"
						placeholder="doe"
						size="small"
						onChange={handleChange}
						value={input.lastName}
						helperText={lastNameError ? "Your last name is required" : ""}
						error={lastNameError}
					/>
					<p>Email</p>
					<TextField
						type="email"
						name="email"
						placeholder="toto@example.com"
						className="reg-email"
						size="small"
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
					<p>Password</p>
					<TextField
						type="password"
						name="password"
						placeholder="Password"
						className="reg-password"
						size="small"
						onChange={handleChange}
						value={input.password}
						onClick={handleTouch}
						helperText={passwordError ? "Your password is invalid" : ""}
						error={passwordError}
					/>
					<p>Confirm Password</p>
					<TextField
						type="password"
						name="confirm"
						placeholder="Confirm Password"
						className="reg-password"
						size="small"
						onChange={handleChange}
						value={input.confirmPassword}
						helperText={confirmError ? "Your confirm password is invalid" : ""}
						error={confirmError}
					/>
					{touch ? (
						<div>
							<ul className="reg-list">
								<li className={`${validLength ? "reg--one-li" : ""}`}>
									8 characters (max.30)
								</li>
								<li className={`${upperCase ? "reg--one-li" : ""}`}>
									1 capital letter
								</li>
								<li className={`${lowerCase ? "reg--one-li" : ""}`}>
									1 lower letter
								</li>
								<li className={`${hasNumber ? "reg--one-li" : ""}`}>1 digit</li>
								<li className={`${match ? "reg--one-li" : ""}`}>Match</li>
							</ul>
						</div>
					) : (
						<div></div>
					)}

					<FormControlLabel
						control={<Checkbox />}
						label={
							<div>
								<span> I agree to </span>
								<Link to="#">Privacy policy & terms</Link>
							</div>
						}
					/>
					<Button
						type="submit"
						variant="contained"
						className="reg-submit"
						onSubmit={handleSubmit}>
						Sign up
					</Button>
				</form>
				<p className="reg-sign">
					Already hava an account?
					<Link to="/">Sign in instead</Link>
				</p>
			</div>
		</InputLayout>
	);
}
