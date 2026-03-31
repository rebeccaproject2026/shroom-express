import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const PROMO_CODES = {
    'SHROOM10': { type: 'percent', value: 10, label: '10% off' },
    'SAVE15': { type: 'fixed', value: 15, label: '$15 off' },
    'WELCOME20': { type: 'percent', value: 20, label: '20% off' },
};

const OrderSummary = ({ items, delivery, onProceed, btnLabel = 'Proceed to Checkout →', showPromo = true, showBadges = true, onQuantityChange }) => {
    const [promo, setPromo] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const tax = +(subtotal * 0.08).toFixed(2);
    const deliveryFee = delivery === 'express' ? 15 : delivery === 'shipping' ? 10 : 0;

    const discount = appliedPromo
        ? appliedPromo.type === 'percent'
            ? +(subtotal * appliedPromo.value / 100).toFixed(2)
            : Math.min(appliedPromo.value, subtotal)
        : 0;

    const total = subtotal + tax + deliveryFee - discount;

    const handleApplyPromo = () => {
        const code = promo.trim().toUpperCase();
        if (PROMO_CODES[code]) {
            setAppliedPromo({ ...PROMO_CODES[code], code });
            setPromoError('');
            setPromo('');
        } else {
            setPromoError('Invalid promo code.');
            setAppliedPromo(null);
        }
    };

    const [showFullSummary, setShowFullSummary] = useState(false);

    return (
        <>
            {/* Desktop View (Standard Sidebar) */}
            <div className="hidden lg:flex bg-[#FFFFFF] border border-[#E5DCDC] rounded-2xl shadow-md p-6 flex flex-col gap-4">
                <h3 className="font-bold text-[#181211] text-xl pb-3 border-b border-[#F8F6F6]">Order Summary</h3>

                {/* Items List */}
                <div className='pt-0.5 flex flex-col gap-4 max-h-60 overflow-y-auto pr-2'>
                    {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#E5DCDC] shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                <p className="text-sm font-bold text-[#181211] truncate">{item.name}</p>
                                <p className="text-xs text-[#886663] truncate">{item.description}</p>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm font-bold text-[#E93E2B]">${(item.price * item.quantity).toFixed(2)}</span>
                                    {onQuantityChange ? (
                                        <div className="flex items-center gap-2 border border-[#E93E2B1A] bg-[#F8F6F6] rounded-md px-1 py-0.5">
                                            <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="w-5 h-5 flex items-center justify-center text-gray-600"><Icon icon="mdi:minus" width={14} /></button>
                                            <span className="font-bold text-[#181211] text-xs min-w-[12px] text-center">{item.quantity}</span>
                                            <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="w-5 h-5 rounded-[4px] bg-[#E93E2B] flex items-center justify-center text-white"><Icon icon="mdi:plus" width={12} /></button>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-[#886663]">Qty: {item.quantity}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Promo */}
                {showPromo && (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 border border-[#CBD5E1] bg-[#F8FAFC] rounded-xl px-4 py-4">
                            <Icon icon="mdi:tag-outline" className="text-gray-400" width={18} />
                            <input type="text" value={promo} onChange={e => { setPromo(e.target.value); setPromoError(''); }} onKeyDown={e => e.key === 'Enter' && handleApplyPromo()} placeholder="Promo code" className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent" />
                            <button onClick={handleApplyPromo} className="text-sm font-bold text-[#E93E2B] hover:opacity-80">Apply</button>
                        </div>
                        {promoError && <p className="text-xs text-[#E93E2B] font-medium px-1">{promoError}</p>}
                        {appliedPromo && (
                            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                <span className="text-xs font-semibold text-green-700">✓ "{appliedPromo.code}" applied</span>
                                <button onClick={() => setAppliedPromo(null)} className="text-xs text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                        )}
                    </div>
                )}

                {/* Totals */}
                <div className="pt-3 flex flex-col gap-2">
                    <div className="flex justify-between text-sm text-[#886663]"><span>Subtotal</span><span className="text-[#181211] font-medium">${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm text-[#886663]"><span>Delivery</span><span className={deliveryFee === 0 ? 'text-[#16A34A] font-bold' : 'text-[#181211] font-medium'}>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span></div>
                    <div className="flex justify-between text-sm text-[#886663]"><span>Estimated Taxes</span><span className="text-[#181211] font-medium">${tax.toFixed(2)}</span></div>
                    {discount > 0 && <div className="flex justify-between text-sm text-[#16A34A] font-semibold"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
                </div>

                <div className="border-t border-gray-100 py-4 flex justify-between items-center">
                    <span className="text-xl text-[#181211] font-bold">Total</span>
                    <span className="text-xl font-bold text-[#E93E2B]">${total.toFixed(2)}</span>
                </div>

                {btnLabel && (
                    <button onClick={onProceed} className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-3 rounded-full transition-colors text-base shadow-lg shadow-red-500/20">{btnLabel}</button>
                )}
            </div>

            {/* Mobile/Tablet View (Sticky Bottom Drawer) */}
            <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 px-2 pt-2 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300
                ${showFullSummary
                    ? 'bg-white pb-6'
                    : 'bg-white/50 backdrop-blur-xl'}`}>
                {/* Drawer Header (Clickable) - Simplified for Image 720 */}
                <div
                    onClick={() => setShowFullSummary(!showFullSummary)}
                    className="flex items-center justify-between px-4 pt-2 pb-1 cursor-pointer"
                >
                    <span className="text-[13px] font-bold text-[#181211] flex items-center gap-1.5 tracking-wide">
                        Order Summary
                    </span>
                    <Icon icon={showFullSummary ? "mdi:chevron-up" : "mdi:chevron-down"} width={20} className="text-[#181211]" />
                </div>

                {/* Expandable Content Area */}
                <div className={`px-4 overflow-hidden transition-all duration-500 ease-in-out ${showFullSummary ? 'max-h-[70vh] pb-6' : 'max-h-0'}`}>
                    <div className="flex flex-col gap-6">
                        {/* Items List */}
                        <div className="flex flex-col gap-4 max-h-48 overflow-y-auto pt-2">
                            {items.map(item => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-lg border border-gray-100 overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[#181211] truncate">{item.name}</p>
                                        <p className="text-[11px] text-gray-500 italic">Qty: {item.quantity}</p>
                                        <p className="text-xs font-bold text-[#E93E2B]">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Promo Input */}
                        {showPromo && (
                            <div className="flex items-center gap-2 border border-blue-50 bg-[#F8FAFC] rounded-xl px-4 py-3.5">
                                <Icon icon="mdi:tag-outline" className="text-gray-400" width={18} />
                                <input type="text" placeholder="Promo code" className="flex-1 text-sm outline-none bg-transparent" />
                                <button className="text-sm font-bold text-[#E93E2B]">Apply</button>
                            </div>
                        )}

                        {/* Breakdown */}
                        <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between text-[13px] text-gray-500 font-medium"><span>Subtotal</span><span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-[13px] text-gray-500 font-medium"><span>Delivery</span><span className="text-green-600 font-bold">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span></div>
                            <div className="flex justify-between text-[13px] text-gray-500 font-medium"><span>Estimated Taxes</span><span className="text-gray-900 font-bold">${tax.toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>

                {/* Fixed Action Bar (Always Visible bottom part) - Glassmorphism Update */}
                <div className="px-2 pt-2 border-t border-gray-50 flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-0.5 ml-2">
                        <span className="text-2xl font-black text-[#181211] tracking-tight whitespace-nowrap">${total.toFixed(2)}</span>
                        <div className="bg-[#F0FDF4] text-[#16A34A] px-2 py-1 rounded-md font-bold text-[10px] w-fit shadow-sm uppercase tracking-wide">
                            Save $15.00
                        </div>
                    </div>
                    <button
                        onClick={onProceed}
                        className="flex-1 bg-[#E93E2B] hover:bg-red-600 text-white font-bold h-11 rounded-[14px] text-[13px] shadow-[0_6px_12px_-3px_rgba(233,62,43,0.3)] active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                        {btnLabel}
                    </button>
                </div>
            </div>

            {/* Desktop Trust badges */}
            {showBadges && (
                <div className="hidden lg:flex items-center justify-around pt-6">
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
