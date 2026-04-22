import React from "react";
import ReactApexChart from "react-apexcharts";

const OperationStatCard = ({ label, value, description }) => (
    <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] flex flex-col gap-1.5 shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05)] transition-all hover:shadow-md h-full">
        <p className="text-[#64748B] text-base font-medium">{label}</p>
        <h3 className="text-[25px] font-semibold text-[#181211] leading-tight">{value}</h3>
        <p className="text-[#94A3B8] text-[13px] font-medium">{description}</p>
    </div>
);

const OperationsTab = () => {
    const chartOptions = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            fontFamily: "Manrope, sans-serif",
            zoom: { enabled: false },
            sparkline: { enabled: false }
        },
        colors: ['#0066FF', '#219653'], // Blue and Green
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3.5 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.05,
                stops: [0, 90, 100],
                colorStops: [
                    [
                        { offset: 0, color: "#0066FF", opacity: 0.3 },
                        { offset: 100, color: "#0066FF", opacity: 0 }
                    ],
                    [
                        { offset: 0, color: "#219653", opacity: 0.3 },
                        { offset: 100, color: "#219653", opacity: 0 }
                    ]
                ]
            }
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            hover: { size: 8 }
        },
        xaxis: {
            categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: "#64748B", fontSize: "11px", fontWeight: 800, cssClass: 'tracking-wider' },
                offsetY: 5
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
        legend: { show: false },
        tooltip: { theme: 'light', x: { show: false } }
    };
    const series = [
        { name: 'System Uptime', data: [35, 55, 42, 58, 50, 85] },
        { name: 'Response Rate', data: [25, 45, 32, 48, 42, 68] }
    ];
    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-manrope">
            {/* ── Operational Efficiency Metrics ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                <OperationStatCard label="Avg Session" value="4.2 min" description="Per admin user" />
                <OperationStatCard label="Page Views" value="12,840" description="This month" />
                <OperationStatCard label="Actions Taken" value="3,241" description="CRUD operations" />
                <OperationStatCard label="Error Rate" value="0.08%" description="System errors" />
            </div>

            {/* ── Operations Health Chart ── */}
            <div className="bg-[#ffffff] rounded-md border border-[#E2E8F0] p-5 flex flex-col">
                <div className="mb-3 shrink-0">
                    <h4 className="text-xl font-semibold text-[#181211]">Monthly Growth — Orders & Customers</h4>
                </div>
                <div className="h-[400px] w-full">
                    <ReactApexChart options={chartOptions} series={series} type="area" height="100%" />
                </div>
            </div>
        </div>
    );
};

export default OperationsTab;
