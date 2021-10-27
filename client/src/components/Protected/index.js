import { useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import { UserContext } from "../App/App";

const Protected = () => {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	const handleClick = async () => {
		await axios("/auth/logout");
		setUser({});
	};

	useEffect(() => {
		console.log("protected", user);
		if (!user) {
			history.push("/");
		}
	}, [user, history]);

	return (
		<div>
			<Button variant="contained" onClick={handleClick}>
				Logout
			</Button>
			<Typography component="h1">You are in a protected page</Typography>
		</div>
	);
};

export default Protected;
