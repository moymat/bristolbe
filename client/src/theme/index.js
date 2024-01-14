import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { teal, lightBlue } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";

export const CustomTheme = ({ children }) => {
  const darkState = useSelector((state) => state.core.isDark);

  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? lightBlue[800] : lightBlue[500];
  const mainSecondaryColor = darkState ? teal[600] : teal[300];

  const bristolTheme = createTheme({
    palette: {
      mode: palletType,
      primary: {
        main: mainPrimaryColor,
        contrastText: "white",
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  return <ThemeProvider theme={bristolTheme}>{children}</ThemeProvider>;
};

export default CustomTheme;
