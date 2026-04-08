import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SupplierTable from "../../components/suppliers/SupplierTable";

const Suppliers = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Suppliers" }
    ];

    const stats = [
        {
            label: "Total Suppliers",
            value: "1,284",
            borderColor: "border-[#DAE9FF]",
            bgColor: "bg-[#F6FBFF]",
            textColor: "text-[#0066FF]"
        },
        {
            label: "Active",
            value: "700",
            borderColor: "border-[#CDFFE2]",
            bgColor: "bg-[#E0FFED]",
            textColor: "text-[#219653]"
        },
        {
            label: "Inactive",
            value: "244",
            borderColor: "border-[#FFC8C2]",
            bgColor: "bg-[#FFEDEB]",
            textColor: "text-[#EA3D2A]"
        },
        {
            label: "Pending",
            value: "340",
            borderColor: "border-[#FFF5E3]",
            bgColor: "bg-[#FFF7E8]",
            textColor: "text-[#FF9F40]"
        },
        {
            label: "Pending Orders",
            value: "9",
            borderColor: "border-[#FFF5E3]",
            bgColor: "bg-[#FFF7E8]",
            textColor: "text-[#FF9F40]"
        },
        {
            label: "Total Spend",
            value: "$77.4k",
            borderColor: "border-[#FFC8C2]",
            bgColor: "bg-[#FFEDEB]",
            textColor: "text-[#EA3D2A]"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-manrope pb-10">
            {/* Breadcrumbs & Header Section */}
            <div className="flex flex-col gap-2">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold text-[#181211]">All Suppliers</h1>
                        <p className="text-[#475569] font-medium text-sm">Manage all vendors and supply partners. Click any row to preview, or use actions to edit and remove.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/superadmin/suppliers/add"
                            className="bg-[#EA3D2A] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group underline-none"
                        >
                            <Icon icon="iconoir:user-cart" width="20" />
                            Add Supplier
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`${stat.bgColor} p-4 rounded-xl border ${stat.borderColor} shadow-sm transition-all hover:scale-[1.02] cursor-default`}>
                        <div className="space-y-5">
                            <p className={`text-[#475569] text-sm font-medium mb-2`}>{stat.label}</p>
                            <h3 className={`text-2xl font-semibold ${stat.textColor} leading-none`}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Supplier Table Section */}
            <div className="space-y-4">
                <SupplierTable />
            </div>
        </div>
    );
};

export default Suppliers;
