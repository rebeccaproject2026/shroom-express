import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DatePickerMap from "../../components/DatePickerMap";

// Tab Imports
import OverviewTab from "./details/tabs/OverviewTab";
import StoresTab from "./details/tabs/StoresTab";
import ProductsTab from "./details/tabs/ProductsTab";
import CustomersTab from "./details/tabs/CustomersTab";
import OperationsTab from "./details/tabs/OperationsTab";

/* ─────────────────────────────────────────────
   Tabs configuration
   ───────────────────────────────────────────── */
const TABS = [
    { key: "Overview", label: "Overview" },
    { key: "Stores", label: "Stores" },
    { key: "Products", label: "Products" },
    { key: "Customers", label: "Customers" },
    { key: "Operations", label: "Operations" },
];

/* ─────────────────────────────────────────────
   Stat Card (Matches Marketing / OrderReports pattern)
   ───────────────────────────────────────────── */
const StatCard = ({ label, value, subText, trend, isPositive, borderColor, hideTrend = false }) => (
    <div className={`bg-white p-3 rounded-lg border border-t-[5px] ${borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}>
        <div className="space-y-4">
            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{label}</p>
            <h3 className="text-2xl mb-2 font-semibold text-[#181211] leading-none">{value}</h3>
            <div className="flex items-center gap-2">
                {!hideTrend && trend && (
                    <div className={`flex items-center gap-1 text-[13px] font-semibold ${isPositive ? "text-[#219653]" : "text-[#EA3D2A]"}`}>
                        <Icon icon={isPositive ? "lucide:trending-up" : "lucide:trending-down"} width="16" className="shrink-0" />
                        <span>{trend}</span>
                    </div>
                )}
                <span className="text-[#64748B] text-[13px] font-medium">{subText}</span>
            </div>
        </div>
    </div >
);

const Analytics = () => {
    const [activeTab, setActiveTab] = useState("Overview");

    const statCards = [
        { label: "Total Revenue", value: "$82.4k", trend: "15.7%", subText: "vs last month", isPositive: true, borderColor: "border-[#219653]" },
        { label: "Total Orders", value: "436", trend: "15.3%", subText: "vs last month", isPositive: true, borderColor: "border-[#0066FF]" },
        { label: "Active Customers", value: "150", trend: "27%", subText: "new this month", isPositive: true, borderColor: "border-[#EA3D2A]" },
        { label: "Active Drivers", value: "15", subText: "2 added this month", hideTrend: true, borderColor: "border-[#EA3D2A]" },
        { label: "Avg Order Value", value: "$48.76", trend: "4.2%", subText: "vs last month", isPositive: true, borderColor: "border-[#F2994A]" },
        { label: "On-Time Rate", value: "94.2%", subText: "Platform fleet average", hideTrend: true, borderColor: "border-[#219653]" },
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
                        { label: "Analytics" },
                    ]}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Analytics</h1>
                        <p className="text-[#475569] font-medium text-sm">Platform-wide performance metrics — revenue, orders, customers, stores and operations.</p>
                    </div>

                    <div className="flex items-center">
                        <DatePickerMap defaultItem={5} onUpdate={(range) => console.log("Analytics range:", range)} />
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#475569] rounded-md text-sm font-semibold  transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4 border border-[#E2E8F0]/50">
                            <Icon icon="bytesize:export" width="16" />
                            Export CSV
                        </button>
                    </div>
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

export default Analytics;
