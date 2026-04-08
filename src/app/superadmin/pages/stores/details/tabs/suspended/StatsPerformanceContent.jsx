import React from "react";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";

const StatsPerformanceContent = () => {
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
        data: [4200, 3100, 5800, 4200, 6100, 3800]
    }];

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

                <div className="h-[250px] w-full">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="area"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default StatsPerformanceContent;
