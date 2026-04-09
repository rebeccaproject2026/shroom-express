import React from "react";
import { Icon } from "@iconify/react";

const PerformanceContent = () => {
    const mainStats = [
        { label: "ON-TIME RATE", value: "97%", subtext: "Industry avg: 85%", color: "text-[#0066FF]" },
        { label: "DEFECT RATE", value: "0.5%", subtext: "Target: <2%", color: "text-[#219653]" },
        { label: "AVG LEAD TIME", value: "3d", subtext: "Promised: 3 days", color: "text-[#0066FF]" },
        { label: "FILL RATE", value: "98.1%", subtext: "Orders fully filled", color: "text-[#219653]" },
        { label: "RESPONSE TIME", value: "< 4hrs", subtext: "Avg query response", color: "text-[#0066FF]" },
    ];

    const deliveryScores = [
        { label: "NovaBio Labs (This Supplier)", score: 97, color: "bg-[#219653]" },
        { label: "Platform Average", score: 85, color: "bg-[#0066FF]" },
        { label: "Platform Best", score: 99, color: "bg-[#5932EA]" },
        { label: "Platform Worst", score: 61, color: "bg-[#FF0000]" },
    ];

    const leadTimeData = [
        { id: "SE-041", days: 3 },
        { id: "SE-038", days: 4 },
        { id: "SE-033", days: 6 },
        { id: "SE-030", days: 5.8 },
        { id: "SE-025", days: 4.5 },
        { id: "SE-021", days: 4 },
    ];

    const detailedRatings = [
        { label: "Product Quality", score: 4.9 },
        { label: "Delivery Speed", score: 4.8 },
        { label: "Communication", score: 4.7 },
        { label: "Packaging", score: 4.6 },
        { label: "Value for Money", score: 4.5 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-manrope">
            {/* Top Row: Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {mainStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-md border border-[#E2E8F0] shadow-sm transition-all hover:shadow-md">
                        <h3 className={`text-2xl font-bold ${stat.color} leading-none mb-2`}>{stat.value}</h3>
                        <p className="text-[13px] font-semibold text-[#475569] uppercase tracking-wider mb-2">{stat.label}</p>
                        <p className="text-xs font-medium text-[#475569]">{stat.subtext}</p>
                    </div>
                ))}
            </div>

            {/* Middle Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* On-Time Delivery Score */}
                <div className="bg-white p-5 rounded-md border border-[#E2E8F0] shadow-sm">
                    <h3 className="text-xl font-semibold text-[#181211] leading-tight">On-Time Delivery Score</h3>
                    <p className="text-sm mt-1 font-medium text-[#64748B] mb-8">Overall rating vs platform benchmark</p>

                    <div className="space-y-6">
                        {deliveryScores.map((item, idx) => (
                            <div key={idx} className="space-y-1.5">
                                <div className="flex justify-between items-end">
                                    <span className={`text-[13px] font-semibold ${idx === 0 ? 'text-[#181211]' : 'font-medium'}`}>
                                        {item.label}
                                    </span>
                                    <span className="text-[11px] font-bold text-[#181211]">{item.score}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                                        style={{ width: `${item.score}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lead Time per Order */}
                <div className="bg-white p-5 rounded-md border border-[#E2E8F0] shadow-sm flex flex-col">
                    <h3 className="text-xl font-semibold text-[#181211] leading-tight">Lead Time per Order</h3>
                    <p className="text-sm  mt-1  font-medium text-[#64748B] mb-8">Days from order placed to delivery</p>

                    <div className="flex-1 flex items-end justify-between px-2 pb-2 gap-4">
                        {leadTimeData.map((item, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                                <div
                                    className="w-full bg-[#EA3D2A] rounded-t-sm transition-all duration-1000"
                                    style={{ height: `${item.days * 20}px` }}
                                />
                                <span className="text-[10px] font-semibold text-[#64748B] uppercase">{item.id}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Ratings */}
            <div className="bg-white p-8 rounded-md border border-[#E2E8F0] shadow-sm">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Overall Score */}
                    <div className="flex flex-col items-center lg:items-start shrink-0">
                        <h2 className="text-[56px] font-semibold text-[#181211] leading-none mb-4">4.8</h2>
                        <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Icon
                                    key={star}
                                    icon="material-symbols:star-rounded"
                                    className={star <= 4 ? "text-[#FF9F40]" : "text-[#FF9F40]/30"}
                                    width="20"
                                />
                            ))}
                            <span className="text-[13px] font-semibold text-[#181211] ml-1">4.8</span>
                        </div>
                        <p className="text-base font-medium text-[#475569]">Overall rating</p>
                    </div>

                    {/* Detailed Bars */}
                    <div className="flex-1 space-y-4">
                        {detailedRatings.map((rating, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-[#181211] w-32 shrink-0">{rating.label}</span>
                                <div className="flex-1 h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#FFBE40] rounded-full transition-all duration-1000"
                                        style={{ width: `${(rating.score / 5) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-[#181211] w-8 text-right">{rating.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceContent;
