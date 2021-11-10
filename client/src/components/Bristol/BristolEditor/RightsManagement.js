import { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../../../utils/axios";
import { capitalizeFirstLetter } from "../../../utils/utils";

export default function RightsManagement({
	permission,
	handleChange,
	usersSelected = [],
	renderOption,
}) {
	const [users, setUsers] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const getUsers = useCallback(async () => {
		try {
			const { data: axiosData } = await axios().get(
				`/api/v1/users?search=${inputValue}`
			);
			setUsers(
				axiosData.data.map(user => ({
					...user,
					full_name: `${user.first_name} ${user.last_name}`,
				}))
			);
		} catch (err) {
			console.error(err.response.data);
		}
	}, [inputValue]);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const handleInputChange = (_, newInputValue) => {
		setInputValue(newInputValue);
	};

	//value selected by the user, for instance when pressing Enter
	const handleValueChange = (_, newValue) => {
		handleChange(newValue);
	};

	return (
		<Box sx={{ mb: 1 }}>
			<Autocomplete
				size="small"
				multiple
				fullWidth
				disableClearable
				popupIcon={""}
				//value selected by the user, for instance when pressing Enter
				value={usersSelected}
				onChange={handleValueChange}
				onFocus={getUsers}
				//value displayed in the textbox
				inputValue={inputValue}
				onInputChange={handleInputChange}
				//option displayed
				filterSelectedOptions
				isOptionEqualToValue={(option, value) =>
					option.full_name === value.full_name
				}
				options={users}
				getOptionLabel={option => option.full_name}
				renderOption={renderOption(permission)}
				renderInput={params => (
					<TextField {...params} label={capitalizeFirstLetter(permission)} />
				)}
			/>
		</Box>
	);
}
