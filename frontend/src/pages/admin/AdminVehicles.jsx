import React from "react";
import VehicleManagement from "@/components/admin/admin-vehicles/VehicleManagement";

export default function VehicleManagementPage() {
  return (
    <>
       {/* <AdminHeader
        userName="Admin User"
        userRole="System Administrator"
        notificationCount={2}
      /> */}

            <VehicleManagement />

      {/* <AdminSidebarLayout headerHeight="64px" currentPage="vehicles">
        <main className="flex-1 overflow-auto">
          <VehicleManagement />
        </main>
      </AdminSidebarLayout> */}
    </>
  );
}
