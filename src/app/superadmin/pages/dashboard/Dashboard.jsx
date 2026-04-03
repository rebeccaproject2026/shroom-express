import { Icon } from "@iconify/react";
import StatCards from "../../components/dashboard/StatCards";
import DetailedStats from "../../components/dashboard/DetailedStats";
import OperationsSummary from "../../components/dashboard/OperationsSummary";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import DatePickerMap from "../../components/DatePickerMap";
import UserGrowthSnapshot from "../../components/dashboard/UserGrowthSnapshot";
import AnalyticsBottomGrid from "../../components/dashboard/AnalyticsBottomGrid";

const Dashboard = () => {
    const onDateUpdate = (dateRange) => {
        console.log("Superadmin dashboard date range updated:", dateRange);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 bg-[#F8F8F8] font-manrope">
            {/* Dashboard Header Section - EXACTLY AS IMAGE */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-lg font-semibold text-[#0F172A] tracking-wide leading-none">System Overview</h1>
                    <p className="text-[#64748B] text-sm">Manage your multi-vendor ecosystem and monitor performance metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#EA3D2A] text-white px-4 py-2.5 rounded-[8px] text-[14px] font-semibold tracking-wide  shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group">
                        <Icon icon="mdi:store-plus" width="20" /> Create Store </button>
                    <DatePickerMap defaultItem={5} onUpdate={onDateUpdate} />
                </div>
            </div>

            {/* Top Metric Cards - UPDATED WITH MINI CHARTS */}
            <StatCards />

            <div className="space-y-8">
                {/* Detailed Analytics */}
                <DetailedStats />

                <div className="space-y-6">
                    <h1 className="text-lg font-semibold text-[#0F172A] tracking-wide leading-none">Orders & Operations Summary</h1>
                    {/* Operational Metrics Cards */}
                    <OperationsSummary />
                </div>

                {/* User Growth Analytics */}
                <div className="space-y-6">
                    <h1 className="text-lg font-semibold text-[#0F172A] tracking-wide leading-none">User Growth Snapshot</h1>
                    <UserGrowthSnapshot />
                </div>

                {/* Recent Orders Table */}
                <RecentOrdersTable />

                {/* Performance & Activity Grid */}
                <AnalyticsBottomGrid />
            </div>
        </div>
    );
};

export default Dashboard;
