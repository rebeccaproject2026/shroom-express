import React from 'react';
import { Icon } from '@iconify/react';

const methods = [
    { id: 'card', label: 'Credit Card', sub: 'Visa, Mastercard, Amex', icon: 'mdi:credit-card-outline' },
    { id: 'paypal', label: 'PayPal', sub: 'Fast and secure', icon: 'mdi:wallet-outline' },
    { id: 'apple', label: 'Apple Pay', sub: 'One-tap payment', icon: 'material-symbols:branding-watermark-outline' },
    { id: 'etransfer', label: 'E-Transfer', sub: 'Direct bank transfer', icon: 'mdi:bank-transfer' },
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

            {/* E-Transfer Details */}
            {selected === 'etransfer' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h4 className="font-bold text-[#181211] text-xl mb-4">Interac E-Transfer Instructions</h4>
                    <div className="text-sm text-[#334155] leading-relaxed flex flex-col gap-3">
                        <p>1. Log into your bank's online banking or mobile app and navigate to <strong>E-TRANSFER</strong>.</p>
                        
                        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                            <p className="font-semibold text-[#181211] mb-2">2. Add recipient:</p>
                            <ul className="list-disc list-inside space-y-1 ml-1 text-[#475569]">
                                <li>Name: <span className="font-bold text-[#181211]">CC</span></li>
                                <li>Email: <span className="font-bold text-[#E93E2B]">ccmail647@gmail.com</span></li>
                            </ul>
                        </div>

                        <ul className="list-none space-y-2">
                            <li>3. Select the account you'd like the funds to be sent from.</li>
                            <li>4. In the <strong>Security Question</strong> field, enter your <span className="font-medium text-[#181211]">Order Number</span>.</li>
                            <li>5. In the <strong>Password</strong> field, enter the <span className="font-medium text-[#181211]">last four digits</span> of your Order Number.</li>
                        </ul>

                        <div className="flex items-start gap-2 bg-[#FEF2F2] p-3 rounded-lg border border-[#FECACA] mt-1 text-[#DC2626]">
                            <Icon icon="mdi:alert-circle-outline" className="mt-0.5 shrink-0" width={18} />
                            <p className="text-xs font-medium">Do not mention cannabis or product details in the payment message. Double-check the email spelling before sending to avoid delays.</p>
                        </div>

                        <div className="flex items-start gap-2 bg-[#F0FDF4] p-3 rounded-lg border border-[#BBF7D0] mt-1 text-[#16A34A]">
                            <Icon icon="mdi:check-circle-outline" className="mt-0.5 shrink-0" width={18} />
                            <p className="text-xs font-medium">Once payment has been sent, click <strong>'Place Secure Order'</strong> on our website so we can verify your order. Your order will be processed and prepared for delivery as soon as the payment is received.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* PayPal Details */}
            {selected === 'paypal' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h4 className="font-bold text-[#181211] text-xl mb-4">PayPal Instructions</h4>
                    <div className="text-sm text-[#334155] leading-relaxed flex flex-col gap-3">
                        <p>1. Log into your PayPal account via the web or mobile app.</p>
                        
                        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                            <p className="font-semibold text-[#181211] mb-2">2. Send payment to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-1 text-[#475569]">
                                <li>Email: <span className="font-bold text-[#E93E2B]">paypal@shroomexpress.com</span></li>
                            </ul>
                        </div>

                        <ul className="list-none space-y-2">
                            <li>3. Enter your <span className="font-medium text-[#181211]">Order Number</span> in the <strong>Notes/Message</strong> section of your PayPal transfer.</li>
                            <li>4. Ensure you select "Sending to a friend" to avoid any payment holds.</li>
                        </ul>

                        <div className="flex items-start gap-2 bg-[#FEF2F2] p-3 rounded-lg border border-[#FECACA] mt-1 text-[#DC2626]">
                            <Icon icon="mdi:alert-circle-outline" className="mt-0.5 shrink-0" width={18} />
                            <p className="text-xs font-medium">Do not mention cannabis or product details in the payment message. Double-check the email spelling before sending to avoid delays.</p>
                        </div>

                        <div className="flex items-start gap-2 bg-[#F0FDF4] p-3 rounded-lg border border-[#BBF7D0] mt-1 text-[#16A34A]">
                            <Icon icon="mdi:check-circle-outline" className="mt-0.5 shrink-0" width={18} />
                            <p className="text-xs font-medium">Once payment has been sent, click <strong>'Place Secure Order'</strong> on our website so we can verify your order. Your order will be processed and prepared for delivery as soon as the payment is received.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Apple Pay Details */}
            {selected === 'apple' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h4 className="font-bold text-[#181211] text-xl mb-4">Apple Pay Instructions</h4>
                    <div className="text-sm text-[#334155] leading-relaxed flex flex-col gap-3">
                        <p>1. Open your <strong>Apple Cash</strong> or Messages app on your Apple device.</p>
                        
                        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                            <p className="font-semibold text-[#181211] mb-2">2. Send payment to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-1 text-[#475569]">
                                <li>Phone/Email: <span className="font-bold text-[#E93E2B]">applepay@shroomexpress.com</span></li>
                            </ul>
                        </div>

                        <ul className="list-none space-y-2">
                            <li>3. Enter your <span className="font-medium text-[#181211]">Order Number</span> in the message field when sending the payment.</li>
                            <li>4. Authorize the payment using Face ID, Touch ID, or your passcode.</li>
                        </ul>

                        <div className="flex items-start gap-2 bg-[#FEF2F2] p-3 rounded-lg border border-[#FECACA] mt-1 text-[#DC2626]">
                            <Icon icon="mdi:alert-circle-outline" className="mt-0.5 shrink-0" width={18} />
                            <p className="text-xs font-medium">Do not mention cannabis or product details in the payment message. Double-check the recipient details before sending to avoid delays.</p>
                        </div>

                        <div className="flex items-start gap-2 bg-[#F0FDF4] p-3 rounded-lg border border-[#BBF7D0] mt-1 text-[#16A34A]">
                            <Icon icon="mdi:check-circle-outline" className="mt-0.5 shrink-0" width={18} />
                            <p className="text-xs font-medium">Once payment has been sent, click <strong>'Place Secure Order'</strong> on our website so we can verify your order. Your order will be processed and prepared for delivery as soon as the payment is received.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethod;
