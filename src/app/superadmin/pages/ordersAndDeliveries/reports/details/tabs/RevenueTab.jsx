import ReactApexChart from "react-apexcharts";

/* ─── Area chart — full-width Revenue & Orders Trend ─── */
const areaOptions = {
    chart: {
        type: "area",
        toolbar: { show: false },
        fontFamily: "Manrope, sans-serif",
        zoom: { enabled: false },
    },
    stroke: { curve: "smooth", width: 3, colors: ["#EA3D2A"] },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100],
            colorStops: [
                { offset: 0, color: "#EA3D2A", opacity: 0.2 },
                { offset: 100, color: "#EA3D2A", opacity: 0 },
            ],
        },
    },
    dataLabels: { enabled: false },
    markers: {
        size: 6,
        colors: ["#EA3D2A"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: { size: 8 },
    },
    xaxis: {
        categories: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: "#64748B", fontSize: "11px", fontWeight: 600 } },
    },
    yaxis: { show: false },
    grid: { show: false, padding: { left: 10, right: 10 } },
    tooltip: { enabled: true },
};

/* ─── Bar chart — Refunds & Cancellations ─── */
const barOptions = {
    chart: {
        type: "bar",
        toolbar: { show: false },
        fontFamily: "Manrope, sans-serif",
        sparkline: { enabled: false },
    },
    plotOptions: {
        bar: {
            borderRadius: 8,
            borderRadiusApplication: "end",
            columnWidth: "85%",
            distributed: false,
        },
    },
    dataLabels: { enabled: false },
    colors: ["#EA3D2A"],
    fill: { opacity: 1, type: "solid" },
    xaxis: {
        categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: "#475569", fontSize: "11px", fontWeight: 600 } },
    },
    yaxis: { show: false },
    grid: { show: false, padding: { left: 0, right: 0 } },
    states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
    },
    legend: { show: false },
    tooltip: { enabled: true },
};

/* ─── Monthly Revenue Breakdown table data ─── */
const tableRows = [
    { month: "Mar '26", revenue: "$18,400", orders: 436, commission: "$2,208", cancelled: 10 },
    { month: "Feb '26", revenue: "$15,900", orders: 378, commission: "$1,908", cancelled: 13 },
    { month: "Jan '26", revenue: "$14,200", orders: 342, commission: "$1,704", cancelled: 16 },
    { month: "Dec '25", revenue: "$16,800", orders: 398, commission: "$2,016", cancelled: 18 },
    { month: "Nov '25", revenue: "$13,600", orders: 321, commission: "$1,632", cancelled: 11 },
    { month: "Oct '25", revenue: "$11,200", orders: 268, commission: "$1,344", cancelled: 14 },
    { month: "Sep '25", revenue: "$9,880", orders: 234, commission: "$1,186", cancelled: 9 },
    { month: "Aug '25", revenue: "$8,420", orders: 201, commission: "$1,010", cancelled: 12 },
];

const RevenueTab = () => (
    <div className="space-y-4 animate-in fade-in duration-500">

        {/* ── Row 1: Full-width Revenue & Orders Trend ── */}
        <div className="bg-white rounded-md border border-[#E2E8F0] p-5 flex flex-col">
            <div className="mb-2 shrink-0">
                <h4 className="text-xl font-semibold text-[#181211]">Revenue &amp; Orders Trend</h4>
                <p className="text-sm text-[#475569] font-medium mt-0.5">Monthly breakdown – Last 7 months</p>
            </div>
            <div className="h-[220px]">
                <ReactApexChart
                    options={areaOptions}
                    series={[{ name: "Revenue ($)", data: [9880, 11200, 13600, 16800, 14200, 15900] }]}
                    type="area"
                    height="100%"
                />
            </div>
        </div>

        {/* ── Row 2: Monthly Revenue Breakdown (left) + Refunds & Cancellations (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Monthly Revenue Breakdown table */}
            <div className="bg-white rounded-md border border-[#E2E8F0] p-5">
                <div className="mb-4">
                    <h4 className="text-xl font-semibold text-[#181211]">Monthly Revenue Breakdown</h4>
                    <p className="text-sm text-[#475569] font-medium mt-0.5">Revenue, orders, commission, and cancellations by month</p>
                </div>
                <div className="rounded-lg border border-[#E2E8F0] overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F8FAFC]">
                                <th className="text-left text-[13px] font-bold text-[#475569] px-4 py-3">Month</th>
                                <th className="text-left text-[13px] font-bold text-[#475569] px-4 py-3">Revenue</th>
                                <th className="text-left text-[13px] font-bold text-[#475569] px-4 py-3">Orders</th>
                                <th className="text-left text-[13px] font-bold text-[#475569] px-4 py-3">Commission</th>
                                <th className="text-left text-[13px] font-bold text-[#475569] px-4 py-3">Cancelled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((row, i) => (
                                <tr
                                    key={row.month}
                                    className={` ${i === 0 ? "bg-[#FFFBF5]" : "bg-white"}`}
                                >
                                    <td className="px-4 py-2 text-[13px] font-medium text-[#181211] whitespace-nowrap">{row.month}</td>
                                    <td className="px-4 py-2 text-[13px] font-semibold text-[#22c55e] whitespace-nowrap">{row.revenue}</td>
                                    <td className="px-4 py-2 text-[13px] font-medium text-[#181211]">{row.orders}</td>
                                    <td className="px-4 py-2 text-[13px] font-semibold text-[#0066FF] whitespace-nowrap">{row.commission}</td>
                                    <td className="px-4 py-2 text-[13px] font-medium text-[#EA3D2A]">{row.cancelled}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Refunds & Cancellations */}
            <div className="bg-white rounded-md border border-[#E2E8F0] p-5 flex flex-col">
                <div className="mb-2 shrink-0">
                    <h4 className="text-xl font-semibold  text-[#181211]">Refunds &amp; Cancellations</h4>
                    <p className="text-sm text-[#475569] font-medium mt-0.5">Monthly refund volume</p>
                </div>
                <div className="h-[200px]">
                    <ReactApexChart
                        options={barOptions}
                        series={[{ name: "Refunds ($)", data: [620, 780, 1050, 920, 1100, 880, 340] }]}
                        type="bar"
                        height="100%"
                    />
                </div>
                {/* Summary stats at bottom */}
                <div className="flex items-center gap-8 mt-4 pt-4 border-t border-[#F1F5F9]">
                    <div>
                        <p className="text-[22px] font-semibold text-[#EA3D2A] leading-tight">$1,242</p>
                        <p className="text-[13px] font-medium text-[#475569] mt-0.5">Total Refunded</p>
                    </div>
                    <div>
                        <p className="text-[22px] font-bold text-[#f59e0b] leading-tight">1.2%</p>
                        <p className="text-[13px] font-medium text-[#475569] mt-0.5">Refund Rate</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default RevenueTab;
