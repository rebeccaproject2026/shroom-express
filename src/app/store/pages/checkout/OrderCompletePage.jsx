import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Stepper from '../../components/checkout/Stepper';
import product1 from '../../assets/images/product1.png';

const orderItems = [
    { id: 1, name: 'Blue Pulaski (Dried)', description: 'Focus & Cognitive Support | 60 Capsules', price: 45, quantity: 1, image: product1 },
    { id: 2, name: "Lion's Mane Dual Extract", description: 'Top-Shelf Indica | 3.5 Grams', price: 60, quantity: 2, image: product1 },
    { id: 3, name: 'Moonlight Gummies (20pk)', description: '1000mg | Natural Flavor | 30ml', price: 85, quantity: 1, image: product1 },
];

const OrderCompletePage = () => {
    const navigate = useNavigate();
    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee = 0;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = subtotal + deliveryFee + tax;

    return (
        <div className="w-full min-h-screen bg-[#F8F6F6] px-10 py-8">
            <Stepper currentStep={3} />

            <div className="max-w-[700px] mx-auto flex flex-col gap-6">
                {/* Success Icon + Title */}
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <Icon icon="mdi:check-circle" className="text-green-500" width={52} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#181211]">Thank you for your order!</h1>
                    <p className="text-gray-400 text-sm">
                        Order <span className="font-semibold text-[#181211]">#SE-98234</span> is confirmed and being prepared.
                    </p>
                </div>

                {/* Two info cards */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Estimated Delivery */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#E93E2B]">
                            <Icon icon="mdi:truck-delivery-outline" width={22} />
                            <span className="font-bold text-[#181211] text-sm">Estimated Delivery</span>
                        </div>
                        <p className="text-xl font-extrabold text-[#181211]">Today, 2–4 PM</p>
                        <p className="text-xs text-gray-400">Same Day Delivery · Free</p>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#E93E2B]">
                            <Icon icon="mdi:map-marker-outline" width={22} />
                            <span className="font-bold text-[#181211] text-sm">Delivery Address</span>
                        </div>
                        <p className="text-sm font-semibold text-[#181211]">Alex Johnson</p>
                        <p className="text-xs text-gray-400 leading-relaxed">420 High St., Apt 4B<br />San Francisco, CA 94103</p>
                    </div>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                    <h3 className="font-bold text-[#181211] text-lg">Order Summary</h3>

                    {orderItems.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#181211] truncate">{item.name}</p>
                                <p className="text-xs text-gray-400 truncate">{item.description} · Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-bold text-[#E93E2B] shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-[#181211] font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Delivery Fee</span>
                            <span className="text-green-500 font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Tax</span>
                            <span className="text-[#181211] font-medium">${tax.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                        <span className="text-base font-bold text-[#181211]">Total</span>
                        <span className="text-2xl font-extrabold text-[#181211]">${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate('/store/track-order')}
                        className="flex-1 bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-4 rounded-full transition-colors text-sm"
                    >
                        Track My Order
                    </button>
                    <button
                        onClick={() => navigate('/store')}
                        className="flex-1 bg-white border border-gray-200 text-[#181211] font-semibold py-4 rounded-full hover:bg-gray-50 transition-colors text-sm"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderCompletePage;
