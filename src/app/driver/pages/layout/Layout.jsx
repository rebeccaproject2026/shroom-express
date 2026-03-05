import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import DashboardHeader from "../../components/DashboardHeader.jsx";
import BottomNavigation from "../../components/BottomNavigation.jsx";
import MobileMenuDrawer from "../../components/MobileMenuDrawer.jsx";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // let user = true;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar - always visible on lg (1024px) and above */}
      <div className="hidden lg:block shrink-0">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </div>

      {/* Tablet Sidebar Overlay - only shows when hamburger is clicked (sm to lg) */}
      {sidebar && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebar(false)}
          />
          <div className="absolute left-0 top-0 h-screen">
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
        <DashboardHeader
          sidebar={sidebar}
          setSidebar={setSidebar}
          userName="Akash"
        />

        {/* Page content: add bottom padding on mobile for bottom nav */}
        <div className="flex-1 min-w-0 min-h-0 bg-[#F2F2F2] overflow-x-hidden flex flex-col pb-16 sm:pb-0">
          <Outlet />
        </div>
      </div>

      {/* Bottom Navigation - only visible below 640px (sm breakpoint) */}
      <BottomNavigation 
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        isMenuOpen={mobileMenuOpen}
        onNavItemClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </div>
  );
};

export default Layout;
