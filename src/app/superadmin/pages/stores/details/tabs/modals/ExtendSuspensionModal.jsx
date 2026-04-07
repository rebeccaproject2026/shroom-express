import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ExtendSuspensionModal = ({ isOpen, onClose, onConfirm }) => {
    const [duration, setDuration] = useState("+3 Days");
    const [reason, setReason] = useState("");

    const durations = [
        "+1 Day",
        "+3 Days",
        "+7 Days",
        "+14 Days",
        "+1 Month",
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-[#181211]/30 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-[480px] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#CDFFE2] rounded-md flex items-center justify-center text-[#219653] shrink-0 font-bold">
                        <Icon icon="charm:tick" width="24" strokeWidth={3} />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-semibold text-[#181211]">Extend Suspension</h3>
                        <p className="text-xs text-[#64748B] font-regular leading-none mt-0.5 whitespace-nowrap">Add more time to the current suspension period</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-6">
                    {/* Duration Selection */}
                    <div className="space-y-2.5">
                        <label className="text-[14.5px] font-semibold text-[#181211]">
                            Additional Duration
                        </label>
                        <div className="relative mt-2">
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full h-11 pl-4 pr-10 text-[14.5px] font-semibold text-[#181211] bg-white border border-[#E2E8F0] rounded-md appearance-none focus:outline-none focus:border-[#F2994A] transition-all cursor-pointer"
                            >
                                {durations.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#181211]">
                                <Icon icon="lucide:chevron-down" width="18" strokeWidth={3} />
                            </div>
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2.5">
                        <label className="text-[14.5px] font-semibold text-[#181211]">
                            Reason for extension
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Why is the suspension being extended?"
                            className="w-full h-28 p-4 mt-1.5 bg-white border border-[#E2E8F0] rounded-md text-sm outline-none focus:border-[#F2994A] transition-colors placeholder:text-[#94A3B8] placeholder:text-[13.5px] resize-none font-medium text-[#181211]"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-5 border-t border-[#E2E8F0] flex gap-4 bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-bold transition-all hover:bg-gray-50 active:scale-95"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => { onConfirm(duration, reason); onClose(); }}
                        className="flex-1 px-5 py-2.5 bg-[#F2994A] text-white justify-center rounded-md text-[15.5px] font-bold shadow-[0px_4px_12px_-2px_#F2994A80] hover:bg-[#E88A34] transition-all flex items-center gap-2 active:scale-95"
                    >
                        Extend Suspension
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExtendSuspensionModal;
