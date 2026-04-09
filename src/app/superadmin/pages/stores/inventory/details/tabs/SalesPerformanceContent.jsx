import React from "react";
import ReactApexChart from "react-apexcharts";
import { Icon } from "@iconify/react";

// eslint-disable-next-line no-unused-vars
const SalesPerformanceContent = ({ product }) => {
    // Metric cards data
    const metrics = [
        { label: "Total Units Sold", value: "210", trend: "vs last period", trendType: "up", trendColor: "text-[#219653]", sub: "All time" },
        { label: "Total Revenue", value: "$13,020", trend: "vs last period", trendType: "up", trendColor: "text-[#219653]", sub: "All time gross" },
        { label: "Avg Weekly Sales", value: "9", trend: "vs last period", trendType: "up", trendColor: "text-[#F2994A]", sub: "Units / week" },
        { label: "Return Rate", value: "1.4%", trend: "vs last period", trendType: "down", trendColor: "text-[#EA3D2A]", sub: "Below 2% target" },
        { label: "Customer Rating", value: "4.6", hasStar: true, trend: "vs last period", trendType: "up", trendColor: "text-[#219653]", sub: "38 reviews" },
    ];

    // Chart Configuration for Weekly Revenue (Area Chart) - MATCHING StockSupplyContent
    const revenueChartOptions = {
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
    const revenueSeries = [{
        name: 'Revenue',
        data: [3500, 7200, 5800, 7500, 6800, 9500]
    }];

    // Chart Configuration for Units Sold (Bar Chart) - MATCHING OverviewContent
    const unitsChartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'Manrope, sans-serif'
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
        fill: { opacity: 1, type: 'solid' },
        grid: { show: false, padding: { left: 0, right: 0 } },
        xaxis: {
            categories: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5', 'WEEK 6'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#475569', fontSize: '11px', fontWeight: 600 } }
        },
        yaxis: { show: false },
        states: {
            hover: { filter: { type: 'none' } },
            active: { filter: { type: 'none' } }
        },
        tooltip: {
            enabled: true,
            y: { formatter: (val) => `${val} packs` }
        }
    };

    const unitsSeries = [{
        name: 'Units Sold',
        data: [120, 85, 130, 105, 75, 160]
    }];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-white p-4 px-5 rounded-md border border-[#E2E8F0] shadow-sm flex flex-col justify-between ">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-[#475569] ">{m.label}</p>
                            <h3 className="text-2xl font-semibold mt-1.5 text-[#181211] flex items-center gap-1.5">
                                {m.value}
                                {m.hasStar && <Icon icon="material-symbols:star-rounded" className="text-[#F2994A]" width="20" />}
                            </h3>
                        </div>
                        <div className="space-y-1">
                            <div className={`flex items-center gap-1 text-[13px] mt-1 font-semibold ${m.trendColor}`}>
                                <Icon icon={m.trendType === 'up' ? "lucide:trending-up" : "lucide:trending-down"} width="14" />
                                {m.trend}
                            </div>
                            <p className="text-xs mt-2 font-medium text-[#94A3B8]">{m.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Weekly Revenue Chart */}
            <div className="bg-white border border-[#E2E8F0] rounded-md p-6 shadow-sm">
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-[#181211]">Weekly Revenue</h3>
                    <p className="text-sm text-[#64748B] font-medium">Revenue generated per week (last 6 weeks)</p>
                </div>
                <div className="h-[320px] w-full">
                    <ReactApexChart options={revenueChartOptions} series={revenueSeries} type="area" height="100%" />
                </div>
            </div>

            {/* Units Sold Chart */}
            <div className="bg-white border border-[#E2E8F0] rounded-md p-6 shadow-sm">
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-[#181211]">Units Sold Per Week</h3>
                    <p className="text-sm text-[#64748B] font-medium">Pack sold each week</p>
                </div>
                <div className="h-[320px] w-full">
                    <ReactApexChart options={unitsChartOptions} series={unitsSeries} type="bar" height="100%" />
                </div>
            </div>
        </div>
    );
};

export default SalesPerformanceContent;
