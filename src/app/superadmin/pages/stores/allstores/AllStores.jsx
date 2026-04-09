import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import StoreTable from "../../../components/stores/StoreTable";
import Breadcrumbs from "../../../components/common/Breadcrumbs";


const AllStores = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Stores" }
    ];
    const stats = [
        {
            label: "Total Stores",
            value: "1,284",
            description: "Overall registered",
            icon: "lucide:trending-up",
            color: "text-[#0066FF]",
            bg: "bg-[#0066FF]"
        },
        {
            label: "Active Stores",
            value: "952",
            description: "4.2% this month",
            icon: "lucide:trending-up",
            color: "text-[#219653]",
            bg: "bg-[#219653]"
        },
        {
            label: "Pending Approval",
            value: "48",
            description: "Awaiting review",
            icon: "lucide:trending-up",
            color: "text-[#FF9F40]",
            bg: "bg-[#FF9F40]"
        },
        {
            label: "In-Active Stores",
            value: "4",
            description: "Needs attention",
            icon: "lucide:trending-up",
            color: "text-[#EA3D2A]",
            bg: "bg-[#EA3D2A]"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-manrope">
            {/* Breadcrumbs & Header Section */}
            <div className="flex flex-col gap-2">
                {/* Breadcrumbs */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Header Title & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">All Stores</h1>
                        <p className="text-[#475569] font-medium text-sm">Manage and monitor all vendor stores in your network.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/superadmin/stores/add" className="bg-[#EA3D2A] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group">
                            <Icon icon="mdi:store-plus" width="20" />
                            Create Store
                        </Link>
                        <div className="relative group">
                            <button className="bg-white border border-[#E2E8F0] text-[#181211] px-4 py-2.5 rounded-[8px] text-[14px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                                <Icon icon="lucide:calendar" width="18" className="text-[#64748B]" />
                                Last Month
                                <Icon icon="lucide:chevron-down" width="16" className="text-[#94A3B8]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all cursor-default">
                        <div className="space-y-4">
                            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{stat.label}</p>
                            <h3 className="text-2xl font-semibold text-[#181211] leading-none">{stat.value}</h3>
                            <div className={`flex items-center gap-2 ${stat.color} text-[13px] font-semibold`}>
                                <Icon icon={stat.icon} width="16" className="shrink-0" />
                                <span>{stat.description}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Data Table */}
            <StoreTable />
        </div>

    );
};

export default AllStores;
