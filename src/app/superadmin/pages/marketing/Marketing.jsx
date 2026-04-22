import { useState } from "react";
import { Icon } from "@iconify/react";
import OverviewTab from "./details/tabs/OverviewTab";
import CampaignsTab from "./details/tabs/CampaignsTab";
import PromoCodesTab from "./details/tabs/PromoCodesTab";
import SegmentsTab from "./details/tabs/SegmentsTab";
import Breadcrumbs from "../../components/common/Breadcrumbs";

import MarketingModal from "./details/CreateCampaignModal";
import PromoModal from "./details/CreatePromoModal";

/* ─────────────────────────────────────────────
   Tabs configuration
   ───────────────────────────────────────────── */
const TABS = [
    { key: "Overview", label: "Overview" },
    { key: "Campaigns", label: "Campaigns" },
    { key: "Promo Codes", label: "Promo Codes" },
    { key: "Segments", label: "Segments" },
];

/* ─────────────────────────────────────────────
   Stat Card (Matches OrderReports / ActiveStoreView pattern)
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

const Marketing = () => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

    const statCards = [
        { label: "Active Campaigns", value: "4", subText: "7 total", hideTrend: true, borderColor: "border-[#0066FF]" },
        { label: "Campaign Revenue", value: "$18.6k", trend: "18%", subText: "vs last month", isPositive: true, borderColor: "border-[#219653]" },
        { label: "Avg Open Rate", value: "74.4%", subText: "Industry avg: 21%", hideTrend: true, borderColor: "border-[#219653]" },
        { label: "Avg Click Rate", value: "31.8%", subText: "Industry avg: 2.3%", hideTrend: true, borderColor: "border-[#219653]" },
        { label: "Active Promo Codes", value: "5", subText: "772 total uses", hideTrend: true, borderColor: "border-[#0066FF]" },
        { label: "Total Promo Revenue", value: "$31.0k", subText: "From discount codes", hideTrend: true, borderColor: "border-[#0066FF]" },
    ];

    const renderTab = () => {
        switch (activeTab) {
            case "Overview": return <OverviewTab />;
            case "Campaigns": return <CampaignsTab />;
            case "Promo Codes": return <PromoCodesTab />;
            case "Segments": return <SegmentsTab />;
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
                        { label: "Marketing Hub" },
                    ]}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Marketing Hub</h1>
                        <p className="text-[#475569] font-medium text-sm">Manage campaigns, promo codes, customer segments, and push notifications all in one place.</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#EA3D2A] text-white px-4 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group"
                        >
                            <Icon icon="nimbus:marketing" width="20" />
                            New Campaign
                        </button>
                        <button
                            onClick={() => setIsPromoModalOpen(true)}
                            className="bg-white text-[#181211] border-2 border-[#E2E8F0] px-4 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide hover:bg-gray-50 transition-all flex items-center gap-2 active:scale-95"
                        >
                            <Icon icon="mdi:tag-outline" width="20" />
                            New Promo
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((card, idx) => (
                    <StatCard key={idx} {...card} />
                ))}
            </div>

            {/* ── Main Tab Card ── */}
            <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex items-center border-b border-[#E2E8F0] gap-8 px-6 overflow-x-auto hide-scrollbar shrink-0 bg-white">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative pt-5 pb-4 text-[15px] font-semibold transition-all whitespace-nowrap ${activeTab === tab.key
                                ? "text-[#EA3D2A]"
                                : "text-[#181211] hover:text-[#EA3D2A]"
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {renderTab()}
                </div>
            </div>

            {/* ── Create Campaign Modal ── */}
            <MarketingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* ── Create Promo Modal ── */}
            <PromoModal
                isOpen={isPromoModalOpen}
                onClose={() => setIsPromoModalOpen(false)}
            />
        </div>
    );
};

export default Marketing;
