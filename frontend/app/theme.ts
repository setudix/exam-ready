import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: teal[300],
    },
    background: {
      default: "#f3f4f5", // Soft white background color
    },
  },
});

export default theme;
