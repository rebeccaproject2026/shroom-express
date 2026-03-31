import React from 'react';
import { Icon } from '@iconify/react';

const methods = [
    { id: 'sameday', label: 'Same Day Delivery', sub: 'Delivery with in 3-4 hours', price: 'Free', priceVal: 0, icon: 'ri:truck-line' },
    { id: 'express', label: 'Express Delivery', sub: 'Delivery within 1 hour', price: '$15', priceVal: 15, icon: 'mdi:thunder-outline' },
    { id: 'shipping', label: 'Shipping', sub: 'Delivery with in 1 to 3 days', price: '$10', priceVal: 10, icon: 'lucide:ship' },
];

const DeliveryMethod = ({ selected, onChange }) => {
    return (
        <div className="flex flex-col  gap-3 lg:gap-4">
            {methods.map((m, index) => (
                <button
                    key={m.id}
                    onClick={() => onChange(m.id)}
                    className={`flex items-center gap-4 transition-all text-left group
                        ${/* Mobile/Tablet Style */ 'w-full px-5 py-4 rounded-[24px] border'} 
                        ${/* Desktop Style Override */ 'lg:px-4 lg:py-3 lg:rounded-xl lg:border-2'} 
                        ${/* Full width for shipping on desktop */ index === 2 ? 'lg:col-span-2' : ''}
                        ${selected === m.id
                            ? 'border-[#E93E2B] bg-[#FFF5F4] lg:bg-red-50'
                            : 'border-[#F1F1F1] bg-white hover:border-[#E93E2B50] lg:border-gray-200'
                        }`}
                >
                    {/* Icon Container */}
                    <div className={`w-11 h-11 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selected === m.id ? 'bg-white shadow-sm text-[#E93E2B]' : 'bg-[#F8F6F6] text-[#181211]'}`}>
                        <Icon icon={m.icon} width={22} />
                    </div>

                    {/* Text Info (Desktop: more vertical centered look) */}
                    <div className="flex-1 min-w-0">
                        <p className="text-[15px] lg:text-[13px] font-bold leading-tight text-[#181211]">{m.label}</p>
                        <p className="text-[12px] lg:text-[10px] text-[#64748B] mt-1 font-medium lg:font-normal">{m.sub}</p>
                    </div>

                    {/* Price Tag */}
                    <span className={`text-[15px] lg:text-[13px] font-bold shrink-0 ${m.priceVal === 0 ? 'text-[#E93E2B]' : 'text-[#181211]'}`}>
                        {m.price}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default DeliveryMethod;
