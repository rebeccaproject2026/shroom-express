/* eslint-disable react-hooks/static-components */
import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import OrdersTable from "../../../components/orders/OrdersTable";

const AllOrders = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Orders & Deliveries" }
    ];

    const stats = {
        shipping: [
            { label: "Total Orders", value: "164", description: "14% vs last month", icon: "lucide:trending-up", color: "text-[#219653]" },
            { label: "In Transit", value: "3", description: "Active right now", icon: "lucide:activity", color: "text-[#0066FF]" },
            { label: "Shipped", value: "153", description: "97% on-time", icon: "lucide:trending-up", color: "text-[#219653]" },
            { label: "Pending", value: "6", description: "Awaiting fulfillment", icon: "lucide:clock", color: "text-[#F59E0B]" },
            { label: "Cancelled", value: "2", description: "3.2% of all orders", icon: "lucide:trending-down", color: "text-[#EA3D2A]" },
            { label: "Revenue", value: "$1149", description: "11% vs last month", icon: "lucide:trending-up", color: "text-[#219653]" },
        ],
        delivery: [
            { label: "Total Orders", value: "284", description: "14% vs last month", icon: "lucide:trending-up", color: "text-[#219653]" },
            { label: "In Transit", value: "18", description: "Active right now", icon: "lucide:activity", color: "text-[#0066FF]" },
            { label: "Delivered", value: "241", description: "97% on-time", icon: "lucide:trending-up", color: "text-[#219653]" },
            { label: "Pending", value: "16", description: "Awaiting fulfillment", icon: "lucide:clock", color: "text-[#F59E0B]" },
            { label: "Cancelled", value: "9", description: "3.2% of all orders", icon: "lucide:trending-down", color: "text-[#EA3D2A]" },
            { label: "Revenue", value: "$949", description: "11% vs last month", icon: "lucide:trending-up", color: "text-[#219653]" },
        ]
    };

    const StatsRow = ({ title, cards }) => (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#181211] ml-1">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {cards.map((stat, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all cursor-default">
                        <div className="space-y-4">
                            <p className="text-[#475569] text-sm font-medium tracking-wide mb-2 uppercase text-[11px]">{stat.label}</p>
                            <h3 className="text-2xl font-semibold text-[#181211] leading-none">{stat.value}</h3>
                            <div className={`flex items-center gap-1.5 ${stat.color} text-[12px] font-semibold whitespace-nowrap overflow-hidden`}>
                                <Icon icon={stat.icon} width="14" className="shrink-0" />
                                <span className="truncate">{stat.description}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-manrope">
            {/* Breadcrumbs & Header Section */}
            <div className="flex flex-col gap-2">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-lg font-bold text-[#181211]">Orders & Deliveries</h1>
                        <p className="text-[#475569] font-medium text-sm">Track and manage all purchase orders: products, suppliers, stores, customers, weights and delivery status.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="bg-[#EA3D2A] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group">
                            <Icon icon="lucide:plus" width="20" />
                            New Order
                        </button>
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

            {/* Overdue Alert Banner */}
            <div className="bg-[#FFFBEB] border border-[#D26D0A] rounded-lg p-2.5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#D97706] shrink-0 border border-[#FEF3C7]">
                    <Icon icon="lucide:alert-triangle" width="20" />
                </div>
                <div className="flex-1 pt-1.5">
                    <p className="text-[14px] font-bold text-[#B45309] leading-tight flex items-center gap-1.5 flex-wrap">
                        <span className="text-[#D97706]">3 orders are overdue</span>
                        <span className="text-[#181211]/30 mx-1">|</span>
                        <span className="font-medium text-[#181211]">SE-2026-027, SE-2026-019, SE-2026-011 have passed their estimated delivery dates.</span>
                    </p>
                </div>
            </div>

            {/* Stats Overview Rows */}
            <div className="space-y-8 pt-2">
                <StatsRow title="Shipping" cards={stats.shipping} />
                <StatsRow title="Delivery" cards={stats.delivery} />
            </div>

            {/* Main Data Table */}
            <OrdersTable />
        </div>
    );
};

export default AllOrders;
