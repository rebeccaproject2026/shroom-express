import { Icon } from "@iconify/react";

const SegmentsTab = () => {
    const segments = [
        { name: "VIP Members", sub: "Tier = VIP", customers: "4", avgSpend: "$288", engagement: "92%", color: "border-[#F2994A]" },
        { name: "New Customers", sub: "Joined < 30 days", customers: "4", avgSpend: "$54", engagement: "68%", color: "border-[#219653]" },
        { name: "Inactive Users", sub: "Tier = VIP", customers: "3", avgSpend: "$0", engagement: "22%", color: "border-[#94A3B8]" },
        { name: "Frequent Buyers", sub: "Tier = VIP", customers: "6", avgSpend: "$158", engagement: "88%", color: "border-[#3B82F6]" },
        { name: "High Spenders", sub: "Tier = VIP", customers: "3", avgSpend: "$324", engagement: "84%", color: "border-[#EA3D2A]" },
        { name: "Micro-dose Fans", sub: "Tier = VIP", customers: "5", avgSpend: "$112", engagement: "76%", color: "border-[#219653]" },
    ];

    const MetricBox = ({ value, label }) => (
        <div className="bg-[#F8F8F8] rounded-sm p-3 text-center flex-1">
            <div className="text-[17px] font-semibold text-[#181211] leading-none mb-1">{value}</div>
            <div className="text-[11px] font-medium text-[#64748B]">{label}</div>
        </div>
    );

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* ── Sub-Header ── */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[15px] font-medium text-[#64748B]">
                    <span className="font-bold text-[#181211]">{segments.length}</span> segments · click to target
                </div>
                <button className="bg-[#EA3D2A] text-white px-2 py-2.5 rounded-[8px] text-sm font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group">
                    <Icon icon="lucide:plus" width="18" />
                    Create Segment
                </button>
            </div>

            {/* ── Segments Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {segments.map((seg, idx) => (
                    <div
                        key={idx}
                        className={`bg-white rounded-md border  border-t-[5px] ${seg.color} p-5 space-y-5 shadow-sm transition-all`}
                    >
                        {/* Header */}
                        <div>
                            <h3 className="text-lg font-semibold text-[#181211] leading-tight">{seg.name}</h3>
                            <p className="text-[13.5px] font-medium text-[#475569] mt-1.5">{seg.sub}</p>
                        </div>

                        {/* Metrics */}
                        <div className="flex items-center gap-3">
                            <MetricBox value={seg.customers} label="Customers" />
                            <MetricBox value={seg.avgSpend} label="Avg Spend" />
                            <MetricBox value={seg.engagement} label="Engagement" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-1">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-[#EA3D2A] text-white py-2.5 rounded-lg text-sm font-bold shadow-[0px_4px_12px_-2px_#EA3D2A80] hover:bg-[#D13524] transition-all">
                                <Icon icon="nimbus:marketing" width="18" />
                                Campaign
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] text-[#181211] py-2.5 bg-white text-[#475569] rounded-lg text-sm font-semibold  transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33]">
                                <Icon icon="lucide:mail" width="18" />
                                Email
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SegmentsTab;
