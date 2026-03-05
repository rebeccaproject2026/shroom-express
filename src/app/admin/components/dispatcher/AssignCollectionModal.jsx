// src/components/order/AssignCollectionModal.jsx
import React, { useState, useEffect } from 'react';
import Dialog from '../common/Dialog'; // adjust path
import Input from '../Input';         // adjust path
import { X } from 'lucide-react';
import { Icon } from '@iconify/react';

const AssignCollectionModal = ({ isOpen, onClose, onConfirm, order }) => {
    const [payingAmount, setPayingAmount] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (order?.unpaidCollection != null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPayingAmount(String(order.unpaidCollection));
            setError('');
        }
    }, [order]);

    if (!isOpen || !order) return null;

    const unpaid = Number(order.unpaidCollection) || 0;

    const handleChange = (e) => {
        let val = e.target.value;
        if (val === '' || (!isNaN(val) && Number(val) >= 0)) {
            // Allow only valid number input
            setPayingAmount(val);
            setError('');
        }
    };

    const handleSubmit = () => {
        const amount = Number(payingAmount);

        if (!payingAmount.trim() || isNaN(amount) || amount <= 0) {
            setError('Amount must be greater than 0');
            return;
        }

        if (amount > unpaid) {
            setError(`Amount cannot exceed unpaid collection of $${unpaid.toFixed(2)}`);
            return;
        }

        const payload = {
            unpaidCollection: amount,
            orderId: order.orderId || order._id,
            clientId: order.client?._id,
            driverId: order.driver?._id,
            // ... extend as needed
        };

        onConfirm(payload);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Collection Assignment"
            maxWidth="max-w-[95vw] sm:max-w-[52rem]"
            maxHeight="max-h-[90vh] sm:max-h-[62vh]"
            actions={[
                {
                    icon: X,
                    onClick: onClose,
                    className: "!border-0 !bg-transparent !px-0 !py-0",
                    iconClassName: "w-5 sm:w-6 h-5 sm:h-6 text-gray-500 stroke-[2.5]",
                },
            ]}
        >
            <div className="px-1 pb-2 sm:pb-3.5 space-y-3 sm:space-y-5 text-sm sm:text-[16px] text-[#212121]">
                {/* Confirmation text */}
                <p className="font-semibold text-sm sm:text-base leading-relaxed">
                    Are you sure you want to assign this collection to the driver?
                </p>

                {/* Details list – left aligned with colon */}
                <div className="space-y-3 sm:space-y-6 font-medium">
                    <div>
                        <span className="font-medium text-sm sm:text-base text-[#212529]/75">Order ID: </span>
                        <span className="text-sm sm:text-base text-[#212529]">#{order.orderId || order._id || 'N/A'}</span>
                    </div>

                    <div>
                        <span className="text-sm sm:text-base text-[#212529]/75">Client Name: </span>
                        <span className="text-sm sm:text-base">{order.client?.fullName || 'Current Client Name'}</span>
                    </div>

                    <div>
                        <span className="text-sm sm:text-base text-[#212529]/75">Driver Name: </span>
                        <span className="text-sm sm:text-base">
                            {order.driver?.fullName ||
                                order.driver?.name ||
                                'Current Driver Name'}
                        </span>
                    </div>

                    <div>
                        <span className="text-sm sm:text-base text-[#212529]/75">Unpaid Collection: </span>
                        <span className="text-sm sm:text-base font-medium">
                            ${unpaid.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Paying Collection field */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-0">
                    <div className="font-medium text-sm sm:text-base sm:mt-2.5 sm:mr-2 text-[#212529]/75">Paying Collection: </div>

                    <Input
                        type="number"
                        value={payingAmount}
                        onChange={handleChange}
                        prefix="$"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        max={unpaid}
                        error={!!error}
                        width="w-full sm:w-137"
                        className="text-sm sm:text-base font-medium"
                    // If your Input has compact mode:
                    // compact={true}
                    />
                </div>
            </div>

            {/* Buttons – green & red, full width, rounded, icons */}
            <div className="flex gap-1.5 sm:gap-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 py-2 sm:py-2.5 bg-[#28a745] hover:bg-[#218838] text-white text-sm sm:text-base font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                >
                    <span>✓</span> <span className="hidden sm:inline">Yes, Assign</span><span className="sm:hidden">Assign</span>
                </button>

                <button
                    onClick={onClose}
                    className="flex-1 py-2 sm:py-2.5 bg-[#dc3545] hover:bg-[#c82333] text-white text-sm sm:text-base font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                >
                    <Icon icon="ph:x-bold" width="20" height="20" className="sm:w-6 sm:h-6" /> Cancel
                </button>
            </div>
        </Dialog >
    );
};

export default AssignCollectionModal;