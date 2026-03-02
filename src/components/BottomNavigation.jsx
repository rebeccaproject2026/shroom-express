import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const BottomNavigation = ({ onMenuClick, isMenuOpen, onNavItemClick }) => {
  const navItems = [
    { 
      to: "/", 
      label: "Dashboard", 
      Icon: <Icon icon="solar:widget-2-outline" width="24" height="24" className="*:stroke-[1.4px]" /> 
    },
    { 
      to: "/orders", 
      label: "Orders", 
      Icon: <Icon icon="solar:documents-linear" width="24" height="24" className="*:stroke-[1.4px]" /> 
    },
    { 
      to: "/inventory", 
      label: "Inventory", 
      Icon: <Icon icon="streamline-ultimate:drugs-cannabis" width="24" height="24" className="*:stroke-[1.2px]" /> 
    },
    { 
      to: "/staff/drivers", 
      label: "Staffs", 
      Icon: <Icon icon="fluent:people-team-20-regular" width="24" height="24" /> 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={onNavItemClick}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-white bg-blue-600"
                  : "text-gray-900"
              }`
            }
          >
            <div className="flex flex-col items-center gap-1">
              {Icon}
              <span className="text-[10px] font-semibold">{label}</span>
            </div>
          </NavLink>
        ))}
        
        {/* Menu Button - toggles between menu and close icon */}
        <button
          onClick={onMenuClick}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isMenuOpen ? "text-[#0066FF]" : "text-gray-600 hover:text-[#0066FF]"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            {isMenuOpen ? (
              <Icon icon="mdi:close" width="24" height="24" />
            ) : (
              <Icon icon="lucide:menu" width="24" height="24" />
            )}
            <span className="text-[10px] font-medium">Menu</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
