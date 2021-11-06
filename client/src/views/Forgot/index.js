import "./style.scss";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import InputLayout from "../../components/InputLayout";
import { useState } from "react";
import axios from "../../utils/axios";

export default function Forgot() {
	const [input, setInput] = useState({
		email: "",
	});
	const [emailError, setEmailError] = useState(false);
	const [mailSent, setMailSent] = useState(false);
	const history = useHistory();

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
	const handleSubmit = async e => {
		try {
			e.preventDefault();
			const { email } = input;

			if (!email) return setEmailError(true);

			await axios().post("/auth/reset-password", { email });

			setMailSent(true);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<InputLayout>
			<div style={{ flex: 1 }}>
				{!mailSent ? (
					<>
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
					</>
				) : (
					<p>An email was sent with instructions to reset your password</p>
				)}
				<p className="forgot-create">
					<Link to="/"> {specialCharacter} Back to login</Link>
				</p>
			</div>
		</InputLayout>
	);
}
