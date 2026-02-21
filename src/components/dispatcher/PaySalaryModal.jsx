import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Dialog from '../common/Dialog';
import Input from '../Input';
import { X } from 'lucide-react';
import { Icon } from '@iconify/react';
const PaySalaryModal = ({ isOpen, onClose, onConfirm, driver }) => {
    const [amount, setAmount] = useState(10);

    if (!driver) return null;

    const handleIncrement = () => {
        setAmount(prev => prev + 1);
    };

    const handleDecrement = () => {
        setAmount(prev => Math.max(0, prev - 1));
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || !isNaN(value)) {
            setAmount(value === '' ? 0 : Number(value));
        }
    };

    const handleConfirm = () => {
        if (amount > 0) {
            const payload = {
                driverId: driver._id || driver.id,
                amount: Number(amount),
                driverName: driver.name || driver.fullName,
                email: driver.email,
            };
            onConfirm(payload);
            onClose();
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Pay"
            maxWidth="max-w-[31rem]"
            maxHeight="max-h-[27vh]"         // narrow like screenshot
            actions={[
                {
                    icon: X,
                    onClick: onClose,
                    className: "!border-0 !bg-transparent !px-0 !py-0",
                    iconClassName: "w-6 h-6 text-gray-500 stroke-[2.5]",
                },
            ]}
        >
            <div className="py-1 px-1">
                {/* Amount Input with Plus/Minus Buttons */}
                <div className="flex items-center gap-1 mb-3">
                    {/* Minus Button */}
                    <button
                        type="button"
                        onClick={handleDecrement}
                        className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors flex-shrink-0"
                        aria-label="Decrease amount"
                    >
                        <Minus className="w-5 h-5" strokeWidth={3} />
                    </button>

                    {/* Amount Input with $ Prefix using reusable Input component */}
                    <div className="flex-1">
                        <Input
                            type="number"
                            min="0"
                            step="1"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="0"
                            prefix="$"
                            className="text-2xl font-medium py-0 px-0"
                        />
                    </div>
                    {/* Plus Button */}
                    <button
                        type="button"
                        onClick={handleIncrement}
                        className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors flex-shrink-0"
                        aria-label="Increase amount"
                    >
                        <Plus className="w-5 h-5" strokeWidth={3} />
                    </button>
                </div>
                <div className="flex gap-2 ">
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-2.5 bg-[#28a745] hover:bg-[#218838] text-white font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <span>✓</span> Yes,Pay
                    </button>

                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-[#dc3545] hover:bg-[#c82333] text-white font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Icon icon="ph:x-bold" width="24" height="24" /> No
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default PaySalaryModal;
