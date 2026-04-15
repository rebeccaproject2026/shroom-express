import React, { useState } from "react";
import { Icon } from "@iconify/react";

const SuspendStoreModal = ({ isOpen, onClose, onConfirm }) => {
    const [selectedReason, setSelectedReason] = useState("Customer complaint escalation");
    const [duration, setDuration] = useState("3 Days");

    const reasons = [
        "Policy violation reported",
        "Fraudulent activity detected",
        "Customer complaint escalation",
        "Failed compliance audit",
        "Owner requested temporary pause",
        "Under investigation",
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-[#181211]/30 animate-in fade-in duration-300"
            onClick={onClose}
        >
            {/* Modal Content */}
            <div
                className="bg-white w-full max-w-[480px] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FFF7E8] rounded-md flex items-center justify-center text-[#F2994A] shrink-0">
                        <Icon icon="carbon:pause-outline" width="24" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-semibold text-[#181211]">Suspend Store</h3>
                        <p className="text-xs text-[#64748B] font-regular leading-none mt-0.5">Store will be hidden from customers temporarily</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-6">
                    {/* Reason Selection */}
                    <div className="space-y-2.5">
                        <label className="text-[14.5px] font-semibold text-[#181211]">
                            Reason for suspension <span className="text-[#EA3D2A]">*</span>
                        </label>
                        <div className="space-y-2.5 mt-2 max-h-[28%] overflow-y-auto pr-1 scrollbar-hide">
                            {reasons.map((reason) => (
                                <div
                                    key={reason}
                                    onClick={() => setSelectedReason(reason)}
                                    className={`flex items-center gap-3 p-2.5 rounded-md border cursor-pointer  transition-all ${selectedReason === reason
                                        ? "border-[#F2994A] bg-[#FFF7E8]/30 text-[#F2994A]"
                                        : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-gray-50"
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedReason === reason
                                        ? "border-[#F2994A]"
                                        : "border-[#E2E8F0]"
                                        }`}>
                                        {selectedReason === reason && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#F2994A]" />
                                        )}
                                    </div>
                                    <span className={`text-[14.5px] font-medium ${selectedReason === reason ? 'text-[#F2994A]' : 'text-[#181211]'}`}>
                                        {reason}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suspension Duration */}
                    <div className="space-y-2.5">
                        <label className="text-[14.5px] font-semibold text-[#181211] ">
                            Suspension Duration
                        </label>
                        <div className="relative">
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full h-11 pl-4 pr-10 text-[14.5px] mt-2 font-semibold text-[#181211] bg-white border border-[#E2E8F0] rounded-md appearance-none focus:outline-none focus:border-[#F2994A] transition-all cursor-pointer"
                            >
                                <option>1 Day</option>
                                <option>3 Days</option>
                                <option>7 Days</option>
                                <option>1 Month</option>
                                <option>Indefinite</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#94A3B8]">
                                <Icon icon="lucide:chevron-down" width="18" />
                            </div>
                        </div>
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
                        onClick={() => { 
                            // Extract numeric value from string (e.g., "3 Days" -> 3)
                            let days = 3650; // default for Indefinite (10 years)
                            if (duration === "1 Month") days = 30;
                            else if (duration.includes("Day")) days = parseInt(duration.split(" ")[0]);
                            
                            onConfirm(selectedReason, days); 
                        }}
                        className="flex-1 px-5 py-2.5 bg-[#F2994A] text-white justify-center rounded-md text-[15px] font-bold shadow-[0px_4px_12px_-2px_#F2994A80] hover:bg-[#F2994A]/90 transition-all flex items-center gap-2 active:scale-95"
                    >
                        Confirm Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuspendStoreModal;
