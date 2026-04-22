import React from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { Link } from "react-router-dom";
import DriverTable from "../../components/drivers/DriverTable";

const Drivers = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Drivers" }
    ];

    const stats = [
        {
            label: "Total Drivers",
            value: "12,482",
            borderColor: "border-[#475569]",
            bgColor: "bg-[#F8F8F8]",
            textColor: "text-[#181211]"
        },
        {
            label: "Active",
            value: "5,933",
            borderColor: "border-[#219653]",
            bgColor: "bg-[#E0FFED]",
            textColor: "text-[#219653]"
        },
        {
            label: "On Delivery Now",
            value: "6,513",
            borderColor: "border-[#0066FF]",
            bgColor: "bg-[#F6FBFF]",
            textColor: "text-[#0066FF]"
        },
        {
            label: "Suspended",
            value: "36",
            borderColor: "border-[#EA3D2A]",
            bgColor: "bg-[#FFEDEB]",
            textColor: "text-[#EA3D2A]"
        },
        {
            label: "In-House",
            value: "11,041",
            borderColor: "border-[#475569]",
            bgColor: "bg-[#F8F8F8]",
            textColor: "text-[#181211]"
        },
        {
            label: "Store Drivers",
            value: "1,441",
            borderColor: "border-[#F2994A]",
            bgColor: "bg-[#FFF7E8]",
            textColor: "text-[#F2994A]"
        },
        {
            label: "KYC Pending",
            value: "36",
            borderColor: "border-[#F2994A]",
            bgColor: "bg-[#FFF7E8]",
            textColor: "text-[#F2994A]"
        },
        {
            label: "Total Earnings",
            value: "$10,000",
            borderColor: "border-[#219653]",
            bgColor: "bg-[#E0FFED]",
            textColor: "text-[#219653]"
        }
    ];



    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-manrope">
            {/* Breadcrumbs & Header Section */}

            <div className="flex flex-col gap-2">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Drivers</h1>

                        <p className="text-[#475569] font-medium text-sm">Manage all platform drivers, in-house and store assigned. Click any row to view full profile, KYC, and performance.</p>
                    </div>
                    <Link to="/superadmin/drivers/add" className="bg-[#EA3D2A] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 shrink-0">
                        <Icon icon="mdi:account-plus" width="20" />
                        Add Driver
                    </Link>

                </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`p-3 rounded-md border ${stat.borderColor} ${stat.bgColor} shadow-sm hover:shadow-md transition-all cursor-default`}>
                        <div className="space-y-1.5">
                            <p className="text-[#181211] text-sm font-medium tracking-wide mb-2">{stat.label}</p>
                            <h3 className={`text-2xl font-semibold  ${stat.textColor || 'text-[#181211]'} leading-none`}>
                                {stat.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>



            {/* Main Data Table */}
            <DriverTable />
        </div>
    );
};

export default Drivers;
