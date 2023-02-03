import { createTheme } from "@mui/system";

declare module "@mui/material/styles" {
  interface Palette {
    primary_darker: Palette["primary"];
    secondary_lighter: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    primary_darker?: PaletteOptions["primary"];
    secondary_lighter: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
const theme = createTheme({
  palette: {
    primary: { main: "#fff" },
    secondary: { main: "#5E5C5C" },
    primary_darker: { main: "#D9D9D9" },
    secondary_lighter: { main: "#A4A4A4" },
  },
  typography: {
    h1: { fontSize: 48, color: "#5E5C5C", fontFamily: "Manrope" },
    h2: { fontSize: 32, color: "#5E5C5C", fontFamily: "Manrope" },
    caption: { fontSize: 24, color: "#5E5C5C", fontFamily: "Manrope" },
    body1: { fontSize: 20, color: "#5E5C5C", fontFamily: "Manrope" },
  },
});

export default theme;
