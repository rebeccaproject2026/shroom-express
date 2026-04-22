import React from "react";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";

// eslint-disable-next-line no-unused-vars
const PerformanceTab = ({ driver }) => {
    const chartOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            colors: ['#EA3D2A'],
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.35,
                opacityTo: 0.05,
                stops: [0, 100],
                colorStops: [
                    { offset: 0, color: "#EA3D2A", opacity: 0.3 },
                    { offset: 100, color: "#EA3D2A", opacity: 0 }
                ]
            }
        },
        markers: {
            size: 8,
            colors: ['#EA3D2A'],
            strokeColors: '#fff',
            strokeWidth: 3,
            hover: { size: 10 }
        },
        xaxis: {
            categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#64748B', fontSize: '13px', fontBold: 500 }
            }
        },
        yaxis: { show: false },
        grid: { show: false },
        tooltip: {
            theme: 'light',
            marker: { show: false },
            x: { show: false }
        }
    };

    const chartSeries = [{
        name: 'Earnings',
        data: [40, 50, 60, 65, 75, 35]
    }];

    const performanceMetrics = [
        {
            label: "On-Time Delivery Rate",
            value: `${driver.onTime || '97'}.0%`,
            percent: driver.onTime || 97,
            color: "#219653"
        },
        {
            label: "Order Completion Rate",
            value: driver.completionRate || "97.3%",
            percent: parseFloat(driver.completionRate) || 97.3,
            color: "#0066FF"
        },
        {
            label: "Customer Rating Score",
            value: driver.rating || "4.9",
            percent: driver.rating ? (parseFloat(driver.rating) / 5 * 100).toFixed(0) : 98,
            color: "#F2994A"
        },
    ];


    const bottomCards = [
        { label: "Avg Delivery Time", value: "14 min", borderColor: "border-[#181211]" },
        { label: "Cancellations", value: "5", borderColor: "border-[#5932EA]" },
        { label: "Avg Earnings/Day", value: "$220", borderColor: "border-[#0066FF]" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Chart Section */}
            <div className="bg-white p-6 rounded-md border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] mb-5">
                <h3 className="text-[22px] font-semibold text-[#181211] mb-8">6-Month Earnings Trend</h3>
                <div className="w-full h-[350px]">
                    <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={350} />
                </div>
            </div>

            {/* Performance Bars */}
            <div className="space-y-6 px-2">
                {performanceMetrics.map((metric, idx) => (
                    <div key={idx} className="space-y-2.5">
                        {/* First Row: Label and Precise Value */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-[#181211] tracking-tight">{metric.label}</span>
                            <span className="text-[14px] font-bold" style={{ color: metric.color }}>{metric.value}</span>
                        </div>

                        {/* Second Row: Bar and Rounded Value */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-[9px] bg-[#F1F5F9] rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${metric.percent}%`,
                                        backgroundColor: metric.color
                                    }}
                                />
                            </div>
                            <span className="text-[13px] font-bold w-[40px] text-right" style={{ color: metric.color }}>
                                {metric.percent}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>



            {/* Bottom Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bottomCards.map((metric, idx) => (
                    <div
                        key={idx}
                        className={`bg-white p-5 rounded-lg border border-t-[5px] ${metric.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}
                    >
                        <p className="text-sm font-medium text-[#475569] mb-2 leading-none">{metric.label}</p>
                        <h3 className={`text-2xl font-semibold ${metric.textColor} leading-none mt-3`}>{metric.value}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceTab;
