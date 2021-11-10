import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLayout from "../components/InputLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import axios from "../utils/axios";

export default function Forgot() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [mailSent, setMailSent] = useState(false);
	const history = useHistory();

	const handleChange = e => {
		setEmailError(!!e.target.value);
		setEmail(e.target.value);
	};

	const handleSubmit = async e => {
		try {
			e.preventDefault();
			if (!email) return setEmailError(true);

			await axios().post("/auth/reset-password", { email });

			setMailSent(true);
		} catch (err) {
			console.error(err.response.data.error);
		}
	};

	return (
		<InputLayout>
			<Box style={{ flex: 1 }}>
				{!mailSent ? (
					<>
						<Box mb={2}>
							<Typography variant="h4" component="h1" fontWeight={700} mb={2}>
								Forgot password? 🔒
							</Typography>
							<Typography mb={2} width={"85%"}>
								Enter your email and we'll send you instructions to reset your
								password
							</Typography>
						</Box>
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
								value={email}
								onChange={handleChange}
								helperText={emailError ? "Your Email is invalid" : ""}
								error={emailError}
							/>
							<Button type="submit" variant="contained">
								Send reset link
							</Button>
						</Box>
					</>
				) : (
					<Typography mb={2} width={"85%"}>
						An email was sent with instructions to reset your password
					</Typography>
				)}
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
