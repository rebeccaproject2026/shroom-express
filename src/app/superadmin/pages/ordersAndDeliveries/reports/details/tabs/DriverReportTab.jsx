import React from "react";
import { Icon } from "@iconify/react";
import store from "../../../../../assets/images/store.png";

const DriverReportTab = () => {
    /* ──────────────────────────────────────────────────────────
       Summary Stats Data
       ────────────────────────────────────────────────────────── */
    const stats = [
        { label: "Total Driver Earnings", value: "$3,621", borderColor: "border-t-[#181211]" },
        { label: "Avg Orders/Driver", value: "124", borderColor: "border-t-[#8B5CF6]" },
        { label: "Fleet On-Time Rate", value: "93.3", borderColor: "border-t-[#0066FF]" },
        { label: "Avg Delivery Time", value: "17.8 min", borderColor: "border-t-[#FF9F40]" },
        { label: "Total Cancellations", value: "31", borderColor: "border-t-[#EA3D2A]" },
    ];

    /* ──────────────────────────────────────────────────────────
       Drivers Performance Data
       ────────────────────────────────────────────────────────── */
    const driverPerformance = [
        { name: "Forest Oasis", id: "#SE-8921", image: store, orders: 188, delivered: 177, onTime: "97%", avgTime: "14 min", commission: "$818", rating: 4.8 },
        { name: "Healthy Greens", id: "#SE-8921", image: store, orders: 154, delivered: 148, onTime: "94%", avgTime: "15 min", commission: "$641", rating: 4.6 },
        { name: "Pure Origins", id: "#SE-8921", image: store, orders: 128, delivered: 124, onTime: "96%", avgTime: "19 min", commission: "$562", rating: 4.7 },
        { name: "Bloom Essentials", id: "#SE-8921", image: store, orders: 110, delivered: 104, onTime: "91%", avgTime: "22 min", commission: "$470", rating: 4.4 },
        { name: "Nature's Best", id: "#SE-8921", image: store, orders: 94, delivered: 88, onTime: "93%", avgTime: "20 min", commission: "$437", rating: 4.9 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10 font-manrope">
            {/* Top Statistics Row — Matching RecentOrdersContent style */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`bg-white p-5 rounded-lg border border-t-[5px] ${stat.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}
                    >
                        <p className="text-sm font-medium text-[#64748B] mb-2 leading-none">{stat.label}</p>
                        <h4 className="text-2xl font-bold text-[#181211] leading-none mt-4">{stat.value}</h4>
                    </div>
                ))}
            </div>

            {/* Performance Table */}
            <div className="bg-white overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#F8FAFC] text-[#64748B] text-[13px] uppercase border-b border-[#F1F5F9]">
                            <th className="py-3.5 px-3 font-semibold">DRIVER</th>
                            <th className="py-3.5 px-3 font-semibold">ORDERS</th>
                            <th className="py-3.5 px-3 font-semibold">DELIVERED</th>
                            <th className="py-3.5 px-3 font-semibold">ON-TIME</th>
                            <th className="py-3.5 px-3 font-semibold">AVG TIME</th>
                            <th className="py-3.5 px-3 font-semibold">COMMISSION</th>
                            <th className="py-3.5 px-3 font-semibold">RATING</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {driverPerformance.map((driver, idx) => (
                            <tr
                                key={idx}
                                className="transition-colors hover:bg-gray-50/80"
                            >
                                <td className="py-3 px-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded border border-[#E2E8F0] bg-white overflow-hidden flex items-center justify-center shrink-0">
                                            <img src={driver.image} alt={driver.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#181211] leading-tight">{driver.name}</p>
                                            <p className="text-xs font-medium text-[#EA3D2A] mt-0.5">{driver.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-sm font-semibold text-[#181211]">{driver.orders}</td>
                                <td className="py-3 px-3 text-sm font-semibold text-[#219653]">{driver.delivered}</td>
                                <td className="py-3 px-3 text-sm font-semibold">
                                    <span className={parseInt(driver.onTime) >= 95 ? "text-[#219653]" : "text-[#F2994A]"}>
                                        {driver.onTime}
                                    </span>
                                </td>
                                <td className="py-3 px-3 text-sm font-semibold text-[#181211]">{driver.avgTime}</td>
                                <td className="py-3 px-3 text-sm font-semibold text-[#0066FF]">{driver.commission}</td>
                                <td className="py-3 px-3">
                                    <div className="flex items-center gap-1.5 ">
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Icon
                                                    key={star}
                                                    icon="material-symbols:star-rounded"
                                                    className={star <= Math.floor(driver.rating) ? "text-[#FF9F40]" : "text-[#E2E8F0]"}
                                                    width="16"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-semibold text-[#FF9F40] mt-0.5">{driver.rating}</span>
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

export default DriverReportTab;
