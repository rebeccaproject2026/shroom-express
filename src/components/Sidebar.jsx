import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import shroomLogo from "../assets/images/Logo.png";
import { Icon } from "@iconify/react";

const navItems = [
  { to: "/", label: "Dashboard", Icon: <Icon icon="solar:widget-2-outline" width="24" height="24" className="*:stroke-[1.4px]" /> },
  { to: "/deliveries", label: "My Deliveries", Icon: <Icon icon="hugeicons:truck-delivery" width="24" height="24" className="*:stroke-[1.4px]" /> },
  { to: "/history", label: "Delivery History", Icon: <Icon icon="iconamoon:history-light" width="24" height="24" /> },
  { to: "/earnings", label: "Earnings", Icon: <Icon icon="fluent:wallet-credit-card-16-regular" width="24" height="24" /> },
  { to: "/documents", label: "Documents", Icon: < Icon icon="solar:documents-linear" width="24" height="24" className="*:stroke-[1.4px]" /> },
  { to: "/profile", label: "Profile", Icon: <Icon icon="proicons:person-2" width="24" height="24" /> },
  { to: "/support", label: "Support", Icon: <Icon icon="hugeicons:customer-support" width="24" height="24" /> },

];
const Sidebar = ({ setSidebar }) => {
  const handleNavClick = () => {
    setSidebar(false);
  };

  return (

    <div className="w-57 h-screen bg-white flex flex-col transition-all duration-300 ease-in-out border-r border-[#E5E7EB]">

      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo and Profile Section */}
        <div className="flex flex-col items-center pt-8 pb-6 px-4">
          <img
            src={shroomLogo}
            alt="Shroom Express"
            className="h-14 w-auto object-contain cursor-pointer mb-2"
          />

          {/* Profile snippet in sidebar from Figma */}
          <div className="flex flex-col items-center">
            {/* The profile image circle */}
            <h3 className="text-[#222222] font-semibold text-base">David Doe</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
              <span className="text-[#16A34A] text-[12px] font-semibold">Online</span>
            </div>
          </div>
        </div>

        {/* Main nav items */}
        <div className="px-2 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `px-6 py-2 flex items-center gap-2.5 rounded-sm transition-colors ${isActive
                  ? "text-[#E93E2A] font-medium bg-[#FDF0EE] relative "
                  : "text-[#222222] font-medium hover:bg-[#FDF0EE] hover:text-[#E93E2A] "

                }`
              }
            >
              {Icon}
              <span className="text-[14px]">{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Bottom Menu Items */}
        <div className="p-2">
          <button

            className="w-full px-6 py-2 flex items-center gap-2.5 rounded-sm transition-colors text-[#E93E2A] font-medium bg-[#FDF0EE]"
          >
            <Icon icon="mynaui:logout" height={24} width={24} />
            <span className="text-[14px]">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
