import React from "react";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";

// eslint-disable-next-line no-unused-vars
const StockSupplyContent = ({ product }) => {
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
        tooltip: { enabled: true }
    };

    const chartSeries = [{
        name: 'Stock Level',
        data: [35, 62, 48, 60, 55, 85]
    }];

    const metrics = [
        { value: "14 gm", label: "CURRENT STOCK", sub: "60gm / Pack - 30ml extract", color: "#FF9F40" },
        { value: "15 gm", label: "ALERT THRESHOLD", sub: "Triggers low stock alert", color: "#FF9F40" },
        { value: "50 pack", label: "REORDER QTY", sub: "Default order quantity", color: "#0066FF" },
        { value: "100 pack", label: "MAX STOCK", sub: "Capacity ceiling", color: "#219653" },
        { value: "60 gm", label: "PACK WEIGHT", sub: "30-70gm platform rule", color: "#0066FF" },
    ];

    const supplierInfo = [
        { label: "Supplier", value: "EarthDrop Co." },
        { label: "Supplier SKU", value: "EDC-FST-030" },
        { label: "Email", value: "supply@earthdrop.com" },
        { label: "Phone", value: "+1604-322-4400" },
        { label: "Lead Time", value: "3 business days" },
        { label: "Last Restocked", value: "Feb 20, 2026" },
        { label: "Batch No.", value: "BATCH-2026-02" },
        { label: "Expiry Date", value: "Feb 28, 2028" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-center h-[105px]">
                        <h3 className="text-2xl font-semibold leading-none mb-2" style={{ color: m.color }}>{m.value}</h3>
                        <p className="text-sm font-semibold text-[#475569] uppercase tracking-wide mb-1.5">{m.label}</p>
                        <p className="text-xs font-medium text-[#475569] ">{m.sub}</p>
                    </div>
                ))}
            </div>

            {/* Stock Level History Chart */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-[#181211]">Stock Level History</h3>
                        <p className="text-sm text-[#64748B] font-medium">Last 6 Week</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-[#F1F5F9] border border-[#F1F5F9] rounded-md text-sm font-semibold text-[#181211] shadow-sm">
                        Last 6 Week <Icon icon="lucide:chevron-down" width="16" />
                    </button>
                </div>
                <div className="h-[350px] w-full">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="area"
                        height="100%"
                    />
                </div>
            </div>

            {/* Supplier Information Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#181211]">Supplier Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {supplierInfo.map((info, i) => (
                        <div key={i} className="border border-[#E2E8F0] rounded-md p-2.5 transition-all shadow-sm">
                            <p className="text-sm font-medium text-[#000000]  mb-1.5">{info.label}</p>
                            <p className="text-sm font-semibold text-[#181211]">{info.value}</p>
                        </div>
                    ))}
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-[#EA3D2A] text-white rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-red-500/20 mt-2">
                    <Icon icon="material-symbols:local-shipping-outline-rounded" width="20" />
                    Request Restock from EarthDrop Co.
                </button>
            </div>
        </div>
    );
};

export default StockSupplyContent;
