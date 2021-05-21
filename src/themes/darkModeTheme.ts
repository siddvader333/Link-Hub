import { createMuiTheme } from "@material-ui/core";

const darkModeTheme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    background: {
      default: "#393e46",
    },
    text: {
      primary: "#EEEEEE",
    },
    primary: {
      main: "#EEEEEE",
    },
    secondary: {
      main: "#00adb5",
    },
    error: {
      main: "#707793",
    },
  },
});

export default darkModeTheme;
