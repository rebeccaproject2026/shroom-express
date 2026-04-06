import React, { useState } from "react";
import { Icon } from "@iconify/react";
import StoreDetailsContent from "./tabs/shared/StoreDetailsContent";
import OperationsContent from "./tabs/shared/OperationsContent";
import DocumentsContent from "./tabs/shared/DocumentsContent";
import NotesContent from "./tabs/shared/NotesContent";
import TimelineContent from "./tabs/shared/TimelineContent";

const PendingStoreView = ({ store }) => {
    const [activeTab, setActiveTab] = useState("Store Details");

    const tabs = [
        "Store Details",
        "Operations",
        "Documents",
        "Notes (2)",
        "Timeline"
    ];

    return (
        <div className="space-y-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">

            {/* Review Warning Banner (Not inside the card) */}
            <div className="bg-[#FFF7E8] border border-[#FFF7E8] rounded-md p-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-all">
                <p className="text-[14.5px] text-[#F2994A] font-semibold pl-2">
                    This store is pending your review. Check all Sections, then approve or decline.
                </p>
                <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-[#FDE6D2] text-[#F2994A] text-xs font-bold shadow-sm">
                    <Icon icon="material-symbols:timer-outline" width="16" />
                    Waiting {store.waitingDays} days
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden">
                {/* Tabs Navigation (Inside the card) */}
                <div className="flex items-center border-b border-[#E2E8F0]  gap-8 px-6 overflow-x-auto hide-scrollbar shrink-0 bg-white">
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
                    {activeTab === "Store Details" && <StoreDetailsContent />}
                    {activeTab === "Operations" && <OperationsContent />}
                    {activeTab === "Documents" && <DocumentsContent />}
                    {activeTab === "Notes (2)" && <NotesContent />}
                    {activeTab === "Timeline" && <TimelineContent status="Pending" />}
                </div>
            </div>
        </div>
    );
};

export default PendingStoreView;
