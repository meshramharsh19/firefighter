import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getMuiTheme } from "@/Context/muiTheme";
import toast from "react-hot-toast";


const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("dark");

  const isDark = theme === "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

 const toggleTheme = () => {
  const newTheme = isDark ? "light" : "dark";
  setTheme(newTheme);

  if (newTheme === "dark") {
    toast.success("🌙 Dark Mode Enabled");
  } else {
    toast.success("☀️ Light Mode Enabled");
  }
};


  const muiTheme = getMuiTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
