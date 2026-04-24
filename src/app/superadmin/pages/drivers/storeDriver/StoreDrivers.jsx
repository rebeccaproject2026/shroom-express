import React from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Link } from "react-router-dom";
import StoreDriverTable from "../../../components/drivers/StoreDriverTable";

const StoreDrivers = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Drivers" }
    ];

    const stats = [
        {
            label: "Active",
            value: "8",
            borderColor: "border-[#219653]",
            bgColor: "bg-[#E0FFED]",
            textColor: "text-[#219653]",
            sub: "On platform"
        },
        {
            label: "Inactive",
            value: "5",
            borderColor: "border-[#475569]",
            bgColor: "bg-[#F8F8F8]",
            textColor: "text-[#181211]",
            sub: "Off shift"
        },
        {
            label: "Suspended",
            value: "2",
            borderColor: "border-[#EA3D2A]",
            bgColor: "bg-[#FFEDEB]",
            textColor: "text-[#EA3D2A]",
            sub: "Flagged"
        },
        {
            label: "Total Orders",
            value: "440",
            borderColor: "border-[#475569]",
            bgColor: "bg-[#F8F8F8]",
            textColor: "text-[#181211]",
            sub: "All time"
        },
        {
            label: "Avg Rating",
            value: "4.5",
            borderColor: "border-[#F2994A]",
            bgColor: "bg-[#FFF7E8]",
            textColor: "text-[#FF9F40]",
            sub: "/ 5.0"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-manrope">
            {/* Breadcrumbs & Header Section */}
            <div className="flex flex-col gap-2">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Store Drivers</h1>
                        <p className="text-[#475569] font-medium text-sm">Drivers employed by individual partner stores. Operate within store delivery zones.</p>
                    </div>
                    <Link to="/superadmin/drivers/add" className="bg-[#EA3D2A] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 shrink-0">
                        <Icon icon="lucide:plus" width="20" />
                        Add Driver
                    </Link>
                </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`p-3 rounded-md border ${stat.borderColor} ${stat.bgColor} shadow-sm hover:shadow-md transition-all cursor-default`}>
                        <div className="space-y-1.5">
                            <p className="text-[#181211] text-sm font-medium tracking-wide mb-1.5">{stat.label}</p>
                            <h3 className={`text-2xl font-semibold ${stat.textColor} leading-none mb-1`}>
                                {stat.value}
                            </h3>
                            <p className={`text-xs font-semibold text-[#94A3B8]`}>{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Data Table */}
            <StoreDriverTable />
        </div>
    );
};

export default StoreDrivers;
