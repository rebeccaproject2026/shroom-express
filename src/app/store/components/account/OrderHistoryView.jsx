import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../../data/productsData';
import OrderDetailView from './OrderDetailView';

const orders = [
    { id: 1, date: 'Feb 23, 2026', total: 132.00, shipTo: 'Jeo Deo', orderNo: '#SH-12345', status: 'Delivered', product: allProducts[0] },
    { id: 2, date: 'Feb 23, 2026', total: 132.00, shipTo: 'Jeo Deo', orderNo: '#SH-12345', status: 'Shipped', product: allProducts[0] },
    { id: 3, date: 'Feb 23, 2026', total: 132.00, shipTo: 'Jeo Deo', orderNo: '#SH-12345', status: 'Cancelled', product: allProducts[0] },
    { id: 4, date: 'Feb 23, 2026', total: 132.00, shipTo: 'Jeo Deo', orderNo: '#SH-12345', status: 'Processing', product: allProducts[0] },
];

const tabs = ['All orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusConfig = {
    Delivered: { icon: 'mdi:check-circle-outline', color: 'text-[#00A31B]', bg: 'bg-[#00A31B1A]', border: 'border-[#059669]' },
    Shipped: { icon: 'solar:bag-cross-linear', color: 'text-[#2563EB]', bg: 'bg-[#2563EB1A]', border: 'border-[#3B82F6]' },
    Cancelled: { icon: 'mdi:lock-outline', color: 'text-[#DC2626]', bg: 'bg-[#DC26261A]', border: 'border-[#E93E2B]' },
    Processing: { icon: 'tabler:refresh', color: 'text-[#F97316]', bg: 'bg-[#F973161A]', border: 'border-[#F97316]' },
};

