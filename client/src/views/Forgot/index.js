import "./style.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLayout from "../../components/InputLayout";
import SectionTitle from "../../components/muiComponents/SectionTitle";
import SectionParagraph from "../../components/muiComponents/SectionParagraph";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "../../utils/axios";

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
			console.error(err);
		}
	};
	return (
		<InputLayout>
			<Box style={{ flex: 1 }}>
				{!mailSent ? (
					<>
						<Box mb={2}>
							<SectionTitle>Forgot password? 🔒</SectionTitle>
							<SectionParagraph>
								Enter your email and we'll send you instructions to reset your
								password
							</SectionParagraph>
						</Box>
						<Box
							component="form"
							onSubmit={handleSubmit}
							gutterBottom={true}
							sx={{ display: "flex", flexDirection: "column" }}>
							<TextField
								type="email"
								name="email"
								placeholder="toto@example.com"
								size="small"
								value={email}
								onChange={handleChange}
								helperText={emailError ? "Your Email is invalid" : ""}
								error={emailError}
							/>
							<Button
								type="submit"
								variant="contained"
								className="forgot-submit">
								Send reset link
							</Button>
						</Box>
					</>
				) : (
					<SectionParagraph>
						An email was sent with instructions to reset your password
					</SectionParagraph>
				)}
				<Box display="flex" justifyContent="flex-end" mt={2}>
					<Button
						startIcon={<ArrowBackIosIcon />}
						size="small"
						onClick={() => history.push("/")}>
						Back to login
					</Button>
				</Box>
			</Box>
		</InputLayout>
	);
}
