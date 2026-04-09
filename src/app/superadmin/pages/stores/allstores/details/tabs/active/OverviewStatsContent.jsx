import React from "react";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";

const OverviewStatsContent = () => {
    const chartOptions = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            fontFamily: 'Manrope, sans-serif',
            zoom: { enabled: false }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#EA3D2A']
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100],
                colorStops: [
                    { offset: 0, color: '#EA3D2A', opacity: 0.2 },
                    { offset: 100, color: '#EA3D2A', opacity: 0 }
                ]
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 6,
            colors: ['#EA3D2A'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: { size: 8 }
        },
        xaxis: {
            categories: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5', 'WEEK 6'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#64748B',
                    fontSize: '11px',
                    fontWeight: 600
                }
            },
            crosshairs: {
                show: false
            },
            tooltip: {
                enabled: false
            }
        },
        yaxis: { show: false },
        grid: {
            show: false,
            padding: {
                left: 20,
                right: 20
            }
        },
        tooltip: {
            enabled: true,
            x: {
                show: false
            }
        }
    };

    const chartSeries = [{
        name: 'Revenue',
        data: [3500, 7200, 4800, 8000, 6500, 9500]
    }];

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

                <div className="h-[250px] w-full">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="area"
                        height="100%"
                    />
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
