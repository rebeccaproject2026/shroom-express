import React from "react";
import { Icon } from "@iconify/react";

const OverviewStatsContent = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Live Status Banner */}
            <div className="flex items-center justify-between p-3 bg-[#CDFFE2] border border-[#CDFFE2] rounded-md mb-2.5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-[#219653] shadow-sm">
                        <Icon icon="hugeicons:tick-02" width="25" strokeWidth={3} />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-base font-semibold text-[#181211]">This store is live and accepting orders on the platform.</p>
                        <p className="text-xs text-[#475569] font-medium opacity-80">Approved Mar 04, 2026 by Alex Morgan • All 6 documents verified • No active violations</p>
                    </div>
                </div>
                <button className="px-4 py-2.5 bg-white border border-[#219653] text-[#219653] rounded-md text-sm font-semibold shadow-sm transition-all">
                    View Public Listing
                </button>
            </div>

            {/* Revenue Trend Chart Section */}
            <div className="bg-white p-6 rounded-md border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] mb-2.5">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-[#181211]">Revenue Trend</h3>
                        <p className="text-sm text-[#64748B] font-medium">Last 6 Week</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-[#F1F5F9] border border-[#F1F5F9] rounded-md text-sm font-semibold text-[#181211] shadow-sm">
                        Last 6 Week <Icon icon="lucide:chevron-down" width="16" />
                    </button>
                </div>

                {/* Mock Chart SVG (Matching the image wave exactly) */}
                <div className="relative h-[28%] w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 250" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EA3D2A" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#EA3D2A" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Smooth Cubic Bezier Path */}
                        <path
                            d="M0,210 C100,210 120,55 200,55 C280,55 320,135 400,135 C480,135 520,55 600,55 C680,55 720,105 800,105 C880,105 920,10 1000,10"
                            fill="none"
                            stroke="#EA3D2A"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                        {/* Gradient Fill Path */}
                        <path
                            d="M0,210 C100,210 120,55 200,55 C280,55 320,135 400,135 C480,135 520,55 600,55 C680,55 720,105 800,105 C880,105 920,10 1000,10 V250 H0 Z"
                            fill="url(#revenueGradient)"
                        />
                        {/* Data Points (Matching the curve) */}
                        <circle cx="10" cy="210" r="6" fill="#EA3D2A" />
                        <circle cx="200" cy="55" r="6" fill="#EA3D2A" />
                        <circle cx="400" cy="135" r="6" fill="#EA3D2A" />
                        <circle cx="600" cy="55" r="6" fill="#EA3D2A" />
                        <circle cx="800" cy="105" r="6" fill="#EA3D2A" />
                        <circle cx="990" cy="10" r="6" fill="#EA3D2A" />
                    </svg>

                    {/* X-Axis Labels */}
                    <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between text-xs font-semibold text-[#64748B] uppercase mb-2">
                        <span>WEEK 1</span>
                        <span>WEEK 2</span>
                        <span>WEEK 3</span>
                        <span>WEEK 4</span>
                        <span>WEEK 5</span>
                        <span>WEEK 6</span>
                    </div>
                </div>
            </div>

            {/* Bottom Grid Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Delivery Options */}
                <div className="bg-white p-4 rounded-md border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] space-y-4">
                    <h4 className="text-base font-semibold text-[#181211]">Delivery Options</h4>
                    <div className="flex flex-col">
                        {[
                            { label: "Same-Day Delivery", count: "98 orders", status: "Active", dotColor: "bg-[#219653]" },
                            { label: "Express Delivery", count: "54 orders", status: "Active", dotColor: "bg-[#0066FF]" },
                            { label: "Shipping", status: "Disabled", dotColor: "bg-[#94A3B8]" },
                        ].map((item, idx) => (
                            <div key={idx} className={`flex items-center justify-between py-3.5 ${idx !== 2 ? 'border-b border-[#E2E8F0]' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                                    <span className="text-sm font-semibold text-[#181211]">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.count && (
                                        <span className={`text-xs font-semibold ${item.status === 'Active' ? (item.dotColor === 'bg-[#0066FF]' ? 'text-[#0066FF]' : 'text-[#219653]') : 'text-[#64748B]'
                                            }`}>
                                            {item.count}
                                        </span>
                                    )}
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase ${item.status === 'Active' ? (item.dotColor === 'bg-[#0066FF]' ? 'bg-[#DAE9FF] text-[#0066FF]' : 'bg-[#CDFFE2] text-[#219653]') : 'text-[#64748B]'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Types & Tags */}
                <div className="bg-white p-4 rounded-md border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] space-y-5">
                    <div className="space-y-3">
                        <h4 className="text-base font-semibold text-[#181211]">Product Types</h4>
                        <div className="flex flex-wrap gap-2">
                            {["Micro dosing", "Gummies", "Capsules"].map(type => (
                                <span key={type} className="px-3 py-1 bg-[#DAE9FF] text-[#0066FF] text-sm font-semibold rounded-lg">{type}</span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3 pt-2">
                        <h4 className="text-[15px] font-bold text-[#181211]">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {["Beginner Friendly", "Lab Tested", "Organic"].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-[#DAE9FF] text-[#0066FF] text-sm font-semibold rounded-lg">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-white p-4 rounded-md border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] space-y-4">
                    <h4 className="text-base font-semibold text-[#181211]">Operating Hours</h4>
                    <div className="flex gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                            <div
                                key={day}
                                className={`w-9 h-9 flex items-center justify-center rounded-sm text-[11px] font-semibold border transition-all ${day === 'Sun' ? 'border-[#E2E8F0] text-[#181211]' : 'bg-[#CDFFE2] border-[#219653] text-[#219653]'
                                    }`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-1 text-sm text-[#181211] font-medium">
                            <Icon icon="mingcute:time-line" width="17" />
                            <span>09:00 - 21:00</span>
                        </div>
                        <div className="flex items-start gap-1 text-sm  text-[#181211] font-medium leading-snug">
                            <Icon icon="stash:pin-place-duotone" width="16" className="shrink-0 mt-0.5" />
                            <span>124 Queen Street West, Unit 3, Toronto</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewStatsContent;
