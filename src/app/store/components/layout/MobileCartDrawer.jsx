import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const MobileCartDrawer = ({ isOpen, onClose, cartItems, cartCount, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/[$,]/g, '')) || 0;
        return sum + price * item.quantity;
    }, 0);

    const savings = 15.00; // Mock savings for design fidelity

    if (!isOpen) return null;

    // Helper to get badge styles based on name or mock data
    const getBadgeStyle = (name) => {
        if (name.toLowerCase().includes('blue')) return { text: 'BEST SELLER', bg: 'bg-[#FFF0EE]', textColor: 'text-[#E93E2B]' };
        if (name.toLowerCase().includes('lion')) return { text: 'HYBRID', bg: 'bg-[#ECFDF5]', textColor: 'text-[#10B981]' };
        return { text: 'NEW ARRIVAL', bg: 'bg-[#EFF6FF]', textColor: 'text-[#3B82F6]' };
    };

    return (
        <div className="fixed inset-0 z-[2000] lg:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Bottom Sheet Drawer */}
            <div className={`relative w-full h-[76%] bg-white rounded-t-[22px] shadow-2xl transition-transform duration-500 transform flex flex-col ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>

                {/* Drag Handle */}
                <div className="flex justify-center pt-4 pb-2 shrink-0">
                    <div className="w-14 h-1.5 bg-[#E2E8F0] rounded-full" />
                </div>

                {/* Header Section */}
                <div className="px-6 pt-2 pb-4 flex items-center justify-between shrink-0">
                    <h2 className="text-2xl font-bold text-[#181211]">Your Cart</h2>
                    <div className="bg-[#E93E2B]/10 text-[#E93E2B] px-4 py-1 rounded-lg text-sm font-semibold">
                        {cartCount} Items
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-2.5 flex flex-col gap-5 pb-6 no-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-[#888]">
                            <Icon icon="mdi:cart-outline" width={48} />
                            <p className="text-sm font-medium">Your cart is empty</p>
                            <button onClick={onClose} className="text-[#E93E2B] font-bold">Continue Shopping</button>
                        </div>
                    ) : (
                        cartItems.map((item, idx) => {
                            const badge = getBadgeStyle(item.name);
                            return (
                                <div key={item.cartKey || idx} className="bg-white border border-[#E93E2B]/5 rounded-[24px] p-2 flex gap-4 relative">
                                    {/* Thumbnail */}
                                    <div className="w-20 h-20 rounded-md border border-[#E8E8E8] overflow-hidden shrink-0 bg-[#F5F5F5]">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Item Info */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                        <div className="pr-10">
                                            <span className={`text-[10px] font-bold ${badge.bg} ${badge.textColor} px-2.5 py-1 rounded-md uppercase tracking-wider mb-1 inline-block`}>
                                                {badge.text}
                                            </span>
                                            <h4 className="text-[17px] font-bold text-[#181211] leading-tight truncate">{item.name}</h4>
                                            <p className="text-[13px] text-[#94A3B8] font-medium truncate mt-0.5">{item.description || "Focus & Cognitive Support | 60 Capsules"}</p>
                                        </div>

                                        {/* Action Row */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex justify-between items-center gap-2 border border-[#E93E2B]/10 bg-[#F8F6F6] rounded-lg px-2 py-1.5  mt-2 w-[30%]">
                                                <button
                                                    onClick={() => updateQuantity(item.cartKey, -1)}
                                                    className="w-5 h-5 flex items-center justify-center text-[#0F172A] cursor-pointer transition-colors"
                                                >
                                                    <Icon icon="fa6-solid:minus" width={12} />
                                                </button>
                                                <span className="text-base font-bold text-[#0F172A] w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartKey, 1)}
                                                    className="w-6 h-6 rounded-sm bg-[#E93E2B] flex items-center cursor-pointer justify-center text-white hover:opacity-90 transition-opacity"
                                                >
                                                    <Icon icon="fa6-solid:plus" width={10} />
                                                </button>
                                            </div>

                                            <span className="text-base font-bold text-[#0F172A]">
                                                ${(parseFloat(String(item.price).replace(/[$,]/g, '')) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => removeFromCart(item.cartKey)}
                                        className="absolute top-2 right-1 text-[#94A3B8] hover:text-[#E93E2B] transition-colors p-1"
                                    >
                                        <Icon icon="material-symbols:delete-outline" width={24} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Sticky Footer Section */}
                {cartItems.length > 0 && (
                    <div className="px-6  bg-white shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <span className="text-xs font-medium text-[#181211] uppercase tracking-[2px] block mb-1.5">SUBTOTAL</span>
                                <span className="text-2xl font-bold text-[#181211]">${subtotal.toFixed(0)}</span>
                            </div>
                            <div className="bg-[#F0FDF4] text-[#16A34A] px-2.5 py-1 rounded-sm text-xs font-bold border border-[#D1FAE5]">
                                Save ${savings.toFixed(2)}
                            </div>
                        </div>

                        <button
                            onClick={() => { onClose(); navigate("/store/cart"); }}
                            className="w-full bg-[#E93E2B] text-white py-3.5 rounded-lg font-bold text-[18px] shadow-[0_12px_24px_rgba(233,62,43,0.25)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                        >
                            <Icon icon="mdi:cart-outline" width={24} />
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full text-[#181211] font-medium text-sm py-4 hover:text-[#181211] transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileCartDrawer;

