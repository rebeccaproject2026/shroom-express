import ReactApexChart from "react-apexcharts";

const OverviewTab = () => {
    const campaignData = [
        { name: "Referral Program", type: "SMS", expense: "1,920", open: "75.0%", status: "Completed", ctr: "25.0%", leads: "144", revenue: "$6,480" },
        { name: "VIP Exclusive", type: "Push", expense: "420", open: "90.0%", status: "Active", ctr: "45.0%", leads: "62", revenue: "$4,210" },
        { name: "Spring Mix Special", type: "Email", expense: "2,840", open: "40.0%", status: "Active", ctr: "10.0%", leads: "89", revenue: "$3,980" },
        { name: "Win-Back Promo", type: "SMS", expense: "680", open: "80.0%", status: "Paused", ctr: "17.9%", leads: "31", revenue: "$1,488" }
    ];

    // Audience Reach Chart Options
    const reachChartOptions = {
        chart: { type: 'bar', toolbar: { show: false }, fontFamily: "Manrope, sans-serif" },
        plotOptions: { bar: { horizontal: false, columnWidth: '85%', borderRadius: 4 } },
        dataLabels: { enabled: false },
        stroke: { show: false, width: 0 },
        xaxis: {
            categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#64748B", fontSize: "11px", fontWeight: 600 } }
        },
        yaxis: { show: false },
        fill: { opacity: 1 },
        colors: ['#0066FF', '#219653', '#FF9F40'],
        legend: { show: false },
        grid: { borderColor: '#f1f1f1', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } }
    };

    const reachChartSeries = [
        { name: 'Email', data: [180, 155, 180, 180, 180, 200] },
        { name: 'Push', data: [140, 95, 136, 108, 87, 105] },
        { name: 'SMS', data: [100, 180, 95, 198, 145, 148] }
    ];

    // Conversion Rate Chart Options
    const conversionChartOptions = {
        chart: { type: 'area', toolbar: { show: false }, fontFamily: "Manrope, sans-serif", zoom: { enabled: false } },
        colors: ['#EA3D2A'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100],
                colorStops: [
                    { offset: 0, color: "#EA3D2A", opacity: 0.2 },
                    { offset: 100, color: "#EA3D2A", opacity: 0 },
                ],
            }
        },
        xaxis: {
            categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#64748B", fontSize: "11px", fontWeight: 600 } }
        },
        yaxis: { show: false },
        markers: { size: 6, colors: ['#EA3D2A'], strokeColors: '#fff', strokeWidth: 2, hover: { size: 8 } },
        grid: { borderColor: '#f1f1f1', strokeDashArray: 4, show: true, yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } } }
    };

    const conversionChartSeries = [{ name: 'Conversion Rate', data: [31, 40, 28, 51, 42, 109] }];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-manrope">
            {/* Row 1: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Audience Reach */}
                <div className="bg-[#F8F8F8] rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-3 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Audience Reach by Channel</h4>
                        <p className="text-sm text-[#64748B] font-medium mt-0.5">Monthly reach — Email, Push, SMS</p>
                    </div>
                    <div className="bg-[#F8F8F8] border border-[#E2E8F0] rounded-md p-4 flex-1 ">
                        <div className="h-[180px]">
                            <ReactApexChart options={{ ...reachChartOptions, plotOptions: { bar: { ...reachChartOptions.plotOptions.bar, columnWidth: '70%' } } }} series={reachChartSeries} type="bar" height="100%" />
                        </div>
                    </div>
                </div>

                {/* Conversion Rate */}
                <div className="bg-[#F8F8F8] rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-3 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Conversion Rate</h4>
                        <p className="text-sm text-[#64748B] font-medium mt-0.5">% of recipients who ordered</p>
                    </div>
                    <div className="bg-[#F8F8F8] border border-[#E2E8F0] rounded-md p-4 flex-1 ">
                        <div className="h-[180px]">
                            <ReactApexChart options={conversionChartOptions} series={conversionChartSeries} type="area" height="100%" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Table and Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Campaigns Table (Matches Weekly Breakdown Design) */}
                <div className="lg:col-span-2 bg-white rounded-md border border-[#E2E8F0] flex flex-col overflow-hidden">
                    <div className="p-6 pb-4">
                        <h4 className="text-xl font-semibold text-[#181211]">Top Performing Campaigns</h4>
                    </div>
                    <div className="overflow-x-auto flex-1 min-h-0 px-4">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F8F8F8] border-b border-[#F1F5F9]">
                                    {['NAME', 'TYPE', 'EXPENSE', 'OPEN', 'STATUS', 'CTR', 'LEADS', 'REVENUE'].map((head) => (
                                        <th key={head} className="py-3 px-4 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight whitespace-nowrap">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F1F5F9]">
                                {campaignData.map((campaign, idx) => (
                                    <tr key={idx} className={`bg-white`}>
                                        <td className="py-3.5 px-2 text-sm font-medium text-[#181211] block truncate w-20">{campaign.name}</td>
                                        <td className="py-3.5 px-2 text-sm text-[#64748B] font-medium whitespace-nowrap">{campaign.type}</td>
                                        <td className="py-3.5 px-4 text-sm font-semibold text-[#EA3D2A] whitespace-nowrap">{campaign.expense}</td>
                                        <td className="py-3.5 px-4 text-sm font-semibold text-[#64748B] whitespace-nowrap">{campaign.open}</td>
                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <div className="flex">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${campaign.status === 'Active' ? 'bg-white text-[#219653] border-[#219653]' :
                                                    campaign.status === 'Completed' ? 'bg-white text-[#3B82F6] border-[#3B82F6]' :
                                                        'bg-white text-[#F2994A] border-[#F2994A]'
                                                    }`}>
                                                    {campaign.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-6 text-sm font-semibold text-[#64748B] whitespace-nowrap">{campaign.ctr}</td>
                                        <td className="py-3.5 px-6 text-sm font-semibold text-[#64748B] whitespace-nowrap">{campaign.leads}</td>
                                        <td className="py-3.5 px-6 text-sm font-bold text-[#219653] whitespace-nowrap">{campaign.revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Order Status Breakdown (Exactly from Order Reports) */}
                <div className="bg-white rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-3 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Order Status Breakdown</h4>
                        <p className="text-sm text-[#64748B] font-medium mt-0.5">All-time distribution</p>
                    </div>
                    <div className="flex items-center gap-6 flex-1 min-h-0">
                        {/* Donut */}
                        <div className="w-[160px] shrink-0">
                            <ReactApexChart
                                options={{
                                    chart: { type: "donut", fontFamily: "Manrope, sans-serif" },
                                    colors: ["#F2994A", "#0066FF", "#219653"],
                                    labels: ["VIP", "Regular", "New"],
                                    plotOptions: {
                                        pie: {
                                            donut: { size: "68%", labels: { show: false } },
                                            expandOnClick: false,
                                        },
                                    },
                                    dataLabels: { enabled: false },
                                    legend: { show: false },
                                    stroke: { show: false },
                                    tooltip: { enabled: true, theme: "light" },
                                }}
                                series={[27, 46, 27]}
                                type="donut"
                                width="100%"
                            />
                        </div>
                        {/* Legend */}
                        <div className="flex flex-col gap-2.5 flex-1">
                            {[
                                { label: "VIP", color: "#F2994A", percent: "27%" },
                                { label: "Regular", color: "#0066FF", percent: "46%" },
                                { label: "New", color: "#219653", percent: "27%" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-[13px] font-medium text-[#181211]">{item.label}</span>
                                    </div>
                                    <span className="text-[13px] font-bold" style={{ color: item.color }}>
                                        {item.percent}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
