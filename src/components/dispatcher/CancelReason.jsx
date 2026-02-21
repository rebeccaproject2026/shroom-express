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
            maxWidth="max-w-[31rem]"
            maxHeight="max-h-[42vh]"         // narrow like screenshot
            actions={[
                {
                    icon: X,
                    onClick: onClose,
                    className: "!border-0 !bg-transparent !px-0 !py-0",
                    iconClassName: "w-6 h-6 text-gray-500 stroke-[2.5]",
                },
            ]}
        >
            <div className="px-1 pb-3.5  space-y-4 text-[16px]  text-[#212121]">
                {/* Complaint by – radio buttons */}
                <div className="space-y-4">
                    <div className="font-medium text-[#212529]/75">Cancelled by:</div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {['Client', 'Driver', 'Dispatcher', 'Master'].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer text-[#212529]">
                                <input
                                    type="radio"
                                    name="Please enter cancel reason"
                                    value={option}
                                    checked={selectedBy === option}
                                    onChange={() => handleRadioChange(option)}
                                    className="w-4 h-4 accent-blue-600"
                                />
                                <span className="text-[#212529] font-medium">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Complaint textarea */}
                <div className="space-y-1.5">
                    <textarea
                        value={cancelReasonText}
                        onChange={(e) => {
                            setCancelReasonText(e.target.value);
                            setError('');
                        }}
                        placeholder="Complaint"
                        rows={3}
                        className={`
              w-full px-3 py-2.5 text-base border border-[#DDDDDD] rounded-sm 
              focus:outline-none  resize-y
              ${error ? 'border-red-500' : ''}
            `}
                    />

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                </div>
            </div>

            {/* Buttons */}
            {/* Buttons – green & red, full width, rounded, icons */}
            <div className="flex gap-2 ">
                <button
                    onClick={handleSubmit}
                    className="flex-1 py-2.5 bg-[#28a745] hover:bg-[#218838] text-white font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <span>✓</span> Yes
                </button>

                <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-[#dc3545] hover:bg-[#c82333] text-white font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <Icon icon="ph:x-bold" width="24" height="24" /> No
                </button>
            </div>
        </Dialog>
    );
};

export default CancelReason;