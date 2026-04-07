import React from "react";
import { Icon } from "@iconify/react";

const StatsPerformanceContent = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Suspended Stats Warning Banner */}
            <div className="p-2 bg-[#FFF7E8] border border-[#FFF7E8] rounded-md mb-3">
                <div className="flex flex-col space-y-1 px-2">
                    <p className="text-base font-semibold text-[#F2994A] mb-0.5">
                        Revenue and order data shown here reflects performance before the suspension.
                    </p>
                    <p className="text-sm text-[#F2994A] opacity-80 font-medium">
                        No new data is being collected.
                    </p>
                </div>
            </div>

            {/* Revenue Trend Chart Section */}
            <div className="bg-white p-6 rounded-md border border-[#F1F5F9] shadow-[0px_1px_2px_0px_#0000000D] mb-2.5">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-[#181211] mb-0.5">Revenue Trend</h3>
                        <p className="text-sm text-[#64748B] font-medium">Last 6 Week</p>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F5F9] border border-[#F1F5F9] rounded-md text-sm font-semibold text-[#181211] shadow-sm">
                        Last 6 Week <Icon icon="lucide:chevron-down" width="16" />
                    </button>
                </div>

                {/* SVG Chart (Consistent with Active Store View) */}
                <div className="relative h-[35%] w-full px-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 250" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="suspendedChartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EA3D2A" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#EA3D2A" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Smooth Cubic Bezier Path */}
                        <path
                            d="M0,210 C100,210 120,55 200,55 C280,55 320,135 400,135 C480,135 520,55 600,55 C680,55 720,105 800,105 C880,105 920,230 1000,230"
                            fill="none"
                            stroke="#EA3D2A"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />

                        {/* Gradient Fill Path */}
                        <path
                            d="M0,210 C100,210 120,55 200,55 C280,55 320,135 400,135 C480,135 520,55 600,55 C680,55 720,105 800,105 C880,105 920,230 1000,230 V250 H0 Z"
                            fill="url(#suspendedChartGradient)"
                        />

                        {/* Data Points (Matching the curve) */}
                        <circle cx="10" cy="210" r="6" fill="#EA3D2A" />
                        <circle cx="200" cy="55" r="6" fill="#EA3D2A" />
                        <circle cx="400" cy="135" r="6" fill="#EA3D2A" />
                        <circle cx="600" cy="55" r="6" fill="#EA3D2A" />
                        <circle cx="800" cy="105" r="6" fill="#EA3D2A" />
                        <circle cx="990" cy="230" r="6" fill="#EA3D2A" />
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
        </div>
    );
};

export default StatsPerformanceContent;
