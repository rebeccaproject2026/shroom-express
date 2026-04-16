import React from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DatePickerMap from "../../components/DatePickerMap";
import CustomerTable from "../../components/customers/CustomerTable";

const Customers = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Customers" }
    ];

    const stats = [
        {
            label: "Total Customers",
            value: "12,482",
            description: "All registered",
            icon: null,
            color: "text-[#64748B]",
        },
        {
            label: "Active",
            value: "5,933",
            description: "Currently active",
            icon: "lucide:trending-up",
            color: "text-[#219653]",
        },
        {
            label: "Inactive",
            value: "6,513",
            description: "Currently inactive",
            icon: "lucide:trending-down",
            color: "text-[#EA3D2A]",
        },
        {
            label: "Blocked",
            value: "36",
            description: "Account disabled",
            icon: null,
            color: "text-[#64748B]",
        },
        {
            label: "Total Spend",
            value: "$10,000",
            description: "All time",
            icon: "lucide:trending-up",
            color: "text-[#219653]",
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-manrope">
            {/* Breadcrumbs & Header Section */}
            <div className="flex flex-col gap-2">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Customers</h1>
                        <p className="text-[#475569] font-medium text-sm">Manage your user base, view order history, and handle account statuses.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <DatePickerMap defaultItem={5} onUpdate={(range) => console.log("Customers date range:", range)} />
                    </div>
                </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all cursor-default">
                        <div className="space-y-4">
                            <p className="text-[#64748B] text-sm font-medium tracking-tight mb-2">{stat.label}</p>
                            <h3 className="text-2xl font-semibold text-[#181211] leading-none mb-3">{stat.value}</h3>
                            <div className={`flex items-center gap-1.5 ${stat.color} text-[13px] font-semibold`}>
                                {stat.icon && <Icon icon={stat.icon} width="16" className="shrink-0" />}
                                <span className={!stat.icon ? "text-[#64748B]" : ""}>{stat.description}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Data Table */}
            <CustomerTable />
        </div>
    );
};

export default Customers;
