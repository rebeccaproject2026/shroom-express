import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const RecentOrdersContent = () => {
    const navigate = useNavigate();
    const orders = [
        { id: "#SE-8921", customer: "Aisha K.", driver: "Jankins", amount: "$42.50", qty: "30gm", status: "Delivered", time: "2 hrs ago" },
        { id: "#SE-8921", customer: "Jordan M.", driver: "Jankins", amount: "$22.50", qty: "10gm", status: "Preparing", time: "20 mins ago" },
        { id: "#SE-8921", customer: "Sarah T.", driver: "Jankins", amount: "$402.50", qty: "70gm", status: "Delivered", time: "5 hrs ago" },
        { id: "#SE-8921", customer: "Mark L.", driver: "Mike Rose", amount: "$42.50", qty: "30gm", status: "Cancelled", time: "2 hrs ago" },
        { id: "#SE-8921", customer: "Priya S.", driver: "Jankins", amount: "$42.50", qty: "30gm", status: "Delivered", time: "7 hrs ago" },
    ];

    const stats = [
        { label: "Overall Orders", count: "187", borderColor: "border-[#0F172A]" },
        { label: "Rescheduled", count: "15", borderColor: "border-[#8B5CF6]" },
        { label: "Pending Deliveries", count: "42", borderColor: "border-[#3B82F6]" },
        { label: "In-progress", count: "30", borderColor: "border-[#F59E0B]" },
        { label: "Delivered", count: "92", borderColor: "border-[#10B981]" },
        { label: "Cancelled", count: "8", borderColor: "border-[#EF4444]" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered": return "bg-[#CDFFE2] text-[#219653]";
            case "Preparing": return "bg-[#DAE9FF] text-[#0066FF]";
            case "Cancelled": return "bg-[#FFEDEB] text-[#EA3D2A]";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Table Header Section */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-[15px] font-medium text-[#475569]">Showing last <span className="font-bold text-[#181B23]">5 orders</span> from this store</p>
                <button 
                    onClick={() => navigate("/superadmin/stores/all")}
                    className="text-sm font-semibold text-[#EA3D2A] hover:underline transition-all"
                >
                    View All Orders
                </button>
            </div>

            {/* Orders Table */}
            <div className="w-full overflow-hidden mb-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8FAFC] text-[13px] font-semibold text-[#64748B] uppercase border-b border-[#F1F5F9]">
                            <th className="py-3 px-3">Order ID</th>
                            <th className="py-3 px-3">Customer</th>
                            <th className="py-3 px-3">Driver</th>
                            <th className="py-3 px-3">Amount</th>
                            <th className="py-3 px-3">Qty</th>
                            <th className="py-3 px-3">Status</th>
                            <th className="py-3 px-3">Order Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {orders.map((order, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-4 underline text-sm font-semibold text-[#EA3D2A]">{order.id}</td>
                                <td className="py-4 px-4 text-sm font-semibold text-[#181211]">{order.customer}</td>
                                <td className="py-4 px-4 text-sm font-semibold">
                                    <button className="text-[#EA3D2A] underline underline-offset-2 decoration-[#EA3D2A]/30 hover:decoration-[#EA3D2A]">{order.driver}</button>
                                </td>
                                <td className="py-4 px-4 text-sm font-semibold text-[#181211]">{order.amount}</td>
                                <td className="py-4 px-4 text-sm font-regular text-[#475569]">{order.qty}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-2 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-sm font-regular text-[#475569]">{order.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Statistics Cards Row (Matching Dashboard Operations Summary) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`bg-white p-4 rounded-lg border border-t-[5px] ${stat.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}>
                        <p className="text-sm font-medium text-[#64748B] mb-3 leading-none">{stat.label}</p>
                        <h4 className="text-xl font-semibold text-[#181211] tracking-wider leading-none">{stat.count}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentOrdersContent;
