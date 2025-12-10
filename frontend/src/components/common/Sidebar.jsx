import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Radio,
  Truck,
  Plane,
  FileText,
  Users,
  Activity
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
    { name: "Logs", icon: Activity, link: "/logs" },
  ];

  return (
    <aside className="w-64 bg-[#121417] border-r border-gray-800 p-5 sidebar-container">
      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 mb-3 rounded-lg sidebar-menu-item transition-all ${
              isActive
  ? "bg-[rgba(198,35,35,1)] text-white font-semibold shadow-lg"
  : "hover:bg-gray-800 text-gray-300"


            }`
          }
        >
          {/* Icon dynamic color */}
          <item.icon
            size={18}
            color={({ isActive }) => (isActive ? "white" : "#a0a0a0")}
          />

          {item.name}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
