import { Icon } from "@iconify/react";

const CampaignsTab = () => {
    const campaigns = [
        {
            name: "Spring Micro-Dose Launch",
            type: "Email",
            status: "Active",
            audience: "All Customers",
            date: "Mar 01, 2026 → Mar 31, 2026",
            budget: "$500",
            spent: "$320",
            utilization: "64%",
            metrics: [
                { label: "Sent", value: "2,840", color: "text-[#181211]" },
                { label: "Opened", value: "1,136", color: "text-[#3B82F6]" },
                { label: "Open Rate", value: "40.0%", color: "text-[#3B82F6]" },
                { label: "Clicked", value: "284", color: "text-[#EA3D2A]" },
                { label: "Converted", value: "89", color: "text-[#F2994A]" },
                { label: "Revenue", value: "$3,980", color: "text-[#219653]" },
            ]
        },
        {
            name: "Spring Micro-Dose Launch",
            type: "Push",
            status: "Active",
            audience: "All Customers",
            date: "Mar 01, 2026 → Mar 31, 2026",
            budget: "$500",
            spent: "$320",
            utilization: "45%",
            metrics: [
                { label: "Sent", value: "2,840", color: "text-[#181211]" },
                { label: "Opened", value: "1,136", color: "text-[#3B82F6]" },
                { label: "Open Rate", value: "40.0%", color: "text-[#3B82F6]" },
                { label: "Clicked", value: "284", color: "text-[#EA3D2A]" },
                { label: "Converted", value: "89", color: "text-[#F2994A]" },
                { label: "Revenue", value: "$3,980", color: "text-[#219653]" },
            ]
        },
        {
            name: "Spring Micro-Dose Launch",
            type: "Email",
            status: "Active",
            audience: "All Customers",
            date: "Mar 01, 2026 → Mar 31, 2026",
            budget: "$500",
            spent: "$320",
            utilization: "44%",
            metrics: [
                { label: "Sent", value: "2,840", color: "text-[#181211]" },
                { label: "Opened", value: "1,136", color: "text-[#3B82F6]" },
                { label: "Open Rate", value: "40.0%", color: "text-[#3B82F6]" },
                { label: "Clicked", value: "284", color: "text-[#EA3D2A]" },
                { label: "Converted", value: "89", color: "text-[#F2994A]" },
                { label: "Revenue", value: "$3,980", color: "text-[#219653]" },
            ]
        },
        {
            name: "Spring Micro-Dose Launch",
            type: "SMS",
            status: "Paused",
            audience: "All Customers",
            date: "Mar 01, 2026 → Mar 31, 2026",
            budget: "$500",
            spent: "$320",
            utilization: "72%",
            metrics: [
                { label: "Sent", value: "2,840", color: "text-[#181211]" },
                { label: "Opened", value: "1,136", color: "text-[#3B82F6]" },
                { label: "Open Rate", value: "40.0%", color: "text-[#3B82F6]" },
                { label: "Clicked", value: "284", color: "text-[#EA3D2A]" },
                { label: "Converted", value: "89", color: "text-[#F2994A]" },
                { label: "Revenue", value: "$3,980", color: "text-[#219653]" },
            ]
        },
        {
            name: "Spring Micro-Dose Launch",
            type: "Push",
            status: "Scheduled",
            audience: "All Customers",
            date: "Mar 01, 2026 → Mar 31, 2026",
            budget: "$500",
            spent: "$320",
            utilization: "0%",
            metrics: [
                { label: "Sent", value: "2,840", color: "text-[#181211]" },
                { label: "Opened", value: "1,136", color: "text-[#3B82F6]" },
                { label: "Open Rate", value: "40.0%", color: "text-[#3B82F6]" },
                { label: "Clicked", value: "284", color: "text-[#EA3D2A]" },
                { label: "Converted", value: "89", color: "text-[#F2994A]" },
                { label: "Revenue", value: "$3,980", color: "text-[#219653]" },
            ]
        },
        {
            name: "Spring Micro-Dose Launch",
            type: "Email",
            status: "Active",
            audience: "All Customers",
            date: "Mar 01, 2026 → Mar 31, 2026",
            budget: "$500",
            spent: "$320",
            utilization: "44%",
            metrics: [
                { label: "Sent", value: "2,840", color: "text-[#181211]" },
                { label: "Opened", value: "1,136", color: "text-[#3B82F6]" },
                { label: "Open Rate", value: "40.0%", color: "text-[#3B82F6]" },
                { label: "Clicked", value: "284", color: "text-[#EA3D2A]" },
                { label: "Converted", value: "89", color: "text-[#F2994A]" },
                { label: "Revenue", value: "$3,980", color: "text-[#219653]" },
            ]
        },
        {
            name: "Spring Micro-Dose Launch",
            type: "SMS",
            status: "Completed",
            audience: "All Customers",
            date: "Mar 01, 2026 → Mar 31, 2026",
            budget: "$500",
            spent: "$320",
            utilization: "99%",
            isCritical: true,
            metrics: [
                { label: "Sent", value: "2,840", color: "text-[#181211]" },
                { label: "Opened", value: "1,136", color: "text-[#3B82F6]" },
                { label: "Open Rate", value: "40.0%", color: "text-[#3B82F6]" },
                { label: "Clicked", value: "284", color: "text-[#EA3D2A]" },
                { label: "Converted", value: "89", color: "text-[#F2994A]" },
                { label: "Revenue", value: "$3,980", color: "text-[#219653]" },
            ]
        }
    ];

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* ── Sub-Header ── */}
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1 text-[15px] font-medium text-[#64748B]">
                    <span className="font-bold text-[#181211]">7</span> total campaigns · <span className="font-bold text-[#219653]">4</span> active
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 mb-4 bg-white text-[#475569] rounded-lg text-sm font-semibold  transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4 border border-[#E2E8F0]/50">
                    <Icon icon="bytesize:export" width="16" />
                    Export CSV
                </button>
            </div>

            {/* ── Campaigns Cards List ── */}
            <div className="space-y-4">
                {campaigns.map((camp, idx) => (
                    <div key={idx} className="bg-white rounded-lg border-2 border-[#E2E8F0] p-3 space-y-5 transition-all">
                        {/* Row 1: Header */}
                        <div className="flex items-center justify-between mb-0.5">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold text-[#181211]">{camp.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2.5 py-0.5 bg-white border text-[11px] font-semibold rounded-full ${camp.type === 'Email' ? 'border-[#0066FF] text-[#0066FF]' :
                                        camp.type === 'Push' ? 'border-[#F2994A] text-[#F2994A]' :
                                            'border-[#64748B] text-[#64748B]'
                                        }`}>{camp.type}</span>
                                    <span className={`px-2.5 py-0.5 bg-white border text-[11px] font-semibold rounded-full ${camp.status === 'Active' ? 'border-[#219653] text-[#219653]' :
                                        camp.status === 'Paused' ? 'border-[#F2994A] text-[#F2994A]' :
                                            camp.status === 'Scheduled' ? 'border-[#0066FF] text-[#0066FF]' :
                                                'border-[#EA3D2A] text-[#EA3D2A]'
                                        }`}>{camp.status}</span>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 active:scale-95">
                                Actions
                                <Icon icon="lucide:chevron-down" width="16" />
                            </button>
                        </div>

                        {/* Row 2: Info */}
                        <div className="text-sm text-[#475569] font-medium">
                            {camp.audience} · {camp.date} · Budget: {camp.budget} ({camp.spent} spent)
                        </div>

                        {/* Row 3: Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                            {camp.metrics.map((m, mIdx) => (
                                <div key={mIdx} className="bg-[#F8F8F8] rounded-md py-4 px-2 flex flex-col items-center justify-center border border-transparent hover:border-[#E2E8F0] transition-all">
                                    <span className={`text-[22px] font-semibold leading-none ${m.color}`}>{m.value}</span>
                                    <span className="text-xs text-[#181211] font-medium mt-2 tracking-wide">{m.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Row 4: Progress Bar */}
                        <div className="space-y-2 mt-4">
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-[#181211]">Budget utilisation</span>
                                <span className="text-[#181211] font-semibold">{camp.utilization}</span>
                            </div>
                            <div className="w-full bg-[#F1F5F9] h-[6px] rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${camp.isCritical ? 'bg-[#EA3D2A]' : 'bg-[#219653]'}`}
                                    style={{ width: camp.utilization }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampaignsTab;
