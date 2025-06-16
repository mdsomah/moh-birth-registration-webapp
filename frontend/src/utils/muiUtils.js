import { red } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    // mode: "dark",
    primary: {
      main: "#4169E1",
    },
    secondary: {
      main: "#00A4EF",
    },
    buttonBGColor: {
      main: "#008080",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#F8F8F8",
    },
  },
  // components: {
  //   MuiButtonBase: {
  //     styleOverrides: {
  //       root: { maxHeight: 20 },
  //     },
  //   },
  // },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Droid Sans",
      "Fira Sans",
      "Cantarell",
      "Ubuntu",
      "Oxygen",
      "Bai Jamjuree",
    ].join(","),
    fontSize: 12,
  },
  // Customer Variables
  h1: {
    fontSize: 16,
    color: "blue",
  },
});

export const responsiveTheme = responsiveFontSizes(muiTheme);
