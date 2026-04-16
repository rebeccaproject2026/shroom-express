import ReactApexChart from "react-apexcharts";

/* ═══════════════════════════════
   Area chart — Revenue & Trend
   ═══════════════════════════════ */
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

/* ═══════════════════════════════
   Bar chart — Peak Hours / Commission
   ═══════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════
   Main Overview Tab — matches the reference image exactly
   ═══════════════════════════════════════════════════════ */
const OverviewTab = () => {
    /* Order Status Breakdown data */
    const statusLabels = ["Delivered", "Cancelled", "In Transit", "Pending", "Preparing"];
    const statusSeries = [78, 8, 8, 4, 2];
    const statusColors = ["#219653", "#EA3D2A", "#6750A4", "#F2994A", "#0066FF"];
    const statusPercents = ["78%", "8%", "8%", "4%", "2%"];

    const donutOptions = {
        chart: { type: "donut", fontFamily: "Manrope, sans-serif" },
        colors: statusColors,
        labels: statusLabels,
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
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-500">

            {/* ── Row 1 ────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Revenue & Orders Trend */}
                <div className="bg-white rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-3 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Revenue &amp; Orders Trend</h4>
                        <p className="text-sm text-[#64748B] font-medium mt-0.5">Monthly breakdown – Last 7 months</p>
                    </div>
                    <div className="h-[180px]">
                        <ReactApexChart
                            options={areaOptions}
                            series={[{ name: "Revenue ($k)", data: [62, 68, 75, 80, 88, 95] }]}
                            type="area"
                            height="100%"
                        />
                    </div>
                </div>

                {/* Order Status Breakdown */}
                <div className="bg-white rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-3 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Order Status Breakdown</h4>
                        <p className="text-sm text-[#64748B] font-medium mt-0.5">All-time distribution</p>
                    </div>
                    <div className="flex items-center gap-6 flex-1 min-h-0">
                        {/* Donut */}
                        <div className="w-[160px] shrink-0">
                            <ReactApexChart
                                options={donutOptions}
                                series={statusSeries}
                                type="donut"
                                width="100%"
                            />
                        </div>
                        {/* Legend */}
                        <div className="flex flex-col gap-2.5 flex-1">
                            {statusLabels.map((label, i) => (
                                <div key={label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full shrink-0"
                                            style={{ backgroundColor: statusColors[i] }}
                                        />
                                        <span className="text-[13px] font-medium text-[#181211]">{label}</span>
                                    </div>
                                    <span className="text-[13px] font-bold" style={{ color: statusColors[i] }}>
                                        {statusPercents[i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Row 2 ────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Peak Order Hours */}
                <div className="bg-white rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-3 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Peak Order Hours</h4>
                        <p className="text-sm text-[#64748B] font-medium mt-0.5">Average order volume by hour of day</p>
                    </div>
                    <div className="h-[180px]">
                        <ReactApexChart
                            options={{
                                ...barOptions,
                                xaxis: {
                                    ...barOptions.xaxis,
                                    categories: ["9am", "11am", "1pm", "3pm", "5pm", "7pm", "9pm", "11pm"],
                                },
                            }}
                            series={[{ name: "Orders", data: [38, 55, 85, 70, 60, 78, 62, 30] }]}
                            type="bar"
                            height="100%"
                        />
                    </div>
                </div>

                {/* Commission Earned */}
                <div className="bg-white rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-3 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Commission Earned</h4>
                        <p className="text-sm text-[#64748B] font-medium mt-0.5">Monthly platform commission revenue</p>
                    </div>
                    <div className="h-[180px]">
                        <ReactApexChart
                            options={{
                                ...barOptions,
                                xaxis: {
                                    ...barOptions.xaxis,
                                    categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
                                },
                            }}
                            series={[{ name: "Commission ($k)", data: [42, 55, 90, 70, 65, 80, 35] }]}
                            type="bar"
                            height="100%"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
