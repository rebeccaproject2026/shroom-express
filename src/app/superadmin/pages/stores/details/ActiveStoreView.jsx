import React, { useState } from "react";
import { Icon } from "@iconify/react";
import StoreDetailsContent from "./tabs/shared/StoreDetailsContent";
import OperationsContent from "./tabs/shared/OperationsContent";
import DocumentsContent from "./tabs/shared/DocumentsContent";
import NotesContent from "./tabs/shared/NotesContent";
import TimelineContent from "./tabs/shared/TimelineContent";
import OverviewStatsContent from "./tabs/active/OverviewStatsContent";
import RecentOrdersContent from "./tabs/active/RecentOrdersContent";

const ActiveStoreView = ({ store }) => {
    const [activeTab, setActiveTab] = useState("Overview & Stats");

    const tabs = [
        "Overview & Stats",
        "Store Details",
        "Operations",
        "Recent Orders",
        "Documents",
        "Notes (2)",
        "Timeline"
    ];

    const metrics = [
        {
            label: "Monthly Revenue",
            value: "$8,400",
            trend: "+32% vs last month",
            trendUp: true
        },
        {
            label: "Total Orders",
            value: "187",
            trend: "+18% this week",
            trendUp: true
        },
        {
            label: "Avg Order Value",
            value: "$44.90",
            trend: "-3% vs last week",
            trendUp: false
        },
        {
            label: "Customer Rating",
            value: "4.7",
            trend: "Based on 94 reviews",
            trendUp: true
        },
        {
            label: "Active Since",
            value: "2 Months",
            trend: `Approved ${store.approvedDate}`,
            isStatic: true
        }
    ];

    return (
        <div className="space-y-6">
            {/* Metric Cards Row (Matching AllStores style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {metrics.map((metric, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-sm transition-all hover:shadow-md cursor-default">
                        <div className="space-y-4">
                            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{metric.label}</p>
                            <div className="flex items-center gap-1.5">
                                <h3 className="text-2xl font-semibold text-[#181211] leading-none">{metric.value}</h3>
                                {metric.isRating && <Icon icon="material-symbols:star-rounded" className="text-[#F2994A]" width="22" />}
                            </div>
                            <div className={`flex items-center gap-2 text-[13px] font-semibold ${metric.isStatic || metric.isRating ? 'text-[#94A3B8]' :
                                metric.trendUp ? 'text-[#219653]' : 'text-[#EA3D2A]'
                                }`}>
                                {!metric.isStatic && !metric.isRating && (
                                    <Icon icon={metric.trendUp ? "lucide:trending-up" : "lucide:trending-down"} width="16" className="shrink-0" />
                                )}
                                <span>{metric.trend}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Card (Matching PendingStoreView style) */}
            <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden">
                {/* Tabs Navigation (Inside the card) */}
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

                {/* Tab content Padding */}
                <div className="p-6">
                    {activeTab === "Overview & Stats" && <OverviewStatsContent />}
                    {activeTab === "Store Details" && <StoreDetailsContent />}
                    {activeTab === "Operations" && <OperationsContent />}
                    {activeTab === "Documents" && <DocumentsContent />}
                    {activeTab === "Notes (2)" && <NotesContent />}
                    {activeTab === "Timeline" && <TimelineContent status="Active" />}
                    {activeTab === "Recent Orders" && <RecentOrdersContent />}
                </div>
            </div>
        </div>
    );
};

export default ActiveStoreView;
