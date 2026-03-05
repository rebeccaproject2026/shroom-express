/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NotificationDropdown from "./common/NotificationDropdown";
import avtar from "../assets/images/self-portrait-beautiful-chinese-girl2.png";
import { Icon } from "@iconify/react";

const routeTitleMap = {
  "/": "Dashboard",
  "/deliveries": "My Deliveries",
  "/history": "Delivery History",
  "/earnings": "Earnings",
  "/documents": "Documents",
  "/profile": "Profile",
  "/support": "Support",
};

const getDisplayTitle = (pathname) => {
  const matchedPath = Object.keys(routeTitleMap).find((path) => pathname === path);
  return routeTitleMap[matchedPath] || "Dashboard";
};

const DashboardHeader = ({ sidebar, setSidebar }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const displayTitle = getDisplayTitle(pathname);

  useEffect(() => {
    document.title = displayTitle ? `${displayTitle} | Driver Dashboard` : "Driver Dashboard";
  }, [displayTitle]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full px-4 sm:px-6 h-[72px] flex items-center justify-between bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative z-30">
        <div className="flex items-center gap-4">
          {/* <button
            onClick={() => setSidebar(!sidebar)}
            className="lg:hidden text-[#111827] hover:bg-gray-100 p-2 rounded transition-colors"
          >
            ☰
          </button> */}
          <Icon icon="mynaui:sidebar" width="20" height="20" />
          <div className="hidden sm:flex items-center text-[#9CA3AF] text-[14px] font-medium">
            <span className="text-[#111827] border-l-2 border-[#111827] pl-3 leading-none h-4">
              {displayTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Toggle Pill */}
          <div className="flex items-center bg-white rounded-full border-2 border-[#E5E7EB] cursor-pointer overflow-hidden h-[32px] mt-1">
            <button
              onClick={() => setIsOnline(true)}
              className={`h-full px-4 text-[13px] font-medium transition-colors flex items-center justify-center ${isOnline ? "bg-[#16A34A] text-white" : "text-[#777777] bg-transparent"
                }`}
            >
              Online
            </button>
            <button
              onClick={() => setIsOnline(false)}
              className={`h-full px-4 text-[13px] font-medium transition-colors flex items-center justify-center ${!isOnline ? "bg-[#E93E2A] text-white" : "text-[#777777]  bg-transparent"
                }`}
            >
              Offline
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsNotificationOpen(true)}
            >
              <Icon icon="si:notifications-alt-2-line" width="23" height="23" />
              <span className="absolute top-2 right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full" />
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center overflow-hidden hover:opacity-80 transition-opacity rounded-full w-9 h-9"
              >
                <img
                  src={avtar || "https://ui-avatars.com/api/?name=David+Doe"}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Optional User Dropdown if needed later
              {isUserMenuOpen && (
                ...
              )} */}
            </div>
          </div>
        </div>
      </nav>

      <NotificationDropdown
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};

export default DashboardHeader;
