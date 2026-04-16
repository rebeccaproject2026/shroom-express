import React, { useState } from "react";
import { Icon } from "@iconify/react";
import PlaceOrderModal from "./modals/PlaceOrderModal";

const OrdersContent = ({ supplier }) => {
    const [isPlaceOrderModalOpen, setIsPlaceOrderModalOpen] = useState(false);
    const orders = [
        { id: "PD-2026-0...", product: "Micro Dose...", sku: "NVB-MIC-030", qty: "200 Pack", weight: "45 gm", amount: "$2,400", batch: "BATCH-2026-02", status: "Delivered", ordered: "Feb 28, 2026", delivered: "Mar 03, 2026" },
        { id: "SE-2025-0...", product: "Micro Dose...", sku: "NVB-MIC-015", qty: "150 Pack", weight: "30 gm", amount: "$1,200", batch: "BATCH-2026-03", status: "Preparing", ordered: "Mar 02, 2026", delivered: "Est. Mar 12" },
        { id: "PD-2026-0...", product: "Adaptogen...", sku: "NVB-ADT-001", qty: "80 Pack", weight: "55 gm", amount: "$1,120", batch: "-", status: "Ordered", ordered: "Mar 05, 2026", delivered: "Est. Mar 20" },
        { id: "PC-2026-0...", product: "Micro Dose...", sku: "NVB-MIC-050", qty: "100 Pack", weight: "60 gm", amount: "$1,600", batch: "BATCH-2026-01", status: "Delivered", ordered: "Feb 10, 2026", delivered: "Feb 15, 2026" },
        { id: "SE-2025-0...", product: "Lion's Man...", sku: "NVB-LMN-100", qty: "50 Pack", weight: "70 gm", amount: "$900", batch: "BATCH-2026-01", status: "Delivered", ordered: "Jan 28, 2026", delivered: "Feb 02, 2026" },
        { id: "SE-2026-0...", product: "Micro Dose...", sku: "NVB-MIC-030", qty: "180 Pack", weight: "45 gm", amount: "$2,160", batch: "BATCH-2025-12", status: "Delivered", ordered: "Jan 10, 2026", delivered: "Jan 14, 2026" },
        { id: "SE-2026-0...", product: "Micro Dose...", sku: "NVB-MIC-015", qty: "200 Pack", weight: "30 gm", amount: "$1,600", batch: "-", status: "Cancelled", ordered: "Dec 28, 2025", delivered: "-" },
    ];

    const stats = [
        { label: "Delivered", count: "4", borderColor: "border-[#219653]" },
        { label: "In Transit", count: "1", borderColor: "border-[#0066FF]" },
        { label: "Ordered", count: "1", borderColor: "border-[#F2994A]" },
        { label: "Cancelled", count: "1", borderColor: "border-[#EA3D2A]" },
        { label: "Overall Orders", count: "7", borderColor: "border-[#181211]" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered": return "text-[#10B981] border-[#10B981] bg-[#ECFDF5]";
            case "Preparing": return "text-[#3B82F6] border-[#3B82F6] bg-[#DBEAFE]";
            case "Ordered": return "text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]";
            case "Cancelled": return "text-[#EF4444] border-[#EF4444] bg-[#FEF2F2]";
            default: return "text-gray-500 border-gray-500 bg-gray-50";
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-manrope">
            {/* Statistics Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`bg-white p-4 rounded-lg border border-t-[5px] ${stat.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}>
                        <p className="text-sm font-medium text-[#64748B] mb-3 leading-none">{stat.label}</p>
                        <h4 className="text-xl font-semibold text-[#181211] tracking-wider leading-none">{stat.count}</h4>
                    </div>
                ))}
            </div>


            {/* Orders Table Container - Reusing Design from SupplierTable.jsx */}
            <div className="bg-white rounded-md shadow-sm border border-[#E2E8F0] overflow-hidden">
                {/* Header section with count and action button */}
                <div className="flex items-center justify-between px-4.5 py-4 bg-white">
                    <p className="text-sm font-medium text-[#475569]">
                        Showing <span className="font-bold text-[#181211]">7</span> of <span className="font-bold text-[#181211]">7 orders</span>
                    </p>
                    <button 
                        onClick={() => setIsPlaceOrderModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#EA3D2A] text-white rounded-lg text-sm font-semibold hover:bg-[#D43424] transition-all active:scale-95 shadow-lg shadow-[#EA3D2A]/20"
                    >
                        <Icon icon="lucide:plus" width="20" />
                        New Order
                    </button>
                </div>
                <div className="overflow-x-auto border-t border-[#F1F5F9]">
                    <table className="w-full text-left border-collapse table-fixed lg:table-auto">
                        <thead>
                            <tr className="bg-[#F8FAFC] text-[#64748B] text-[13px] uppercase border-b border-[#F1F5F9]">
                                <th className="py-3 px-3 font-semibold">ORDER ID</th>
                                <th className="py-3 px-3 font-semibold">PRODUCT</th>
                                <th className="py-3 px-3 font-semibold">SKU</th>
                                <th className="py-3 px-3 font-semibold">QTY</th>
                                <th className="py-3 px-3 font-semibold text-center">PACKET WT</th>
                                <th className="py-3 px-3 font-semibold">AMOUNT</th>
                                <th className="py-3 px-3 font-semibold">BATCH</th>
                                <th className="py-3 px-3 font-semibold text-center">STATUS</th>
                                <th className="py-3 px-3 font-semibold">ORDERED</th>
                                <th className="py-3 px-3 font-semibold">DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-[#F8FAFC]/80 transition-colors group ${index % 2 === 0 ? "bg-white" : ""}`}
                                >
                                    <td className="py-2.5 px-3.5">
                                        <span className="text-sm font-semibold text-[#EA3D2A]">{order.id}</span>
                                    </td>
                                    <td className="py-2.5 px-3.5 text-sm font-semibold text-[#181211] truncate">{order.product}</td>
                                    <td className="py-2.5 px-3.5 text-sm font-medium text-[#181211]">{order.sku}</td>
                                    <td className="py-2.5 px-3.5 text-sm font-medium text-[#181211]">{order.qty}</td>
                                    <td className="py-2.5 px-3.5 text-center">
                                        <span className="text-xs font-semibold text-[#0066FF]  px-3 py-1 rounded-full border border-[#0066FF] inline-block min-w-[65px]">
                                            {order.weight}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3.5 text-sm font-semibold text-[#181211]">{order.amount}</td>
                                    <td className="py-2.5 px-3.5 text-sm font-medium text-[#181211]">{order.batch}</td>
                                    <td className="py-2.5 px-3.5 text-center">
                                        <div className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border inline-block ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3.5 text-sm font-medium text-[#181211]">{order.ordered}</td>
                                    <td className="py-2.5 px-3.5 text-sm font-medium text-[#181211]">{order.delivered}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination - EXACTLY as in SupplierTable.jsx */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-3 gap-4 border-t border-[#F1F5F9] bg-white">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                            <Icon icon="lucide:chevron-left" width="18" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button className="w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 bg-[#EA3D2A] text-white">1</button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 text-[#181211] hover:bg-gray-50">2</button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 text-[#181211] hover:bg-gray-50">3</button>
                        <span className="px-1 text-[#94A3B8]">...</span>
                        <button className="w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 text-[#181211] hover:bg-gray-50">128</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                            <span className="hidden sm:inline">Next</span>
                            <Icon icon="lucide:chevron-right" width="18" />
                        </button>
                    </div>
                </div>
            </div>

            <PlaceOrderModal 
                isOpen={isPlaceOrderModalOpen} 
                onClose={() => setIsPlaceOrderModalOpen(false)} 
                supplier={supplier}
            />
        </div>
    );
};

export default OrdersContent;
