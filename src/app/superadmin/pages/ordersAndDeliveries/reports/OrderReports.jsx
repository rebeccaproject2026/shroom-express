import { useState } from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import DatePickerMap from "../../../components/DatePickerMap";
import OverviewTab from "./details/tabs/OverviewTab";
import RevenueTab from "./details/tabs/RevenueTab";
import DeliveryTab from "./details/tabs/DeliveryTab";
import StorePerformanceTab from "./details/tabs/StorePerformanceTab";
import DriverReportTab from "./details/tabs/DriverReportTab";
import ProductsTab from "./details/tabs/ProductsTab";

/* ─────────────────────────────────────────────
   Tabs configuration
   ───────────────────────────────────────────── */
const TABS = [
    { key: "Overview", label: "Overview" },
    { key: "Revenue", label: "Revenue" },
    { key: "Delivery", label: "Delivery" },
    { key: "Store Performance", label: "Store Performance" },
    { key: "Driver Report", label: "Driver Report" },
    { key: "Products", label: "Products" },
];

/* ─────────────────────────────────────────────
   Stat Card  (matches ActiveStoreView metric card style)
   ───────────────────────────────────────────── */
const StatCard = ({ label, value, trend, isPositive }) => (
    <div className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-sm transition-all hover:shadow-md cursor-default">
        <div className="space-y-4">
            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{label}</p>
            <h3 className="text-2xl mb-2 font-semibold text-[#181211] leading-none">{value}</h3>
            <div className={`flex items-center gap-2 text-[13px] font-semibold ${isPositive ? "text-[#219653]" : "text-[#EA3D2A]"}`}>
                <Icon icon={isPositive ? "lucide:trending-up" : "lucide:trending-down"} width="16" className="shrink-0" />
                <span>{trend} vs last month</span>
            </div>
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */
const OrderReports = () => {
    const [activeTab, setActiveTab] = useState("Overview");

    const statCards = [
        { label: "Total Revenue", value: "$108.4k", trend: "23%", isPositive: true },
        { label: "Total Orders", value: "2,578", trend: "22%", isPositive: true },
        { label: "Platform Commission", value: "$13.0k", trend: "12%", isPositive: true },
        { label: "Avg Order Value", value: "$42.05", trend: "10%", isPositive: true },
        { label: "Cancellation Rate", value: "4.0%", trend: "0.8%", isPositive: false },
        { label: "On-time Rate", value: "97%", trend: "1.4%", isPositive: true },
    ];

    const renderTab = () => {
        switch (activeTab) {
            case "Overview": return <OverviewTab />;
            case "Revenue": return <RevenueTab />;
            case "Delivery": return <DeliveryTab />;
            case "Store Performance": return <StorePerformanceTab />;
            case "Driver Report": return <DriverReportTab />;
            case "Products": return <ProductsTab />;
            default: return <OverviewTab />;
        }
    };

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* ── Header / Breadcrumbs Section (identical to StoreDetails) ── */}
            <div className="flex flex-col gap-2 mb-3.5">
                <Breadcrumbs
                    items={[
                        { label: "Dashboard", path: "/superadmin/dashboard" },
                        { label: "Order Reports" },
                    ]}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Page title block */}
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Order Reports</h1>
                        <p className="text-[#475569] font-medium text-sm"> Comprehensive analytics across revenue, delivery, stores, drivers, and products.</p>
                    </div>
                    {/* Period Dropdown - shared DatePickerMap */}
                    <div className="flex items-center shrink-0 self-start lg:self-center">
                        <DatePickerMap defaultItem={5} onUpdate={(range) => console.log("OrderReports date range:", range)} />
                    </div>
                </div>
            </div>

            {/* ── Stat Cards (ActiveStoreView pattern) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((card) => (
                    <StatCard key={card.label} {...card} />
                ))}
            </div>

            {/* ── Main Tab Card (ActiveStoreView pattern) ─ */}
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
        </div>
    );
};

export default OrderReports;
