/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmVariant = "danger", // danger | primary
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Panel */}
            <div
                className={`relative bg-white rounded-[8px] shadow-xl w-full max-w-[420px] transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} overflow-hidden`}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#E8E8E8]  flex items-center justify-between">
                    <h3 className="text-[17px] font-bold text-[#3F4753]">{title}</h3>
                    <button onClick={onClose} className="text-[#8B8B8B] hover:text-[#3F4753] transition-colors rounded-full p-1 -mr-1">
                        <Icon icon="lucide:x" width="20" className="stroke-[1.5]" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pt-6 pb-8">
                    <p className="text-[14px] font-medium text-[#777777] leading-relaxed">{message}</p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex justify-end gap-3 border-t border-[#E8E8E8]">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-white text-[#222222] text-[13px] font-bold rounded-[6px] hover:bg-gray-50 transition-colors border border-[#DDDDDD] shadow-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-6 py-2.5 text-white text-[13px] font-bold rounded-[6px] shadow-sm transition-colors border border-transparent ${confirmVariant === "danger"
                            ? "bg-[#E93E2A] hover:bg-[#D93826]"
                            : "bg-[#1142D4] hover:bg-blue-800"
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
