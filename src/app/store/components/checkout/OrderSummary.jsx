import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const OrderSummary = ({ items, delivery, onProceed, btnLabel = 'Proceed to Checkout →', showPromo = true, showSavings = false }) => {
    const [promo, setPromo] = useState('');
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const tax = +(subtotal * 0.08).toFixed(2);
    const deliveryFee = delivery === 'express' ? 15 : delivery === 'shipping' ? 10 : 0;
    const total = subtotal + tax + deliveryFee;

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
            <h3 className="font-bold text-[#181211] text-lg">Order Summary</h3>

            {/* Items list (compact) */}
            {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#181211] truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 truncate">{item.description} | Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-[#E93E2B] shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            ))}

            {/* Promo */}
            {showPromo && (
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5">
                    <Icon icon="mdi:tag-outline" className="text-gray-400" width={18} />
                    <input
                        type="text"
                        value={promo}
                        onChange={e => setPromo(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                    />
                    <button className="text-sm font-bold text-[#E93E2B] hover:opacity-80">Apply</button>
                </div>
            )}

            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="text-[#181211] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-green-500 font-bold' : 'text-[#181211] font-medium'}>
                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Estimated Taxes</span>
                    <span className="text-[#181211] font-medium">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">Total Amount</span>
                    {showSavings && <span className="text-xs text-green-500 font-bold">Save $15.00</span>}
                </div>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-2xl font-extrabold text-[#181211]">${total.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={onProceed}
                className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-4 rounded-full transition-colors text-base"
            >
                {btnLabel}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Icon icon="mdi:lock-outline" width={14} />
                <span>SECURE SSL ENCRYPTED CHECKOUT</span>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-around pt-2 border-t border-gray-100">
                {[
                    { icon: 'mdi:shield-check-outline', label: '100% Organic' },
                    { icon: 'mdi:package-variant', label: 'Discreet Box' },
                    { icon: 'mdi:flask-outline', label: 'Lab Tested' },
                ].map(b => (
                    <div key={b.label} className="flex flex-col items-center gap-1">
                        <Icon icon={b.icon} className="text-gray-400" width={22} />
                        <span className="text-[10px] text-gray-400">{b.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderSummary;
