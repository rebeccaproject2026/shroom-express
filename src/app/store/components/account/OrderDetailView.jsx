import { Icon } from '@iconify/react';
import { allProducts } from '../../data/productsData';

const timelineSteps = [
    { label: 'Order Placed', sub: 'Your order has been received', date: '2026-12-02 | 10:00 PM', completed: true },
    { label: 'Order Confirmed', sub: "We've confirmed your order", date: '2026-12-02 | 10:30 PM', completed: true },
    { label: 'Order Processed', sub: 'Preparing for shipment', date: '2026-12-03 | 10:30 PM', completed: true },
    { label: 'Shipped', sub: 'Your order is on the way', date: '2026-12-04 | 10:30 PM', completed: true },
    { label: 'Delivered', sub: 'Expected delivery', date: '2026-12-05', completed: false },
];

const orderItems = [
    { id: 1, name: 'Blue Pulaski (Dried)', qty: '3.5g', price: 30.00, image: allProducts[0].image },
    { id: 2, name: 'Blue Pulaski (Dried)', qty: '3.5g', price: 30.00, image: allProducts[0].image },
];

const OrderDetailView = () => {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                   
                    <div>
                        <h2 className="text-xl font-bold text-[#181211]">#SH-12345</h2>
                        <p className="text-sm text-[#181211B2] font-semibold">Placed on Feb 23, 2026</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 cursor-pointer border border-[#E8E8E8] rounded-md px-4 py-2 text-[15px] font-semibold text-[#181211] hover:border-[#E93E2B] hover:text-[#E93E2B] transition-colors bg-white">
                        <Icon icon="mynaui:download" width="20" height="20" />
                        Invoice
                    </button>
                    <button className="flex items-center gap-1.5 cursor-pointer border border-[#E8E8E8] rounded-md px-4 py-2 text-[15px] font-semibold text-[#181211] hover:border-[#E93E2B] hover:text-[#E93E2B] transition-colors bg-white">
                        <Icon icon="lets-icons:print-light" width="22" height="22" className='stroke-2' />
                        Print
                    </button>
                </div>
            </div>

            {/* Order Timeline */}
            <div className="border border-[#E8E8E8] rounded-xl p-5 bg-white mb-4">
                <h3 className="text-xl font-bold text-[#181211] mb-6">Order Timeline</h3>

                {/* Stepper */}
                <div className="relative flex items-start justify-between">
                    {/* Line */}
                    <div className="absolute top-4 left-0 right-0 h-[2px] bg-[#E8E8E8] z-0" />
                    <div
                        className="absolute top-4 left-0 h-[2px] bg-[#E93E2B] z-0"
                        style={{ width: `${(4 / 4) * 100}%` }}
                    />

                    {timelineSteps.map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 ${
                                step.completed
                                    ? 'bg-[#E93E2B] border-[#E93E2B]'
                                    : 'bg-white border-[#E8E8E8]'
                            }`}>
                                <Icon
                                    icon="mdi:check-circle-outline"
                                    width={18}
                                    className={step.completed ? 'text-white' : 'text-[#BDBDBD]'}
                                />
                            </div>
                            <p className={`text-sm font-bold text-center ${step.completed ? 'text-[#181211]' : 'text-[#181211]'}`}>
                                {step.label}
                            </p>
                            <p className="text-xs font-semibold text-[#181211B2] text-center mt-0.5 leading-tight px-1">{step.sub}</p>
                            <p className="text-xs font-semibold text-[#181211B2] text-center mt-1">{step.date}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Details */}
            <div className="border border-[#E8E8E8] rounded-lg bg-white mb-4 overflow-hidden">
                <h3 className="text-xl font-bold text-[#181211] p-4 border-b border-[#E8E8E8]">Order Details</h3>

                <div className="flex flex-col divide-y divide-[#F5F0EB]">
                    {orderItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 border border-[#E8E8E8] p-2">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="text-base font-bold text-[#181211]">{item.name}</p>
                                <p className="text-[13px] text-[#181211B2] font-medium mt-0.5">Quantity: {item.qty}</p>
                            </div>
                            <p className="text-base font-bold text-[#E93E2B] shrink-0">${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {/* Total row */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-[#E8E8E8]">
                    <p className="text-base font-bold text-[#181211]">{orderItems.length} Item</p>
                    <p className="text-base font-bold text-[#181211]">
                        Total : ${orderItems.reduce((s, i) => s + i.price, 0).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Shipping + Payment */}
            <div className="grid grid-cols-2 gap-4">
                {/* Shipping Address */}
                <div className="border border-[#E8E8E8] rounded-xl p-5 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <Icon icon="hugeicons:shipping-truck-01" width="24" height="24" />
                        <p className="text-base font-semibold text-[#181211]">Shipping Address</p>
                    </div>
                    <p className="text-[15px] font-bold text-[#181211] mb-3">Jeo Deo</p>
                    <p className="text-[13px] font-semibold text-[#181211B2] leading-relaxed mb-3 max-w-[300px]">
                        11, Gardiner Expressway Exhibition Place Toronto - M5V 3B1 Ontario
                    </p>
                    <div className="flex items-center gap-3 text-[13px] font-semibold text-[#181211B2]">
                        <span>Phone : +44 4568 2356</span>
                        <span className="text-[#181211]">|</span>
                        <span>Email : jeodeo@gmail.com</span>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="border border-[#E8E8E8] rounded-xl p-5 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <Icon icon="streamline-plump:payment-recieve-7" width="24" height="24" />
                        <p className="text-base font-semibold text-[#181211]">Payment Method</p>
                    </div>
                    <p className="text-[15px] font-bold text-[#181211] mb-2.5">Credit Card</p>
                    <p className="text-[13px] text-[#181211] font-semibold mb-1">Mastercard ending in ... 8045</p>
                    <p className="text-[13px] text-[#181211B2] font-semibold">Total : $60.00</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailView;
