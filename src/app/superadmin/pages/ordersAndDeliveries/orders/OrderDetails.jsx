/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';

const StatusBadge = ({ label, colorClass }) => (
    <span className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${colorClass}`}>
        {label}
    </span>
);

const OrderDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [orderStatus, setOrderStatus] = useState(location.state?.status || 'Delivered');

    useEffect(() => {
        if (location.state?.status) {
            setOrderStatus(location.state.status);
        }
    }, [location.state]);


    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Orders & Deliveries", path: "/superadmin/orders/all" },
        { label: `#${id || 'SE-9041'}` }
    ];

    const orderData = {
        id: id || 'SE-9041',
        customer: { name: 'Aisha K.', phone: '+1 416-500-1234', address: '42 Queen St W, Toronto' },
        driver: { name: 'Marcus Jenkins', phone: '+1 416-500-1234' },
        store: { name: 'Forest Oasis', eta: 'ETA 12 min' },
        deliveryType: { type: 'Express', subtype: 'Same Day ETA 12 min' },
        items: [
            { id: 1, name: 'Micro Dose Caps 30mg', sku: 'NVB-MIC-030 · $15.00/Pack · 45 gm', quantity: 3, price: 45.00, icon: 'ph:leaf' },
            { id: 2, name: 'Lion\'s Mane Caps 100ct', sku: 'NVB-LMN-100 · $20.00/Pack · 70 gm', quantity: 1, price: 20.00, icon: 'ph:leaf' }
        ],
        timeline: [
            { status: 'Order Placed', time: 'Feb 05, 2026 - 10:14 AM', completed: true },
            { status: 'Payment Confirmed', time: 'Feb 05, 2026 - 10:15 AM', completed: true },
            { status: 'Store Preparing', time: 'Feb 05, 2026 - 10:20 AM', completed: true },
            { status: 'Driver Picked Up', time: 'Feb 05, 2026 - 11:00 AM', completed: orderStatus !== 'Cancelled' },
            { status: orderStatus === 'Cancelled' ? 'Cancelled by Customer' : 'Delivered', time: 'Feb 05, 2026 - 11:30 AM', completed: orderStatus === 'Delivered', error: orderStatus === 'Cancelled' }
        ]
    };

    const subtotal = orderData.items.reduce((acc, item) => acc + item.price, 0);
    const deliveryFee = 0.00;
    const tax = 8.45;
    const total = subtotal + deliveryFee + tax;

    return (
        <div className="space-y-6 animate-in fade-in duration-700 font-manrope pb-10">
            {/* Breadcrumbs & Header Section */}
            <div className="flex flex-col gap-2 mb-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="space-y-1">
                    <h1 className="text-lg font-bold text-[#181211]">#{orderData.id}</h1>
                    <p className="text-[#475569] font-medium text-sm">View order with full details</p>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-lg p-5 border border-[#E2E8F0] shadow-sm space-y-5">
                {/* Top Status Row */}
                <div className="flex items-center gap-2">
                    {orderStatus === 'Delivered' && <StatusBadge label="Delivered" colorClass="text-[#219653] bg-[#CDFFE2] font-semibold" />}
                    {orderStatus === 'In Transit' && <StatusBadge label="In Transit" colorClass="text-[#475569] bg-[#F1F5F9] font-semibold" />}
                    {orderStatus === 'Cancelled' && <StatusBadge label="Canceled" colorClass="text-[#EA3D2A] bg-[#FFEDEB] font-semibold" />}

                    {orderStatus !== 'Cancelled' && (
                        <StatusBadge label="Paid" colorClass="text-[#219653] bg-[#CDFFE2] font-semibold" />
                    )}
                    {orderStatus === 'Cancelled' && <StatusBadge label="Refund" colorClass="text-[#D26D0A] bg-[#FFF7E8] font-semibold" />}

                    <span className="text-xs font-semibold  text-[#475569] ml-1">2 hrs ago</span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="bg-[#F8F8F8] p-4 rounded-md border border-[#F1F5F9]">
                        <p className="text-sm font-semibold text-[#475569]  mb-1 ">Customer</p>
                        <h4 className="text-sm font-bold text-[#181211]">{orderData.customer.name}</h4>
                        <p className="text-xs font-medium text-[#475569] mt-1">{orderData.customer.phone}</p>
                        <p className="text-xs font-medium text-[#475569]">{orderData.customer.address}</p>
                    </div>
                    <div className="bg-[#F8F8F8] p-4 rounded-md border border-[#F1F5F9]">
                        <p className="text-sm font-semibold text-[#475569]  mb-1 ">Driver</p>
                        <h4 className="text-sm font-bold text-[#181211]">{orderData.driver.name}</h4>
                        <p className="text-xs font-medium text-[#475569] mt-1">{orderData.driver.phone}</p>
                    </div>
                    <div className="bg-[#F8F8F8] p-4 rounded-md border border-[#F1F5F9]">
                        <p className="text-sm font-semibold text-[#475569]  mb-1 ">Store</p>
                        <h4 className="text-sm font-bold text-[#181211]">{orderData.store.name}</h4>
                        {orderStatus === 'In Transit' && (
                            <div className="mt-1.5 inline-block px-2.5 py-0.5 bg-[#DAE9FF] rounded text-[#0066FF] text-[10px] font-bold">
                                {orderData.store.eta}
                            </div>
                        )}
                    </div>
                    <div className="bg-[#F8F8F8] p-4 rounded-md border border-[#F1F5F9]">
                        <p className="text-sm font-semibold text-[#475569]  mb-1 ">Delivery Type</p>
                        <h4 className="text-sm font-bold text-[#EA3D2A]">{orderData.deliveryType.type}</h4>
                        {orderStatus === 'In Transit' && (
                            <p className="text-[10px] font-bold text-[#181211] mt-1">
                                <span className="text-[#0066FF]">Same Day</span> {orderData.deliveryType.subtype}
                            </p>
                        )}
                    </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                    <p className="text-sm font-semibold text-[#181211] mb-2">Order Items</p>
                    <div className="space-y-2">
                        {orderData.items.map(item => (
                            <div key={item.id} className="flex items-center gap-4 p-2.5 border-2 border-[#E2E8F0] rounded-lg">
                                <div className="w-9 h-9 rounded-sm bg-[#E8E8E8] flex items-center justify-center shrink-0">
                                    🌿
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-[#181211] leading-tight truncate">{item.name}</h4>
                                    <p className="text-xs font-medium text-[#475569] mt-0.5 underline truncate">{item.sku}</p>
                                </div>
                                <div className="flex items-center gap-8 pr-2">
                                    <span className="text-xs font-semibold text-[#475569]">QTY: {item.quantity}</span>
                                    <span className="text-sm font-bold text-[#181211] min-w-[32px] text-right">${item.price.toFixed(0)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[13px] border-b border-[#E2E8F0] pb-2 font-medium text-[#475569]">
                        <span>Subtotal ({orderData.items.length} products)</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] border-b border-[#E2E8F0] pb-2 font-medium text-[#475569]">
                        <span>Delivery</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] border-b border-[#E2E8F0] pb-2 font-medium text-[#475569]">
                        <span>HST (13%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-[#181211]">Estimated Total</span>
                        <span className="text-lg font-semibold text-[#181211]">${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white border border-[#E2E8F0] rounded-md p-4 space-y-4 pb-1">
                    <p className="text-sm font-semibold text-[#181211]">Delivery Timeline</p>
                    <div className="space-y-0 relative">
                        {orderData.timeline.map((step, idx) => (
                            <div key={idx} className="flex gap-4 min-h-[50px] relative ">
                                {/* Connector Line */}
                                {idx < orderData.timeline.length - 1 && (
                                    <div className={`absolute left-[13px] top-[26px] w-[2px] h-[calc(100%-26px)] ${step.completed ? 'bg-[#CDFFE2]' : 'bg-[#F1F5F9]'}`} />
                                )}
                                {/* Circle Icon */}
                                <div className={`z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${step.error ? 'bg-[#FFEDEB] text-[#EA3D2A]' :
                                    step.completed ? 'bg-[#CDFFE2] text-[#219653]' : 'bg-[#F1F5F9] text-[#94A3B8]'
                                    }`}>
                                    <Icon icon={step.error ? "lucide:x" : "iconamoon:check-fill"} width="16" />
                                </div>
                                <div className="flex justify-between w-full pt-1">
                                    <span className={`text-sm font-semibold ${step.error ? 'text-[#EA3D2A]' : step.completed ? 'text-[#181211]' : 'text-[#94A3B8]'}`}>
                                        {step.status}
                                    </span>
                                    <span className="text-xs font-medium text-[#475569]">{step.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Customer Rating (Only if Delivered) */}
                {orderStatus === 'Delivered' && (
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Customer Rating</p>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Icon key={star} icon="material-symbols:star-rounded" className="text-[#FF9F40]" width="18" />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* In Transit - Update Status Section */}
            {orderStatus === 'In Transit' && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                    <p className="text-xs font-semibold text-[#475569] uppercase tracking-wider ml-1">Update Status</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="py-3 bg-[#219653] text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] hover:opacity-90 transition-all">
                            Delivered
                        </button>
                        <button className="py-3 bg-[#0066FF] text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all">
                            Preparing
                        </button>
                        <button className="py-3 bg-[#F5A623] text-white rounded-lg text-sm font-semibold shadow-md hover:opacity-90 transition-all">
                            Pending
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
