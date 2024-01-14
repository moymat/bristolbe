import { usePasswordValidation } from "../hooks/usePasswordValidation";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const PasswordVerification = ({ input }) => {
  const [validLength, hasNumber, upperCase, lowerCase, match] =
    usePasswordValidation({
      firstPassword: input.password,
      secondPassword: input.confirm,
    });

  const alertStyle = {
    display: "flex",
    alignItems: "center",
    margin: "2px",
    fontSize: 12,
    flex: 1,
    "& .MuiAlert-icon": {
      padding: 0,
    },
    "& .MuiAlert-message": {
      padding: 0,
    },
  };

  return (
    <Box display="flex" flexWrap="wrap" mb={3}>
      <Alert severity={validLength ? "success" : "error"} sx={alertStyle}>
        8 to 30 characters
      </Alert>
      <Alert severity={upperCase ? "success" : "error"} sx={alertStyle}>
        1 uppercase character
      </Alert>
      <Alert severity={lowerCase ? "success" : "error"} sx={alertStyle}>
        1 lowercase character
      </Alert>
      <Alert severity={hasNumber ? "success" : "error"} sx={alertStyle}>
        1 number
      </Alert>
      <Alert severity={match ? "success" : "error"} sx={alertStyle}>
        Must match confirm
      </Alert>
    </Box>
  );
};

export default PasswordVerification;
