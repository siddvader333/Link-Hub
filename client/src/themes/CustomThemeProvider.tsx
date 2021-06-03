import { ThemeProvider } from "@material-ui/styles";
import { PropsWithChildren } from "react";
import { useAppSelector } from "../app/hooks";
import darkModeTheme from "./darkModeTheme";
import defaultTheme from "./defaultTheme";

const CustomThemeProvider = (props: PropsWithChildren<{}>) => {
  const darkMode = useAppSelector((state) => state.darkMode);
  const theme = darkMode.status ? darkModeTheme : defaultTheme;

  return <ThemeProvider theme={{ ...theme }}>{props.children}</ThemeProvider>;
};

export default CustomThemeProvider;
