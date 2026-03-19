import React from 'react';
import { Icon } from '@iconify/react';

const methods = [
    { id: 'card', label: 'Credit Card', sub: 'Visa, Mastercard, Amex', icon: 'mdi:credit-card-outline' },
    { id: 'paypal', label: 'PayPal', sub: 'Fast and secure', icon: 'mdi:wallet-outline' },
    { id: 'apple', label: 'Apple Pay', sub: 'One-tap payment', icon: 'material-symbols:branding-watermark-outline' },
];

const PaymentMethod = ({ selected, onChange, cardData, onCardChange, saveCard, onSaveCard }) => {
    return (
        <div>
            {/* Method Selector */}
            <div className="flex gap-3 flex-wrap mb-6">
                {methods.map(m => (
                    <button
                        key={m.id}
                        onClick={() => onChange(m.id)}
                        className={`flex-1 min-w-[140px] flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all text-left ${selected === m.id ? 'border-[#E93E2B] bg-red-50' : 'border-[#E2E8F0] bg-white hover:border-gray-300'
                            }`}
                    >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === m.id ? 'border-[#E93E2B]' : 'border-gray-300'}`}>
                            {selected === m.id && <div className="w-2 h-2 rounded-full bg-[#E93E2B]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#181211]">{m.label}</p>
                            <p className="text-xs text-[#64748B]">{m.sub}</p>
                        </div>
                        <Icon icon={m.icon} className={`${selected === m.id ? 'text-[#E93E2B]' : 'text-[#94A3B8]'} shrink-0`} width={22} />
                    </button>
                ))}
            </div>

            {/* Card Details */}
            {selected === 'card' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h4 className="font-bold text-[#181211] text-xl  mb-5">Card Details</h4>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm text-[#334155] font-semibold mb-1 block">Cardholder Name</label>
                            <input
                                type="text"
                                value={cardData.name}
                                onChange={e => onCardChange('name', e.target.value)}
                                placeholder="Alex Johnson"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-[#334155] font-semibold mb-1 block">Card Number</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={cardData.number}
                                    onChange={e => onCardChange('number', e.target.value)}
                                    placeholder="9000 0000 0000 000"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] transition-colors pr-10"
                                />
                                <Icon icon="mdi:lock-outline" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width={18} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-[#334155] font-semibold mb-1 block">Expiry Date</label>
                                <input
                                    type="text"
                                    value={cardData.expiry}
                                    onChange={e => onCardChange('expiry', e.target.value)}
                                    placeholder="MM/YY"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-[#334155] font-semibold mb-1 block">CVV</label>
                                <input
                                    type="text"
                                    value={cardData.cvv}
                                    onChange={e => onCardChange('cvv', e.target.value)}
                                    placeholder="123"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Save card toggle */}
                        <div className="flex items-center justify-between pt-2">
                            <div>
                                <p className="text-sm font-semibold text-[#181211]">Save card for future purchases</p>
                                <p className="text-xs text-gray-400">Your details will be stored securely</p>
                            </div>
                            <button
                                onClick={() => onSaveCard(!saveCard)}
                                className={`w-12 h-5.5 rounded-full transition-colors relative ${saveCard ? 'bg-[#E93E2B]' : 'bg-gray-200'}`}
                            >
                                <div className={`w-5 h-4.5 bg-white rounded-full shadow absolute top-0.5 transition-all ${saveCard ? 'left-6' : 'left-0.5'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethod;
