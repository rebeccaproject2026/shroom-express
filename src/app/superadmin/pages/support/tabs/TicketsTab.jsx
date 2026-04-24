import React from "react";
import { Icon } from "@iconify/react";

const TicketCard = ({ title, user, email, status, priority, type, time, id, initial, initialBg }) => {
    return (
        <div className="flex items-center justify-between py-4 px-5 bg-white border border-[#E2E8F0] rounded-xl hover:shadow-sm transition-all group">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Avatar Initial */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${initialBg}`}>
                    {initial}
                </div>

                {/* Ticket Info */}
                <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-[15px] font-bold text-[#181211] leading-tight truncate">{title}</h4>
                    <p className="text-[13px] font-medium text-[#64748B]">
                        {user} · <span className="text-[#64748B]/70">{email}</span>
                    </p>
                    
                    {/* Badges */}
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#219653] bg-[#ECFDF5] text-[#219653] text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {status}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-[#F2994A] bg-[#FFF7ED] text-[#F2994A] text-[11px] font-bold">
                            {priority}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-[#0066FF] bg-[#EFF6FF] text-[#0066FF] text-[11px] font-bold">
                            {type}
                        </span>
                    </div>
                </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                <span className="text-[12px] font-medium text-[#64748B]">{time}</span>
                <div className="flex items-center gap-1 text-[#64748B]">
                     <Icon icon="lucide:message-square" width="14" />
                     <span className="text-[12px] font-bold">5</span>
                </div>
                <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">{id}</span>
            </div>
        </div>
    );
};

const TicketsTab = () => {
    const tickets = [
        {
            initial: "S",
            initialBg: "bg-red-50 text-[#EA3D2A]",
            title: "Forest Oasis store menu not visible",
            user: "Store Manager",
            email: "store@se.ca",
            status: "In Progress",
            priority: "Medium",
            type: "Store",
            time: "1 hr ago",
            id: "TKT003"
        },
        {
            initial: "T",
            initialBg: "bg-red-50 text-[#EA3D2A]",
            title: "Payment failed - Visa card issue",
            user: "Tom Kramer",
            email: "tom.k@email.ca",
            status: "In Progress",
            priority: "Medium",
            type: "Customer",
            time: "3 hrs ago",
            id: "TKT004"
        },
        {
            initial: "A",
            initialBg: "bg-red-50 text-[#EA3D2A]",
            title: "How do I add my delivery address?",
            user: "Aisha Khan",
            email: "aisha.k@email.ca",
            status: "In Progress",
            priority: "Medium",
            type: "Customer",
            time: "1 hr ago",
            id: "TKT003"
        }
    ];

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-[14px] font-medium text-[#181211]">
                    Showing <span className="font-bold">3</span> of <span className="font-bold">7 tickets</span>
                </p>

                <div className="flex items-center gap-3">
                    {['In Progress', 'Medium'].map((filter) => (
                        <div key={filter} className="relative group">
                            <button className="flex items-center justify-between gap-4 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[13px] font-semibold text-[#181211] min-w-[130px] hover:bg-gray-50 transition-all">
                                <span>{filter}</span>
                                <Icon icon="lucide:chevron-down" width="16" className="text-[#64748B]" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tickets List */}
            <div className="flex flex-col gap-3">
                {tickets.map((ticket, idx) => (
                    <TicketCard key={idx} {...ticket} />
                ))}
            </div>
        </div>
    );
};

export default TicketsTab;
