import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Logo from "../../assets/images/Logo.png";

const Sidebar = ({ setSidebar }) => {
    const [storesOpen, setStoresOpen] = useState(false);
    const [driversOpen, setDriversOpen] = useState(false);
    const [ordersOpen, setOrdersOpen] = useState(false);
    const [customersOpen, setCustomersOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const handleStoresClick = () => {
        setStoresOpen(!storesOpen);
        setDriversOpen(false);
        setOrdersOpen(false);
        setCustomersOpen(false);
        setActiveMenu("stores");
    };

    const handleDriversClick = () => {
        setDriversOpen(!driversOpen);
        setStoresOpen(false);
        setOrdersOpen(false);
        setCustomersOpen(false);
        setActiveMenu("drivers");
    };

    const handleOrdersClick = () => {
        setOrdersOpen(!ordersOpen);
        setStoresOpen(false);
        setDriversOpen(false);
        setCustomersOpen(false);
        setActiveMenu("orders");
    };

    const handleCustomersClick = () => {
        setCustomersOpen(!customersOpen);
        setStoresOpen(false);
        setDriversOpen(false);
        setOrdersOpen(false);
        setActiveMenu("customers");
    };

    const handleNavClick = () => {
        setStoresOpen(false);
        setDriversOpen(false);
        setOrdersOpen(false);
        setCustomersOpen(false);
        setActiveMenu(null);
        if (setSidebar) setSidebar(false);
    };

    const BulletIcon = () => (
        <div className="w-[7px] h-[6px] rounded-full bg-current shrink-0" />
    );

    return (
        <div
            className={`w-64 h-screen bg-white flex flex-col transition-all duration-300 ease-in-out border-r border-[#E2E8F0] font-manrope`}
        >
            <div className="my-2 w-full h-full flex flex-col overflow-hidden">
                {/* Logo Section - Fixed at top */}
                <div className="flex justify-center my-4 sticky top-0 bg-white z-10 py-2">
                    <img
                        src={Logo}
                        alt="Portrider"
                        className="h-12 w-auto cursor-pointer"
                    />
                </div>

                {/* Main Scrollable Area */}
                <div className="px-2 flex-1 overflow-y-auto hide-scrollbar scroll-smooth space-y-0.5">
                    {/* Dashboard */}
                    <NavLink
                        to="/superadmin/dashboard"
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                            `px-3 py-2.5 flex items-center gap-3 rounded-md transition-colors ${isActive && activeMenu === null
                                ? "bg-(--color-primary-soft) text-(--color-primary) font-medium"
                                : "text-[#212121] font-medium tracking-wide hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                            }`
                        }
                    >
                        <Icon icon="streamline-flex:dashboard-3" width="22" height="22" className="*:stroke-[1px]" />
                        Dashboard
                    </NavLink>

                    {/* User Management Section */}
                    <div className="pt-5 pb-2.5 px-3 text-[10px] leading-[15px] font-bold tracking-[1px] uppercase text-[#475569] font-[Manrope]">
                        User Management
                    </div>

                    {/* Stores Menu */}
                    <div>
                        <button
                            onClick={handleStoresClick}
                            className={`w-full px-3 py-2.5 flex items-center justify-between rounded-md transition-colors ${activeMenu === "stores"
                                ? "bg-(--color-primary-soft) text-(--color-primary) font-medium "
                                : "text-[#181211] font-medium hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon icon="streamline:shopping-store-2-store-shop-shops-stores" width="24" height="24" />
                                Stores
                            </div>
                            {storesOpen ? (
                                <ChevronUp className={`w-4.5 h-4.5`} />
                            ) : (
                                <ChevronDown className="w-4.5 h-4.5" />
                            )}
                        </button>
                        {storesOpen && (
                            <div className="ml-2.5 mt-1 space-y-0.5 text-sm">
                                {[
                                    { to: "/superadmin/stores/all", label: "All Stores" },
                                    { to: "/superadmin/inventory/all", label: "Inventory" },
                                    { to: "/superadmin/suppliers/all", label: "Suppliers" },
                                ].map((sub) => (
                                    <NavLink
                                        key={sub.to}
                                        to={sub.to}
                                        className={({ isActive }) =>
                                            `flex items-center gap-5 px-3 py-1.5 rounded-md transition-all ${isActive
                                                ? "text-(--color-primary) font-bold"
                                                : "text-[#181211] font-medium hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                                            }`
                                        }
                                    >
                                        <BulletIcon />
                                        {sub.label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Drivers Menu */}
                    <div>
                        <button
                            onClick={handleDriversClick}
                            className={`w-full px-3 py-2.5 flex items-center justify-between rounded-md transition-colors ${activeMenu === "drivers"
                                ? "bg-(--color-primary-soft) text-(--color-primary) font-medium "
                                : "text-[#181211] font-medium hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon icon="healthicons:truck-driver" width="24" height="24" />
                                Drivers
                            </div>
                            {driversOpen ? (
                                <ChevronUp className={`w-4.5 h-4.5`} />
                            ) : (
                                <ChevronDown className="w-4.5 h-4.5" />
                            )}
                        </button>
                        {driversOpen && (
                            <div className="ml-2.5 mt-1 space-y-0.5 text-sm">
                                {[
                                    { to: "/superadmin/drivers/all", label: "All Drivers" },
                                    { to: "/superadmin/drivers/store", label: "Store Driver" },
                                    { to: "/superadmin/drivers/shroom", label: "Shroom Express Driver" },
                                    { to: "/superadmin/drivers/in-house", label: "In-house Driver" },
                                    { to: "/superadmin/drivers/resume", label: "Resume / Registered" },
                                ].map((sub) => (
                                    <NavLink
                                        key={sub.to}
                                        to={sub.to}
                                        className={({ isActive }) =>
                                            `flex items-center gap-5 px-3 py-1.5 rounded-md transition-all ${isActive
                                                ? "text-(--color-primary) font-medium"
                                                : "text-[#181211] font-medium hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                                            }`
                                        }
                                    >
                                        <BulletIcon />
                                        {sub.label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Orders & Deliveries Menu */}
                    <div>
                        <button
                            onClick={handleOrdersClick}
                            className={`w-full px-3 py-2.5 flex items-center justify-between rounded-md transition-colors ${activeMenu === "orders"
                                ? "bg-(--color-primary-soft) text-(--color-primary) font-medium "
                                : "text-[#181211] font-medium hover:bg-(--color-primary-soft) hover:text-(--color-primary)"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon icon="mdi:package-variant-closed" width="24" height="24" />
                                Orders & Deliveries
                            </div>
                            {ordersOpen ? (
                                <ChevronUp className={`w-4.5 h-4.5`} />
                            ) : (
                                <ChevronDown className="w-4.5 h-4.5" />
                            )}
                        </button>
                        {ordersOpen && (
                            <div className="ml-2.5 mt-1 space-y-0.5 text-sm">
                                {[
                                    { to: "/superadmin/orders/all", label: "All Orders" },
                                    { to: "/superadmin/orders/pending", label: "Pending Orders" },
                                    { to: "/superadmin/orders/history", label: "Order History" },
                                ].map((sub) => (
                                    <NavLink
                                        key={sub.to}
                                        to={sub.to}
                                        className={({ isActive }) =>
                                            `flex items-center gap-5 px-3 py-1.5 rounded-md transition-all ${isActive
                                                ? "text-(--color-primary) font-medium"
                                                : "text-[#181211] font-medium hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                                            }`
                                        }
                                    >
                                        <BulletIcon />
                                        {sub.label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Customers Menu */}
                    <div>
                        <button
                            onClick={handleCustomersClick}
                            className={`w-full px-3 py-2.5 flex items-center justify-between rounded-md transition-colors ${activeMenu === "customers"
                                ? "bg-(--color-primary-soft) text-(--color-primary) font-medium "
                                : "text-[#181211] font-medium hover:bg-(--color-primary-soft) hover:text-(--color-primary)"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon icon="mynaui:users-group-solid" width="24" height="24" />
                                Customers
                            </div>
                            {customersOpen ? (
                                <ChevronUp className={`w-4.5 h-4.5`} />
                            ) : (
                                <ChevronDown className="w-4.5 h-4.5" />
                            )}
                        </button>
                        {customersOpen && (
                            <div className="ml-2.5 mt-1 space-y-0.5 text-sm">
                                {[
                                    { to: "/superadmin/customers/list", label: "Customer List" },
                                    { to: "/superadmin/customers/support", label: "Support Tickets" },
                                ].map((sub) => (
                                    <NavLink
                                        key={sub.to}
                                        to={sub.to}
                                        className={({ isActive }) =>
                                            `flex items-center gap-5 px-3 py-1.5 rounded-md transition-all ${isActive
                                                ? "text-(--color-primary) font-medium"
                                                : "text-[#181211] font-medium hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                                            }`
                                        }
                                    >
                                        <BulletIcon />
                                        {sub.label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Other Links */}
                    {[
                        { to: "/superadmin/marketing", label: "Marketing", icon: "nimbus:marketing" },
                        { to: "/superadmin/finances", label: "Finances", icon: "material-symbols:finance-mode-rounded" },
                    ].map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={handleNavClick}
                            className={({ isActive }) =>
                                `px-3 py-2.5 flex items-center gap-3 rounded-md transition-colors ${isActive && activeMenu === null
                                    ? "bg-(--color-primary) text-white shadow-md shadow-(--color-primary)/20"
                                    : "text-[#212121] font-medium tracking-wide hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                                }`
                            }
                        >
                            <Icon icon={item.icon} width="24" height="24" />
                            {item.label}
                        </NavLink>
                    ))}
                    <div className="pt-5 pb-2.5 px-3 text-[10px] leading-[15px] font-bold tracking-[1px] uppercase text-[#475569] font-[Manrope]">
                        Analytics & Ops
                    </div>
                    {[
                        { to: "/superadmin/analytics", label: "Analytics", icon: "glyphs:analytics-bold" },
                        { to: "/superadmin/audit-logs", label: "Audit Logs", icon: "majesticons:paper-fold-text-line" },
                        { to: "/superadmin/settings", label: "Setting", icon: "lsicon:setting-outline" },
                        { to: "/superadmin/support", label: " Support", icon: "tdesign:support" },
                    ].map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            onClick={handleNavClick}
                            className={({ isActive }) =>
                                `px-3 py-2.5 flex items-center gap-3 rounded-md transition-colors ${isActive && activeMenu === null
                                    ? "bg-(--color-primary) text-white shadow-md shadow-(--color-primary)/20"
                                    : "text-[#212121] font-medium tracking-wide hover:text-(--color-primary) hover:bg-(--color-primary-soft)"
                                }`
                            }
                        >
                            <Icon icon={item.icon} width="24" height="24" />
                            {item.label}
                        </NavLink>
                    ))}

                    {/* User Profile - Scrollable with other items */}
                    <div className="mt-8 py-2.5 pl-2 border-t border-[#F1F5F9] animate-in fade-in duration-500">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#E5EAF2] flex items-center justify-center text-[#1E293B]">
                                    <Icon icon="lucide:user" width="20" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[14px] font-bold text-[#181211] leading-tight truncate">Alex Morgan</p>
                                    <p className="text-[12px] font-medium text-[#181211] mt-0.5">Super Admin</p>
                                </div>
                            </div>
                            <button className="text-[#E93E2B] hover:bg-red-50 p-2 rounded-lg transition-colors ml-2 shrink-0">
                                <Icon icon="lucide:log-out" width="20" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
