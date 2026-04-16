import React from "react";
import { Icon } from "@iconify/react";

const ORDERS_MOCK = [
    {
        id: "#SE-9041",
        product: "Micro Dose Caps 30mg",
        store: "Forest Oasis",
        date: "Mar 06, 2026",
        price: "$77.98",
        status: "Delivered",
        color: "text-[#219653] bg-[#CDFFE2]"
    },
    {
        id: "#SE-8911",
        product: "Full Spectrum Tincture",
        store: "Healthy Greens",
        date: "Feb 20, 2026",
        price: "$62.00",
        status: "Delivered",
        color: "text-[#219653] bg-[#CDFFE2]"
    },
    {
        id: "#SE-8744",
        product: "Wellness Caps 200mg",
        store: "Bloom Essentials",
        date: "Feb 05, 2026",
        price: "$44.00",
        status: "Delivered",
        color: "text-[#219653] bg-[#CDFFE2]"
    },
    {
        id: "#SE-8601",
        product: "Reishi Tincture",
        store: "Forest Oasis",
        date: "Jan 18, 2026",
        price: "$48.00",
        status: "Delivered",
        color: "text-[#219653] bg-[#CDFFE2]"
    },
    {
        id: "#SE-8455",
        product: "Micro Dose Caps 15mg",
        store: "Pure Origins",
        date: "Jan 02, 2026",
        price: "$24.99",
        status: "Delivered",
        color: "text-[#219653] bg-[#CDFFE2]"
    }
];

const OrdersTab = () => {
    return (
        <div className="space-y-0 -mx-6 -mt-6">
            {ORDERS_MOCK.map((order, idx) => (
                <div
                    key={idx}
                    className={`flex items-center justify-between p-4 px-6 border-b border-[#F1F5F9] hover:bg-gray-50/50 transition-colors ${idx === ORDERS_MOCK.length - 1 ? 'border-b-0 text-gray-50' : ''}`}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-sm bg-[#E8E8E8] border border-[#F1F5F9] flex items-center justify-center shrink-0">
                            <Icon icon="fluent-emoji-flat:herb" width="28" />
                        </div>
                        <div className="space-y-0.5">
                            <span className="text-sm font-semibold text-[#EA3D2A] leading-none mb-1 block">{order.id}</span>
                            <h4 className="text-[15px] font-semibold text-[#181211] leading-tight">{order.product}</h4>
                            <p className="text-xs underline font-medium text-[#475569]">
                                {order.store} <span className="text-[#CBD5E1] mx-0.5">·</span> {order.date}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex flex-col items-end gap-1.5 text-right">
                            <span className="text-[17px] font-semibold text-[#181211] leading-none">{order.price}</span>
                            <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold  tracking-wider ${order.color}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            <div className="pt-10 pb-4 text-center">
                <button className="text-[15px] font-semibold text-[#EA3D2A] hover:underline underline-offset-4 transition-all active:scale-95">
                    +26 more orders
                </button>
            </div>
        </div>
    );
};

export default OrdersTab;
