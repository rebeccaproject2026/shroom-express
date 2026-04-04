import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

const Layout = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
            {/* Sidebar */}
            <div className="shrink-0 hidden lg:block">
                <Sidebar />
            </div>

            {/* Main Application Area */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto px-6 py-6 bg-[#F8F8F8] hide-scrollbar scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
