import React from 'react';
import { Icon } from '@iconify/react';
import OrderSummary from '../../components/checkout/OrderSummary';
// import product1 from '../../assets/images/product1.png';
// import product2 from '../../assets/images/product2.png';
// import product3 from '../../assets/images/product3.png';
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
    return (
        <div className="grid grid-cols-[70%_30%] gap-5 p-6 bg-[#F9F6F4] max-w-[1400px] mx-auto my-10 min-h-screen ">

            {/* ── LEFT COLUMN ── */}
            <div className=" flex flex-col gap-4 min-w-0">

                {/* Stepper card */}
                <div className="bg-white rounded-2xl h-[214px] p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#0F172A]">{orderStatus.driverStatus}</h2>
                            <p className="text-sm text-[#64748B] mt-1">
                                Estimated delivery: {orderStatus.estimatedDelivery}&nbsp;•&nbsp;Order #{orderStatus.orderId}
                            </p>
                        </div>
                        <span className="px-4 py-1.5 bg-[#E93E2B1A] border border-[#E93E2B33] text-[#E93E2B] rounded-full text-sm font-semibold whitespace-nowrap">
                            {orderStatus.deliveryStatus}
                        </span>
                    </div>

                    {/* Stepper — inline, not using Stepper component */}
                    <div className="relative flex items-center justify-between mt-6 mb-2 px-2">
                        {/* Full red line spanning entire width */}
                        <div className="absolute top-[18px] left-0 right-0 h-[2px] bg-[#E93E2B] z-0" />
                        {/* Gray line for the last segment (after active step) */}
                        <div className="absolute top-[18px] right-0 w-[25%] h-[2px] bg-[#E8E8E8] z-0" />

                        {[
                            { label: 'Order Placed', icon: 'mdi:check', completed: true, active: false },
                            { label: 'Processing', icon: 'mdi:check', completed: true, active: false },
                            { label: 'Out for Delivery', icon: 'ri:truck-line', completed: true, active: true },
                            { label: 'Delivered', icon: 'mdi:home-outline', completed: false, active: false },
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center z-10">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${step.completed
                                    ? 'bg-[#E93E2B] border-[#E93E2B] text-white'
                                    : 'bg-white border-[#E8E8E8] text-[#BDBDBD]'
                                    }`}>
                                    <Icon icon={step.icon} width={18} />
                                </div>
                                <span className={`text-xs font-semibold mt-2 whitespace-nowrap ${step.active ? 'text-[#E93E2B]' : step.completed ? 'text-[#181211]' : 'text-[#BDBDBD]'
                                    }`}>{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map with driver overlay */}
                <div className="relative rounded-2xl overflow-hidden shadow-sm" style={{ height: '577px' }}>
                    <iframe
                        title="Delivery Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0, display: 'block' }}
                        loading="lazy"
                        allowFullScreen
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5200%2C37.7000%2C-122.3500%2C37.8100&layer=mapnik&marker=37.7749%2C-122.4194"
                    />
                    {/* Driver card */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl px-5 py-3 flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-[#1a1a2e] flex items-center justify-center shrink-0">
                                <Icon icon="mdi:account" width={26} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-[#886663]">Your Delivery Partner</p>
                                <p className="text-sm font-bold text-[#181211]">{driver.name}</p>
                                <div className="flex items-center gap-1">
                                    <Icon icon="mdi:star" className="text-[#FFB800]" width={13} />
                                    <span className="text-xs text-[#886663] font-medium">{driver.rating} ({driver.orders})</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => window.open(`tel:${orderStatus.phone}`)} className="flex items-center gap-2 bg-[#E93E2B] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer">
                            <Icon icon="mdi:phone" width={16} />
                            Call
                        </button>
                    </div>
                </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="shrink-0 flex flex-col gap-4">

                {/* Delivery Details */}
                <div className="bg-white h-[214px] rounded-2xl p-5 shadow-sm">
                    <h3 className="text-lg font-bold te
xt-[#0F172A] mb-4">Delivery Details</h3>
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-9 h-9 rounded-full bg-[#E93E2B1A] flex items-center justify-center shrink-0">
                            <Icon icon="iconoir:map-pin" className="text-[#E93E2B]" width={18} />
                        </div>
                        <div>
                            <p className="text-xs text-[#886663]">Address</p>
                            <p className="text-sm font-bold text-[#0F172A]">{orderStatus.address}</p>
                            <p className="text-xs text-[#886663]">{orderStatus.city}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E93E2B1A] flex items-center justify-center shrink-0">
                            <Icon icon="mdi:account-outline" className="text-[#E93E2B]" width={18} />
                        </div>
                        <div>
                            <p className="text-xs text-[#886663]">Recipient</p>
                            <p className="text-sm font-bold text-[#0F172A]">{orderStatus.recipient}</p>
                            <p className="text-xs text-[#886663]">{orderStatus.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <OrderSummary
                    items={orderItems}
                    delivery="free"
                    showPromo={false}
                    showBadges={false}
                    btnLabel={null}
                    onProceed={() => { }}
                />

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => window.open('mailto:support@shroomexpress.com')} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-4 shadow-sm hover:shadow-md transition-shadow border border-[#F0EDED] cursor-pointer">
                        <Icon icon="mdi:headset" className="text-[#E93E2B]" width={22} />
                        <span className="text-xs font-semibold text-[#181211]">Contact Support</span>
                    </button>
                    <button onClick={() => alert('Return Policy: Due to the nature of our products, returns are accepted within 48 hours of delivery for damaged or incorrect items. Contact support@shroomexpress.com.')} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl py-4 shadow-sm hover:shadow-md transition-shadow border border-[#F0EDED] cursor-pointer">
                        <Icon icon="mdi:package-variant-closed-remove" className="text-[#E93E2B]" width={22} />
                        <span className="text-xs font-semibold text-[#181211]">Return Policy</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackOrderPage;
