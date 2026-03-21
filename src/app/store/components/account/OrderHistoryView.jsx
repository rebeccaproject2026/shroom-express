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

const OrderHistoryView = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All orders');
    const [selectedOrder, setSelectedOrder] = useState(null);

    if (selectedOrder) {
        return <OrderDetailView onBack={() => setSelectedOrder(null)} order={selectedOrder} />;
    }

    const filtered = activeTab === 'All orders'
        ? orders
        : orders.filter(o => o.status === activeTab);

    const canTrack = (status) => status === 'Delivered' || status === 'Shipped';

    return (
        <div>
            {/* Header */}
            <h2 className="text-xl font-bold text-[#181211] mb-4">My Orders</h2>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                            activeTab === tab
                                ? 'bg-[#E93E2B] text-white border-[#E93E2B]'
                                : 'bg-white text-[#181211] border-[#E8E8E8] hover:border-[#E93E2B] hover:text-[#E93E2B]'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Order cards */}
            <div className="flex flex-col gap-3">
                {filtered.map(order => {
                    const cfg = statusConfig[order.status];
                    const trackable = canTrack(order.status);

                    return (
                        <div key={order.id} className="border border-[#E8E8E8] rounded-xl overflow-hidden bg-white">
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
                                {/* Product image */}
                                <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 border border-[#E8E8E8] p-2">
                                    <img src={order.product.image} alt={order.product.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Product info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-bold text-[#0F3540] mb-1">Blue Pulaski (Dried)</p>
                                    <p className="text-sm text-[#777777] font-semibold leading-relaxed line-clamp-2">
                                        Introducing our Blue Meanies Magic Mushrooms, renowned for their distinctive deep blue "stain" upon contact.
                                    </p>
                                    <p className="text-sm text-[#777777] font-medium italic mt-1.5">Delivered on feb 27, 2026</p>
                                </div>

                                {/* Action buttons */}
                                <div className="flex flex-col gap-2 shrink-0 min-w-[120px]">
                                    <button
                                        disabled={!trackable}
                                        onClick={() => trackable && navigate('/store/track-order')}
                                        className={`flex items-center justify-center gap-1.5 font-semibold px-4 py-2.5 rounded-md text-sm transition-colors ${
                                            trackable
                                                ? 'bg-[#E93E2B] hover:bg-red-600 text-white cursor-pointer'
                                                : 'bg-[#F5DCDC] text-white cursor-not-allowed'
                                        }`}
                                    >
                                        Track Order
                                    </button>
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="flex items-center justify-center gap-1.5 border border-[#E8E8E8] text-[#181211] font-semibold px-4 py-2.5 rounded-md text-sm hover:border-[#E93E2B] hover:text-[#E93E2B] transition-colors bg-[#FAF8F5]">
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
