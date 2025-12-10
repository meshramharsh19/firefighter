import { createTheme } from "@mui/material/styles";

export const getMuiTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: { default: "#0d0f12", paper: "#0f1114" },
            text: { primary: "#fff" }
          }
        : {
            background: { default: "#ffffff", paper: "#f3f3f3" },
            text: { primary: "#000" }
          }),
    },
    shape: {
      borderRadius: 8,
    },
  });
