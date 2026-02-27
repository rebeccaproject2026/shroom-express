// src/components/order/ComplaintModal.jsx
import React, { useState } from 'react';
import Dialog from '../common/Dialog'; // adjust path as needed
import { X } from 'lucide-react';
import { Icon } from '@iconify/react';

const CancelReason = ({ isOpen, onClose, onSubmit, order }) => {
    const [selectedBy, setSelectedBy] = useState('Client'); // default: Client
    const [cancelReasonText, setCancelReasonText] = useState('');
    const [error, setError] = useState('');

    if (!isOpen || !order) return null;

    const handleRadioChange = (value) => {
        setSelectedBy(value);
    };

    const handleSubmit = () => {
        if (!cancelReasonText.trim()) {
            setError('Please enter your complaint');
            return;
        }

        const payload = {
            orderId: order.orderId || order._id,
            driverId: order.driver?._id,
            complainedBy: selectedBy,
            complaint: cancelReasonText.trim(),
            // add timestamp, user info etc. if needed
        };

        onSubmit(payload);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Cancel Reason"
            maxWidth="max-w-[95vw] sm:max-w-[31rem]"
            maxHeight="max-h-[90vh] sm:max-h-[53vh] lg:max-h-[48vh]"
            actions={[
                {
                    icon: X,
                    onClick: onClose,
                    className: "!border-0 !bg-transparent !px-0 !py-0",
                    iconClassName: "w-5 sm:w-6 h-5 sm:h-6 text-gray-500 stroke-[2.5]",
                },
            ]}
        >
            <div className="px-1 pb-2 sm:pb-3.5 space-y-3 sm:space-y-4 text-sm sm:text-[16px] text-[#212121]">
                {/* Complaint by – radio buttons */}
                <div className="space-y-2 sm:space-y-4">
                    <div className="font-medium text-sm sm:text-base text-[#212529]/75">Cancelled by:</div>

                    <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2">
                        {['Client', 'Driver', 'Dispatcher', 'Master'].map((option) => (
                            <label key={option} className="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-[#212529]">
                                <input
                                    type="radio"
                                    name="Please enter cancel reason"
                                    value={option}
                                    checked={selectedBy === option}
                                    onChange={() => handleRadioChange(option)}
                                    className="w-3.5 sm:w-4 h-3.5 sm:h-4 accent-blue-600"
                                />
                                <span className="text-[#212529] text-sm sm:text-base font-medium">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Complaint textarea */}
                <div className="space-y-1 sm:space-y-1.5">
                    <textarea
                        value={cancelReasonText}
                        onChange={(e) => {
                            setCancelReasonText(e.target.value);
                            setError('');
                        }}
                        placeholder="Complaint"
                        rows={3}
                        className={`
              w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-[#DDDDDD] rounded-sm 
              focus:outline-none  resize-y
              ${error ? 'border-red-500' : ''}
            `}
                    />

                    {error && (
                        <p className="text-xs sm:text-sm text-red-600">{error}</p>
                    )}
                </div>
            </div>

            {/* Buttons */}
            {/* Buttons – green & red, full width, rounded, icons */}
            <div className="flex gap-1.5 sm:gap-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 py-2 sm:py-2.5 bg-[#28a745] hover:bg-[#218838] text-white text-sm sm:text-base font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                >
                    <span>✓</span> Yes
                </button>

                <button
                    onClick={onClose}
                    className="flex-1 py-2 sm:py-2.5 bg-[#dc3545] hover:bg-[#c82333] text-white text-sm sm:text-base font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                >
                    <Icon icon="ph:x-bold" width="20" height="20" className="sm:w-6 sm:h-6" /> No
                </button>
            </div>
        </Dialog>
    );
};

export default CancelReason;