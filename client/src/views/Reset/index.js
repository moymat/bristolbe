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
	const [input, setInput] = useState({ password: "", confirm: "" });
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

	const handleChange = ({ target }) => {
		if (target.name === "password") {
			setInput({ ...input, password: target.value });
		} else if (target.name === "confirm") {
			setInput({ ...input, confirm: target.value });
		}
	};

	const handleSubmit = async e => {
		try {
			e.preventDefault();
			const { password, confirm } = input;

			if (!passwordValidator.test(input.password) || password !== confirm)
				return;

			await axios().patch("/auth/reset-password", { code, password, confirm });

			history.push("/");
		} catch (err) {
			console.error(err);
		}
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
							value={input.password}
						/>
						<TextField
							type="password"
							name="confirm"
							placeholder="Confirm password"
							size="small"
							onChange={handleChange}
							value={input.confirm}
						/>
						<div>
							<ul className="res-list">
								<li className={`${validLength ? "res--one-li" : ""}`}>
									8 characters (max.30)
								</li>
								<li className={`${upperCase ? "res--one-li" : ""}`}>
									1 capital letter
								</li>
								<li className={`${lowerCase ? "res--one-li" : ""}`}>
									1 lower letter
								</li>
								<li className={`${hasNumber ? "res--one-li" : ""}`}>1 digit</li>
								<li className={`${match ? "res--one-li" : ""}`}>Match</li>
							</ul>
						</div>
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
