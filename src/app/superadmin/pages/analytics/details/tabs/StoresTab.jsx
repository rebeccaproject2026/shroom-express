import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";

const StoresTab = () => {
    const storeData = [
        { name: "Forest Oasis", orders: 142, revenue: "$6,820", avg: "$48.03", share: "28%", color: "#219653" },
        { name: "Healthy Greens", orders: 118, revenue: "$5,340", avg: "$45.25", share: "22%", color: "#0066FF" },
        { name: "Pure Origins", orders: 96, revenue: "$4,680", avg: "$48.75", share: "19%", color: "#181211" },
        { name: "Bloom Essentials", orders: 84, revenue: "$3,920", avg: "$46.67", share: "16%", color: "#F2994A" },
        { name: "Nature's Best", orders: 62, revenue: "$3,640", avg: "$58.71", share: "15%", color: "#EA3D2A" },
    ];

    const barOptions = {
        chart: { type: 'bar', toolbar: { show: false }, fontFamily: "Manrope, sans-serif" },
        colors: ['#EA3D2A'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '45%',
                distributed: false,
            }
        },
        fill: { opacity: 1 },
        dataLabels: { enabled: false },
        xaxis: {
            categories: storeData.map(s => s.name),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#64748B", fontSize: "11.5px", fontWeight: 600 } }
        },
        yaxis: { show: false },
        grid: { show: false },
        tooltip: { theme: 'light' }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* ── Top Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue by Store */}
                <div className="bg-[#ffffff] rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-2 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Revenue by Store</h4>
                    </div>
                    <div className="flex-1 space-y-6 mt-2">
                        {storeData.map((store) => (
                            <div key={store.name} className="space-y-2">
                                <div className="flex items-center justify-between text-[13px] font-semibold">
                                    <span className="text-[#181211]">{store.name}</span>
                                    <span className="text-[#181211]">{store.revenue}</span>
                                </div>
                                <div className="h-[5.5px] w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{
                                            backgroundColor: store.color,
                                            width: `${(parseInt(store.revenue.replace(/[$,]/g, '')) / 7000) * 100}%`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Orders by Store */}
                <div className="bg-[#ffffff] rounded-md border border-[#E2E8F0]  p-5 flex flex-col">
                    <div className="mb-2 shrink-0">
                        <h4 className="text-xl font-semibold text-[#181211]">Orders by Store</h4>
                    </div>
                    <div className="h-[250px]">
                        <ReactApexChart options={barOptions} series={[{ name: "Orders", data: storeData.map(s => s.orders) }]} type="bar" height="100%" />
                    </div>
                </div>
            </div>

            {/* ── Detailed Table Section ── */}
            <div className="bg-white rounded-md border border-[#E2E8F0] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8F8F8] border-b border-[#F1F5F9]">
                                {['STORE', 'ORDERS', 'REVENUE', 'AVG ORDER', 'SHARE'].map((head) => (
                                    <th key={head} className="py-4 px-6 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight whitespace-nowrap">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="">
                            {storeData.map((store, idx) => (
                                <tr key={idx}>
                                    <td className="py-4 px-6 font-semibold text-[#181211] text-[15px]">{store.name}</td>
                                    <td className="py-4 px-6 text-[15px] font-medium text-[#64748B]">{store.orders}</td>
                                    <td className="py-4 px-6 text-[15px] font-semibold text-[#219653]">{store.revenue}</td>
                                    <td className="py-4 px-6 text-[15px] font-medium text-[#64748B]">{store.avg}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-2 w-20">
                                            <span className="text-[14px] font-semibold text-[#181211] leading-none">{store.share}</span>
                                            <div className="h-[4px] w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#EA3D2A] rounded-full"
                                                    style={{ width: store.share }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StoresTab;
