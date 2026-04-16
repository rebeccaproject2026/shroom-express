import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { CUSTOMERS_DATA } from "../../../data/customersData";
import ProfileTab from "./tabs/ProfileTab";
import OrdersTab from "./tabs/OrdersTab";
import SpendTab from "./tabs/SpendTab";
import NotesTab from "./tabs/NotesTab";

const CustomerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Profile");

    // Find customer dynamically
    const customer = CUSTOMERS_DATA.find(c => c.id.replace('#', '') === id) || CUSTOMERS_DATA[1];

    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Customers", path: "/superadmin/customers" },
        { label: customer.id }
    ];

    const metrics = [
        { label: "Orders", value: customer.orders || "0" },
        { label: "Total Spent", value: customer.totalSpent || "$0" },
        { label: "Avg Order", value: customer.avgOrder || "$0" },
        { label: "Last Order", value: customer.lastOrderDate || "N/A" },
    ];

    const tabs = [
        "Profile",
        `Orders(${customer.orders || 0})`,
        "Spend",
        "Notes (2)"
    ];

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500 pb-10">
            {/* Header Section */}
            <div className="flex flex-col gap-2 mb-3.5">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all">
                    {/* Customer Info Profile */}
                    <div className="flex items-start gap-2">
                        <div className="w-18 h-18 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center shrink-0">
                            <span className="text-[24px] font-bold text-[#181211]">{customer.initials}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h1 className="text-xl font-semibold text-[#181211]">{customer.name}</h1>
                                <span className="flex items-center gap-1 px-3 py-1 bg-[#ECFDF5] border border-[#10B981] rounded-full text-[#10B981] text-xs font-semibold">
                                    <Icon icon="charm:tick" width="14" />
                                    Active
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-1 text-sm text-[#475569] font-regular mb-0.5">
                                <span className="text-[#475569] font-regular">{customer.id} • Joined {customer.joinedDate}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[13px] text-[#475569] font-medium">
                                <a href={`mailto:${customer.email}`} className="flex items-center gap-1 hover:text-[#EA3D2A] transition-colors leading-none">
                                    <Icon icon="carbon:email" width="14" /> {customer.email}
                                </a>
                                <span className="text-[#94A3B8]">|</span>
                                <span className="flex items-center gap-1 leading-none">
                                    <Icon icon="stash:pin-place-duotone" width="14" /> {customer.location}
                                </span>
                                <span className="text-[#94A3B8]">|</span>
                                <span className="flex items-center gap-1 leading-none">
                                    <Icon icon="proicons:call" width="14" /> {customer.phone}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
                        <button className="flex items-center gap-2 px-5 py-2 border border-[#475569] text-[#181211] rounded-lg text-[14.5px] font-bold bg-white transition-all hover:bg-gray-50 active:scale-95 shadow-sm">
                            <Icon icon="iconamoon:edit-thin" width="18" strokeWidth={1.5} />
                            Edit Info
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2 border border-[#EA3D2A] text-[#EA3D2A] rounded-lg text-[14.5px] font-bold bg-white transition-all hover:bg-[#FFEDEB] active:scale-95 shadow-sm">
                            <Icon icon="lucide:ban" width="18" />
                            Block
                        </button>
                    </div>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-sm transition-all hover:shadow-md cursor-default">
                        <div className="space-y-4">
                            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{metric.label}</p>
                            <h3 className="text-2xl font-semibold text-[#181211] leading-none">{metric.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[500px]">
                {/* Tabs Navigation */}
                <div className="flex items-center border-b border-[#E2E8F0] gap-8 px-6 overflow-x-auto hide-scrollbar shrink-0 bg-white">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.split('(')[0])}
                            className={`relative pt-5 pb-4 text-[15px] font-semibold transition-all whitespace-nowrap ${activeTab === tab.split('(')[0]
                                ? "text-[#EA3D2A]"
                                : "text-[#181211] hover:text-[#EA3D2A]"
                                }`}
                        >
                            {tab}
                            {activeTab === tab.split('(')[0] && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === "Profile" && <ProfileTab customer={customer} />}
                    {activeTab === "Orders" && <OrdersTab />}
                    {activeTab === "Spend" && <SpendTab />}
                    {activeTab === "Notes" && <NotesTab />}
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
