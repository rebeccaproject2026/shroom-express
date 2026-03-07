import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const BottomNavigation = ({ onMenuClick, isMenuOpen, onNavItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStaffOptions, setShowStaffOptions] = useState(false);

  // Check if current path is a staff-related page
  const isStaffActive = location.pathname.startsWith("/staff");
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
  ];

  const handleStaffClick = () => {
    if (isMenuOpen) {
      onMenuClick?.(); // Close menu first
    }
    setShowStaffOptions(!showStaffOptions);
  };

  const handleStaffOptionClick = (path) => {
    setShowStaffOptions(false);
    onNavItemClick?.();
    navigate(path);
  };

  const handleNavItemClick = () => {
    setShowStaffOptions(false);
    onNavItemClick?.();
  };

  const handleMenuClick = () => {
    if (showStaffOptions) {
      setShowStaffOptions(false); // Close staff options first
    }
    onMenuClick?.();
  };

  return (
    <>
      {/* Staff Options Popup */}
      {showStaffOptions && (
        <div className="fixed inset-0 z-40 flex items-end justify-center lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowStaffOptions(false)}
          />

          {/* Popup Content */}
          <div className="relative w-full bg-white rounded-t-lg shadow-lg mb-16 animate-slide-up">
            <div className="p-3 space-y-2">
              <button
                onClick={() => handleStaffOptionClick("/staff/drivers")}
                className={`w-full px-4 py-3 text-left rounded-sm font-medium transition-colors flex items-center gap-3 ${location.pathname.startsWith("/staff/drivers")
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <Icon icon="mdi:car" width="24" height="24" />
                <span>Drivers</span>
              </button>
              <button
                onClick={() => handleStaffOptionClick("/staff/dispatcher")}
                className={`w-full px-4 py-3 text-left rounded-sm font-medium transition-colors flex items-center gap-3 ${location.pathname.startsWith("/staff/dispatcher")
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <Icon icon="mdi:account-tie" width="24" height="24" />
                <span>Dispatcher</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={handleNavItemClick}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive
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

          {/* Staffs Button */}
          <button
            onClick={handleStaffClick}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isStaffActive ? "text-white bg-blue-600" : "text-gray-900"
              }`}
          >
            <div className="flex flex-col items-center gap-1">
              <Icon icon="fluent:people-team-20-regular" width="24" height="24" />
              <span className="text-[10px] font-semibold">Staffs</span>
            </div>
          </button>

          {/* Menu Button - toggles between menu and close icon */}
          <button
            onClick={handleMenuClick}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isMenuOpen ? "text-[#0066FF]" : "text-gray-600 hover:text-[#0066FF]"
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
    </>
  );
};

export default BottomNavigation;