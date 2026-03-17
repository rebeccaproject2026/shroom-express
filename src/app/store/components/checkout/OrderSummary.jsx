import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const OrderSummary = ({ items, delivery, onProceed, btnLabel = 'Proceed to Checkout →', showPromo = true, showSavings = false, showBadges = true }) => {
    const [promo, setPromo] = useState('');
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const tax = +(subtotal * 0.08).toFixed(2);
    const deliveryFee = delivery === 'express' ? 15 : delivery === 'shipping' ? 10 : 0;
    const total = subtotal + tax + deliveryFee;

    return (
        <>
        <div className="bg-[#FFFFFF] border border-[#E5DCDC] rounded-2xl shadow-md p-6 flex flex-col gap-4">
            <h3 className="font-bold text-[#181211] text-xl  pb-3 border-b border-[#F8F6F6]">Order Summary</h3>

            {/* Items list (compact) */}
            <div className='pt-4 flex flex-col gap-4 max-h-60 overflow-y-auto'>
            {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 ">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#E5DCDC] py-2 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                        <p className="text-sm font-bold text-[#181211] truncate">{item.name}</p>
                        <p className="text-xs text-[#886663] truncate">{item.description} | Qty: {item.quantity}</p>
                        <span className="text-sm font-bold text-[#E93E2B] shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                </div>
            ))}
            </div>

            {/* Promo */}
            {showPromo && (
                <div className="flex items-center gap-2 border border-[#CBD5E1] bg-[#F8FAFC] rounded-xl px-4 py-4">
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

            <div className="pt-3 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-[#886663]">
                    <span>Subtotal</span>
                    <span className="text-[#181211] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#886663]">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-[#16A34A] font-bold' : 'text-[#181211] font-medium'}>
                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-sm text-[#886663]">
                    <span>Estimated Taxes</span>
                    <span className="text-[#181211] font-medium">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="border-t border-gray-100 py-4 flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <span className="text-xl text-[#181211] font-bold">Total</span>
                    {showSavings && <span className="text-xs text-[#16A34A] font-bold">Save $15.00</span>}
                </div>
                <div className="flex justify-between items-center ">
                    <span className="text-xl font-bold text-[#E93E2B]">${total.toFixed(2)}</span>
                </div>
            </div>

            {btnLabel && (
                <button
                    onClick={onProceed}
                    className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-3 rounded-full transition-colors text-base"
                >
                    {btnLabel}
                </button>
            )}

            {btnLabel && (
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#94A3B8]">
                    <Icon icon="mdi:lock-outline" width={16} />
                    <span>SECURE SSL ENCRYPTED CHECKOUT</span>
                </div>
            )}
           
        </div>
         {/* Trust badges */}
           {showBadges && (
           <div className="flex items-center justify-around pt-6">
                                       {[
                                           { icon: 'mdi:shield-check-outline', label: '100% Organic' },
                                           { icon: 'ri:truck-line', label: 'Discreet Box' },
                                           { icon: 'lsicon:refresh-done-outline', label: 'Lab Tested' },
                                       ].map(b => (
                                           <div key={b.label} className="flex flex-col items-center gap-1">
                                               <Icon icon={b.icon} className="text-[#64748B]" width={20} />
                                               <span className="text-[10px] text-[#94A3B8] font-bold">{b.label}</span>
                                           </div>
                                       ))}
                                   </div>
           )}
            </>
    );
};

export default OrderSummary;
