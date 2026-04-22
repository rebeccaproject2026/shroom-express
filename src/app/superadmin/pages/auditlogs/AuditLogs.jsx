import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../components/common/Breadcrumbs";

// Tab Imports
import OverviewTab from "./details/tabs/OverviewTab";
import StoresTab from "./details/tabs/StoresTab";
import ProductsTab from "./details/tabs/ProductsTab";
import CustomersTab from "./details/tabs/CustomersTab";
import OperationsTab from "./details/tabs/OperationsTab";

const TABS = [
    { key: "Overview", label: "Overview" },
    { key: "Stores", label: "Stores" },
    { key: "Products", label: "Products" },
    { key: "Customers", label: "Customers" },
    { key: "Operations", label: "Operations" },
];

const StatCard = ({ label, value, borderColor }) => (
    <div className={`bg-white p-3 rounded-lg border border-t-[5px] ${borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}>
        <div className="space-y-4">
            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{label}</p>
            <h3 className="text-2xl font-semibold text-[#181211] leading-none mb-2">{value}</h3>
        </div>
    </div >
);

const AuditLogs = () => {
    const [activeTab, setActiveTab] = useState("Overview");

    const statCards = [
        { label: "Total Logs Today", value: "15", borderColor: "border-[#219653]" },
        { label: "Create Actions", value: "3", borderColor: "border-[#0066FF]" },
        { label: "Update Actions", value: "4", borderColor: "border-[#EA3D2A]" },
        { label: "Delete Actions", value: "2", borderColor: "border-[#EA3D2A]" },
        { label: "Logins Today", value: "3", borderColor: "border-[#F2994A]" },
        { label: "System Events", value: "3", borderColor: "border-[#219653]" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "Overview": return <OverviewTab />;
            case "Stores": return <StoresTab />;
            case "Products": return <ProductsTab />;
            case "Customers": return <CustomersTab />;
            case "Operations": return <OperationsTab />;
            default: return <OverviewTab />;
        }
    };

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* ── Header / Breadcrumbs Section ── */}
            <div className="flex flex-col gap-2 mb-3.5">
                <Breadcrumbs
                    items={[
                        { label: "Dashboard", path: "/superadmin/dashboard" },
                        { label: "Audit Logs" },
                    ]}
                />

                <div className="space-y-1">
                    <h1 className="text-lg font-bold text-[#181211]">Audit Logs</h1>
                    <p className="text-[#475569] font-medium text-sm max-w-4xl">Complete trail of all admin actions, system events, driver logins, and API access across ShroomExpress.</p>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((card, idx) => (
                    <StatCard key={idx} {...card} />
                ))}
            </div>

            {/* Tabs & Content */}
            <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="flex items-center border-b border-[#E2E8F0] gap-8 px-6 overflow-x-auto hide-scrollbar bg-white">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative pt-5 pb-4 text-[15px] font-semibold transition-all whitespace-nowrap ${activeTab === tab.key ? "text-[#EA3D2A]" : "text-[#181211] hover:text-[#EA3D2A]"}`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
                <div className="p-6" key={activeTab}>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
