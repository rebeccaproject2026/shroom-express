import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const MobileMenuDrawer = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      to: "/driver/earnings",
      label: "Earnings",
      Icon: <Icon icon="fluent:wallet-credit-card-16-regular" width="28" height="28" />
    },
    {
      to: "/driver/documents",
      label: "Documents",
      Icon: <Icon icon="solar:documents-linear" width="28" height="28" className="*:stroke-[1.4px]" />
    },
    {
      to: "/driver/profile",
      label: "Profile",
      Icon: <Icon icon="proicons:person-2" width="28" height="28" />
    },
    {
      to: "/driver/support",
      label: "Support",
      Icon: <Icon icon="hugeicons:customer-support" width="28" height="28" className="*:stroke-[1.4px]" />
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - behind bottom nav */}
      <div
        className="fixed inset-0 bg-black opacity-60 z-40 sm:hidden"
        onClick={onClose}
      />

      {/* Drawer - behind bottom nav (z-40) */}
      <div className="fixed bottom-16 left-0 right-0 bg-white rounded-t-xl z-40 sm:hidden animate-slide-up">
        {/* Menu Items */}
        <div className="px-2 py-2 space-y-0">
          {menuItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 transition-colors ${isActive
                  ? "bg-[#E3EEFF] text-[#0066FF]"
                  : "text-black hover:bg-gray-50"
                }`
              }
            >
              {Icon}
              <span className="text-lg font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenuDrawer;
