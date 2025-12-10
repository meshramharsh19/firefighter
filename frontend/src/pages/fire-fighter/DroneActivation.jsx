import React from 'react';
import { Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
// Assuming these are separate React components you've created
// and the 'client:load' directive is no longer needed in a pure React app.
// import DashboardHeader from './DashboardHeader';
import DroneActivationPage from '../../components/fire-fighter/drone-activation/DroneActivationPage'; // You would implement this separately
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 1. Define the theme, including the 'background' color used in your original class name
const theme = createTheme({
  palette: {
    background: {
      default: '#f8f8f8', // Example light grey background color for 'bg-background'
    },
    // You can customize more colors here
  },
  // You can customize typography, components, etc., here
});

// 2. Main Dashboard Component
const FireOpsDashboard = () => {
  // Equivalent of `title="Drone Activation - FireOps Command"` is the browser title, 
  // which you'd set with a side effect hook in a real application (e.g., useEffect)
  React.useEffect(() => {
    document.title = "Drone Activation - FireOps Command";
  }, []);

  // The 'userName' is now passed directly as a prop to DashboardHeader, or 
  // hardcoded/fetched from context/state in a real app.
  const userName = "Fire Fighter";

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      
      {/* Equivalent to <BaseLayout title="..."> 
        We use ThemeProvider and CssBaseline for basic structure/reset 
      */}

      {/* Equivalent to <DashboardHeader client:load userName="Fire Fighter" /> */}
      {/* <DashboardHeader userName={userName} /> */}

      {/* Equivalent to <main className="min-h-[calc(100vh-64px)] bg-background"> */}
      <Box
        component="main"
        sx={{
          // The background color is now pulled from the theme's background.default
          backgroundColor: 'background.default', 
          // Sets minimum height: full viewport height minus the header height (assuming 64px for AppBar)
          minHeight: 'calc(100vh - 64px)', // Space for the fixed app bar, if it's fixed
        }}
      >
        {/* Equivalent to <DroneActivationPage client:load /> */}
        <DroneActivationPage />
      </Box>
    </ThemeProvider>
  );
};

export default FireOpsDashboard;