import React, { useState } from 'react';
import Dialog from './Dialog';
import { X } from 'lucide-react';
import { Icon } from '@iconify/react';

const CancelDeliveryModal = ({ isOpen, onClose, onSubmit, deliveryId }) => {
    const [cancelReasonText, setCancelReasonText] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

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
        onClose();
        setCancelReasonText(''); // Reset state after closing
        setError('');
    };

    const handleClose = () => {
        setCancelReasonText('');
        setError('');
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={handleClose}
            title="Cancel Reason"
            maxWidth="max-w-[95vw] sm:max-w-[31rem]"
            maxHeight="max-h-[90vh] sm:max-h-[auto] lg:max-h-[auto] h-auto"
            actions={[
                {
                    icon: X,
                    onClick: handleClose,
                    className: "!border-0 !bg-transparent !px-0 !py-0",
                    iconClassName: "w-5 sm:w-6 h-5 sm:h-6 text-gray-500 stroke-[2.5]",
                },
            ]}
        >
            <div className="px-1 pb-2 sm:pb-3.5 space-y-3 sm:space-y-4 text-sm sm:text-[16px] text-[#212121]">
                {/* Cancel Reason textarea */}
                <div className="space-y-1 sm:space-y-1.5 flex flex-col mt-2">
                    <label className="font-medium text-sm sm:text-base text-[#212529]/75 mb-1">Please enter cancel reason</label>
                    <textarea
                        value={cancelReasonText}
                        onChange={(e) => {
                            setCancelReasonText(e.target.value);
                            setError('');
                        }}
                        placeholder="Cancel Reason"
                        rows={3}
                        className={`
                            w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-[#DDDDDD] rounded-[4px] 
                            focus:outline-none resize-y
                            ${error ? 'border-red-500' : ''}
                        `}
                    />

                    {error && (
                        <p className="text-xs sm:text-sm text-red-600">{error}</p>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-1.5 sm:gap-2 mt-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 py-2 sm:py-2.5 bg-[#28a745] hover:bg-[#218838] text-white text-sm sm:text-base font-semibold rounded-[4px] transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                >
                    <span>✓</span> Yes
                </button>

                <button
                    onClick={handleClose}
                    className="flex-1 py-2 sm:py-2.5 bg-[#dc3545] hover:bg-[#c82333] text-white text-sm sm:text-base font-semibold rounded-[4px] transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                >
                    <Icon icon="ph:x-bold" width="20" height="20" className="sm:w-6 sm:h-6" /> No
                </button>
            </div>
        </Dialog>
    );
};

export default CancelDeliveryModal;
