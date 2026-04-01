import { Icon } from "@iconify/react";

const transactions = [
    { id: 1, order: "#SH-10234", date: "Mar 20, 2026", amount: +12.50, status: "Completed" },
    { id: 2, order: "#SH-10198", date: "Mar 10, 2026", amount: -8.00,  status: "Redeemed"  },
    { id: 3, order: "#SH-10150", date: "Feb 14, 2026", amount: +7.25,  status: "Completed" },
    { id: 4, order: "#SH-10102", date: "Jan 30, 2026", amount: -15.00, status: "Redeemed"  },
    { id: 5, order: "#SH-10089", date: "Jan 15, 2026", amount: +5.00,  status: "Completed" },
];

const available = transactions
    .filter(t => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

const withdrawn = Math.abs(
    transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0)
);

const ShroomCashPanel = ({ onViewOrders }) => {
    return (
        <div>
            {/* Header — same pattern as WishlistView / OrderHistoryView */}
            <h2 className="text-xl font-bold text-[#181211] mb-5">Shroom's Cash</h2>

            {/* Balance cards side by side */}
            <div className="flex gap-4 mb-6 flex-wrap">
                <div
                    className="flex-1 min-w-[200px] rounded-xl border border-[#E8E8E8] flex items-center gap-4 px-5 py-4"
                    style={{ borderLeft: "4px solid #22C55E", background: "linear-gradient(135deg, #fff 60%, #dcfce7 100%)" }}
                >
                    <div className="w-11 h-11 rounded-lg bg-[#22C55E] flex items-center justify-center shrink-0">
                        <Icon icon="mdi:mushroom-outline" width={22} className="text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-[#22C55E] leading-none mb-0.5">
                            ${available.toFixed(2)}
                        </p>
                        <p className="text-xs text-[#64748B] font-semibold">Available SHROOM CA$H</p>
                    </div>
                </div>

                <div
                    className="flex-1 min-w-[200px] rounded-xl border border-[#E8E8E8] flex items-center gap-4 px-5 py-4"
                    style={{ borderLeft: "4px solid #E93E2B", background: "linear-gradient(135deg, #fff 60%, #fff0ee 100%)" }}
                >
                    <div className="w-11 h-11 rounded-lg bg-[#E93E2B] flex items-center justify-center shrink-0">
                        <Icon icon="mdi:mushroom" width={22} className="text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-[#E93E2B] leading-none mb-0.5">
                            ${withdrawn.toFixed(2)}
                        </p>
                        <p className="text-xs text-[#64748B] font-semibold">Withdrawn SHROOM CA$H</p>
                    </div>
                </div>
            </div>

            {/* Transaction History heading */}
            <div className="flex items-center gap-2 mb-1">
                <Icon icon="mdi:history" width={18} className="text-[#22C55E]" />
                <p className="text-base font-bold text-[#181211]">Transaction History</p>
            </div>
            <p className="text-xs text-[#64748B] mb-4">Track your earnings and transactions.</p>

            {/* Table with Horizontal Scrolling */}
            <div className="border border-[#E8E8E8] rounded-xl overflow-hidden bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
                <div className="overflow-x-auto custom-scrollbar">
                    <div className="min-w-[650px]">
                        {/* Header row */}
                        <div className="grid grid-cols-5 bg-[#F8F9FA] px-4 py-3 border-b border-[#E8E8E8]">
                            {["ORDER NO", "DATE", "EARNED CA$H", "STATUS", "ACTION"].map(h => (
                                <p key={h} className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider m-0">{h}</p>
                            ))}
                        </div>

                        {/* Data rows */}
                        <div className="flex flex-col divide-y divide-[#F1F5F9]">
                            {transactions.map(t => {
                                const isCredit = t.amount > 0;
                                return (
                                    <div
                                        key={t.id}
                                        className="grid grid-cols-5 items-center px-4 py-3 hover:bg-gray-50/50 transition-colors"
                                    >
                                        {/* Order no */}
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center shrink-0">
                                                <Icon icon="mdi:mushroom-outline" width={15} className="text-white" />
                                            </div>
                                            <span className="text-sm font-bold text-[#181211]">{t.order}</span>
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-1.5 text-sm text-[#64748B] font-medium">
                                            <Icon icon="mdi:calendar-outline" width={14} className="text-[#94A3B8]" />
                                            {t.date}
                                        </div>

                                        {/* Amount */}
                                        <div className="flex items-center gap-1.5">
                                            <Icon icon="mdi:mushroom" width={14} className="text-[#22C55E]" />
                                            <span className={`text-sm font-bold ${isCredit ? "text-[#22C55E]" : "text-[#E93E2B]"}`}>
                                                {isCredit ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                                                t.status === "Completed"
                                                    ? "bg-[#DCFCE7] text-[#16A34A]"
                                                    : "bg-[#FFF0EE] text-[#E93E2B]"
                                            }`}>
                                                <Icon
                                                    icon={t.status === "Completed" ? "mdi:check-circle" : "mdi:swap-horizontal"}
                                                    width={12}
                                                />
                                                {t.status}
                                            </span>
                                        </div>

                                        {/* Action */}
                                        <div>
                                            <button
                                                onClick={onViewOrders}
                                                className="text-xs font-bold px-4 py-2 rounded-lg border border-[#E8E8E8] bg-white text-[#181211] hover:bg-gray-50 transition-all active:scale-[0.98] cursor-pointer"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShroomCashPanel;
