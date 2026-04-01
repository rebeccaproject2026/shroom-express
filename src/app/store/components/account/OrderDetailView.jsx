import { useState } from 'react';
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

const OrderDetailView = ({ onBack, order = { orderNo: '#SH-12345' }, initialIsTracking = false }) => {
    const [isTracking, setIsTracking] = useState(initialIsTracking);

    const handleInvoice = () => {
        const items = orderItems.map(i => `
            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.qty}</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${i.price.toFixed(2)}</td>
            </tr>`).join('');
        const total = orderItems.reduce((s, i) => s + i.price, 0).toFixed(2);
        const html = `<!DOCTYPE html><html><head><title>Invoice ${order.orderNo}</title>
            <style>body{font-family:sans-serif;padding:40px;color:#181211}h1{color:#E93E2B}table{width:100%;border-collapse:collapse}th{text-align:left;padding:8px;background:#f5f5f5}</style>
            </head><body>
            <h1>Invoice</h1>
            <p><strong>Order:</strong> ${order.orderNo} &nbsp;&nbsp; <strong>Date:</strong> Feb 23, 2026</p>
            <p><strong>Ship To:</strong> Jeo Deo &nbsp;&nbsp; <strong>Total:</strong> $${total}</p>
            <table><thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead><tbody>${items}</tbody></table>
            <p style="margin-top:24px;font-weight:bold">Total: $${total}</p>
            </body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${order.orderNo}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="px-0 lg:px-0 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[#E93E2B] font-semibold text-sm hover:opacity-80 transition-opacity cursor-pointer">
                        <Icon icon="mdi:arrow-left" width={20} />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-[#181211]">{order.orderNo}</h2>
                        <p className="text-sm text-[#181211B2] font-semibold">Placed on Feb 23, 2026</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                    <button onClick={handleInvoice} className="flex items-center gap-1.5 cursor-pointer border border-[#E8E8E8] rounded-md px-4 py-2 text-[15px] font-semibold text-[#181211] hover:border-[#E93E2B] hover:text-[#E93E2B] transition-colors bg-white">
                        <Icon icon="mynaui:download" width="20" height="20" />
                        Invoice
                    </button>
                    <button onClick={() => window.print()} className="flex items-center gap-1.5 cursor-pointer border border-[#E8E8E8] rounded-md px-4 py-2 text-[15px] font-semibold text-[#181211] hover:border-[#E93E2B] hover:text-[#E93E2B] transition-colors bg-white">
                        <Icon icon="lets-icons:print-light" width="22" height="22" className='stroke-2' />
                        Print
                    </button>
                </div>
                <div className="flex sm:hidden items-center gap-3">
                    <button onClick={handleInvoice} className="bg-[#E93E2B] text-white p-2.5 rounded-md shadow-md cursor-pointer active:scale-95 transition-all">
                        <Icon icon="mynaui:download" width={24} />
                    </button>
                    <button onClick={() => window.print()} className="bg-[#E93E2B] text-white p-2.5 rounded-md shadow-md cursor-pointer active:scale-95 transition-all">
                        <Icon icon="lets-icons:print" width={24} />
                    </button>
                </div>
            </div>

            {isTracking ? (
                <div className="space-y-6 mb-6 animate-in fade-in duration-500">
                    {/* High-Fidelity Tracking Card (As Requested) */}
                    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-gray-50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-xl lg:text-2xl font-black text-[#181211] leading-tight">Driver is 5 minutes away</h2>
                                <p className="text-[13px] lg:text-sm text-[#886663] mt-1.5 font-medium">
                                    Estimated delivery: 07:55 PM&nbsp;•&nbsp;Order #{order.orderNo}
                                </p>
                            </div>
                            <span className="w-fit px-5 py-2 bg-[#E93E2B08] border border-[#E93E2B1F] text-[#E93E2B] rounded-2xl text-[13px] font-bold uppercase tracking-wider">
                                OUT FOR DELIVERY
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
                    {/* Map Card - Live OpenStreetMap (Interactive) */}
                    <div className="relative rounded-3xl overflow-hidden shadow-sm border border-gray-100" style={{ height: '500px' }}>
                        <iframe
                            title="Delivery Map"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }}
                            loading="lazy"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5200%2C37.7000%2C-122.3500%2C37.8100&layer=mapnik"
                        />
                    </div>
                </div>
            ) : (
                <div className="border border-[#E8E8E8] rounded-xl p-5 bg-white mb-4">
                    <h3 className="text-xl font-bold text-[#181211] mb-6">Order Timeline</h3>
                    <div className="flex flex-col gap-0 relative">
                        <div className="absolute left-[15.5px] top-4 bottom-9 w-[3.5px] bg-[#E93E2B] z-0 rounded-full" />
                        {timelineSteps.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex gap-4 mb-8 last:mb-2">
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${step.completed ? 'bg-[#E93E2B] border-[#E93E2B]' : 'bg-[#F1F5F9] border-[#E8E8E8]'}`}>
                                    <Icon icon="heroicons:check-badge" width={18} className={step.completed ? 'text-white' : 'text-[#BDBDBD]'} />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-[#181211] leading-none mb-1.5">{step.label}</p>
                                    {step.sub && <p className="text-xs font-semibold text-[#181211] opacity-60 leading-tight mb-1">{step.sub}</p>}
                                    <p className="text-xs font-bold text-[#181211] opacity-40">{step.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                <div className="flex items-center justify-between px-5 py-4 border-t border-[#E8E8E8]">
                    <p className="text-base font-bold text-[#181211]">{orderItems.length} Item</p>
                    <p className="text-base font-bold text-[#181211]">Total : ${orderItems.reduce((s, i) => s + i.price, 0).toFixed(2)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-[#E8E8E8] rounded-xl p-5 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <Icon icon="hugeicons:shipping-truck-01" width="24" height="24" />
                        <p className="text-base font-semibold text-[#181211]">Shipping Address</p>
                    </div>
                    <p className="text-[15px] font-bold text-[#181211] mb-3">Jeo Deo</p>
                    <p className="text-[13px] font-semibold text-[#181211B2] leading-relaxed mb-3 max-w-[300px]">11, Gardiner Expressway Exhibition Place Toronto - M5V 3B1 Ontario</p>
                    <div className="flex items-center gap-3 text-[13px] font-semibold text-[#181211B2]">
                        <span>Phone : +44 4568 2356</span>
                        <span className="text-[#181211]">|</span>
                        <span>Email : jeodeo@gmail.com</span>
                    </div>
                </div>
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
