import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
// Tab Imports
import GeneralTab from "./tabs/GeneralTab";
import NotificationsTab from "./tabs/NotificationsTab";
import DeliveryTab from "./tabs/DeliveryTab";
import SecurityTab from "./tabs/SecurityTab";
import AdminUsersTab from "./tabs/AdminUsersTab";
import IntegrationsTab from "./tabs/IntegrationsTab";

const TABS = [
    { key: "General", label: "General" },
    { key: "Notifications", label: "Notifications" },
    { key: "Delivery", label: "Delivery" },
    { key: "Security", label: "Security" },
    { key: "Integrations", label: "Integrations" },
    { key: "AdminUsers", label: "Admin Users" },
];

const Settings = () => {
    const [activeTab, setActiveTab] = useState("General");

    const renderTabContent = () => {
        switch (activeTab) {
            case "General": return <GeneralTab />;
            case "Notifications": return <NotificationsTab />;
            case "Delivery": return <DeliveryTab />;
            case "Security": return <SecurityTab />;
            case "Integrations": return <IntegrationsTab />;
            case "AdminUsers": return <AdminUsersTab />;
            default: return <div className="p-20 text-center text-gray-500 font-medium">{activeTab} Settings Content</div>;
        }
    };

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* ── Header / Breadcrumbs Section ── */}
            <div className="flex flex-col gap-2 mb-3.5">
                <Breadcrumbs
                    items={[
                        { label: "Dashboard", path: "/superadmin/dashboard" },
                        { label: "Settings" },
                    ]}
                />

                <div className="space-y-1">
                    <h1 className="text-lg font-bold text-[#181211]">Settings</h1>
                    <p className="text-[#475569] font-medium text-sm max-w-4xl">Manage admin users, integrations, notifications, security, delivery, and billing settings</p>
                </div>
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

                <div className="min-h-[400px]">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default Settings;
