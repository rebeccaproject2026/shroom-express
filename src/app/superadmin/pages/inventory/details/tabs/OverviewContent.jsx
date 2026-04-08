import React from "react";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";

const OverviewContent = ({ product }) => {
    const chartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'Manrope, sans-serif',
            sparkline: { enabled: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 12,
                borderRadiusApplication: 'end',
                columnWidth: '85%',
                distributed: false,
            }
        },
        dataLabels: { enabled: false },
        colors: ['#EA3D2A'],
        fill: {
            opacity: 1,
            type: 'solid'
        },
        xaxis: {
            categories: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5', 'WEEK 6'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#475569',
                    fontSize: '11px',
                    fontWeight: 600
                }
            }
        },
        yaxis: {
            show: false
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        legend: { show: false },
        tooltip: { enabled: true }
    };

    const chartSeries = [{
        name: 'Units Sold',
        data: [100, 80, 110, 90, 70, 120]
    }];

    const infoCards = [
        { label: "SKU", value: product.product.sku },
        { label: "Barcode", value: "628462918374" },
        { label: "Category", value: product.category },
        { label: "Unit", value: "Pack" },
        { label: "Pack Weight", value: product.stock.wt.split('/')[0] },
        { label: "Pkg Size", value: product.stock.wt },
        { label: "Store", value: product.store.name },
        { label: "Added By", value: "Alex Morgan" },
        { label: "Date Added", value: "Nov 12, 2025" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Weekly Sales Chart */}
            <div className="bg-white rounded-lg p-6 border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] mb-3">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-[#181211]">Weekly Sales (Units)</h3>
                        <p className="text-sm text-[#64748B] font-medium">Last 6 Week</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-[#F1F5F9] border border-[#F1F5F9] rounded-md text-sm font-semibold text-[#181211] shadow-sm">
                        Last 6 Week <Icon icon="lucide:chevron-down" width="16" />
                    </button>
                </div>
                <div className="h-[300px] w-full">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        height="100%"
                    />
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {infoCards.map((card, idx) => (
                    <div key={idx} className="border border-[#E2E8F0] rounded-md p-2.5 transition-all shadow-sm">
                        <p className="text-sm font-medium text-[#000000] tracking-wider mb-1.5">{card.label}</p>
                        <p className="text-sm font-semibold text-[#181211]">{card.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverviewContent;
