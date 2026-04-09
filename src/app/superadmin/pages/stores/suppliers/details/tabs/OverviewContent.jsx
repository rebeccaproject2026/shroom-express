import React from "react";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";

const OverviewContent = ({ supplier }) => {
    const areaChartOptions = {
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
        dataLabels: { enabled: false },
        markers: {
            size: 6,
            colors: ['#EA3D2A'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: { size: 8 }
        },
        xaxis: {
            categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#64748B',
                    fontSize: '11px',
                    fontWeight: 600
                }
            }
        },
        yaxis: { show: false },
        grid: {
            show: false,
            padding: { left: 10, right: 10 }
        },
        tooltip: { enabled: true }
    };
    const barChartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'Manrope, sans-serif',
            sparkline: { enabled: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
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
            categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
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


    const areaSeries = [{
        name: 'Spend',
        data: [1800, 2200, 2800, 3600, 3100, 4200]
    }];

    const barSeries = [{
        name: 'Orders',
        data: [12, 14, 16, 15, 12, 10, 8]
    }];

    const metrics = [
        {
            label: "Total Spend",
            value: supplier.totalSpendExact,
            trend: "+14% vs last quarter",
            trendColor: "text-[#219653]",
            trendIcon: "lucide:trending-up"
        },
        {
            label: "Total Orders",
            value: supplier.orders,
            trend: "42 orders all time",
            trendColor: "text-[#219653]",
            trendIcon: "lucide:trending-up"
        },
        {
            label: "Avg Order Value",
            value: supplier.avgOrderValue,
            trend: "Per purchase order",
            trendColor: "text-[#219653]",
            trendIcon: "lucide:trending-up"
        },
        {
            label: "Defect Rate",
            value: supplier.defectRate,
            trend: "Well below 2% target",
            trendColor: "text-[#EA3D2A]",
            trendIcon: "lucide:trending-down"
        },
        {
            label: "On-time Rate",
            value: `${supplier.onTime}%`,
            trend: "Best in platform",
            trendColor: "text-[#64748B]",
            trendIcon: ""
        },
    ];

    const companyInfo = [
        { label: "Full Address", value: supplier.address },
        { label: "Email", value: supplier.email },
        { label: "Phone", value: supplier.phone },
        { label: "Website", value: supplier.website, underline: true },
        { label: "Tax ID", value: supplier.taxId },
        { label: "Partner Since", value: supplier.partnerSince },
    ];

    const commercialTerms = [
        { label: "Category", value: supplier.category },
        { label: "Payment Terms", value: supplier.paymentTerms },
        { label: "Lead Time", value: supplier.lead },
        { label: "Min Order", value: supplier.minOrder },
        { label: "On-time Rate", value: `${supplier.onTime}%` },
        { label: "Defect Rate", value: supplier.defectRate },
    ];

    return (
        <div className="space-y-10">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-sm">
                        <p className="text-[#64748B] text-sm font-medium mb-2">{metric.label}</p>
                        <h3 className="text-2xl font-semibold text-[#181211] mb-1">{metric.value}</h3>
                        <div className={`flex items-center gap-1.5 text-[12px] font-semibold ${metric.trendColor}`}>
                            <Icon icon={metric.trendIcon} width="14" />
                            {metric.trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                {/* Monthly Spend Area Chart */}
                <div className="h-[350px] w-full bg-white rounded-md border border-[#E2E8F0]/60 p-4 ">
                    <div className="space-y-4">
                        <div className="px-1">
                            <h4 className="text-xl font-semibold text-[#181211]">Monthly Spend</h4>
                            <p className="text-sm text-[#64748B] font-medium mt-1">Total $ spent with {supplier.name.split(' ')[0]} per month</p>
                        </div>
                        <ReactApexChart
                            options={areaChartOptions}
                            series={areaSeries}
                            type="area"
                            height="100%"
                        />
                    </div>
                </div>

                {/* Orders per Month Bar Chart */}
                <div className="h-[350px] w-full bg-white rounded-md border border-[#E2E8F0]/60 p-4">
                    <div className="space-y-4">
                        <div className="px-1">
                            <h4 className="text-xl font-semibold text-[#181211]">Orders per Month</h4>
                            <p className="text-sm text-[#64748B] font-medium mt-1">Purchase order volume</p>
                        </div>

                        <ReactApexChart
                            options={barChartOptions}
                            series={barSeries}
                            type="bar"
                            height="100%"
                        />
                    </div>
                </div>
            </div>

            {/* Information Grid - Corrected to Match Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-5">
                {/* Company Information */}
                <div className="space-y-5">
                    <h4 className="text-xl font-semibold text-[#181211]">Company Information</h4>
                    <div className="space-y-3">
                        {companyInfo.map((info, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 px-5 border border-[#E2E8F0] rounded-sm bg-white  transition-hover">
                                <span className="text-sm text-[#181211] font-semibold">{info.label}</span>
                                <span className={`text-sm text-[#181211] font-bold text-right max-w-[60%] truncate ${info.underline ? 'underline' : ''}`}>
                                    {info.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Commercial Terms */}
                <div className="space-y-5">
                    <h4 className="text-xl font-semibold text-[#181211]">Commercial Terms</h4>
                    <div className="space-y-3">
                        {commercialTerms.map((info, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 px-5 border border-[#E2E8F0] rounded-sm bg-white transition-hover">
                                <span className="text-sm text-[#181211] font-semibold">{info.label}</span>
                                <span className="text-sm text-[#181211] font-bold text-right">
                                    {info.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Note Alert */}
            <div className="bg-[#DAE9FF] border border-[#0066FF] rounded-md p-2 flex items-start gap-2 shadow-sm">
                <Icon icon="material-symbols:info-outline" width="22" className="text-[#0066FF]" />
                <p className="text-[14px] text-[#0066FF] font-medium leading-relaxed">
                    Note: <span className="font-regular">Primary micro-dosing supplier. <span className="font-semibold underline">COA </span>provided for all batches. Ask for expedited shipping during Q4.</span>
                </p>
            </div>
        </div>
    );
};

export default OverviewContent;
