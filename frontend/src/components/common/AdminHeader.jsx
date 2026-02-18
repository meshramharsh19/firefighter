import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/Context/ThemeContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import SafeIcon from "@/components/common/SafeIcon";
import logoutUser from "./auth/logout";
import useUserInfo from "@/components/common/auth/useUserInfo";

import "./AdminHeader.css";

export default function AdminHeader({ notificationCount = 0 }) {
  const [mounted, setMounted] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const { name, role, initials } = useUserInfo();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="admin-header">
      <div className="admin-header__container">

        <div className="admin-header__left">
          <div className="admin-header__logo">
            <div className="admin-header__logo-icon">
              <SafeIcon name="Flame" size={20} className="admin-header__logo-icon-svg" />
            </div>
            <span className="admin-header__logo-text">Fire Fighter</span>
          </div>
        </div>

        <div className="admin-header__right">

          <Button variant="ghost" size="icon" className="admin-header__notification-button">
            <SafeIcon name="Bell" size={20} className="admin-header__notification-icon" />
            {notificationCount > 0 && (
              <Badge variant="destructive" className="admin-header__notification-badge">
                {notificationCount > 9 ? "9+" : notificationCount}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="admin-header__profile-button">

                <Avatar className="admin-header__profile-avatar">
                  <AvatarImage
                    src="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/382b2788-4a1a-42b3-ad58-7ff36533b34a.png"
                    alt={name}
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>

                <div className="admin-header__profile-info">
                  <span className="admin-header__profile-name">{name}</span>
                  <span className="admin-header__profile-role">{role}</span>
                </div>

                <SafeIcon name="ChevronDown" size={16} className="admin-header__profile-chevron" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="admin-header__profile-dropdown px-2 py-2 rounded-xl shadow-lg border border-gray-800 bg-[#1a1c1f]"
            >

              <DropdownMenuLabel
                className={`text-sm font-semibold px-2 pb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                My Account
              </DropdownMenuLabel>

              <div className="h-px bg-gray-700/60 my-2"></div>

              <DropdownMenuItem className="admin-header__profile-dropdown-item">
                <SafeIcon name="User" size={16} className="mr-2" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem className="admin-header__profile-dropdown-item">
                <SafeIcon name="Settings" size={16} className="mr-2" />
                Settings
              </DropdownMenuItem>

              <div className="h-px bg-gray-700/60 my-2"></div>

              <DropdownMenuItem
                onClick={toggleTheme}
                className="admin-header__profile-dropdown-item"
              >
                <SafeIcon name={isDark ? "Sun" : "Moon"} size={16} className="mr-2" />
                {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </DropdownMenuItem>

              <div className="h-px bg-gray-700/60 my-2"></div>

              <DropdownMenuItem
                onClick={logoutUser}
                className="admin-header__profile-dropdown-item text-red-500 hover:text-red-400"
              >
                <SafeIcon name="LogOut" size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
