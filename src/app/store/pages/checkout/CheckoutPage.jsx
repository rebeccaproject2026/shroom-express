import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Stepper from '../../components/checkout/Stepper';
import DeliveryMethod from '../../components/checkout/DeliveryMethod';
import PaymentMethod from '../../components/checkout/PaymentMethod';
import OrderSummary from '../../components/checkout/OrderSummary';
import cart1 from '../../assets/images/cart1.png';
import cart2 from '../../assets/images/cart2.png';
import cart3 from '../../assets/images/cart3.jpg';

const defaultItems = [
    { id: 1, name: 'Blue Pulaski (Dried)', description: 'Focus & Cognitive Support | 60 Capsules', price: 45, quantity: 1, image: cart1, badge: 'Best Seller', badgeColor: 'text-[#E93E2B] bg-red-50' },
    { id: 2, name: "Lion's Mane Dual Extract", description: 'Top-Shelf Indica | 3.5 Grams', price: 60, quantity: 2, image: cart2, badge: 'Hybrid', badgeColor: 'text-green-600 bg-green-50' },
    { id: 3, name: 'Moonlight Gummies (20pk)', description: '1000mg | Natural Flavor | 30ml', price: 85, quantity: 1, image: cart3, badge: 'New Arrival', badgeColor: 'text-blue-600 bg-blue-50' },
];

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] transition-colors bg-white placeholder-gray-400";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(defaultItems);
    const [delivery, setDelivery] = useState('sameday');
    const [payment, setPayment] = useState('card');
    const [saveCard, setSaveCard] = useState(true);
    const [cardData, setCardData] = useState({ name: 'Alex Johnson', number: '', expiry: '', cvv: '' });
    const [form, setForm] = useState({
        fullName: 'Alex Johnson',
        phone: '+1 (555) 000-0000',
        email: 'Jhon@example.com',
        address: '420 High St.',
        city: 'San Francisco',
        state: 'CN',
        zip: '94103',
        notes: '',
    });

    const handleCardChange = (field, value) => setCardData(prev => ({ ...prev, [field]: value }));
    const handleFormChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item));
    };

    return (
        <div className="w-full min-h-screen bg-[#FAF8F5] px-4 sm:px-10 pt-6 sm:pb-10">
            {/* Top Navigation - Continue Shopping (Mobile/Tablet only) */}
            <div className="mb-6 lg:hidden">
                <button
                    onClick={() => navigate('/store')}
                    className="flex items-center gap-2 text-[#E93E2B] font-bold cursor-pointer text-base hover:opacity-80 transition-[opacity,transform] active:scale-95 group"
                >
                    <Icon icon="mdi:arrow-left" width={22} className="transition-transform group-hover:-translate-x-1" />
                    Continue Shopping
                </button>
            </div>

            <Stepper currentStep={2} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left - Form */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Delivery Method */}
                    <div className="py-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#181211] mb-5">Delivery Method</h2>
                        <DeliveryMethod selected={delivery} onChange={setDelivery} variant="cards" />
                    </div>

                    {/* Billing & Delivery Form */}
                    <div className="py-4">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#181211]">Billing and Delivery</h2>
                            <button onClick={() => navigate('/store/login')} className="text-sm text-[#E93E2B] font-medium hover:opacity-80">Log in for faster checkout</button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-[#181211] font-semibold mb-1 block">Full Name</label>
                                    <input className={inputClass} value={form.fullName} onChange={e => handleFormChange('fullName', e.target.value)} placeholder="Alex Johnson" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#181211] font-semibold mb-1 block">Phone Number</label>
                                    <input className={inputClass} value={form.phone} onChange={e => handleFormChange('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-[#181211] font-semibold mb-1 block">Email Address</label>
                                <input className={inputClass} value={form.email} onChange={e => handleFormChange('email', e.target.value)} placeholder="Jhon@example.com" />
                            </div>
                            <div>
                                <label className="text-sm text-[#181211] font-semibold mb-1 block">Street Address</label>
                                <input className={inputClass} value={form.address} onChange={e => handleFormChange('address', e.target.value)} placeholder="420 High St." />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm text-[#181211] font-semibold mb-1 block">City</label>
                                    <input className={inputClass} value={form.city} onChange={e => handleFormChange('city', e.target.value)} placeholder="San Francisco" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#181211] font-semibold mb-1 block">State</label>
                                    <input className={inputClass} value={form.state} onChange={e => handleFormChange('state', e.target.value)} placeholder="CN" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#181211] font-semibold mb-1 block">ZIP / Postal Code</label>
                                    <input className={inputClass} value={form.zip} onChange={e => handleFormChange('zip', e.target.value)} placeholder="94103" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-[#181211] font-semibold mb-1 block">Order Notes (Optional)</label>
                                <textarea
                                    className={`${inputClass} resize-none h-24`}
                                    value={form.notes}
                                    onChange={e => handleFormChange('notes', e.target.value)}
                                    placeholder="123 Design Avenue, Apt 4B"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="py-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#181211] mb-1">Payment Method</h2>
                        <p className="text-sm text-[#64748B] mb-5">Choose how you'd like to pay for your order securely.</p>
                        <PaymentMethod
                            selected={payment}
                            onChange={setPayment}
                            cardData={cardData}
                            onCardChange={handleCardChange}
                            saveCard={saveCard}
                            onSaveCard={setSaveCard}
                        />
                    </div>
                </div>

                {/* Order Summary (Handles both Desktop Sidebar and Mobile Drawer) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-67.5">
                        <OrderSummary
                            items={cartItems}
                            delivery={delivery}
                            onProceed={() => navigate('/store/order-complete', { state: { delivery, form, cartItems } })}
                            btnLabel="Place Secure Order →"
                            showPromo={true}
                            showSavings={true}
                            onQuantityChange={handleQuantityChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
