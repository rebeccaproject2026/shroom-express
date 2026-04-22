import { Icon } from "@iconify/react";

const PromoCodesTab = () => {
    const promoCodes = [
        { code: "WELCOME20", exp: "Dec 31, 2026", type: "% Off", value: "20%", minOrder: "Any", uses: "88/500", revenue: "$2,640", status: "Active" },
        { code: "SPRING15", exp: "Mar 31, 2026", type: "% Off", value: "15%", minOrder: "$50+", uses: "142/300", revenue: "$5,340", status: "Active" },
        { code: "VIP50", exp: "Mar 31, 2026", type: "$ Off", value: "$50", minOrder: "$200+", uses: "34/100", revenue: "$8,400", status: "Active" },
        { code: "FLASH25", exp: "Mar 10, 2026", type: "% Off", value: "25%", minOrder: "$30+", uses: "300/300", revenue: "$9,000", status: "Expired" },
        { code: "FIRSTORDER", exp: "Jun 30, 2026", type: "$ Off", value: "$10", minOrder: "Any", uses: "64/200", revenue: "$1,280", status: "Active" },
        { code: "REFER10", exp: "Dec 31, 2026", type: "% Off", value: "10%", minOrder: "Any", uses: "144", revenue: "$4,320", status: "Active" },
        { code: "BUNDLE30", exp: "Apr 01, 2026", type: "% Off", value: "30%", minOrder: "$100+", uses: "0/150", revenue: "$0", status: "Scheduled" },
    ];

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* ── Sub-Header ── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[15px] font-medium text-[#64748B]">
                    <span className="font-bold text-[#181211]">7</span> codes · <span className="font-bold text-[#219653]">5</span> active
                </div>
            </div>

            {/* ── Table Container ── */}
            <div className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#F8F8F8] border-b border-[#F1F5F9]">
                                {['CODE', 'TYPE', 'VALUE', 'MIN ORDER', 'USES', 'REVENUE', 'STATUS', 'ACTIONS'].map((head) => (
                                    <th key={head} className="py-3 px-4 text-[13px] font-semibold text-[#64748B] uppercase tracking-tight whitespace-nowrap">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {promoCodes.map((promo, idx) => (
                                <tr key={idx} className="">
                                    <td className="py-3 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-[15px]  font-semibold text-[#181211] leading-tight">{promo.code}</span>
                                            <span className="text-[11px] font-medium text-[#64748B] mt-0.5 tracking-tight">Exp: {promo.exp}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${promo.type === '% Off' ? 'bg-[#CDFFE2] text-[#219653]' : 'bg-[#DAE9FF] text-[#0066FF]'
                                            }`}>
                                            {promo.type}
                                        </span>
                                    </td>
                                    <td className="py-3  px-4 text-[15px] font-medium text-[#181211]">{promo.value}</td>
                                    <td className="py-3  px-4 text-[15px] font-medium text-[#181211]">{promo.minOrder}</td>
                                    <td className="py-3  px-4">
                                        <div className="flex flex-col gap-1.5 w-24">
                                            <span className="text-[13px] font-semibold text-[#181211] leading-none">{promo.uses}</span>
                                            <div className="h-[4px] w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${promo.status === 'Expired' ? 'bg-[#EA3D2A]' : 'bg-[#219653]'
                                                        }`}
                                                    style={{ width: promo.uses.includes('/') ? `${(parseInt(promo.uses.split('/')[0]) / parseInt(promo.uses.split('/')[1])) * 100}%` : '100%' }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3  px-4 text-[15px] font-semibold text-[#219653]">{promo.revenue}</td>
                                    <td className="py-3  px-4">
                                        <div className="flex">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${promo.status === 'Active' ? 'bg-white text-[#219653] border-[#219653]' :
                                                promo.status === 'Expired' ? 'bg-white text-[#EA3D2A] border-[#EA3D2A]' :
                                                    'bg-white text-[#64748B] border-[#64748B]'
                                                }`}>
                                                {promo.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3  px-4">
                                        <div className="flex items-center gap-3">
                                            <button className="text-[#181211] hover:text-[#181211] transition-colors">
                                                <Icon icon="heroicons:document-duplicate" width="18" />
                                            </button>
                                            <button className="text-[#181211] hover:text-[#181211] transition-colors">
                                                <Icon icon="heroicons:pencil-square" width="18" />
                                            </button>
                                            <button className="text-[#EA3D2A] hover:text-[#D13524] transition-colors">
                                                <Icon icon="heroicons:trash" width="18" />
                                            </button>
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

export default PromoCodesTab;
