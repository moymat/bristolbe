<<<<<<< HEAD
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> client-server-merge
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../../../utils/axios";
<<<<<<< HEAD
import { capitalizeFirstLetter } from "../../../utils/Utils";
import { getRightsListValue } from "../../../redux/selectors/britols";

export default function RightsManagement({ permission }) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue === "") {
      setUsers([]);
      return;
    }
    axios().get(`http://localhost:8000/users?full_name_like=${inputValue}`)
      .then(({data}) => setUsers(data));
  }, [inputValue]);
=======

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
>>>>>>> client-server-merge

	const handleInputChange = (event, input) => {
		getUsers(input);
		setInputValue(input);
	};

<<<<<<< HEAD
  //value selected by the user, for instance when pressing Enter
  const handleValueChange = (event, newValue) => {
    if ( permission === 'editors') {
      dispatch({ type: "UPDATE_BRISTOL_EDITORS", bristolEditorsList: newValue });
    }
    else if ( permission === 'readers') {
      dispatch({ type: "UPDATE_BRISTOL_READERS", bristolReadersList: newValue });
    }
  };

 
  return (
    <Autocomplete
      size="small"
      multiple
      fullWidth
      id={permission}
      disableClearable
      popupIcon={""}
      //value selected by the user, for instance when pressing Enter
      value={useSelector((state) => getRightsListValue(state, permission))}
      onChange={handleValueChange}
      //value displayed in the textbox
      inputValue={inputValue}
      onInputChange={handleInputChange}
      //option displayed
      filterSelectedOptions
      isOptionEqualToValue={(option, value) =>
        option.full_name === value.full_name
      }
      options={users}
      getOptionLabel={(option) => option.full_name}
      renderInput={(params) => (
        <TextField {...params} label={capitalizeFirstLetter(permission)} />
      )}
    />
  );
=======
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
>>>>>>> client-server-merge
}
