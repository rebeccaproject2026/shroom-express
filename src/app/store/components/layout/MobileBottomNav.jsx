import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useCategory } from '../../context/CategoryContext';

const MobileBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { deliveryMethod, setDeliveryMethod } = useCategory();

    const isShopActive = location.pathname === '/store' || location.pathname.startsWith('/store/category') || location.pathname.startsWith('/store/product');

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[1000] lg:hidden bg-white/70 backdrop-blur-xl border-t border-gray-100 px-4 py-2 pt-2 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between max-w-lg mx-auto h-14">

                {/* Shop Button */}
                <button
                    onClick={() => navigate('/store')}
                    className={`flex flex-col items-center justify-center gap-2 transition-colors ${isShopActive ? 'text-[#E93E2B]' : 'text-[#181211]'}`}
                >
                    <Icon icon="solar:shop-outline" width={28} height={28} className={isShopActive ? 'text-[#E93E2B]' : 'text-[#181211]'} />
                    <span className="text-[14px] font-extrabold tracking-tight">Shop</span>
                </button>

                {/* Delivery/Shipping Toggle Pill */}
                <div className="flex-1 flex justify-center px-6">
                    <div className="flex items-center bg-white border border-[#CBD5E1] rounded-full p-1.5 w-full max-w-[260px]">
                        <button
                            onClick={() => setDeliveryMethod('delivery')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[14px] font-extrabold transition-all ${deliveryMethod === 'delivery' ? 'bg-[#E93E2B] text-white shadow-[0_6px_16px_rgba(233,62,43,0.3)]' : 'text-[#181211]'}`}
                        >
                            <Icon icon="hugeicons:truck-delivery" width={22} height={22} />
                            <span>Delivery</span>
                        </button>
                        <button
                            onClick={() => setDeliveryMethod('shipping')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[14px] font-extrabold transition-all ${deliveryMethod === 'shipping' ? 'bg-[#E93E2B] text-white shadow-[0_6px_16px_rgba(233,62,43,0.3)]' : 'text-[#181211]'}`}
                        >
                            <Icon icon="stash:pin-place-duotone" width={22} height={22} />
                            <span>Shipping</span>
                        </button>
                    </div>
                </div>

                {/* Chat Button */}
                <button
                    onClick={() => {/* Handle Chat Click */ }}
                    className="flex flex-col items-center justify-center gap-2 text-[#181211] hover:text-[#E93E2B] transition-colors"
                >
                    <Icon icon="proicons:chat" width={28} height={28} />
                    <span className="text-sm font-extrabold tracking-tight">Chat</span>
                </button>

            </div>
        </div>
    );
};

export default MobileBottomNav;
