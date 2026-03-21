import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Stepper from '../../components/checkout/Stepper';
import CartItem from '../../components/checkout/CartItem';
import DeliveryMethod from '../../components/checkout/DeliveryMethod';
// import product1 from '../../assets/images/product1.png';
import cart1 from '../../assets/images/cart1.png';
import cart2 from '../../assets/images/cart2.png';
import cart3 from '../../assets/images/cart3.jpg';


const defaultCartItems = [
    { id: 1, name: 'Blue Pulaski (Dried)', description: 'Focus & Cognitive Support | 60 Capsules', price: 45, quantity: 1, image: cart1, badge: 'Best Seller', badgeColor: 'text-[#E93E2B] bg-red-50' },
    { id: 2, name: "Lion's Mane Dual Extract", description: 'Top-Shelf Indica | 3.5 Grams', price: 60, quantity: 2, image: cart2, badge: 'Hybrid', badgeColor: 'text-green-600 bg-green-50' },
    { id: 3, name: 'Moonlight Gummies (20pk)', description: '1000mg | Natural Flavor | 30ml', price: 85, quantity: 1, image: cart3, badge: 'New Arrival', badgeColor: 'text-blue-600 bg-blue-50' },
];

const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(defaultCartItems);
    const [delivery, setDelivery] = useState('sameday');
    const [promo, setPromo] = useState('');
    const [promoApplied, setPromoApplied] = useState(null); // { code, discount, type }
    const [promoError, setPromoError] = useState('');

    const PROMO_CODES = {
        'SHROOM10': { discount: 10, type: 'percent', label: '10% off' },
        'SAVE15':   { discount: 15, type: 'flat',    label: '$15 off' },
        'WELCOME20':{ discount: 20, type: 'percent', label: '20% off' },
    };

    const handleApplyPromo = () => {
        const code = promo.trim().toUpperCase();
        if (!code) {
            setPromoError('Invalid promo code.');
            return;
        }
        if (PROMO_CODES[code]) {
            setPromoApplied({ code, ...PROMO_CODES[code] });
            setPromoError('');
        } else {
            setPromoApplied(null);
            setPromoError('Invalid promo code. Try SHROOM10, SAVE15 or WELCOME20.');
        }
    };

    const handleQuantityChange = (id, qty) => {
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));
    };

    const handleRemove = (id) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const tax = +(subtotal * 0.08).toFixed(2);
    const deliveryFee = delivery === 'express' ? 5 : 0;
    const discount = promoApplied
        ? promoApplied.type === 'percent'
            ? +(subtotal * promoApplied.discount / 100).toFixed(2)
            : promoApplied.discount
        : 0;
    const total = subtotal + tax + deliveryFee - discount;

    return (
        <div className="w-full min-h-screen bg-[#F5F0EB] px-10 pt-8 pb-20">
            <Stepper currentStep={1} />

            {/* Title */}
            <div className="mb-6 max-w-300">
                <h1 className="text-4xl font-extrabold text-[#0F172A]">My Cart</h1>
                <p className="text-base text-[#64748B] mt-2">Review your premium selection before final checkout.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                {/* Left — Cart Items */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    ))}

                    <button
                        onClick={() => navigate('/store')}
                        className="flex items-center gap-2 text-[#E93E2B] font-bold cursor-pointer text-sm mt-2 hover:opacity-80 transition-opacity w-fit"
                    >
                        <Icon icon="mdi:arrow-left" width={16} />
                        Continue Shopping
                    </button>
                </div>

                {/* Right — Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
                        <h3 className="font-bold text-[#181211] text-lg">Order Summary</h3>

                        {/* Subtotal & Tax */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm text-[#475569]">
                                <span>Subtotal</span>
                                <span className="text-[#0F172A] font-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-[#475569]">
                                <span>Estimated Taxes (8%)</span>
                                <span className="text-[#0F172A] font-bold">${tax.toFixed(2)}</span>
                            </div>
                            {promoApplied && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Promo ({promoApplied.code})</span>
                                    <span className="font-bold">-${discount.toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        {/* Delivery Method */}
                        <div className='border-t border-[#E93E2B1A] pt-2'>
                            <p className="text-sm font-bold text-[#334155] mb-2">Delivery Method</p>
                            <DeliveryMethod selected={delivery} onChange={setDelivery} variant="radio" />
                        </div>

                        {/* Promo */}
                        <div className="flex flex-col gap-1.5 mt-2">
                            <div className="flex items-center gap-2 border border-[#CBD5E1] bg-[#F8FAFC] rounded-xl px-4 py-4">
                                <Icon icon="mdi:tag-outline" className="text-gray-400" width={16} />
                                <input
                                    type="text"
                                    value={promo}
                                    onChange={e => { setPromo(e.target.value); setPromoError(''); }}
                                    onKeyDown={e => e.key === 'Enter' && handleApplyPromo()}
                                    placeholder="Promo code"
                                    className="flex-1 text-sm outline-none text-gray-700 placeholder-[#6B7280] bg-transparent"
                                />
                                <button onClick={handleApplyPromo} className="text-sm font-bold text-[#E93E2B] cursor-pointer hover:opacity-80">Apply</button>
                            </div>
                            {!promoApplied && !promoError && (
                                <p className="text-xs text-[#94A3B8] px-1">
                                    Try <button onClick={() => setPromo('SHROOM10')} className="text-[#E93E2B] font-semibold hover:underline cursor-pointer">SHROOM10</button> for 10% off
                                </p>
                            )}
                            {promoError && <p className="text-xs text-[#E93E2B] font-medium px-1">{promoError}</p>}
                            {promoApplied && (
                                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                    <span className="text-xs font-semibold text-green-700">✓ "{promoApplied.code}" — {promoApplied.label} applied</span>
                                    <button onClick={() => { setPromoApplied(null); setPromo(''); }} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">✕</button>
                                </div>
                            )}
                        </div>

                        {/* Total */}
                        <div className="border-t border-[#F1F5F9] py-6">
                            <p className="text-sm text-[#64748B] mb-2">Total Amount</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[28px] font-extrabold text-[#0F172A]">${total.toFixed(2)}</span>
                                <span className="text-xs bg-[#F0FDF4] rounded-lg px-2 py-1 text-green-500 font-bold">{discount > 0 ? `Save $${discount.toFixed(2)}` : 'Save $15.00'}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/store/checkout')}
                            className="w-full bg-[#E93E2B] cursor-pointer hover:bg-red-600 text-white font-bold py-3.5 shadow-md rounded-full transition-colors text-base"
                        >
                            Proceed to Checkout →
                        </button>

                        <div className="flex items-center justify-center gap-2 font-semibold text-[11px] text-[#94A3B8]">
                            <Icon icon="mdi:lock-outline" width={18} />
                            <span>SECURE SSL ENCRYPTED CHECKOUT</span>
                        </div>

                    </div>

                    {/* Trust badges */}
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
                </div>
            </div>
        </div>
    );
};

export default CartPage;
