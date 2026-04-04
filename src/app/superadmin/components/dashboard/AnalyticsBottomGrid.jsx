import { Icon } from "@iconify/react";
import GeoPerformance from "./GeoPerformance";

const DeliveryStatsCards = () => {
    const delivery = [
        { label: "Avg Delivery Time", value: "24 min", icon: "solar:clock-circle-bold", color: "text-[#475569]", bg: "bg-[#F1F5F9]" },
        { label: "Late Deliveries", value: "3.2%", icon: "material-symbols:event-busy", color: "text-[#EA3D2A]", bg: "bg-[#FEF2F2]" },
        { label: "On-Time Rate", value: "96.8%", icon: "solar:check-circle-bold", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
        { label: "Acceptance Rate", value: "92.1%", icon: "solar:hand-shake-bold", color: "text-[#2563EB]", bg: "bg-[#EFF6FF]" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 mb-2">
            {delivery.map((item, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg border border-[#E2E8F0] shadow-sm flex items-center gap-2 hover:shadow-md transition-all cursor-default group">
                    <div className={`w-14 h-14 rounded-lg ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform`}>
                        <Icon icon={item.icon} width="26" />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-[12.5px] font-medium text-[#64748B] tracking-tight">{item.label}</p>
                        <h5 className="text-[20px] font-semibold text-[#0F172A] leading-tight tracking-tight">{item.value}</h5>
                    </div>
                </div>
            ))}
        </div>
    );
};

const MarketingStatsCards = () => {
    const marketing = [
        { label: "Active Campaigns", value: "14" },
        { label: "Promo Usage", value: "8.4k" },
        { label: "Campaign Revenue", value: "$102.5k" },
        { label: "Avg CAC", value: "$4.20" },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {marketing.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col justify-center  hover:shadow-md transition-all cursor-default">
                    <p className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide mb-1">{item.label}</p>
                    <h5 className="text-[20px] font-semibold text-[#0F172A] tracking-tight leading-none">{item.value}</h5>
                </div>
            ))}
        </div>
    );
};


const LiveActivityFeed = () => {
    const activities = [
        {
            title: "New Stores Approval",
            desc: "Vendors waiting for identity verification and store setup approval.",
            count: 12,
            color: "text-[#9A3412]",
            descColor: "text-[#C2410C]",
            badgeBg: "bg-[#F97316]",
            bgColor: "bg-[#FFF7ED]",
            borderColor: "border-[#FFEDD5]",
            icon: "mdi:shop-outline",
            link: "Review All",
            linkcolor: "text-[#EA580C]"
        },
        {
            title: "Drivers Pending KYC",
            desc: "Incomplete documentation for vehicle insurance and driver license.",
            count: 28,
            color: "text-[#991B1B]",
            descColor: "text-[#B91C1C]",
            badgeBg: "bg-[#EF4444]",
            bgColor: "bg-[#FEF2F2]",
            borderColor: "border-[#FEE2E2]",
            icon: "streamline:user-identifier-card-remix",
            link: "Review All",
            linkcolor: "text-[#DC2626]"
        },
        {
            title: "Low Performing Stores",
            desc: "Revenue dropped more than 30% this week for these stores.",
            count: 5,
            color: "text-[#1E293B]",
            descColor: "text-[#475569]",
            badgeBg: "bg-[#64748B]",
            bgColor: "bg-[#F8FAFC]",
            borderColor: "border-[#E2E8F0]",
            icon: "mdi:trending-down",
            link: "View Analytics",
            linkcolor: "text-[#475569]"
        },
        {
            title: "High Cancellations",
            desc: "Stores with cancellation rate above 15% in last 24 hours.",
            count: 3,
            color: "text-[#EA3D2A]",
            descColor: "text-[#334155]",
            badgeBg: "bg-[#EA3D2A]",
            bgColor: "bg-[#EA3D2A]/5",
            borderColor: "border-[#EA3D2A]/10",
            icon: "ri:prohibited-line",
            link: "Check Orders",
            linkkolor: "text-[#EA3D2A]"
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow p-4 h-[100%] min-h-[100%]">
            <div className="flex items-start justify-between mb-4">
                <h1 className="text-lg font-semibold text-[#0F172A] tracking-wide leading-none">Live Activity</h1>
                <button
                    className="text-[#FFFFFF]  font-semibold bg-[#EA3D2A] px-3 py-1.5 rounded-md text-sm font-semibolditems-center justify-center cursor-pointer"
                >
                    View All
                </button>
            </div>
            {/* Activities List */}
            <div className="space-y-2 overflow-y-auto pt-3 flex-1 hide-scrollbar border-t border-[#E2E8F0]">
                {activities.map((activity, idx) => (
                    <div
                        key={idx}
                        className={`${activity.bgColor} ${activity.borderColor} border rounded-lg p-2 h-[40%] transition-all hover:shadow-sm cursor-default`}
                    >
                        <div className="flex justify-between items-center mb-1.5">
                            <div className="flex items-center gap-2">
                                <div className={`${activity.color}`}>
                                    <Icon icon={activity.icon} width="22" />
                                </div>
                                <h5 className={`text-base font-extrabold ${activity.color} tracking-tight`}>
                                    {activity.title}
                                </h5>
                            </div>
                            <span className={`w-6 h-6 rounded-full text-[12px] font-extrabold flex items-center justify-center ${activity.badgeBg} text-white shadow-sm shrink-0`}>
                                {activity.count}
                            </span>
                        </div>

                        <p className={`text-[10px] font-medium ${activity.descColor}  mt-1 mb-1`}>
                            {activity.desc}
                        </p>

                        <button className={`text-sm font-bold ${activity.linkcolor || activity.linkkolor || activity.color} hover:underline underline-offset-4 decoration-2 transition-all block`}>
                            {activity.link}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AnalyticsBottomGrid = () => {
    return (
        // <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 font-manrope pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-manrope pt-2">
            {/* Delivery & Marketing Column */}
            <div className="lg:col-span-0.5 space-y-6 pt-4">
                {/* Delivery Section */}
                <div className="space-y-6">
                    <h1 className="text-lg font-semibold text-[#0F172A] tracking-wide leading-none">Delivery Performance</h1>
                    <DeliveryStatsCards />
                </div>

                {/* Marketing Section */}
                <div className="space-y-6">
                    <h1 className="text-lg font-semibold text-[#0F172A] tracking-wide leading-none">Marketing & Promotions</h1>
                    <MarketingStatsCards />
                </div>
            </div>

            {/* GEO Performance */}
            <div className="lg:col-span-1">
                <GeoPerformance />
            </div>

            {/* Live Activity (Increased Width) */}
            <div className="lg:col-span-1">
                <LiveActivityFeed />
            </div>
        </div>
    );
};

export default AnalyticsBottomGrid;
