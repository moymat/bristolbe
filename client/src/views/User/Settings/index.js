import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { usePasswordValidation } from "../../../hooks/usePasswordValidation";

const passwordValidator = new RegExp(
  /^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\d).{8,30}$/
);

const emailValidator = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default function Settings() {
  const [userInformation, setUserInformation] = useState({
    passwordEmail: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validLength, hasNumber, upperCase, lowerCase, match] =
    usePasswordValidation({
      firstPassword: userInformation.newPassword,
      secondPassword: userInformation.confirmPassword,
    });

  const [newEmailError, setNewEmailError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [touch, setTouch] = useState(false);

  const handleTouch = () => {
    !touch && setTouch(true);
  };
  
  const { currentPassword, newPassword, confirmPassword } = userInformation;
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "currentPassword":
        console.log("Rien a mettre");
        break;
      case "newPassword":
        setNewPasswordError(!passwordValidator.test(value));
        break;
      case "confirmPassword":
        setConfirmPasswordError(value !== userInformation.newPassword);
        break;
      case "passwordEmail":
        console.log("Rien a mettre");
        break;
      case "newEmail":
        setNewEmailError(!emailValidator.test(value));
        break;
      default:
        return;
    }
    setUserInformation({
      ...userInformation,
      [name]: value,
    });
  };
  const handleSubmitEmail = (event) => {
    event.preventDefault();
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword ||
      newPassword !== confirmPassword
    ) {
      !currentPassword && setCurrentPasswordError(true);
      !newPassword && setNewPasswordError(true);
      !confirmPassword && setConfirmPasswordError(true);
      return;
    }
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1.5, width: "25ch" },
        ml: 5,
        flexGrow: 1,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="h6" sx={{ width: "100%" }}>
        Change your Email :
      </Typography>
      <Box sx={{ marginTop: 1}}>
        <Box
          component="form"
          onSubmit={handleSubmitEmail}
        >
          <TextField
            type="password"
            name="passwordEmail"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.passwordEmail}
          />
        </Box>
        <Box>
          <TextField
            type="email"
            name="newEmail"
            label="New email"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.newEmail}
            helperText={newEmailError ? "Your Email is invalid" : ""}
            error={newEmailError}
          />
        </Box>
        <Button
          type="submit"
          onSubmit={handleSubmitEmail}
          variant="contained"
          className="log-submit"
          sx={{ width: "fit-content", marginLeft: "5em", marginBottom: "2em" }}
        >
          Change
        </Button>
      </Box>
      <Typography variant="h6" sx={{ width: "100%" }}>
        Change your password :
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmitPassword}
      >
        <Box sx={{ marginTop: 1 }}>
          <TextField
            type="password"
            name="currentPassword"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.currentPassword}
            helperText={currentPasswordError ? "Your password is invalid" : ""}
            error={currentPasswordError}
          />
        </Box>
        <Box>
          <TextField
            type="password"
            name="newPassword"
            label="New Password"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.newPassword}
            onFocus={handleTouch}
            helperText={newPasswordError ? "Your new password is invalid" : ""}
            error={newPasswordError}
          />
          {touch && (
            <ul className="reg-list">
              <li className={`${validLength ? "reg--one-li" : ""}`}>
                8 characters (max.30)
              </li>
              <li className={`${upperCase ? "reg--one-li" : ""}`}>
                1 capital letter
              </li>
              <li className={`${lowerCase ? "reg--one-li" : ""}`}>
                1 lower letter
              </li>
              <li className={`${hasNumber ? "reg--one-li" : ""}`}>1 digit</li>
              <li className={`${match ? "reg--one-li" : ""}`}>Match</li>
            </ul>
          )}
        </Box>
        <Box>
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.confirmPassword}
            helperText={
              confirmPasswordError ? "Your confirm password is invalid" : ""
            }
            error={confirmPasswordError}
          />
        </Box>
        <Button
          type="submit"
          onSubmit={handleSubmitPassword}
          variant="contained"
          className="log-submit"
          sx={{ width: "fit-content", marginLeft: "5em" }}
        >
          Change
        </Button>
      </Box>
    </Box>
  );
}
