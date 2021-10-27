import "./style.scss";
import { Link } from "react-router-dom";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { ClassNames } from "@emotion/react";

const emailValidator = new RegExp(
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
	});

	const [validLength, hasNumber, upperCase, lowerCase] = usePasswordValidation({
		firstPassword: input.password,
	});

	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [touch, setTouch] = useState(false);

	const handleChange = event => {
		const { name, value } = event.target;

		setInput({
			...input,
			[name]: value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const { email, password, firstName, lastName } = input;

		if (!emailValidator.test(email)) {
			setEmailError(true);
		}

		if (!passwordValidator.test(password)) {
			setPasswordError(true);
		}

		const result = await axios.post("/auth/register", {
			first_name: firstName,
			last_name: lastName,
			confirm: password,
			email,
			password,
		});

		console.log(result);
	};

	const handleTouch = () => {
		setTouch(true);
	};

	console.log(touch);
	return (
		<div className="reg-rightpage">
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
				/>
				<p>Last name</p>
				<TextField
					type="text"
					name="lastName"
					placeholder="doe"
					size="small"
					onChange={handleChange}
					value={input.lastName}
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
					helperText={emailError ? "Your Email is invalid" : ""}
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
	);
}
