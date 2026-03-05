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
            maxWidth="max-w-[52rem]"
            maxHeight="max-h-[54vh]"
            actions={[
                {
                    icon: X,
                    onClick: onClose,
                    className: "!border-0 !bg-transparent !px-0 !py-0",
                    iconClassName: "w-6 h-6 text-gray-500 stroke-[2.5]",
                },
            ]}
        >
            <div className="px-1 pb-3.5  space-y-5 text-[16px]  text-[#212121]">
                {/* Confirmation text */}
                <p className="font-semibold  leading-relaxed">
                    Are you sure you want to assign this collection to the driver?
                </p>

                {/* Details list – left aligned with colon */}
                <div className="space-y-6 font-medium">
                    <div>
                        <span className="font-medium text-[#212529]/75">Order ID: </span>
                        <span className=" text-[#212529]">#{order.orderId || order._id || 'N/A'}</span>
                    </div>

                    <div>
                        <span className="text-[#212529]/75">Client Name: </span>
                        <span>{order.client?.fullName || 'Current Client Name'}</span>
                    </div>

                    <div>
                        <span className="text-[#212529]/75">Driver Name: </span>
                        <span>
                            {order.driver?.fullName ||
                                order.driver?.name ||
                                'Current Driver Name'}
                        </span>
                    </div>

                    <div>
                        <span className="text-[#212529]/75">Unpaid Collection: </span>
                        <span className=" font-medium">
                            ${unpaid.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Paying Collection field */}
                <div className="flex">
                    <div className="font-medium mt-2.5 mr-2 text-[#212529]/75 ">Paying Collection: </div>

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
                        width="w-137"
                        className="text-base font-medium w-1.5"
                    // If your Input has compact mode:
                    // compact={true}
                    />
                </div>
            </div>

            {/* Buttons – green & red, full width, rounded, icons */}
            <div className="flex gap-2 ">
                <button
                    onClick={handleSubmit}
                    className="flex-1 py-2.5 bg-[#28a745] hover:bg-[#218838] text-white font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <span>✓</span> Yes, Assign
                </button>

                <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-[#dc3545] hover:bg-[#c82333] text-white font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <Icon icon="ph:x-bold" width="24" height="24" /> Cancel
                </button>
            </div>
        </Dialog >
    );
};

export default AssignCollectionModal;