import React from "react";
import SOPManagementPage from "@/components/admin/admin-sops/SOPManagementPage";

export default function SOPManagement() {
  return (
  
    <>
      <SOPManagementPage />

      {/* <AdminHeader
        userName="Admin User"
        userRole="System Administrator"
        notificationCount={2}
      /> */}

      {/* //  <SOPManagementPage /> */}

      {/* <AdminSidebarLayout headerHeight="64px" currentPage="sops">
        <main className="flex-1 overflow-auto">
          <SOPManagementPage />
        </main>
      </AdminSidebarLayout> */}
    </>
      
  );
}
