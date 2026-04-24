import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../components/common/Breadcrumbs";

// Tab Imports
import TicketsTab from "./tabs/TicketsTab";

const TABS = [
    { key: "Tickets", label: "Tickets" },
    { key: "FAQ", label: "FAQ & Help Center" },
    { key: "Contact", label: "Contact Support" },
];

const StatCard = ({ label, value, borderColor }) => (
    <div className={`bg-white p-3 rounded-lg border border-t-[5px] ${borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}>
        <div className="space-y-4">
            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{label}</p>
            <h3 className="text-2xl font-semibold text-[#181211] leading-none mb-2">{value}</h3>
        </div>
    </div >
);

const Support = () => {
    const [activeTab, setActiveTab] = useState("Tickets");

    const statCards = [
        { label: "Open Tickets", value: "3", borderColor: "border-[#219653]" },
        { label: "In Progress", value: "2", borderColor: "border-[#0066FF]" },
        { label: "Resolved Today", value: "2", borderColor: "border-[#EA3D2A]" },
        { label: "Critical Issues", value: "1", borderColor: "border-[#EA3D2A]" },
        { label: "Avg Response Time", value: "42 min", borderColor: "border-[#F2994A]" },
        { label: "CSAT Score", value: "4.6/5", borderColor: "border-[#219653]" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "Tickets": return <TicketsTab />;
            case "FAQ": return <div className="text-center py-20 text-gray-500 font-medium">FAQ & Help Center Content</div>;
            case "Contact": return <div className="text-center py-20 text-gray-500 font-medium">Contact Support Content</div>;
            default: return <TicketsTab />;
        }
    };

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* ── Header / Breadcrumbs Section ── */}
            <div className="flex flex-col gap-2 mb-3.5">
                <Breadcrumbs
                    items={[
                        { label: "Dashboard", path: "/superadmin/dashboard" },
                        { label: "Support" },
                    ]}
                />

                <div className="space-y-1">
                    <h1 className="text-lg font-bold text-[#181211]">Support Center</h1>
                    <p className="text-[#475569] font-medium text-sm max-w-4xl">Manage support tickets from customers, drivers, and stores. Resolve issues and track SLAs.</p>
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

export default Support;
