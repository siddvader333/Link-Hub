import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    background: {
      default: "#EEEEEE",
    },
    text: {
      primary: "#EEEEEE",
    },
    primary: {
      main: "#EEEEEE",
    },
    secondary: {
      main: "#aad8d3",
    },
    error: {
      main: "#707793",
    },
  },
});

export default defaultTheme;
