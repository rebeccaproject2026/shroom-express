import React from "react";
import { Icon } from "@iconify/react";

const ProductsTab = () => {
    /* ──────────────────────────────────────────────────────────
       Chart Data
       ────────────────────────────────────────────────────────── */
    const categoryStats = [
        { name: "Tinctures", amount: "$12,824", orders: "224 orders", percent: 95, color: "bg-[#0066FF]", textColor: "text-[#0066FF]" },
        { name: "Micro dosing", amount: "$9,694", orders: "272 orders", percent: 76, color: "bg-[#EA3D2A]", textColor: "text-[#EA3D2A]" },
        { name: "Wellness", amount: "$5,544", orders: "126 orders", percent: 43, color: "bg-[#219653]", textColor: "text-[#219653]" },
        { name: "Capsules", amount: "$5,170", orders: "94 orders", percent: 40, color: "bg-[#8B5CF6]", textColor: "text-[#8B5CF6]" },
        { name: "Gummies", amount: "$3,920", orders: "112 orders", percent: 31, color: "bg-[#FF9F40]", textColor: "text-[#FF9F40]" },
    ];

    /* ──────────────────────────────────────────────────────────
       Table Data
       ────────────────────────────────────────────────────────── */
    const productPerformance = [
        { name: "Micro Dose Caps 30mg", id: "#SE-8921", category: "MICRO DOSING", orders: 184, units: 386, revenue: "$7,494", weight: "45gm" },
        { name: "Full Spectrum Tincture", id: "#SE-8921", category: "TINCTURES", orders: 148, units: 168, revenue: "$9,176", weight: "60gm" },
        { name: "Wellness Caps 200mg", id: "#SE-8921", category: "WELLNESS", orders: 126, units: 142, revenue: "$5,544", weight: "70gm" },
        { name: "Adaptogen Blend Gummies", id: "#SE-8921", category: "GUMMIES", orders: 112, units: 240, revenue: "$3,920", weight: "40gm" },
        { name: "Lion's Mane Powder", id: "#SE-8921", category: "CAPSULES", orders: 94, units: 106, revenue: "$5,170", weight: "55gm" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10 font-manrope">
            {/* Top Section: Analysis Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue by Category */}
                <div className="bg-white rounded-md border border-[#E2E8F0] p-6">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-[#181211]">Revenue by Category</h3>
                        <p className="text-sm text-[#64748B] mt-1">Total $ contribution per product category</p>
                    </div>
                    <div className="space-y-6">
                        {categoryStats.map((cat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between items-center px-0.5">
                                    <span className="text-[15px] font-semibold text-[#181211] leading-none">{cat.name}</span>
                                    <div className={`text-sm font-semibold ${cat.textColor} leading-none`}>
                                        {cat.amount} <span className="mx-1">·</span> {cat.orders}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 flex-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${cat.color} rounded-full transition-all duration-1000`}
                                            style={{ width: `${cat.percent}%` }}
                                        />
                                    </div>
                                    <span className={`text-xs font-semibold ${cat.textColor} leading-none w-8 text-right`}>
                                        {cat.percent}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Orders by Category */}
                <div className="bg-white rounded-md border border-[#E2E8F0] p-6">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-[#181211]">Orders by Category</h3>
                        <p className="text-sm text-[#64748B] mt-1">Volume comparison</p>
                    </div>
                    <div className="space-y-4 py-1">
                        {categoryStats.map((cat, i) => (
                            <div key={i} className="flex items-center gap-5">
                                <span className="text-[15px] font-semibold text-[#181211] w-28 shrink-0">{cat.name}</span>
                                <div className="h-3.5 flex-1 bg-[#F1F5F9] rounded-md overflow-hidden">
                                    <div
                                        className={`h-full ${cat.color} rounded-md transition-all duration-1000`}
                                        style={{ width: `${cat.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Table */}
            <div className="bg-white overflow-hidden ">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#F8FAFC] text-[#64748B] text-[13px] uppercase border-b border-[#F1F5F9]">
                            <th className="py-3.5 px-3 font-semibold">PRODUCT</th>
                            <th className="py-3.5 px-3 font-semibold">CATEGORY</th>
                            <th className="py-3.5 px-3 font-semibold text-center">ORDERS</th>
                            <th className="py-3.5 px-3 font-semibold text-center">UNITS SOLD</th>
                            <th className="py-3.5 px-3 font-semibold">REVENUE</th>
                            <th className="py-3.5 px-3 font-semibold">PACK WEIGHT</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {productPerformance.map((product, idx) => (
                            <tr
                                key={idx}
                                className="transition-colors hover:bg-gray-50/80"
                            >
                                <td className="py-3 px-3">
                                    <div>
                                        <p className="text-sm font-semibold text-[#181211] leading-tight">{product.name}</p>
                                        <p className="text-xs font-medium text-[#EA3D2A] mt-0.5">{product.id}</p>
                                    </div>
                                </td>
                                <td className="py-3 px-3">
                                    <span className="inline-block px-3 py-1 rounded-full border border-[#0066FF] text-[#0066FF] text-[11px] font-bold tracking-wider">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="py-3 px-3 text-sm font-semibold text-[#181211] text-center">{product.orders}</td>
                                <td className="py-3 px-3 text-[14px] font-medium text-[#181211] text-center">{product.units}</td>
                                <td className="py-3 px-3 text-[14px] font-semibold text-[#219653]">{product.revenue}</td>
                                <td className="py-3 px-3 text-[14px] font-medium text-[#0066FF]">{product.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsTab;
