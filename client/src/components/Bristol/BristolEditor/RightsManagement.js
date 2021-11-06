import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { capitalizeFirstLetter } from "../../../utils/Utils.js";

export default function RightsManagement({ permission }) {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (inputValue === "") {
      setUsers([]);
      return;
    }
    fetch(`http://localhost:8000/users?full_name_like=${inputValue}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [inputValue]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
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
      value={value}
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
}
