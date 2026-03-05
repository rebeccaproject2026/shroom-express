// src/components/order/ComplaintModal.jsx
import React, { useState } from 'react';
import Dialog from '../common/Dialog'; // adjust path as needed
import { X } from 'lucide-react';
import { Icon } from '@iconify/react';

const SuspensionReason = ({ isOpen, onClose, onSubmit, order }) => {
    const [suspendedText, setSuspendedText] = useState('');
    const [error, setError] = useState('');

    if (!isOpen || !order) return null;

    const handleSubmit = () => {
        if (!suspendedText.trim()) {
            setError('Please enter your complaint');
            return;
        }

        const payload = {
            dispatcherId: order._id || order.id,
            reason: suspendedText.trim(),
            // suspendedBy: currentUser.id, etc.
        };
        onSubmit(payload);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Suspension Reason"
            maxWidth="max-w-[31rem]"
            maxHeight="max-h-[33vh]"         // narrow like screenshot
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

                {/* Complaint textarea */}
                <div className="space-y-1.5">
                    <textarea
                        value={suspendedText}
                        onChange={(e) => {
                            setSuspendedText(e.target.value);
                            setError('');
                        }}
                        placeholder="Please eneter Suspension Reason"
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
                    <span>✓</span> Yes Suspend
                </button>

                <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-[#dc3545] hover:bg-[#c82333] text-white font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <Icon icon="ph:x-bold" width="24" height="24" /> Cancel
                </button>
            </div>
        </Dialog>
    );
};

export default SuspensionReason;