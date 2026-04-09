import React, { useState } from "react";
import { Icon } from "@iconify/react";
import OverviewContent from "./tabs/OverviewContent";
import OrdersContent from "./tabs/OrdersContent";
import CatalogContent from "./tabs/CatalogContent";
import PerformanceContent from "./tabs/PerformanceContent";
import ContactsContent from "./tabs/ContactsContent";
import NotesContent from "./tabs/NotesContent";
import ActivityLogContent from "./tabs/ActivityLogContent";

const SupplierDetails = ({ supplier }) => {
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = [
        "Overview",
        "Orders",
        "Catalog",
        "Performance",
        "Contacts",
        "Notes",
        "Activity",
    ];

    const quickStats = [
        { label: "Payment Terms", value: supplier.paymentTerms, icon: null },
        { label: "Lead Time", value: supplier.lead, icon: null },
        { label: "Min Order", value: supplier.minOrder, icon: null },
        { label: "Last Order", value: supplier.lastOrder, icon: null },
        { label: "Pending Orders", value: supplier.pendingOrders, icon: null },
    ];

    return (
        <div className="space-y-6 font-manrope">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {quickStats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-md border border-[#E2E8F0] shadow-sm ">
                        <p className="text-[#475569] text-sm font-medium mb-3">{stat.label}</p>
                        <h3 className="text-[21px] font-semibold text-[#181211] leading-none flex items-baseline gap-1">
                            {typeof stat.value === "string" && stat.value.toLowerCase().includes("business days") ? (
                                <>
                                    {stat.value.replace(/business days/i, "").trim()}
                                    <span className="text-xs font-medium text-[#181211]">business days</span>
                                </>
                            ) : (
                                stat.value
                            )}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Main Content Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-md shadow-sm overflow-hidden">
                {/* Tabs Navigation */}
                <div className="flex items-center border-b border-[#E2E8F0] gap-8 px-6 overflow-x-auto hide-scrollbar shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative pt-5 pb-4 text-[15px] font-semibold transition-all whitespace-nowrap ${activeTab === tab ? "text-[#EA3D2A]" : "text-[#181211] hover:text-[#EA3D2A]"
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
                <div className="p-8">
                    {activeTab === "Overview" && <OverviewContent supplier={supplier} />}
                    {activeTab === "Orders" && <OrdersContent supplier={supplier} />}
                    {activeTab === "Catalog" && <CatalogContent supplier={supplier} />}
                    {activeTab === "Performance" && <PerformanceContent supplier={supplier} />}
                    {activeTab === "Contacts" && <ContactsContent supplier={supplier} />}
                    {activeTab === "Notes" && <NotesContent supplier={supplier} />}
                    {activeTab === "Activity" && <ActivityLogContent supplier={supplier} />}
                    {activeTab !== "Overview" && activeTab !== "Orders" && activeTab !== "Catalog" && activeTab !== "Performance" && activeTab !== "Contacts" && activeTab !== "Notes" && activeTab !== "Activity" && (
                        <div className="py-20 text-center text-[#64748B] font-medium italic">
                            {activeTab} content is under development...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupplierDetails;
