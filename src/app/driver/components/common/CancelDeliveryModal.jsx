import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const CancelDeliveryModal = ({ isOpen, onClose, onSubmit, deliveryId }) => {
    const [cancelReasonText, setCancelReasonText] = useState('');
    const [error, setError] = useState('');
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

    const handleSubmit = () => {
        if (!cancelReasonText.trim()) {
            setError('Please enter a cancellation reason');
            return;
        }

        const payload = {
            deliveryId: deliveryId,
            reason: cancelReasonText.trim(),
        };

        onSubmit(payload);
        setCancelReasonText('');
        setError('');
        onClose();
    };

    const handleClose = () => {
        setCancelReasonText('');
        setError('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal Panel */}
            <div
                className={`relative bg-white rounded-[8px] shadow-xl w-full max-w-[450px] transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} overflow-hidden`}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#E8E8E8] flex items-center justify-between">
                    <h3 className="text-[17px] font-bold text-[#3F4753]">Cancel Reason</h3>
                    <button onClick={handleClose} className="text-[#8B8B8B] hover:text-[#3F4753] transition-colors rounded-full p-1 -mr-1">
                        <Icon icon="lucide:x" width="20" className="stroke-[1.5]" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pt-5 pb-7">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] font-medium text-[#777777]">
                            Please enter cancel reason
                        </label>
                        <textarea
                            value={cancelReasonText}
                            onChange={(e) => {
                                setCancelReasonText(e.target.value);
                                setError('');
                            }}
                            placeholder="Type reason here..."
                            rows={4}
                            className={`
                                w-full px-3 py-2.5 text-[14px] text-[#222222] border rounded-[6px] 
                                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y
                                transition-colors
                                ${error ? 'border-red-500' : 'border-[#DDDDDD]'}
                            `}
                        />
                        {error && (
                            <p className="text-[13px] text-red-600 mt-1">{error}</p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex justify-end gap-3 border-t border-[#E8E8E8] bg-gray-50/50">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2.5 bg-white text-[#222222] text-[13px] font-bold rounded-[6px] hover:bg-gray-50 transition-colors border border-[#DDDDDD] shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 text-white text-[13px] font-bold rounded-[6px] shadow-sm transition-colors border border-transparent bg-[#E93E2A] hover:bg-[#D93826]"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelDeliveryModal;
