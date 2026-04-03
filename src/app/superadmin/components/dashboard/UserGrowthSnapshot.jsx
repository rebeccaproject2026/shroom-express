import { Icon } from "@iconify/react";

const UserGrowthSnapshot = () => {
    const data = [
        {
            title: "STORES",
            icon: "mdi:shop-outline",
            stats: [
                { label: "Overall", value: "1,284", color: "text-[#0F172A]" },
                { label: "New", value: "48", color: "text-[#0F172A]" },
                { label: "Active", value: "952", color: "text-[#16A34A]" },
                { label: "Pending", value: "12", color: "text-[#EA580C]" },
            ]
        },
        {
            title: "DRIVERS",
            icon: "mdi:motorbike",
            stats: [
                { label: "Overall", value: "3,520", color: "text-[#0F172A]" },
                { label: "New", value: "156", color: "text-[#0F172A]" },
                { label: "Online Now", value: "412", color: "text-[#16A34A]", showDot: true },
                { label: "Pending", value: "28", color: "text-[#EA580C]" },
            ]
        },
        {
            title: "CUSTOMERS",
            icon: "mdi:user-outline",
            stats: [
                { label: "Overall", value: "42.8k", color: "text-[#0F172A]" },
                { label: "Signups", value: "2,105", color: "text-[#0F172A]" },
                { label: "Active", value: "18.4k", color: "text-[#16A34A]" },
                { label: "Blocked", value: "142", color: "text-[#EF4444]" },
            ]
        }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {data.map((section, idx) => (
                <div key={idx} className="bg-white p-5 rounded-[12px] border border-[#E2E8F0] shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Icon icon={section.icon} width="18" className="text-[#334155]" />
                        <h3 className="text-sm font-semibold text-[#0F172A] uppercase">{section.title}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {section.stats.map((stat, sIdx) => (
                            <div key={sIdx} className="bg-[#F1F5F9] p-3 rounded-xl flex flex-col justify-between min-h-[70px] border border-[#E2E8F0]">
                                <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-regular text-[#64748B] leading-tight">{stat.label}</p>
                                    {stat.showDot && <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>}
                                </div>
                                <h4 className={`text-[20px] font-semibold ${stat.color} font-manrope tracking-wider leading-none mt-2`}>
                                    {stat.value}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserGrowthSnapshot;
