import React, { useState } from "react";
import { Icon } from "@iconify/react";
import SuspensionDetailsContent from "./tabs/suspended/SuspensionDetailsContent";
import TimelineContent from "./tabs/shared/TimelineContent";
import RecentOrdersContent from "./tabs/active/RecentOrdersContent";
import NotesContent from "./tabs/shared/NotesContent";

const SuspendedStoreView = () => {
    const [activeTab, setActiveTab] = useState("Suspension Details");

    const tabs = [
        "Suspension Details",
        "Violation (2)",
        "Stats & Performance",
        "Recent Orders",
        "Notes (2)",
        "Timeline"
    ];

    const metrics = [
        {
            label: "Revenue (Paused)",
            value: "$8,400",
            sub: "Last active month",
            bg: "bg-white"
        },
        {
            label: "Total Orders",
            value: "187",
            sub: "Before suspension",
            bg: "bg-white"
        },
        {
            label: "Affected Orders",
            value: "2",
            sub: "Refunded at suspension",
            bg: "bg-[#FFF5F5]",
            textColor: "text-[#EA3D2A]"
        },
        {
            label: "Suspended",
            value: "0d 14h",
            sub: "Since Mar 06 2:00 PM",
            bg: "bg-[#FFF7E8]",
            textColor: "text-[#F2994A]"
        },
        {
            label: "Suspension Ends",
            value: "Mar 13",
            sub: "4 days remaining",
            bg: "bg-white",
            textColor: "text-[#F2994A]"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Suspended Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 opacity-60">
                {metrics.map((metric, idx) => (
                    <div key={idx} className={`${metric.bg} p-3 rounded-lg border border-[#E2E8F0] shadow-sm transition-all hover:shadow-md cursor-default`}>
                        <div className="space-y-1.5">
                            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{metric.label}</p>
                            <h3 className={`text-2xl font-semibold  ${metric.textColor || 'text-[#181211]'} leading-none`}>
                                {metric.value}
                            </h3>
                            <p className="text-xs font-medium text-[#64748B] opacity-80 pt-0.5">
                                {metric.sub}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Tabs Container */}
            <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden">
                {/* Tabs Navigation */}
                <div className="flex items-center border-b border-[#E2E8F0] gap-8 px-6 overflow-x-auto hide-scrollbar shrink-0 bg-white">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative pt-5 pb-4 text-[15px] font-semibold transition-all whitespace-nowrap ${activeTab === tab
                                ? "text-[#EA3D2A]"
                                : "text-[#181211] hover:text-[#EA3D2A]"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content Display */}
                <div className="p-6">
                    {activeTab === "Suspension Details" && <SuspensionDetailsContent />}
                    {activeTab === "Violation (2)" && (
                        <div className="p-10 text-center text-[#64748B] font-bold text-sm">
                            <Icon icon="lucide:file-text" className="mx-auto mb-2 opacity-20" width="48" />
                            Policy Violation Logs (2)
                        </div>
                    )}
                    {activeTab === "Stats & Performance" && (
                        <div className="p-10 text-center text-[#64748B] font-bold text-sm">
                            Performance data is currently paused.
                        </div>
                    )}
                    {activeTab === "Recent Orders" && <RecentOrdersContent />}
                    {activeTab === "Notes (2)" && <NotesContent />}
                    {activeTab === "Timeline" && <TimelineContent status="Suspended" />}
                </div>
            </div>
        </div>
    );
};

export default SuspendedStoreView;
