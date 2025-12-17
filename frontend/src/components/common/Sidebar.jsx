import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Radio,
  Truck,
  Plane,
  FileText,
  Users,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, link: "/AdminDashboard" },
    { name: "Live Monitoring", icon: Radio, link: "/live-monitoring" },
    { name: "Vehicles", icon: Truck, link: "/vehicles" },
    { name: "Drones", icon: Plane, link: "/drones" },
    { name: "SOPs", icon: FileText, link: "/sops" },
    { name: "User Roles", icon: Users, link: "/user-roles" },
  ];

  return (
    <aside className="sidebar-container">
      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          className={({ isActive }) =>
            `sidebar-menu-item ${isActive ? "active" : ""}`
          }
        >
          <item.icon size={18} className="sidebar-icon" />
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
