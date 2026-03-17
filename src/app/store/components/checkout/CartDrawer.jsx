import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import DeliveryMethod from './DeliveryMethod';
import Stepper from './Stepper';

const CartDrawer = ({ isOpen, onClose, cartItems, onQuantityChange, onRemove, delivery, onDeliveryChange }) => {
    const navigate = useNavigate();
    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const tax = +(subtotal * 0.08).toFixed(2);
    const deliveryFee = delivery === 'express' ? 5 : 0;
    const total = subtotal + tax + deliveryFee;

    const handleProceed = () => {
        onClose();
        navigate('/store/checkout');
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[110]"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full  w-full max-w-[520px] bg-[#F8F6F6] z-[120] shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 bg-[#F8F6F6] shrink-0">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Icon icon="mdi:close" width={24} />
                    </button>
                </div>

                {/* Stepper */}
                <div className="px-6 shrink-0 ">
                    <Stepper currentStep={1} />
                </div>

                {/* Title */}
                <div className="px-6 mb-4 shrink-0">
                    <h2 className="text-2xl font-extrabold text-[#181211]">My Cart</h2>
                    <p className="text-sm text-gray-400 mt-1">Review your premium selection before final checkout.</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 pb-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Cart Items */}
                        <div className="flex flex-col gap-4">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={onQuantityChange}
                                    onRemove={onRemove}
                                />
                            ))}
                            <button
                                onClick={onClose}
                                className="flex items-center gap-2 text-[#E93E2B] font-semibold text-sm mt-2 hover:opacity-80 transition-opacity"
                            >
                                <Icon icon="mdi:arrow-left" width={16} />
                                Continue Shopping
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 h-fit">
                            <h3 className="font-bold text-[#181211] text-base">Order Summary</h3>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="text-[#181211] font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Estimated Taxes (8%)</span>
                                    <span className="text-[#181211] font-medium">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Delivery Method */}
                            <div>
                                <p className="text-xs font-semibold text-gray-500 mb-2">Delivery Method</p>
                                <DeliveryMethod selected={delivery} onChange={onDeliveryChange} variant="radio" />
                            </div>

                            {/* Promo */}
                            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                                <Icon icon="mdi:tag-outline" className="text-gray-400" width={16} />
                                <input
                                    type="text"
                                    placeholder="Promo code"
                                    className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                                />
                                <button className="text-sm font-bold text-[#E93E2B]">Apply</button>
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-xs text-gray-400 mb-1">Total Amount</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-extrabold text-[#181211]">${total.toFixed(2)}</span>
                                    <span className="text-xs text-green-500 font-bold">Save $15.00</span>
                                </div>
                            </div>

                            <button
                                onClick={handleProceed}
                                className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-3.5 rounded-full transition-colors text-sm"
                            >
                                Proceed to Checkout →
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                                <Icon icon="mdi:lock-outline" width={12} />
                                <span>SECURE SSL ENCRYPTED CHECKOUT</span>
                            </div>

                            {/* Trust badges */}
                            <div className="flex items-center justify-around pt-1 border-t border-gray-100">
                                {[
                                    { icon: 'mdi:shield-check-outline', label: '100% Organic' },
                                    { icon: 'mdi:package-variant', label: 'Discreet Box' },
                                    { icon: 'mdi:flask-outline', label: 'Lab Tested' },
                                ].map(b => (
                                    <div key={b.label} className="flex flex-col items-center gap-1">
                                        <Icon icon={b.icon} className="text-gray-400" width={18} />
                                        <span className="text-[9px] text-gray-400">{b.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
