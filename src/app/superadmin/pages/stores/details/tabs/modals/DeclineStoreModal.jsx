import React, { useState } from "react";
import { Icon } from "@iconify/react";

const DeclineStoreModal = ({ isOpen, onClose }) => {
    const [selectedReason, setSelectedReason] = useState('Duplicate store account detected');

    const declineReasons = [
        "Missing business license documentation",
        "Address verification failed",
        "Duplicate store account detected",
        "Incomplete owner identification",
        "License number does not match records",
        "Operating area outside service zone",
        "Other (specify below)",
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-[#181211]/30 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-[36%] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FFEDEB] rounded-md flex items-center justify-center text-[#EA3D2A] shrink-0">
                        <Icon icon="typcn:info-outline" width="24" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-semibold text-[#181211]">Decline Store Application</h3>
                        <p className="text-xs text-[#181211] font-regular leading-none">Select a reason that will be sent to the vendor</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-6">
                    {/* Reasons Selection List */}
                    <div className="space-y-2.5 mb-3 max-h-[350px] overflow-y-auto pr-1 select-none scrollbar-hide">
                        {declineReasons.map((reason) => (
                            <label
                                key={reason}
                                onClick={() => setSelectedReason(reason)}
                                className={`flex items-center gap-3 p-2.5 rounded-md border cursor-pointer transition-all ${selectedReason === reason
                                    ? 'bg-[#FEF2F2] border-[#EA3D2A] text-[#EA3D2A]'
                                    : 'bg-white border-[#E2E8F0] text-[#181211]'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${selectedReason === reason
                                    ? 'bg-transparent border-[#EA3D2A]'
                                    : 'bg-white border-[#E2E8F0]'
                                    }`}>
                                    {selectedReason === reason && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#EA3D2A]" />
                                    )}
                                </div>
                                <span className={`text-[14.5px] font-semibold ${selectedReason === reason ? 'text-[#EA3D2A]' : 'text-[#181211]'}`}>
                                    {reason}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* Additional Notes Textarea */}
                    <div className="space-y-2.5">
                        <label className="text-[14.5px] font-semibold text-[#181211]">Additional Notes (visible to vendor)</label>
                        <textarea
                            className="w-full p-4 mt-1.5 bg-white border border-[#E2E8F0] rounded-md text-sm min-h-[120px] outline-none focus:border-[#EA3D2A] transition-colors placeholder:text-[#94A3B8] placeholder:text-[13.5px]"
                            placeholder="Provide Specific instructions for resubmission..."
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-5 border-t border-[#E2E8F0] flex gap-4 bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-bold transition-all hover:bg-gray-50 active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-5 py-2.5 bg-[#EA3D2A] text-white justify-center rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                    >
                        Confirm Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeclineStoreModal;