const OrderHistoryView = ({ orderState, setOrderState }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All orders');

    if (orderState?.order) {
        return (
            <OrderDetailView 
                onBack={() => setOrderState({ order: null, isTracking: false })} 
                order={orderState.order} 
                initialIsTracking={orderState.isTracking}
            />
        );
    }

    const filtered = activeTab === 'All orders'
        ? orders
        : orders.filter(o => o.status === activeTab);

    const canTrack = (status) => status === 'Delivered' || status === 'Shipped';

    return (
        <div className="px-1 lg:px-0">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-2xl lg:text-xl font-bold text-[#181211]">My Order</h2>
                <p className="text-sm font-medium text-[#181211] opacity-50 sm:hidden">View and track your recent orders history</p>
            </div>

            {/* Filter tabs - Scrolling on mobile */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap no-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 sm:px-4 sm:py-1.5 rounded-full text-sm font-bold border transition-colors shrink-0 ${activeTab === tab
                                ? 'bg-[#E93E2B] text-white border-[#E93E2B]'
                                : 'bg-white text-[#181211] border-[#E8E8E8] hover:border-[#E8E8E8]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Order cards */}
            <div className="flex flex-col gap-4">
                {filtered.map(order => {
                    const cfg = statusConfig[order.status];
                    const trackable = canTrack(order.status);

                    return (
                        <div key={order.id}>
                            {/* Desktop Card (Hidden on mobile) */}
                            <div className="hidden sm:block border border-[#E8E8E8] rounded-xl overflow-hidden bg-white">
                                {/* Order meta row */}
                                <div className="flex items-center gap-6 px-4 py-3 border-b border-[#E8E8E8] bg-[#FAFAFA]">
                                    <div>
                                        <p className="text-xs text-[#777777] uppercase tracking-wide font-medium">ORDER PLACED</p>
                                        <p className="text-[15px] font-bold text-[#222222]">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#777777] uppercase tracking-wide font-medium">TOTAL AMOUNT</p>
                                        <p className="text-[15px] font-bold text-[#E93E2B]">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#777777] uppercase tracking-wide font-medium">SHIP TO</p>
                                        <p className="text-[15px] font-bold text-[#222222]">{order.shipTo}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#777777] uppercase tracking-wide font-medium">ORDER</p>
                                        <p className="text-[15px] font-bold text-[#222222]">{order.orderNo}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className={`flex items-center gap-1.5 text-[13px] font-bold px-3 py-1.5 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                                            <Icon icon={cfg.icon} width={18} />
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Product row */}
                                <div className="flex items-center gap-4 px-3 py-4">
                                    <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 border border-[#E8E8E8] p-2">
                                        <img src={order.product.image} alt={order.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-lg font-bold text-[#0F3540] mb-1">Blue Pulaski (Dried)</p>
                                        <p className="text-sm text-[#777777] font-semibold leading-relaxed line-clamp-2">
                                            Introducing our Blue Meanies Magic Mushrooms, renowned for their distinctive deep blue "stain" upon contact.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 shrink-0 min-w-[120px]">
                                        <button
                                            disabled={!trackable}
                                            onClick={() => trackable && setOrderState({ order, isTracking: true })}
                                            className={`flex items-center justify-center gap-1.5 font-semibold px-4 py-2.5 rounded-md text-sm transition-colors ${trackable
                                                    ? 'bg-[#E93E2B] hover:bg-red-600 text-white cursor-pointer'
                                                    : 'bg-[#F5DCDC] text-white cursor-not-allowed'
                                                }`}
                                        >
                                            Track Order
                                        </button>
                                        <button
                                            onClick={() => setOrderState({ order, isTracking: false })}
                                            className="flex items-center justify-center gap-1.5 border border-[#E8E8E8] text-[#181211] font-semibold px-4 py-2.5 rounded-md text-sm hover:border-[#E93E2B] hover:text-[#E93E2B] transition-colors bg-[#FAF8F5]">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Card (Visible on mobile only - Image 703) */}
                            <div className="sm:hidden border border-[#F1F5F9] rounded-[24px] bg-white p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-xs font-semibold text-[#181211] opacity-60">Delivered on feb 27, 2026</p>
                                    <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                                        <Icon icon={cfg.icon} width={14} />
                                        {trackable ? order.status : 'Processing'}
                                    </span>
                                </div>

                                <div className="flex gap-4 mb-4">
                                    <div className="w-18 h-18 rounded-xl border border-[#F1F5F9] p-1 shrink-0 overflow-hidden">
                                        <img src={order.product.image} alt="order" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base font-bold text-[#181211] leading-tight mb-1">Blue Pulaski (Dried)</p>
                                        <p className="text-xs text-[#181211] opacity-60 font-medium line-clamp-2">Introducing our Blue Meanies Magic Mushrooms, renowned for their distinctive...</p>
                                    </div>
                                </div>

                                <div className="space-y-1 mb-5">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-semibold text-[#181211] opacity-60 uppercase tracking-tight">ORDER ID</p>
                                        <p className="text-base font-bold text-[#181211]">{order.orderNo}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-semibold text-[#181211] opacity-60 uppercase tracking-tight">ORDER PLACED</p>
                                        <p className="text-base font-bold text-[#181211]">{order.date}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-semibold text-[#181211] opacity-60 uppercase tracking-tight">TOTAL AMOUNT</p>
                                        <p className="text-base font-bold text-[#E93E2B]">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-semibold text-[#181211] opacity-60 uppercase tracking-tight">SHIP TO</p>
                                        <p className="text-base font-bold text-[#181211]">{order.shipTo}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        disabled={!trackable}
                                        onClick={() => trackable && setOrderState({ order, isTracking: true })}
                                        className={`flex-1 flex items-center justify-center py-3.5 rounded-xl text-base font-bold transition-all ${trackable ? 'bg-[#E93E2B] text-white' : 'bg-[#F1F5F9] text-[#BDBDBD]'
                                            }`}
                                    >
                                        Track Order
                                    </button>
                                    <button
                                        onClick={() => setOrderState({ order, isTracking: false })}
                                        className="flex-1 flex items-center justify-center py-3.5 rounded-xl border-2 border-[#F1F5F9] text-base font-bold text-[#181211]"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Icon icon="mdi:clipboard-list-outline" width={48} className="text-[#E5DCDC] mb-3" />
                        <p className="text-sm font-semibold text-[#BDBDBD]">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryView;
