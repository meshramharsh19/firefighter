import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "../components/common/AdminHeader";
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-layout__body">
        <Sidebar />
        <main className="admin-layout__main-content">
          <Outlet />   
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
