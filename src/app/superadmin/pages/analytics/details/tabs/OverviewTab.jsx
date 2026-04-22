import ReactApexChart from "react-apexcharts";

const OverviewTab = () => {
    // Chart 1: Revenue & Orders
    const mainChartOptions = {
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
            categories: ['SEPT', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#64748B", fontSize: "11px", fontWeight: 700 } },
            tooltip: { enabled: false }
        },
        yaxis: { show: false },
        markers: { size: 0, hover: { size: 6 } },
        grid: { borderColor: '#f1f1f1', strokeDashArray: 4, show: true, yaxis: { lines: { show: false } }, xaxis: { lines: { show: false } } }
    };

    // Chart 2: Delivery Mix
    const donutOptions = {
        chart: { type: "donut", fontFamily: "Manrope, sans-serif" },
        colors: ["#F2994A", "#0066FF", "#219653", "#EA3D2A"],
        labels: ["Express", "Same-day", "Standard", "Scheduled"],
        plotOptions: {
            pie: {
                donut: { size: "75%", labels: { show: false } },
                expandOnClick: false,
            },
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        stroke: { show: false },
        tooltip: { enabled: true, theme: "light" },
    };

    // Chart 3: Platform Health
    const radarOptions = {
        chart: { type: 'radar', toolbar: { show: false }, fontFamily: "Manrope, sans-serif" },
        colors: ['#EA3D2A'],
        plotOptions: {
            radar: {
                size: 120,
                polygons: {
                    strokeColors: '#E2E8F0',
                    strokeWidth: 1,
                    connectorColors: '#E2E8F0',
                    fill: { colors: ['transparent', 'transparent'] }
                }
            }
        },
        markers: { size: 0 },
        fill: { opacity: 0.3 },
        stroke: { width: 4 },
        xaxis: {
            categories: ['Revenue', 'Orders', 'Customers', 'Drivers', 'Stores', 'On-Time'],
            labels: {
                style: {
                    colors: ["#181211", "#181211", "#181211", "#181211", "#181211", "#181211"],
                    fontSize: "13px",
                    fontWeight: 700
                }
            }
        },
        yaxis: { show: false, min: 0, max: 100, tickAmount: 4 },
        grid: { show: false }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Monthly Performance Chart */}
            <div className="bg-[#ffffff] rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                <div className="mb-3 shrink-0">
                    <h4 className="text-xl font-semibold text-[#181211]">Revenue & Orders — Monthly</h4>
                    <p className="text-sm text-[#64748B] font-medium mt-0.5">8-month platform performance</p>
                </div>
                <div className="h-[260px]">
                    <ReactApexChart options={mainChartOptions} series={[{ name: "Revenue", data: [52, 42, 53, 37, 45, 38, 45] }]} type="area" height="100%" />
                </div>
            </div>

            {/* Bottom Row Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Delivery Mix */}
                <div className="bg-[#ffffff] rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-2 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Delivery Mix</h4>
                        <p className="text-sm text-[#64748B] font-medium mt-0.5">This month by type</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center relative mb-1">
                        <div className="w-[220px]">
                            <ReactApexChart options={donutOptions} series={[48, 30, 14, 8]} type="donut" width="100%" />
                        </div>
                        {/* Custom Legend */}
                        <div className="w-full mt-4 space-y-2">
                            {[
                                { label: "Express", color: "#F2994A", value: "48%" },
                                { label: "Same-day", color: "#0066FF", value: "30%" },
                                { label: "Standard", color: "#219653", value: "14%" },
                                { label: "Scheduled", color: "#EA3D2A", value: "8%" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-sm font-semibold text-[#64748B]">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Platform Health */}
                <div className="bg-[#ffffff] rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-2 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Platform Health</h4>
                    </div>
                    <div className="h-[320px] flex items-center justify-center">
                        <ReactApexChart options={radarOptions} series={[{ name: 'Health', data: [95, 85, 65, 80, 95, 95] }]} type="radar" height="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
