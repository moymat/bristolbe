import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../../../utils/axios";
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

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

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
}
