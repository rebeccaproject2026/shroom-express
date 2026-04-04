import Chart from "react-apexcharts";
import { Icon } from "@iconify/react";

const OrderCharts = () => {
    // Average Orders Chart Data
    const avgOrdersData = {
        series: [
            {
                name: "Spending($2,543)",
                data: [60, 75, 80, 50, 145, 235, 155, 50, 145, 290, 75, 155, 30, 145, 145, 145, 95, 201, 145, 60, 75, 55, 102, 55, 145, 201, 201, 35, 145, 50],
                color: "#00B159"
            },
            {
                name: "Quantity (43 kg)",
                data: [60, 60, 50, 55, 80, 85, 80, 70, 95, 90, 210, 85, 145, 90, 70, 65, 115, 130, 170, 105, 90, 70, 125, 90, 100, 155, 120, 90, 65, 65],
                color: "#0066FF"
            },
            {
                name: "Collection ($2,320)",
                data: [145, 208, 195, 282, 285, 105, 200, 285, 210, 80, 210, 200, 50, 215, 60, 235, 225, 125, 145, 105, 102, 132, 180, 145, 232, 135, 135, 90, 95, 110],
                color: "#FF9800"
            }
        ],
        categories: Array.from({ length: 30 }, (_, i) => String(i + 1).padStart(2, '0'))
    };

    const avgOrdersOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: 'Manrope, sans-serif'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '65%',
                borderRadius: 6,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: avgOrdersData.categories,
            labels: {
                style: { colors: '#181211', fontSize: '11px' }
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
            title: {
                text: 'Days',
                style: { colors: '#64748B', fontSize: '12px', fontWeight: 600 },
                offsetY: 85
            }
        },
        colors: ["#00B159", "#0066FF", "#FF9800"],
        yaxis: {
            labels: {
                style: { colors: '#181211', fontSize: '11px' }
            },
            min: 0,
            max: 600
        },
        grid: {
            borderColor: '#F1F5F9',
            strokeDashArray: 4,
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: false } }
        },
        legend: {
            show: false // Custom legend used
        },
        fill: { opacity: 1 },
        tooltip: {
            shared: true,
            intersect: false,
        }
    };

    // Orders Distribution Chart Data
    const distributionData = {
        series: [75, 15, 10], // Delivered, Pending, Cancelled
        labels: ["Delivered", "Pending", "Cancelled"]
    };

    const distributionOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'Manrope, sans-serif'
        },
        colors: ["#16A34A", "#EA3D2A", "#F1F5F9"],
        labels: distributionData.labels,
        plotOptions: {
            pie: {
                donut: {
                    size: '80%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#64748B',
                            offsetY: 15
                        },
                        value: {
                            show: true,
                            fontSize: '24px',
                            fontWeight: 800,
                            color: '#181211',
                            offsetY: -15,
                            formatter: () => '4.2k'
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'TOTAL ORDERS',
                            color: '#64748B',
                            formatter: () => '4.2k'
                        }
                    }
                }
            }
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        stroke: { show: false },
        tooltip: { enabled: true }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Average Orders Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold text-[#181211]">Average Orders</h2>
                    </div>

                    {/* Custom Legend for Average Orders */}
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#00B159]"></div>
                            <span className="text-sm font-medium text-[#181211]">Spending($2,543)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#0066FF]"></div>
                            <span className="text-sm font-medium text-[#181211]">Quantity (43 kg)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF9800]"></div>
                            <span className="text-sm font-medium text-[#181211]">Collection ($2,320)</span>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <Chart
                            options={avgOrdersOptions}
                            series={avgOrdersData.series}
                            type="bar"
                            height="100%"
                        />
                    </div>
                    <div className="text-center text-[13px] font-semibold text-[#181211] -mt-4">Days</div>
                </div>
            </div>

            {/* Orders Distribution Chart */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6 flex flex-col">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-[#181211]">Orders Distribution</h2>
                    <p className="text-sm text-[#64748B] font-normal">Status breakdown</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center py-4">
                    <div className="w-full max-w-[240px] relative">
                        <Chart
                            options={distributionOptions}
                            series={distributionData.series}
                            type="donut"
                            width="100%"
                        />
                        {/* Static text in center fallback if needed, but apex handles it */}
                    </div>

                    {/* Distribution Legend */}
                    <div className="w-full space-y-3 mt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#16A34A]"></div>
                                <span className="text-sm font-medium text-[#181211]">Delivered</span>
                            </div>
                            <span className="text-sm font-semibold text-[#181211]">75%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]"></div>
                                <span className="text-sm font-medium text-[#181211]">Pending</span>
                            </div>
                            <span className="text-sm font-semibold text-[#181211]">15%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#EA3D2A]"></div>
                                <span className="text-sm font-medium text-[#181211]">Cancelled</span>
                            </div>
                            <span className="text-sm font-semibold text-[#181211]">10%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCharts;
