import { ThemeProvider } from "@material-ui/styles";
import { PropsWithChildren } from "react";
import { useAppSelector } from "../app/hooks";
import darkModeTheme from "./darkModeTheme";
import defaultTheme from "./defaultTheme";

const CustomThemeProvider = (props: PropsWithChildren<{}>) => {
  const darkMode = useAppSelector((state) => state.darkMode);
  console.log("resetting theme: dark mode value is : " + darkMode.status);
  let theme = {};
  if (darkMode.status) {
    console.log("darkmode status is true here we should return dark theme");
    theme = darkModeTheme;
  } else {
    console.log("darkmode status false we should use the default theme");
    theme = defaultTheme;
  }
  //const theme = darkMode.status ? darkModeTheme : defaultTheme;
  console.log(theme);

  return <ThemeProvider theme={{ ...theme }}>{props.children}</ThemeProvider>;
};

export default CustomThemeProvider;
