import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import FireFighterLayout from "./layout/FireFighterLayout";

///common

import LoginForm from "./components/common/login/LoginForm";
import ProtectedRoute from "./components/common/auth/ProtectedRoute";
import RedirectIfLoggedIn from "./components/common/auth/RedirectIfLoggedIn";
import NotAccessToYou from "./components/common/notaccesstoyou";
import RoleProtectedRoute from "./components/common/auth/RoleProtectedRoute";
import { ThemeProvider } from "./Context/ThemeContext";
import { Toaster } from "react-hot-toast";

// Admin Pages

import AdminDroneMonitoring from "./pages/admin/AdminDroneMonitoring";
import VehicleManagementPage from "./pages/admin/AdminVehicles";
import DroneDetailsPage from "./pages/admin/DroneDetails";
import SOPManagement from "./pages/admin/AdminSop";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserRoles from "./pages/admin/UserRole"


// Fire Fighter Pages
import FireOpsDashboard from "./pages/fire-fighter/DroneActivation";
import ConfirmLocation from "./pages/fire-fighter/ConfirmLocation";
import VehicleDroneSelection from "./pages/fire-fighter/VehicleDroneSelection";
import FireFighterPage from "./pages/fire-fighter/FireFighterPage";
import MapTogglePage from "./pages/fire-fighter/MapToggle";

// DRIVER
import Vehicle from "./pages/vehicle-driver/vehicle";

// PILOT
import Pilot from "./pages/pilot/pilot"


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>

        <Toaster position="top-center" reverseOrder={false}/>
        <Routes>
              <Route path="/" element={<RedirectIfLoggedIn><LoginForm/></RedirectIfLoggedIn>} />
          {/* Admin Side */}
          <Route
            element={<ProtectedRoute>
                     <RoleProtectedRoute allowedRoles={["Admin"]}>
                       <AdminLayout />
                     </RoleProtectedRoute>
                    </ProtectedRoute>}>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/live-monitoring" element={<AdminDroneMonitoring />} />
            <Route path="/vehicles" element={<VehicleManagementPage />} />
            <Route path="/drones" element={<DroneDetailsPage />} />
            <Route path="/sops" element={<SOPManagement />} />
            <Route path="/user-roles" element={<UserRoles />} />
          </Route>

          {/* Firefighter UI */}
          <Route element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={[
                "Fire Station Command Control",
                "Pilot",
                "Vehicle Driver"
              ]}>
                <FireFighterLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }>
            <Route path="/fire-dashboard" element={<FireOpsDashboard />} />
            <Route path="/confirm-location/:id" element={<ConfirmLocation />} />
            <Route path="/vehicle-drone-selection/:id" element={<VehicleDroneSelection />} />
            <Route path="/fire-fighter-dashboard" element={<FireFighterPage/>} />
            <Route path="/map-toggle" element={<MapTogglePage/>} />
          </Route>

          {/* ---------------- VEHICLE DRIVER ONLY ---------------- */}
          <Route path="/vehicle-driver-dashboard" element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["Vehicle Driver"]}>
                <Vehicle />
              </RoleProtectedRoute>
            </ProtectedRoute>
          } />

          {/* ---------------- PILOT ONLY ---------------- */}
          <Route path="/pilot-dashboard" element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["Pilot"]}>
                <Pilot />
              </RoleProtectedRoute>
            </ProtectedRoute>
          } />

          {/* NO ACCESS */}
          <Route path="/not-access-to-you" element={<NotAccessToYou />} />


        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
