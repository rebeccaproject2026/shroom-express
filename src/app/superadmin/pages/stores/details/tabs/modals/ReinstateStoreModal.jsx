import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ReinstateStoreModal = ({ isOpen, onClose, onConfirm }) => {
    const [checklist, setChecklist] = useState([
        { id: 1, label: "Non-compliant product listings have been removed", completed: false },
        { id: 2, label: "Owner has acknowledged the violation in writing", completed: false },
        { id: 3, label: "Updated business license submitted", completed: true },
        { id: 4, label: "Compliance review completed by admin", completed: false },
        { id: 5, label: "No active customer disputes remaining", completed: false },
    ]);
    const [adminNote, setAdminNote] = useState("");

    const toggleItem = (id) => {
        setChecklist(prev => prev.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const completedCount = checklist.filter(item => item.completed).length;
    const progress = (completedCount / checklist.length) * 100;

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
                    <div className="w-12 h-12 bg-[#CDFFE2] rounded-md flex items-center justify-center text-[#219653] shrink-0">
                        <Icon icon="charm:tick" width="24" strokeWidth={3} />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-semibold text-[#181211]">Reinstate Store</h3>
                        <p className="text-xs text-[#64748B] font-regular leading-none mt-0.5">Confirm all conditions are met before restoring access</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
                    {/* Warning Banner */}
                    <div className="p-3 bg-[#FFF7E8] border border-[#FFBE40] border-opacity-30 rounded-md flex items-start gap-2.5">
                        <Icon icon="material-symbols:warning-rounded" className="text-[#F2994A] mt-0.5 shrink-0" width="18" />
                        <p className="text-[13px] font-semibold text-[#F2994A] leading-relaxed">
                            Reinstating will immediately make this store visible to customers. Ensure all issues are resolved first.
                        </p>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-1.5">
                        <label className="text-[14.5px] font-semibold text-[#181211]">
                            Reinstatement Checklist <span className="text-[#EA3D2A]">*</span>
                        </label>
                        <div className="space-y-2.5 mt-2">
                            {checklist.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => toggleItem(item.id)}
                                    className={`flex items-center gap-3 p-2.5 rounded-md border cursor-pointer transition-all ${item.completed
                                        ? "border-[#219653] bg-[#CDFFE2] bg-opacity-30 text-[#219653]"
                                        : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-gray-50"
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all shrink-0 ${item.completed
                                        ? "border-[#219653] bg-transparent"
                                        : "border-[#E2E8F0] bg-white"
                                        }`}>
                                        {item.completed && <Icon icon="charm:tick" width="14" strokeWidth={4} />}
                                    </div>
                                    <span className={`text-[14px] font-semibold ${item.completed ? 'text-[#219653]' : 'text-[#181211]'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Admin Note */}
                    <div className="space-y-2.5 mb-2">
                        <label className="text-[14.5px] font-semibold text-[#181211]">
                            Admin Note (visible to store owner)
                        </label>
                        <textarea
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                            placeholder="e.g. Store reinstated after compliance review. All non-compliant listings removed..."
                            className="w-full h-28 p-4 mt-1.5 bg-white border border-[#E2E8F0] rounded-md text-sm outline-none focus:border-[#219653] transition-colors placeholder:text-[#94A3B8] placeholder:text-[13.5px] resize-none"
                        />
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                        <span className="text-[13px] font-bold text-[#64748B]">Checklist progress</span>
                        <div className="flex items-center gap-2 flex-1">
                            <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#219653] transition-all duration-500 rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                        <span className="text-[13px] font-bold text-[#219653] whitespace-nowrap">
                            {completedCount}/{checklist.length}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-5 border-t border-[#E2E8F0] flex gap-4 bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-bold transition-all hover:bg-gray-50 active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className="flex-1 px-5 py-2.5 bg-[#219653] text-white justify-center rounded-md text-sm font-semibold shadow-[0px_4px_12px_-2px_#21965380] hover:bg-[#1B7C44] transition-all flex items-center gap-2 active:scale-95"
                    >
                        Reinstate Store
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReinstateStoreModal;
