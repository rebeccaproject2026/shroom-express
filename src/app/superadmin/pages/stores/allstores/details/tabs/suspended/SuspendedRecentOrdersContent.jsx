import React from "react";

const SuspendedRecentOrdersContent = () => {
    const orders = [
        { id: "#SE-8921", customer: "Aisha K.", product: "Micro Dose Caps 30gm", amount: "$42.50", qty: "30gm", status: "Delivered", time: "Before suspension" },
        { id: "#SE-8921", customer: "Jordan M.", product: "Full Spectrum Tincture", amount: "$22.50", qty: "10gm", status: "Refunded", time: "Suspension day" },
        { id: "#SE-8921", customer: "Sarah T.", product: "Beginner Gummy Pack", amount: "$402.50", qty: "70gm", status: "Refunded", time: "Suspension day" },
        { id: "#SE-8921", customer: "Mark L.", product: "Micro Dose Caps 15mg", amount: "$42.50", qty: "30gm", status: "Cancelled", time: "Before suspension" },
        { id: "#SE-8921", customer: "Priya S.", product: "Wellness Capsules", amount: "$42.50", qty: "30gm", status: "Delivered", time: "Before suspension" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered": return "bg-[#CDFFE2] text-[#219653]";
            case "Refunded": return "bg-[#FFF7E8] text-[#F2994A]";
            case "Cancelled": return "bg-[#FFEDEB] text-[#EA3D2A]";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Suspended Orders Warning Banner */}
            <div className="p-2 bg-[#FFF7E8] border border-[#FFF7E8] rounded-md mb-3">
                <p className="text-sm font-semibold text-[#F2994A] px-2">
                    2 orders were automatically refunded when the suspension was triggered. No new orders can be placed.
                </p>
            </div>

            {/* Orders Table */}
            <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[#64748B] text-[13px] uppercase border-b border-[#F1F5F9] bg-[#F8FAFC]">
                            <th className="py-4 px-6  font-semibold">Order ID</th>
                            <th className="py-4 px-6 font-semibold">Customer</th>
                            <th className="py-4 px-6 font-semibold">Product</th>
                            <th className="py-4 px-6 font-semibold">Amount</th>
                            <th className="py-4 px-6 font-semibold">Qty</th>
                            <th className="py-4 px-6 text-center font-semibold">Status</th>
                            <th className="py-4 px-6 font-semibold">Order Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {orders.map((order, idx) => (
                            <tr key={idx} className={`hover:bg-gray-50/50 transition-colors ${order.status === 'Refunded' ? 'opacity-[0.45]' : ''}`}>
                                <td className="py-5 px-6 underline text-sm font-semibold text-[#EA3D2A] cursor-pointer tracking-tight">{order.id}</td>
                                <td className="py-5 px-6 text-[14px] font-semibold text-[#181211]">{order.customer}</td>
                                <td className="py-5 px-6">
                                    <button className="text-[14px] font-medium text-[#64748B] underline underline-offset-2 decoration-[#64748B]/20 hover:text-[#181211] transition-all">
                                        {order.product}
                                    </button>
                                </td>
                                <td className="py-5 px-6 text-[14px] font-medium text-[#181211]">{order.amount}</td>
                                <td className="py-5 px-6 text-[14px] font-medium text-[#181211] opacity-80">{order.qty}</td>
                                <td className="py-5 px-6 text-center">
                                    <span className={`px-4 py-1 rounded-full text-[11px] font-semibold  ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-5 px-6 text-[14px] font-medium text-[#64748B] opacity-80">{order.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </div >
    );
};

export default SuspendedRecentOrdersContent;
