import { Icon } from "@iconify/react";

const MiniChart = ({ color, heights }) => (
    <div className="flex items-end gap-[3px] h-[35px]">
        {heights.map((h, i) => (
            <div
                key={i}
                className={`w-[7px] rounded-t-[2px] ${color}`}
                style={{ height: `${h}%`, opacity: (i + 1) / heights.length }}
            />
        ))}
    </div>
);

const StatCards = () => {
    const stats = [
        {
            label: "Revenue",
            value: "$428,500.00",
            trend: "+12.5%",
            isPositive: true,
            chartColor: "bg-green-500",
            chartHeights: [40, 70, 50, 90]
        },
        {
            label: "Orders Commission",
            value: "$64,275.00",
            trend: "-2.4%",
            isPositive: false,
            chartColor: "bg-red-400",
            chartHeights: [50, 90, 70, 60]
        },
        {
            label: "Marketing Subscription",
            value: "$12,400.00",
            trend: "+5.1%",
            isPositive: true,
            chartColor: "bg-green-500",
            chartHeights: [30, 60, 80, 100]
        },
        {
            label: "Driver profit",
            value: "$51,875.00",
            trend: "+8.2%",
            isPositive: true,
            chartColor: "bg-green-500",
            chartHeights: [40, 80, 60, 90]
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-[#E2E8F0]  shadow-[0px_1px_2px_0px_#0000000D] transition-all duration-300 group cursor-default">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <p className="text-[#64748B] text-sm font-medium font-manrope">{stat.label}</p>
                            <h3 className="text-2xl font-semibold text-[#0F172A] font-manrope tracking-wide leading-none pt-2">{stat.value}</h3>
                        </div>
                    </div>
                    <div className="flex justify-between items-end mt-5">
                        <div className={`flex items-center gap-1 text-sm font-semibold tracking-wide leading-none ${stat.isPositive ? 'text-[#16A34A]' : 'text-[#EF4444]'
                            }`}>
                            <Icon icon={stat.isPositive ? "mdi:trending-up" : "mdi:trending-down"} width="16" />
                            {stat.trend}
                        </div>

                        <div className="flex items-end">
                            <MiniChart color={stat.chartColor} heights={stat.chartHeights} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;
