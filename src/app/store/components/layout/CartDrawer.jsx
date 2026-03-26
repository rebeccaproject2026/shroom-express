import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useCart } from "../../context/CartContext";

import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product4 from "../../assets/images/product4.png";
import product5 from "../../assets/images/product5.png";
import product6 from "../../assets/images/product6.png";
import product8 from "../../assets/images/product8.png";

const CartDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, cartCount, removeFromCart, updateQuantity, addToCart } = useCart();
  const [showRecommendations, setShowRecommendations] = React.useState(false);

  // Mock recommendations (Best Selling Products)
  const recommendations = [
    {
        id: 101, badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" }, isWishlisted: false, inStock: true, onSale: true, image: product1,
        title: "Blue Meanies", vendor: "Green Valley Organics", rating: '4.9', weights: ['3g', '10g'], price: 50.00,
        categories: ["Creative Boost", "Visual Experience"],
    },
    {
        id: 102, badge: null, isWishlisted: true, inStock: true, onSale: false, image: product2,
        title: "Melmac (Dried)", vendor: "Aether Mushroom Labs", rating: '4.8', weights: ['3g', '10g'], price: 35.00,
        categories: ["Creative Boost", "Relax & Chill"],
    },
    {
        id: 104, badge: null, isWishlisted: false, inStock: true, onSale: true, image: product4,
        title: "Tidal Wave", vendor: "Green Valley Organics", rating: '4.7', weights: ['3g', '10g'], price: 60.00,
        categories: ["Focus & Clarity", "Relax & Chill"],
    },
    {
        id: 105, badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" }, isWishlisted: false, inStock: true, onSale: false, image: product5,
        title: "Utopia Gummy Grape 10pcs", vendor: "Green Valley Organics", rating: '4.9', weights: ['3g', '10g'], price: 80.00,
        categories: ["Micro dosing", "Creative Boost"],
    },
    {
        id: 106, badge: null, isWishlisted: true, inStock: true, onSale: true, image: product6,
        title: "Original OG Dummyz 1000mg...", vendor: "Aether Mushroom Labs", rating: '4.8', weights: ['3g', '10g'], price: 35.00,
        categories: ["Creative Boost", "Relax & Chill", "Deep Journey"],
    },
    {
        id: 108, badge: null, isWishlisted: false, inStock: true, onSale: false, image: product8,
        title: "Toad Bites", vendor: "Green Valley Organics", rating: '4.7', weights: ['3g', '10g'], price: 10.00,
        categories: ["Focus & Clarity", "Relax & Chill", "Deep Journey"],
    }
  ];

  useEffect(() => {
    if (open) {
      document.body.style.setProperty("overflow", "hidden", "important");
      document.documentElement.style.setProperty("overflow", "hidden", "important");
    } else {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    };
  }, [open]);

  const subtotal = cartItems.reduce((sum, i) => {
    const price = typeof i.price === 'number' ? i.price : parseFloat(String(i.price).replace(/[$,]/g, '')) || 0;
    return sum + price * i.quantity;
  }, 0);

  const handleCheckout = () => {
    onClose();
    navigate("/store/cart");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[110] bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 z-[120] h-full flex transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Recommendations Sidebar (Expansion to the Left) */}
        <div 
            className={`h-full bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] border-r border-[#E8E8E8] transition-all duration-300 overflow-hidden flex flex-col ${showRecommendations ? "w-[340px]" : "w-0"}`}
        >
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#E8E8E8] bg-[#FDFDFD] shrink-0">
                <button 
                    onClick={() => setShowRecommendations(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                >
                    <Icon icon="mdi:chevron-left" width={24} className="text-[#181211]" />
                </button>
                <span className="text-[13px] font-extrabold text-[#181211] uppercase tracking-[0.2em] whitespace-nowrap">You May Also Like</span>
                <div className="w-8" />
            </div>

            <div className="flex-1 overflow-y-auto p-5 py-6 flex flex-col gap-6 hide-scrollbar bg-[#FAFAFA]">
                {recommendations.map(prod => (
                    <div key={prod.id} className="bg-white rounded-2xl p-4 border border-[#F1F1F1] shadow-sm group hover:border-[#E93E2B]/20 transition-all">
                        <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F8F6F6] shrink-0">
                                <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] font-bold text-[#886663] uppercase tracking-wider mb-1">{prod.vendor}</p>
                                <h4 className="text-[14px] font-bold text-[#181211] leading-tight mb-2 truncate-2">{prod.title}</h4>
                                <div className="flex items-center justify-between">
                                    <span className="text-[14px] font-extrabold text-[#181211]">${prod.price.toFixed(2)}</span>
                                    <button 
                                        onClick={() => addToCart(prod, prod.weights[0], 1, true)}
                                        className="h-8 w-8 bg-[#E93E2B] text-white rounded-md flex items-center justify-center hover:bg-opacity-90 transition-all cursor-pointer shadow-sm group-hover:scale-105"
                                    >
                                        <Icon icon="mdi:cart-plus" width={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Cart Content */}
        <div className="h-full w-[360px] bg-white flex flex-col relative">
            {/* Toggle Arrow for Recommendations */}
            {open && !showRecommendations && (
                <div className="group/tooltip absolute top-1/2 -left-8 -translate-y-1/2 flex items-center">
                    <button 
                        onClick={() => setShowRecommendations(true)}
                        className="w-8 h-12 bg-white border border-r-0 border-[#E8E8E8] rounded-l-xl flex items-center justify-center shadow-[-5px_0_15px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <Icon icon="mdi:chevron-left" width={20} className="text-[#E93E2B]" />
                    </button>
                    {/* Tooltip */}
                    <span className="absolute right-full mr-2 px-2.5 py-1.5 bg-[#181211] text-white text-[10px] font-bold uppercase tracking-widest rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none shadow-lg">
                        You May Also Like
                    </span>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8] shrink-0">
                <div className="flex items-center gap-2">
                    <Icon icon="mdi:cart-outline" width={22} className="text-[#E93E2B]" />
                    <span className="text-lg font-bold text-[#0F172A]">My Cart</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#E93E2B] bg-[#FFF0EE] px-2.5 py-1 rounded-full">
                    {cartCount} {cartCount === 1 ? "Item" : "Items"}
                    </span>
                    <button onClick={onClose} className="text-[#888] hover:text-[#181211] transition-colors p-1">
                        <Icon icon="mdi:close" width={22} />
                    </button>
                </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col divide-y divide-[#F1F5F9] hide-scrollbar">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-[#888]">
                    <Icon icon="mdi:cart-off" width={48} />
                    <p className="text-sm font-medium">Your cart is empty</p>
                    </div>
                ) : (
                    cartItems.map((item, idx) => (
                    <div key={item.cartKey || idx} className="flex items-start gap-4 py-5">
                        <div className="w-20 h-20 rounded-md border border-[#E8E8E8] overflow-hidden shrink-0 bg-[#F5F5F5]">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="text-sm font-bold text-[#0F172A] leading-snug">{item.name}</p>
                                <button
                                    onClick={() => removeFromCart(item.cartKey)}
                                    className="text-[#CBD5E1] cursor-pointer hover:text-[#E93E2B] transition-colors shrink-0 mt-0.5"
                                >
                                    <Icon icon="mdi:close" width={17} />
                                </button>
                            </div>

                            {item.description && (
                                <p className="text-xs text-[#94A3B8] mb-2">{item.description}</p>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-lg px-2 py-1.5 border border-[#F1F5F9]">
                                    <button
                                        onClick={() => updateQuantity(item.cartKey, -1)}
                                        className="text-[#64748B] cursor-pointer hover:text-[#E93E2B] transition-colors"
                                    >
                                        <Icon icon="fa6-solid:minus" width={10} />
                                    </button>
                                    <span className="text-sm font-bold text-[#0F172A] w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.cartKey, 1)}
                                        className="text-[#64748B] cursor-pointer hover:text-[#E93E2B] transition-colors"
                                    >
                                        <Icon icon="fa6-solid:plus" width={10} />
                                    </button>
                                </div>

                                <span className="text-base font-bold text-[#0F172A]">
                                    ${(parseFloat(String(item.price).replace(/[$,]/g, '')) * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
            <div className="px-5 py-5 border-t border-[#E8E8E8] bg-white">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#181211]">Subtotal</span>
                    <span className="text-sm font-bold text-[#181211]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#181211]">Delivery</span>
                    <span className="text-sm font-bold text-[#10B981]">FREE</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                    <span className="text-base font-bold text-[#181211]">Total Amount</span>
                    <span className="text-lg font-extrabold text-[#E93E2B]">${subtotal.toFixed(2)}</span>
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full bg-[#E93E2B] hover:bg-opacity-90 text-white font-bold py-4 rounded-xl text-sm shadow-md transition-all flex items-center cursor-pointer justify-center gap-2 uppercase tracking-widest"
                >
                    Checkout Now
                    <Icon icon="mdi:arrow-right" width={18} />
                </button>

                <p className="text-center text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase mt-5 flex items-center justify-center gap-1.5">
                    <Icon icon="mdi:lock-outline" width={14} />
                    100% ENCRYPTED PAYMENT
                </p>
            </div>
            )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
