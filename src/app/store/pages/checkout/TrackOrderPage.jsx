import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import OrderSummary from '../../components/checkout/OrderSummary';
import cart1 from '../../assets/images/cart1.png';
import cart2 from '../../assets/images/cart2.png';
import cart3 from '../../assets/images/cart3.jpg';

const orderStatus = {
    currentStep: 3,
    estimatedDelivery: '07:55 PM',
    orderId: 'SE-98234',
    driverStatus: 'Driver is 5 minutes away',
    deliveryStatus: 'Out for Delivery',
    address: '420 High St.',
    city: 'San Francisco, CA 94103',
    recipient: 'Alex Johnson',
    phone: '+1 (555) 000-0000',
};

const driver = {
    name: 'Marcus Sterling',
    rating: '4.9',
    orders: '2.4k orders',
};

const orderItems = [
    { id: 1, image: cart1, name: 'Blue Pulaski (Dried)', description: 'Focus & Cognitive Support | 60 Capsules', quantity: 1, price: 45 },
    { id: 2, image: cart2, name: "Lion's Mane Dual Extract", description: 'Top-Shelf Indica | 3.5 Grams', quantity: 2, price: 60 },
    { id: 3, image: cart3, name: 'Moonlight Gummies (20pk)', description: '1000mg | Natural Flavor | 30ml', quantity: 1, price: 85 },
];

