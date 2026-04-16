import React from "react";
import { Icon } from "@iconify/react";
import store from "../../../../../assets/images/store.png";
const StorePerformanceTab = () => {
    /* ──────────────────────────────────────────────────────────
       Chart Data — Revenue by Store
       ────────────────────────────────────────────────────────── */
    const revenueStats = [
        { name: "Forest Oasis", revenue: 95 },
        { name: "Healthy Greens", revenue: 91 },
        { name: "Pure Origins", revenue: 86 },
        { name: "Bloom Essentials", revenue: 82 },
        { name: "Nature's Best", revenue: 78 },
    ];

    /* ──────────────────────────────────────────────────────────
       Table Data — Store performance breakdown
       ────────────────────────────────────────────────────────── */
    const storePerformance = [
        { name: "Forest Oasis", image: store, id: "#SE-8921", orders: 142, revenue: "$6,820", commission: "$818", avgOrder: "$48.03", onTime: "97%", rating: 4.8 },
        { name: "Healthy Greens", image: store, id: "#SE-8921", orders: 118, revenue: "$5,340", commission: "$641", avgOrder: "$45.25", onTime: "94%", rating: 4.6 },
        { name: "Pure Origins", image: store, id: "#SE-8921", orders: 96, revenue: "$4,680", commission: "$562", avgOrder: "$48.75", onTime: "96%", rating: 4.7 },
        { name: "Bloom Essentials", image: store, id: "#SE-8921", orders: 84, revenue: "$3,920", commission: "$470", avgOrder: "$46.67", onTime: "91%", rating: 4.4 },
        { name: "Nature's Best", image: store, id: "#SE-8921", orders: 62, revenue: "$3,640", commission: "$437", avgOrder: "$58.71", onTime: "93%", rating: 4.9 },
    ];

    return (
        <div className="space-y-4 animate-in fade-in duration-500 pb-10">
            {/* Row 1: Revenue by Store Horizontal Bar Card */}
            <div className="bg-white rounded-md border border-[#E2E8F0] p-5 flex flex-col">
                <div className="mb-5">
                    <h3 className="text-xl font-semibold text-[#181211] leading-tight select-none">Revenue by Store</h3>
                    <p className="text-sm mt-1 font-medium text-[#64748B] select-none">Total revenue generated per store this period</p>
                </div>

                <div className="space-y-3 px-1">
                    {revenueStats.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-6">
                            <span className="text-sm font-semibold text-[#181211] w-32 shrink-0">{item.name}</span>
                            <div className="h-3 flex-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#EA3D2A] rounded-full transition-all duration-1000"
                                    style={{ width: `${item.revenue}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 2: Detailed Performance Table — Refined per Image */}
            <div className="bg-white  overflow-hidden font-manrope">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#F8FAFC] text-[#64748B] text-[13px] uppercase">
                            <th className="py-3 px-3 font-semibold">STORE</th>
                            <th className="py-3 px-3 font-semibold">ORDERS</th>
                            <th className="py-3 px-3 font-semibold">REVENUE</th>
                            <th className="py-3 px-3 font-semibold">COMMISSION</th>
                            <th className="py-3 px-3 font-semibold">AVG ORDER</th>
                            <th className="py-3 px-3 font-semibold">ON-TIME</th>
                            <th className="py-3 px-3 font-semibold">RATING</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {storePerformance.map((store, idx) => (
                            <tr
                                key={idx}
                                className="transition-colors hover:bg-gray-50/80"
                            >
                                <td className="py-2.5 px-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded border border-[#E2E8F0] bg-white overflow-hidden flex items-center justify-center shrink-0">
                                            <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#181211] leading-tight">{store.name}</p>
                                            <p className="text-xs font-medium text-[#EA3D2A] mt-0.5">{store.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2.5 px-3 text-sm font-semibold text-[#181211]">{store.orders}</td>
                                <td className="py-2.5 px-3 text-sm font-semibold text-[#219653]">{store.revenue}</td>
                                <td className="py-2.5 px-3 text-sm font-semibold text-[#0066FF]">{store.commission}</td>
                                <td className="py-2.5 px-3 text-sm font-semibold text-[#181211]">{store.avgOrder}</td>
                                <td className="py-2.5 px-3 text-sm font-semibold">
                                    <span className={parseInt(store.onTime) >= 95 ? "text-[#219653]" : "text-[#F2994A]"}>
                                        {store.onTime}
                                    </span>
                                </td>
                                <td className="py-2.5 px-3">
                                    <div className="flex items-center gap-1.5 ">
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Icon
                                                    key={star}
                                                    icon="material-symbols:star-rounded"
                                                    className={star <= Math.floor(store.rating) ? "text-[#FF9F40]" : "text-[#E2E8F0]"}
                                                    width="14"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-semibold text-[#FF9F40] mt-0.5">{store.rating}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StorePerformanceTab;
