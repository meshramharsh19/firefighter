import React from "react";
import { Outlet } from "react-router-dom";     
import DashboardHeader from "../components/common/fire-fighter/DashboardHeader";  

export default function FireFighterLayout() {
  return (
    <div>
      <DashboardHeader sessionStartTime={Date.now()} />   {/* Header shown */}
      
      <div>
        <Outlet />   
      </div>
    </div>
  );
}
