import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../../../utils/axios";

import { capitalizeFirstLetter } from "../../../utils/Utils.js";

export default function RightsManagement({ permission, defaultUsers }) {
	const [users, setUsers] = useState(defaultUsers);
	const [inputValue, setInputValue] = useState("");
	const [value, setValue] = useState([]);

	const getUsers = async (query = "") => {
		try {
			const { data: axiosData } = await axios().get(
				`/api/v1/users?search=${query}`
			);
			setUsers(
				axiosData.data.map(user => ({
					...user,
					full_name: `${user.first_name} ${user.last_name}`,
				}))
			);
		} catch (err) {
			console.error(err);
		}
	};

	const handleInputChange = (event, input) => {
		getUsers(input);
		setInputValue(input);
	};

	const handleFocus = () => {
		!value && getUsers();
	};

	const handleValueChange = (event, value) => {
		setValue(value);
		console.log(value);
	};

	return (
		<Box sx={{ mb: 1 }}>
			<Autocomplete
				size="small"
				multiple
				fullWidth
				id={permission}
				disableClearable
				popupIcon={""}
				//value selected by the user, for instance when pressing Enter
				value={value}
				onChange={handleValueChange}
				onFocus={handleFocus}
				//value displayed in the textbox
				inputValue={inputValue}
				onInputChange={handleInputChange}
				//option displayed
				filterSelectedOptions={true}
				isOptionEqualToValue={(option, value) =>
					option.full_name === value.full_name
				}
				options={users}
				getOptionLabel={option => option.full_name}
				renderInput={params => (
					<TextField {...params} label={capitalizeFirstLetter(permission)} />
				)}
			/>
		</Box>
	);
}
