import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";

const routeTitleMap = {
    "/superadmin/dashboard": "Dashboard",
    "/superadmin/stores/all": "All Stores",
    "/superadmin/stores/inventory": "Inventory",
    "/superadmin/stores/suppliers": "Suppliers",
    "/superadmin/drivers/all": "All Drivers",
    "/superadmin/drivers/store": "Store Drivers",
    "/superadmin/drivers/shroom": "Shroom Express Drivers",
    "/superadmin/drivers/in-house": "In-house Drivers",
    "/superadmin/drivers/resume": "Registered Drivers",
    "/superadmin/orders": "Orders & Deliveries",
    "/superadmin/customers": "Customers",
    "/superadmin/marketing": "Marketing",
    "/superadmin/finances": "Finances",
    "/superadmin/analytics": "Analytics",
    "/superadmin/audit-logs": "Audit Logs",
    "/superadmin/settings": "Settings",
    "/superadmin/support": "Support",
};

const getDisplayTitle = (pathname) => {
    return routeTitleMap[pathname] || "Super Admin Control";
};

const Header = (
    //     { user = {
    //     fullName: "Portrider Admin",
    //     role: "Super Admin",
    //     avatar: null,
    // }, }
) => {
    const location = useLocation();
    const pathname = location.pathname;
    const displayTitle = getDisplayTitle(pathname);
    // const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        document.title = `${displayTitle} | shroom express`;
    }, [displayTitle]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-[65px] bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-30 shadow-[0_4px_12px_rgba(30,41,59,0.02)]">
            {/* Search Bar - Exactly as Image */}
            <div className="flex-1 max-w-[500px]">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon icon="mdi:magnify" width="22" className="text-[#94A3B8] transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full bg-[#F8F8F8]  rounded-2xl py-2.5 pl-12 pr-4 text-sm placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#E93E2B]/10 focus:border-[#E93E2B] focus:bg-white transition-all"
                        placeholder="Global search for orders, stores, users..."
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 ml-8">
                {/* Notifications - Exactly as Image */}
                <button className="relative p-2.5 rounded-xl border-none transition-all group">
                    <Icon icon="solar:bell-linear" width="22" className="text-[#181211] transition-colors" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#E93E2B] rounded-full ring-2 ring-white"></span>
                </button>

                {/* User Profile Dropdown */}
                {/* <div className="relative pl-6 border-l border-[#E2E8F0]" ref={dropdownRef}>
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-3 hover:bg-[#F8FAFC] p-1.5 rounded-xl transition-all"
                    >
                        <div className="text-right hidden sm:block font-manrope">
                            <p className="text-sm font-bold text-[#1E293B]">{user.fullName}</p>
                            <p className="text-[11px] font-medium text-[#64748B]">{user.role}</p>
                        </div>
                        {user.avatar ? (
                            <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover shadow-sm" alt="" />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E93E2B] to-[#ff7b6b] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#E93E2B]/20">
                                PA
                            </div>
                        )}
                        <ChevronDown className="w-4 h-4 text-[#64748B]" />
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-[#F1F5F9] rounded-xl shadow-xl py-2 z-50 overflow-hidden transform origin-top-right transition-all">
                            <div className="px-4 py-2 border-b border-[#F1F5F9] mb-1">
                                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Account Control</p>
                            </div>
                            <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#1E293B] hover:bg-[#FEF0EE] hover:text-[#E93E2B] transition-colors flex items-center gap-2">
                                <Icon icon="lucide:user" width="18" />
                                My Profile
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#1E293B] hover:bg-[#FEF0EE] hover:text-[#E93E2B] transition-colors flex items-center gap-2">
                                <Icon icon="lucide:settings" width="18" />
                                Account Settings
                            </button>
                            <div className="h-px bg-[#F1F5F9] my-1"></div>
                            <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2">
                                <Icon icon="lucide:log-out" width="18" />
                                Log Out
                            </button>
                        </div>
                    )}
                </div> */}
            </div>
        </header>
    );
};

export default Header;
