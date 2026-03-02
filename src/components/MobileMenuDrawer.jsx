import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const MobileMenuDrawer = ({ isOpen, onClose }) => {
  const menuItems = [
    { 
      to: "/finances", 
      label: "Finances", 
      Icon: <Icon icon="fluent:wallet-credit-card-16-regular" width="28" height="28" /> 
    },
    { 
      to: "/customers", 
      label: "Customers", 
      Icon: <Icon icon="mynaui:users-group" width="28" height="28" /> 
    },
    { 
      to: "/ai-agent", 
      label: "AI Agent", 
      Icon: <Icon icon="tabler:messages" width="28" height="28" className="*:stroke-[1.4px]" /> 
    },
     { 
      to: "/tracking", 
      label: "Tracking", 
      Icon: <Icon icon="hugeicons:shipment-tracking" width="28" height="28" className="*:stroke-[1.4px]" />
    },
     { 
      to: "/marketing", 
      label: "Marketing", 
      Icon: <Icon icon="tabler:speakerphone" width="28" height="28" className="*:stroke-[1.4px]" /> 
    },
    { 
      to: "/support", 
      label: "Support", 
      Icon: <Icon icon="hugeicons:customer-support" width="28" height="28" className="*:stroke-[1.4px]" /> 
    },
    { 
      to: "/setting", 
      label: "Setting", 
      Icon: <Icon icon="lucide:settings" width="28" height="28" className="*:stroke-[1.4px]" /> 
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
      <div className="fixed bottom-16 left-0 right-0 bg-white z-40 sm:hidden animate-slide-up">
        {/* Menu Items */}
        <div className="px-2 py-2 space-y-0">
          {menuItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 transition-colors ${
                  isActive
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
