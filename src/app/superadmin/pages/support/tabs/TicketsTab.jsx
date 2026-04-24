import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ReusableTableSelect from "../../../components/common/ReusableTableSelect";
import TicketChatDrawer from "./TicketChatDrawer";

const TicketCard = ({ title, user, email, status, priority, type, time, id, initial, initialBg, messages, onChatClick }) => {
    return (
        <div className="flex items-center justify-between py-3.5 px-4 transition-all group cursor-pointer">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Avatar Initial */}
                <div className={`w-11 h-11 rounded-full flex items-center mb-4 justify-center text-sm font-bold shrink-0 ${initialBg}`}>
                    {initial}
                </div>

                {/* Ticket Info */}
                <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-[15px] font-semibold text-[#181211] leading-tight truncate">{title}</h4>
                    <p className="text-[13px] font-medium text-[#475569]">
                        {user} · <span className="text-[#475569]">{email}</span>
                    </p>

                    {/* Badges */}
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border-2 border-[#219653] bg-[#FFFFF] text-[#219653] text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {status}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border-2 border-[#F2994A] bg-[#FFF5E3] text-[#F2994A] text-[11px] font-bold">
                            {priority}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border-2 border-[#0066FF] bg-[#DAE9FF] text-[#0066FF] text-[11px] font-bold">
                            {type}
                        </span>
                    </div>
                </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                <span className="text-[12px] font-medium text-[#475569]">{time}</span>
                <div 
                    className="flex items-center gap-0.5 text-[#475569] hover:text-[#EA3D2A] transition-colors cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onChatClick();
                    }}
                >
                    <Icon icon="fluent:chat-16-regular" width="20" />
                    <span className="text-xs font-semibold">{messages}</span>
                </div>
                <span className="text-xs text-[#475569] tracking-wider uppercase">{id}</span>
            </div>
        </div>
    );
};

const TicketsTab = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleChatClick = (ticket) => {
        setSelectedTicket(ticket);
        setIsDrawerOpen(true);
    };

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
            id: "TKT003",
            messages: 5
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
            id: "TKT004",
            messages: 4
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
            id: "TKT003",
            messages: 5
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
                    <ReusableTableSelect
                        value="In Progress"
                        options={['In Progress', 'Open', 'Closed']}
                        className="min-w-[130px]"
                        borderclass="border border-[#E2E8F0] rounded-lg"
                    />
                    <ReusableTableSelect
                        value="Medium"
                        options={['Low', 'Medium', 'High']}
                        className="min-w-[130px]"
                        borderclass="border border-[#E2E8F0] rounded-lg"
                    />
                </div>
            </div>

            {/* Tickets List Container */}
            <div className="bg-white border border-[#E2E8F0] rounded-md overflow-hidden divide-y divide-[#E2E8F0]">
                {tickets.map((ticket, idx) => (
                    <TicketCard 
                        key={idx} 
                        {...ticket} 
                        onChatClick={() => handleChatClick(ticket)}
                    />
                ))}
            </div>

            {/* Chat Drawer */}
            <TicketChatDrawer 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)} 
                ticket={selectedTicket} 
            />
        </div>
    );
};

export default TicketsTab;
