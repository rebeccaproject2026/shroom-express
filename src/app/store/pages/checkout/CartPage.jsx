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

    const handleQuantityChange = (id, qty) => {
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));
    };

    const handleRemove = (id) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const tax = +(subtotal * 0.08).toFixed(2);
    const deliveryFee = delivery === 'express' ? 5 : 0;
    const total = subtotal + tax + deliveryFee;

    return (
        <div className="w-full min-h-screen bg-[#F5F0EB] px-10 py-8">
            <Stepper currentStep={1} />

            {/* Title */}
            <div className="mb-6 max-w-[1200px]">
                <h1 className="text-4xl font-extrabold text-[#0F172A]">My Cart</h1>
                <p className="text-base text-[#64748B] mt-2">Review your premium selection before final checkout.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                {/* Left — Cart Items */}
                <div className="lg:col-span-2 flex flex-col p-2 gap-6">
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
                        className="flex items-center gap-2 text-[#E93E2B] font-semibold text-sm mt-2 hover:opacity-80 transition-opacity w-fit"
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
                            <DeliveryMethod selected={delivery} onChange={setDelivery} variant="radio" />
                        </div>

                        {/* Promo */}
                        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                            <Icon icon="mdi:tag-outline" className="text-gray-400" width={16} />
                            <input
                                type="text"
                                value={promo}
                                onChange={e => setPromo(e.target.value)}
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
                            onClick={() => navigate('/store/checkout')}
                            className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-4 rounded-full transition-colors text-sm"
                        >
                            Proceed to Checkout →
                        </button>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                            <Icon icon="mdi:lock-outline" width={12} />
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
                                    <Icon icon={b.icon} className="text-gray-400" width={20} />
                                    <span className="text-[10px] text-gray-400">{b.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
