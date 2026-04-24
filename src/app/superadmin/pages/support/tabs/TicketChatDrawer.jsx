import React from 'react';
import { Icon } from '@iconify/react';

const TicketChatDrawer = ({ isOpen, onClose, ticket }) => {
    if (!isOpen || !ticket) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end font-manrope">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div className="relative w-full max-w-[480px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                {/* Header Section */}
                <div className="p-6 pb-4 bg-[#FAF8F8] border-b border-[#E8E8E8] flex items-center justify-between relative shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-7 p-1 hover:bg-gray-100 rounded-full transition-colors text-[#181211]"
                    >
                        <Icon icon="lucide:x" width="26" />
                    </button>

                    <div className="pr-10 space-y-2">
                        <h2 className="text-[20px] font-bold text-[#181211] leading-tight tracking-tight">{ticket.title}</h2>
                        <div className="flex items-center text-[13px] font-medium text-[#64748B] gap-2">
                            <span>{ticket.user} · {ticket.email}</span>
                            <span className="text-[#CBD5E1]">|</span>
                            <span>Mar 05, 2026</span>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                            <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#219653] bg-white text-[#219653] text-[11px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#219653]" />
                                {ticket.status}
                            </span>
                            <span className="px-3 py-0.5 rounded-full bg-[#FFF5E3] text-[#F2994A] text-[11px] font-bold">
                                {ticket.priority}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Body - Light Grey Background */}
                <div className="flex-1 bg-[#FFFFFF] p-4 flex flex-col justify-end overflow-hidden">
                    {/* Unified Chat & Input Container */}
                    <div className="bg-white border border-[#E2E8F0] rounded-sm flex flex-col overflow-hidden">
                        {/* Messages Area */}
                        <div className="overflow-y-auto h-80 p-4 space-y-4 custom-scrollbar">
                            {/* Inbound Message */}
                            <div className="flex flex-col gap-1.5 max-w-[98%]">
                                <div className="bg-[#F8F8F8] p-2 pl-2.5 rounded-md border border-[#F1F5F9]">
                                    <p className="text-sm font-medium text-[#181211] mb-1">Store Manager</p>
                                    <p className="text-sm text-[#181211] leading-relaxed">
                                        Hello, I'm having an issue with forest oasis store menu not visible. Can you please help?
                                    </p>
                                </div>
                                <span className="text-xs  text-[#475569] ml-1">Mar 05, 2026</span>
                            </div>

                            {/* Outbound Message */}
                            <div className="flex flex-col items-end gap-1.5 ml-auto max-w-[80%]">
                                <div className="bg-[#FEE2E2] p-2 pl-2.5 rounded-md border border-[#F1F5F9]">
                                    <p className="text-sm font-medium text-[#181211] mb-1 text-right">Alex Morgan (Admin)</p>
                                    <p className="text-[14px] text-[#475569] leading-relaxed text-right">
                                        Hi! I'm looking into this for you right now. I'll have an update within the hour.
                                    </p>
                                </div>
                                <span className="text-xs  text-[#475569] mr-1">10 min ago</span>
                            </div>

                            {/* Typing Indicator */}
                            <div className="bg-[#F1F5F9] w-12 h-8 rounded-full flex items-center justify-center gap-1 mt-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] opacity-60" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] opacity-60" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] opacity-60" />
                            </div>
                        </div>

                        {/* Input Area (Inside the White Box) */}
                        <div className="border-t bg-[#F8F8F8] border-[#E5E7EB] p-4">
                            <textarea
                                placeholder="Type your reply..."
                                className="w-full bg-transparent border-none outline-none text-[15px] text-[#181211] placeholder:text-[#94A3B8] resize-none h-[18px]"
                            />
                        </div>
                    </div>

                    {/* Action Buttons Section - Outside the White Box */}
                    <div className="flex gap-3 pt-3 pb-2">
                        <button className="flex-1 bg-[#E0FFED] text-[#219653] py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border border-[#CDFFE2] shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all active:scale-95">
                            <Icon icon="charm:tick" width="18" />
                            Mark Resolved
                        </button>
                        <button className="flex-1 bg-[#EA3D2A] text-white py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-red-100 transition-all active:scale-95">
                            <Icon icon="fa:mail-reply-all" width="20" />
                            Send Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TicketChatDrawer;
