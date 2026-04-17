import React from "react";
import ReactApexChart from "react-apexcharts";

const SpendTab = ({ customer }) => {
    const metrics = [
        {
            label: "Lifetime Spend",
            value: customer.totalSpent || "$1,680.00",
            borderColor: "border-[#219653]",
            textColor: "text-[#219653]"
        },
        {
            label: "Total Orders",
            value: customer.orders || "31",
            borderColor: "border-[#0066FF]",
            textColor: "text-[#0066FF]"
        },
        {
            label: "Avg Order Value",
            value: customer.avgOrder || "$54.19",
            borderColor: "border-[#F2994A]",
            textColor: "text-[#F2994A]"
        },
        {
            label: "Avg per Month",
            value: "$280.00",
            borderColor: "border-[#9333EA]",
            textColor: "text-[#9333EA]"
        },
    ];

    const chartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 12,
                borderRadiusApplication: 'around',
                columnWidth: '98%',
            }
        },

        dataLabels: { enabled: false },
        colors: ['#EA3D2A'],
        fill: { opacity: 1, type: "solid" },
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
            y: {
                formatter: function (val) { return "$" + val }
            }
        }
    };

    const chartSeries = [{
        name: 'Spend',
        data: [270, 300, 380, 220, 400, 450]
    }];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Metric Cards Row — Now matching DriverReportTab style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => (
                    <div
                        key={idx}
                        className={`bg-white p-5 rounded-lg border border-t-[5px] ${metric.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}
                    >
                        <p className="text-sm font-medium text-[#475569] mb-2 leading-none">{metric.label}</p>
                        <h3 className={`text-2xl font-bold ${metric.textColor} leading-none mt-4`}>{metric.value}</h3>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="pt-2">
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[#181211] leading-tight select-none">Monthly Spend (Last 6 Months)</h3>
                    <p className="text-sm mt-1 font-medium text-[#64748B] select-none">Avg Monthly volume pattern</p>
                </div>

                <div className="w-full h-[350px] -ml-2">
                    <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
                </div>
            </div>
        </div>
    );
};

export default SpendTab;
