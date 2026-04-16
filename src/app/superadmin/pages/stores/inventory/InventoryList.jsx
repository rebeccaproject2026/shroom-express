import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import InventoryTable from "../../../components/inventory/InventoryTable";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import DatePickerMap from "../../../components/DatePickerMap";

const InventoryList = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Inventory" }
    ];
    const metrics = [
        { label: "Total Products", value: "1,284", sub: "Across all stores", borderColor: "border-[#0066FF]", subtextColor: "text-[#0066FF]", textColor: "text-[#181211]" },
        { label: "In Stock", value: "952", sub: "Ready to sell", borderColor: "border-[#219653]", subtextColor: "text-[#219653]", textColor: "text-[#181211]" },
        { label: "Low Stock", value: "48", sub: "Below alert threshold", borderColor: "border-[#FF9F40]", subtextColor: "text-[#FF9F40]", textColor: "text-[#181211]" },
        { label: "Out of Stock", value: "4", sub: "Needs restocking", borderColor: "border-[#EA3D2A]", subtextColor: "text-[#EA3D2A]", textColor: "text-[#EA3D2A]" },
        { label: "Pending Approval", value: "10", sub: "Vendor-added products", borderColor: "border-[#475569]", subtextColor: "text-[#94A3B8]", textColor: "text-[#181211]" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-manrope pb-10">
            {/* Breadcrumbs & Header Section */}
            <div className="flex flex-col gap-2">
                {/* Breadcrumbs */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Header Title & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Inventory Overview</h1>
                        <p className="text-[#475569] font-medium text-sm">Monitor stock levels across all stores and manage products platform-wide.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/superadmin/inventory/add">
                            <button className="bg-[#EA3D2A] text-white px-4 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group shrink-0">
                                <Icon icon="si:inventory-line" width="20" />
                                Create Inventory
                            </button>
                        </Link>
                        <DatePickerMap defaultItem={5} onUpdate={(range) => console.log("Inventory date range:", range)} />
                    </div>
                </div>
            </div>

            {/* Metrics Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
                {metrics.map((metric, idx) => (
                    <div key={idx} className={`bg-white p-3 rounded-lg border ${metric.borderColor} shadow-sm space-y-2`}>
                        <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{metric.label}</p>
                        <h3 className={`text-2xl font-semibold ${metric.textColor} `}>{metric.value}</h3>
                        <p className={`text-[11px] ${metric.subtextColor}  font-medium`}>{metric.sub}</p>
                    </div>
                ))}
            </div>

            {/* Alert Banner */}
            <div className="flex items-center justify-between p-3 bg-[#FFF7E8] border border-[#FFBE40] border-opacity-50 rounded-md mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white bg-opacity-50 rounded-sm flex items-center justify-center text-[#F2994A]">
                        <Icon icon="material-symbols:warning-rounded" width="22" />
                    </div>
                    <div className="space-y-0.5">
                        <h4 className="text-[15px] font-semibold text-[#C27803]">
                            10 products out of stock · 10 products below alert threshold
                        </h4>
                        <p className="text-[13px] text-[#F2994A] font-medium opacity-90">
                            Review and restock items to prevent order failures across stores.
                        </p>
                    </div>
                </div>
                <button className="px-5 py-2 bg-[#F2994A] text-white rounded-md text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95">
                    View Low Stock
                </button>
            </div>

            {/* Main Inventory Table Component */}
            <InventoryTable />
        </div>
    );
};

export default InventoryList;
