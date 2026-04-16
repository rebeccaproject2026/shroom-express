import React from "react";
import ReactApexChart from "react-apexcharts";
import { Icon } from "@iconify/react";

const DeliveryTab = () => {
    /* ──────────────────────────────────────────────────────────
       1. Delivery Type Trend (Stacked Bar Chart)
       Ref: Styled like RevenueTab bar/area chart basics
       ────────────────────────────────────────────────────────── */
    const stackedBarOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            fontFamily: "Manrope, sans-serif",
            sparkline: { enabled: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                borderRadiusApplication: 'end',
                columnWidth: '40%',
            },
        },
        colors: ["#EA3D2A", "#0066FF", "#219653", "#9333EA"],
        dataLabels: { enabled: false },
        fill: { opacity: 1, type: 'solid' },
        stroke: { show: false },
        grid: {
            show: false,
            padding: { left: 10, right: 10, top: 0, bottom: 0 }
        },
        xaxis: {
            categories: ["Aug'25", "Sep'25", "Oct'25", "Nov'25", "Dec'25", "Jan'26", "Feb'26", "Mar'26"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#64748B', fontSize: '11px', fontWeight: 600 }
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 4,
            labels: {
                formatter: (val) => `${val}%`,
                style: { colors: '#64748B', fontSize: '11px', fontWeight: 600 }
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '15px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 600,
            markers: { radius: 6, width: 18, height: 18 },
            itemMargin: { horizontal: 15, vertical: 25 },
            labels: {
                colors: "#475569"
            }
        },
        tooltip: { enabled: true }
    };

    const stackedBarSeries = [
        { name: 'Express', data: [15, 20, 25, 23, 20, 17, 24, 6] },
        { name: 'Same-day', data: [14, 21, 25, 24, 21, 18, 24, 5] },
        { name: 'Standard', data: [15, 20, 25, 23, 20, 17, 23, 6] },
        { name: 'Scheduled', data: [14, 21, 25, 24, 21, 18, 23, 6] },
    ];

    /* ──────────────────────────────────────────────────────────
       2. Orders by Day of Week (Single Bar Chart)
       Ref: Styled like RevenueTab's Refunds & Cancellations bar chart
       ────────────────────────────────────────────────────────── */
    const dayOfWeekOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: "Manrope, sans-serif",
            sparkline: { enabled: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: "end",
                columnWidth: '85%',
            },
        },
        colors: ["#EA3D2A"],
        dataLabels: { enabled: false },
        fill: { opacity: 1, type: 'solid' },
        grid: { show: false },
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#64748B', fontSize: '11px', fontWeight: 600 }
            }
        },
        yaxis: { show: false },
        tooltip: { enabled: true },
        states: {
            hover: { filter: { type: 'none' } },
            active: { filter: { type: 'none' } },
        }
    };

    const dayOfWeekSeries = [{
        name: 'Orders',
        data: [45, 62, 75, 50, 110, 85, 38]
    }];

    return (
        <div className="space-y-4 animate-in fade-in duration-500 pb-10">
            {/* Delivery Type Trend Card */}
            <div className="bg-white rounded-md border border-[#E2E8F0] p-5 flex flex-col">
                <div className="mb-2 shrink-0">
                    <h3 className="text-xl font-semibold text-[#181211] leading-tight select-none">Delivery Type Trend</h3>
                    <p className="text-sm mt-1 font-medium text-[#64748B] select-none">Monthly share of Express / Same-day / Standard / Scheduled</p>
                </div>
                <div className="h-[380px] w-full mt-4">
                    <ReactApexChart
                        options={stackedBarOptions}
                        series={stackedBarSeries}
                        type="bar"
                        height="100%"
                    />
                </div>
            </div>

            {/* Bottom Row: 3 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Column 1: Delivery Performance */}
                <div className="bg-white rounded-md border border-[#E2E8F0] p-5 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-[#181211] leading-tight select-none">Delivery Performance</h3>
                        <p className="text-sm mt-1 font-medium text-[#64748B] select-none">Period averages</p>
                    </div>

                    <div className="space-y-1 flex-1">
                        {[
                            { label: "Avg Delivery Time", value: "16.4 min", percent: 82, color: "#219653", textColor: "text-[#219653]" },
                            { label: "On-Time Rate", value: "94.2%", percent: 94, color: "#219653", textColor: "text-[#219653]" },
                            { label: "Express Share", value: "48%", percent: 48, color: "#EA3D2A", textColor: "text-[#EA3D2A]" },
                            { label: "Same-Day Share", value: "30%", percent: 30, color: "#0066FF", textColor: "text-[#0066FF]" },
                            { label: "Standard Share", value: "14%", percent: 14, color: "#219653", textColor: "text-[#219653]" },
                            { label: "Cancellation Rate", value: "4.0%", percent: 40, color: "#FF9F40", textColor: "text-[#FF9F40]" },
                        ].map((item, idx) => (
                            <div key={idx} className="mb-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-base font-medium text-[#181211]">{item.label}</span>
                                    <span className={`text-base font-semibold ${item.textColor}`}>{item.value}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-1.5 flex-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                                        />
                                    </div>
                                    <span className={`text-sm font-bold ${item.textColor} min-w-[32px] text-right`}>
                                        {item.percent}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: ETA Accuracy */}
                <div className="bg-white rounded-md border border-[#E2E8F0] p-5  flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-[#181211] leading-tight select-none">ETA Accuracy</h3>
                        <p className="text-sm mt-1 font-medium text-[#64748B] select-none">Orders delivered within promised window</p>
                    </div>

                    <div className="flex-1">
                        {[
                            { label: "Within 5 min of ETA", percent: 64, color: "#219653", textColor: "text-[#219653]" },
                            { label: "5-10 min late", percent: 22, color: "#0066FF", textColor: "text-[#0066FF]" },
                            { label: "10-20 min late", percent: 10, color: "#F59E0B", textColor: "text-[#F59E0B]" },
                            { label: "20+ min late", percent: 4, color: "#EA3D2A", textColor: "text-[#EA3D2A]" },
                        ].map((item, idx) => (
                            <div key={idx} className="mb-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-base font-medium text-[#181211]">{item.label}</span>
                                    <span className={`text-base font-semibold ${item.textColor}`}>{item.percent}%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-1.5 flex-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                                        />
                                    </div>
                                    <span className={`text-[14px] font-bold ${item.textColor} min-w-[32px] text-right`}>
                                        {item.percent}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Success Box */}
                    <div className="p-3 mb-6 bg-[#E0FFED] border border-[#219653] rounded-md flex items-center gap-3">
                        <Icon icon="mage:box-check-fill" className="text-[#219653]" width="26" />
                        <div>
                            <p className="text-[15px] font-semibold text-[#219653]">86% on time</p>
                            <p className="text-[13px] font-medium text-[#219653]">Within 10 min of ETA</p>
                        </div>
                    </div>
                </div>

                {/* Column 3: Orders by Day of Week (Styled like RevenueTab bar) */}
                <div className="bg-white rounded-md border border-[#E2E8F0] p-5 flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-[#181211] leading-tight select-none">Orders by Day of Week</h3>
                        <p className="text-sm mt-1 font-medium text-[#64748B] select-none">Avg weekly volume pattern</p>
                    </div>

                    <div className="h-[240px] w-full flex-1">
                        <ReactApexChart
                            options={dayOfWeekOptions}
                            series={dayOfWeekSeries}
                            type="bar"
                            height="100%"
                        />
                    </div>

                    {/* Alert Box */}
                    <div className="mt-4 p-3 bg-[#FFF7E8] border border-[#D26D0A] rounded-md flex items-center gap-3">
                        <Icon icon="material-symbols:warning-rounded" className="text-[#D26D0A]" width="24" />
                        <p className="text-[14px] font-bold text-[#D26D0A]">Friday & Saturday are peak days</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DeliveryTab;
