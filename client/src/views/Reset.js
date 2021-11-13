import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PasswordVerification from "../components/PasswordVerification";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import InputLayout from "../components/InputLayout";
import axios from "../utils/axios";

const passwordValidator = new RegExp(
	/^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\d).{8,30}$/
);

export default function Reset() {
	const [input, setInput] = useState({
		password: "",
		confirm: "",
	});
	const [touch, setTouch] = useState(false);
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
						<PasswordVerification input={input} />
						<Button type="submit" variant="contained">
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
