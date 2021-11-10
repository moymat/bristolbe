import "./style.scss";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import InputLayout from "../../components/InputLayout";
import axios from "../../utils/axios";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";

const passwordValidator = new RegExp(
	/^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\d).{8,30}$/
);

export default function Reset() {
	const specialCharacter = "<";
	const [input, setInput] = useState({
		password: "",
		confirm: "",
	});
	const [touch, setTouch] = useState(false);

	const [validLength, hasNumber, upperCase, lowerCase, match] =
		usePasswordValidation({
			firstPassword: input.password,
			secondPassword: input.confirm,
		});
	/* const [passwordError, setPasswordError] = useState(false);
	const [confirmError, setConfirmError] = useState(false); */
	const [checked, setChecked] = useState(false);
	const history = useHistory();
	const { code } = useParams();
	const [passwordError, setPasswordError] = useState(false);
	const [confirmError, setConfirmError] = useState(false);

	const handleChange = ({ target }) => {
		if (target.name === "password") {
			setInput({ ...input, password: target.value });
			setPasswordError(!passwordValidator.test(target.value));
		} else if (target.name === "confirm") {
			setInput({ ...input, confirm: target.value });
			setConfirmError(target.value !== input.password);
		}
	};

	const handleSubmit = async e => {
		try {
			e.preventDefault();
			const { password, confirm } = input;

			if (!passwordValidator.test(input.password) || password !== confirm) {
				setPasswordError(true);
				setConfirmError(true);
				return;
			}

			await axios().patch("/auth/reset-password", { code, password, confirm });

			history.push("/");
		} catch (err) {
			console.error(err);
		}
	};

	const handleTouch = () => {
		!touch && setTouch(true);
	};

	const checkCode = useCallback(async () => {
		try {
			const { data } = await axios().get(`/auth/check-reset-code/${code}`);
			data.status ? setChecked(true) : history.push("/");
		} catch (error) {
			console.error(error);
			history.push("/");
		}
	}, [code, history]);

	useEffect(() => {
		if (!checked) {
			checkCode();
		}
	}, [checked, checkCode]);

	return (
		checked && (
			<InputLayout>
				<Box style={{ flex: 1 }}>
					<Typography variant="h4" component="h1" fontWeight={700} mb={2}>
						Reset password 🔒
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						gutterBottom={true}
						sx={{ display: "flex", flexDirection: "column" }}>
						<TextField
							type="password"
							name="password"
							placeholder="Password"
							size="small"
							sx={{ marginBottom: 2 }}
							onChange={handleChange}
							onFocus={handleTouch}
							value={input.password}
							helperText={passwordError ? "Your password is invalid" : ""}
						/>
						{touch && (
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
									<li className={`${hasNumber ? "reg--one-li" : ""}`}>
										1 digit
									</li>
									<li className={`${match ? "reg--one-li" : ""}`}>Match</li>
								</ul>
							</div>
						)}
						<p>Confirm password</p>
						<TextField
							type="password"
							name="confirm"
							placeholder="Confirm password"
							size="small"
							onChange={handleChange}
							value={input.confirm}
							helperText={
								confirmError ? "Your confirm password is invalid" : ""
							}
						/>
						<Button type="submit" variant="contained" className="reset-submit">
							Set new password
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
		)
	);
}
