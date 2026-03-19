import React from 'react';
import { Icon } from '@iconify/react';

const methods = [
    { id: 'sameday', label: 'Same Day Delivery', sub: 'Delivery with in 3-4 hours', price: 'Free', priceVal: 0, icon: 'ri:truck-line' },
    { id: 'express', label: 'Express Delivery', sub: 'Delivery within 1 hour', price: '$15', priceVal: 15, icon: 'mdi:thunder-outline' },
    { id: 'shipping', label: 'Shipping', sub: 'Delivery with in 1 to 3 days', price: '$10', priceVal: 10, icon: 'lucide:ship' },
];

const DeliveryMethod = ({ selected, onChange, variant = 'cards' }) => {
    if (variant === 'cards') {
        return (
            <div className="flex gap-3 flex-wrap">
                {methods.map(m => (
                    <button
                        key={m.id}
                        onClick={() => onChange(m.id)}
                        className={`flex-1 min-w-[140px] flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${selected === m.id
                                ? 'border-[#E93E2B] bg-red-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                    >
                        <Icon icon={m.icon} width={20} className={selected === m.id ? 'text-[#E93E2B]' : 'text-gray-900'} />
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold ${selected === m.id ? 'text-[#181211]' : 'text-[#181211]'}`}>{m.label}</p>
                            <p className="text-[11px] text-[#181211]">{m.sub}</p>
                        </div>
                        <span className={`text-sm font-bold shrink-0 ${m.priceVal === 0 ? 'text-[#E93E2B]' : 'text-[#181211]'}`}>{m.price}</span>
                    </button>
                ))}
            </div>
        );
    }

    // Radio variant for cart page
    return (
        <div className="flex flex-col gap-2">
            {methods.slice(0, 2).map(m => (
                <button
                    key={m.id}
                    onClick={() => onChange(m.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${selected === m.id ? 'border-[#E93E2B1A] bg-[#E93E2B0D]' : 'border-[#E2E8F0] bg-white'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${selected === m.id ? 'bg-[#E93E2B]' : 'border-2 border-gray-300'}`}>
                            {selected === m.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-[#0F172A]">{m.label}</p>
                            <p className="text-xs text-[#64748B]">{m.sub}</p>
                        </div>
                    </div>
                    <span className={`text-sm font-bold ${m.priceVal === 0 ? 'text-[#0F172A]' : 'text-[#181211]'}`}>{m.price}</span>
                </button>
            ))}
        </div>
    );
};

export default DeliveryMethod;