const TrackOrderPage = () => {
    const { state } = useLocation();
    const currentItems = state?.cartItems || orderItems;
    const [showSummary, setShowSummary] = React.useState(false);

    return (
        <div className="bg-[#F8F6F6] lg:bg-[#F9F6F4] min-h-screen pb-6 sm:pb-32 lg:pb-10 pt-4 lg:pt-0">
            <div className="max-w-[1400px] mx-auto lg:my-10 px-4 lg:px-6">

                {/* Mobile Back Header */}
                <button
                    onClick={() => window.location.href = '/store'}
                    className="lg:hidden flex items-center gap-2 text-[#E93E2B] font-bold mb-6 group active:scale-95 transition-transform"
                >
                    <Icon icon="mdi:arrow-left" width={22} />
                    <span className="text-[17px]">Continue Shopping</span>
                </button>

                <div className="flex flex-col lg:grid lg:grid-cols-[70%_30%] gap-6">

                    {/* ── LEFT COLUMN ── */}
                    <div className="flex flex-col gap-6">

                        {/* Status Card (Stepper) */}
                        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-gray-50">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h2 className="text-xl lg:text-2xl font-black text-[#181211] leading-tight">{orderStatus.driverStatus}</h2>
                                    <p className="text-[13px] lg:text-sm text-[#886663] mt-1.5 font-medium">
                                        Estimated delivery: {orderStatus.estimatedDelivery}&nbsp;•&nbsp;Order #{orderStatus.orderId}
                                    </p>
                                </div>
                                <span className="w-fit px-5 py-2 bg-[#E93E2B08] border border-[#E93E2B1F] text-[#E93E2B] rounded-2xl text-[13px] font-bold uppercase tracking-wider">
                                    {orderStatus.deliveryStatus}
                                </span>
                            </div>

                            {/* Responsive Stepper */}
                            <div className="relative flex items-center justify-between mt-10 mb-2 px-2">
                                <div className="absolute top-[18px] left-[10%] right-[10%] h-[3px] bg-[#F1F1F1] z-0 rounded-full" />
                                <div className="absolute top-[18px] left-[10%] w-[55%] h-[3px] bg-[#E93E2B] z-0 rounded-full" />

                                {[
                                    { label: 'Order Placed', icon: 'mdi:check', status: 'completed' },
                                    { label: 'Processing', icon: 'mdi:check', status: 'completed' },
                                    { label: 'Out for Delivery', icon: 'ri:truck-line', status: 'active' },
                                    { label: 'Delivered', icon: 'mdi:home-outline', status: 'pending' },
                                ].map((step, idx) => (
                                    <div key={idx} className="flex flex-col items-center z-10">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step.status === 'completed' ? 'bg-[#E93E2B] text-white shadow-lg shadow-red-200' :
                                            step.status === 'active' ? 'bg-[#E93E2B] text-white shadow-lg shadow-red-200 scale-110' :
                                                'bg-white border-2 border-[#F1F1F1] text-[#D1D1D1]'
                                            }`}>
                                            <Icon icon={step.icon} width={20} />
                                        </div>
                                        <span className={`text-[11px] lg:text-xs font-bold mt-4 whitespace-nowrap ${step.status === 'pending' ? 'text-[#888888]' :
                                            step.status === 'active' ? 'text-[#E93E2B]' : 'text-[#181211]'
                                            }`}>{step.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="relative rounded-3xl overflow-hidden shadow-sm border border-gray-100" style={{ height: '500px' }}>
                            <iframe
                                title="Delivery Map"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }}
                                loading="lazy"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5200%2C37.7000%2C-122.3500%2C37.8100&layer=mapnik"
                            />

                            {/* Driver Floating Card (Desktop Only) */}
                            <div className="hidden lg:flex absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 items-center justify-between shadow-2xl border border-white/20 ml-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-[#1a1a2e] flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                                        <Icon icon="mdi:account" width={32} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-[#886663] font-bold uppercase tracking-wider">Your Delivery Partner</p>
                                        <p className="text-lg font-black text-[#181211]">{driver.name}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <Icon icon="mdi:star" className="text-[#FFB800]" width={16} />
                                            <span className="text-sm text-[#886663] font-bold">{driver.rating} ({driver.orders})</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 bg-[#E93E2B] text-white px-8 h-12 rounded-full font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95">
                                    <Icon icon="mdi:phone" width={20} />
                                    Call Driver
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className="flex flex-col gap-6">

                        {/* Delivery Details */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
                            <h3 className="text-lg font-bold text-[#181211] mb-6">Delivery Details</h3>
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-[#FFF5F4] flex items-center justify-center shrink-0 border border-[#E93E2B0D]">
                                    <Icon icon="iconoir:map-pin" className="text-[#E93E2B]" width={22} />
                                </div>
                                <div className="pt-0.5">
                                    <p className="text-[11px] text-[#886663] font-bold uppercase tracking-wide mb-1">Address</p>
                                    <p className="text-[15px] font-bold text-[#181211] leading-tight">{orderStatus.address}</p>
                                    <p className="text-sm text-[#886663] mt-0.5">{orderStatus.city}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#FFF5F4] flex items-center justify-center shrink-0 border border-[#E93E2B0D]">
                                    <Icon icon="mdi:account-outline" className="text-[#E93E2B]" width={22} />
                                </div>
                                <div className="pt-0.5">
                                    <p className="text-[11px] text-[#886663] font-bold uppercase tracking-wide mb-1">Recipient</p>
                                    <p className="text-[15px] font-bold text-[#181211] leading-tight">{orderStatus.recipient}</p>
                                    <p className="text-sm text-[#886663] mt-0.5 font-medium">{orderStatus.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary (Desktop only in this column) */}
                        <div className="hidden lg:block">
                            <OrderSummary
                                items={currentItems}
                                delivery="free"
                                showPromo={false}
                                showBadges={false}
                                btnLabel={null}
                                onProceed={() => { }}
                            />
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center gap-2.5 bg-white rounded-3xl py-6 shadow-sm border border-[#F1F1F1] active:scale-95 transition-transform group">
                                <Icon icon="mdi:headset" className="text-[#E93E2B]" width={26} />
                                <span className="text-[13px] font-bold text-[#181211]">Support</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2.5 bg-white rounded-3xl py-6 shadow-sm border border-[#F1F1F1] active:scale-95 transition-transform group">
                                <Icon icon="mdi:package-variant-closed-remove" className="text-[#E93E2B]" width={26} />
                                <span className="text-[13px] font-bold text-[#181211]">Policy</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Persistent Footer (Checkout-Style Drawer) */}
            <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 flex flex-col shadow-[0_-12px_30px_-5px_rgba(0,0,0,0.08)] transition-all duration-300 ${showSummary ? 'bg-white pb-6' : 'bg-white/50 backdrop-blur-xl'}`}>
                {/* Drawer Header (Clickable) - Matches Checkout Style */}
                <div
                    onClick={() => setShowSummary(!showSummary)}
                    className="flex items-center justify-between px-6 pt-4 pb-2 cursor-pointer"
                >
                    <span className="text-[13px] font-bold text-[#181211] tracking-wide uppercase">Order Summary</span>
                    <Icon icon={showSummary ? "mdi:chevron-up" : "mdi:chevron-down"} width={20} className="text-[#888]" />
                </div>

                {/* Full Breakdown Content Area (Parity with Checkout) */}
                <div className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${showSummary ? 'max-h-[70vh] pb-6' : 'max-h-0'}`}>
                    <div className="flex flex-col gap-6 pt-2">
                        {/* Items List */}
                        <div className="flex flex-col gap-4 max-h-48 overflow-y-auto pr-1">
                            {currentItems.map((i, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 shadow-sm">
                                        <img src={i.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-sm font-bold text-[#181211] leading-tight truncate">{i.name}</p>
                                            <span className="text-sm font-black text-[#181211]">${(i.price * i.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className="text-[11px] text-[#886663] mt-0.5 font-medium italic">Qty: {i.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Breakdown Rows (Subtotal, Delivery, Taxes) */}
                        <div className="flex flex-col gap-2.5 pt-4 border-t border-gray-50">
                            <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span className="text-gray-900 font-bold">${currentItems.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                                <span>Delivery</span>
                                <span className="text-green-600 font-bold uppercase">Free</span>
                            </div>
                            <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                                <span>Estimated Taxes</span>
                                <span className="text-gray-900 font-bold">${(currentItems.reduce((s, i) => s + i.price * i.quantity, 0) * 0.08).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partner Action Bar */}
                <div className="px-3 pt-2 pb-4 flex items-center justify-between gap-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 ml-2">
                        <div className="w-11 h-11 rounded-full bg-[#1a1a2e] flex items-center justify-center shrink-0 border border-white shadow-sm">
                            <Icon icon="mdi:account" width={24} className="text-white" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] text-[#886663] font-bold uppercase leading-none mb-0.5">Your Delivery Partner</p>
                            <p className="text-[15px] font-black text-[#181211] truncate">{driver.name}</p>
                            <div className="flex items-center gap-1">
                                <Icon icon="mdi:star" className="text-[#FFB800]" width={12} />
                                <span className="text-[11px] text-[#886663] font-bold">{driver.rating} ({driver.orders})</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => window.open(`tel:${orderStatus.phone}`)}
                        className="flex items-center gap-2 bg-[#E93E2B] text-white px-7 h-11 rounded-[14px] text-sm font-bold shadow-lg shadow-red-500/20 active:scale-95 transition-transform"
                    >
                        <Icon icon="mdi:phone" width={18} />
                        Call
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackOrderPage;
