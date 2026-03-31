import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import product1 from '../../assets/images/product1.png';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted: checkWishlisted } = useWishlist();

    // Destructure with default fallbacks matching the screenshot design
    const {
        id,
        badge = { text: 'BEST SELLER', colorClass: 'bg-[#EA4031]' },
        image,
        effects = [],
        effectImage,
        effectName = "",
        rating = "4.9",
        title = "Albino Choda",
        vendor = "Green Valley Organics",
        weights = ["3g", "10g"],
        price = 50.00,
        customShadowClass = "hover:shadow-[0px_8px_8px_0px_#E93E2B3D] cursor-pointer",
        isVerticalOnMobile = false,
        isOverlayEffects = false,
    } = product || {};

    const activeEffects = effects.length > 0 ? effects : (effectImage ? [{ image: effectImage, name: effectName }] : []);

    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [showError, setShowError] = useState(false);
    const wishlisted = checkWishlisted(id);

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (weights && weights.length > 0 && !selectedWeight) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        addToCart(product, selectedWeight, quantity);
    };

    const handleProductClick = () => {
        if (id) {
            navigate(`/store/product/${id}`);
        }
    };

    return (
        <div
            className={`bg-white rounded-3xl p-3 sm:p-4 flex flex-col group transition-all duration-300 border border-[#E5DCDC] ${customShadowClass} w-full h-full`}
        >
            {/* Image Container */}
            <div
                onClick={handleProductClick}
                className="relative w-full h-40 sm:h-60 flex items-center justify-center overflow-visible shrink-0 mb-3 cursor-pointer"
            >
                {/* Badge */}
                {badge && (
                    <span
                        className={`absolute top-2 left-2 px-2 py-1 text-[9px] sm:text-[10px] font-semibold text-white rounded-md uppercase z-20 ${badge.colorClass || 'bg-[#E93E2B]'}`}
                    >
                        {badge.text}
                    </span>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-2.5 right-1 z-20 group/wish">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex cursor-pointer items-center justify-center shadow-sm transition-colors border ${wishlisted
                            ? 'bg-[#FDE047] text-[#181211] border-[#FDE047]'
                            : 'bg-white text-[#181211] border-[#E8E8E8] hover:text-[#EA4031]'
                            }`}
                    >
                        <Icon icon={wishlisted ? "mdi:heart" : "mdi:heart-outline"} width={16} />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full cursor-pointer right-0 mb-2 bg-[#181211] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/wish:opacity-100 transition-opacity pointer-events-none
                        after:content-[''] after:absolute after:top-full after:right-3 after:border-[5px] after:border-transparent after:border-t-[#181211]">
                        {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </div>
                </div>

                {/* Product Image */}
                <img
                    src={image || product1}
                    className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                    alt={title}
                />

                {/* Effect Avatar Stack - Overlay on Image */}
                {isOverlayEffects && activeEffects.length > 0 && (
                    <div className="absolute sm:hidden bottom-2 right-2 flex items-center -space-x-4 justify-end z-20 pointer-events-none">
                        {activeEffects.map((effect, idx) => (
                            <div key={idx} className={`relative flex items-center justify-center group/tooltip shrink-0 z-[${10 - idx}] ${effect.hasBorder !== false ? 'w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-sm border border-[#E8E8E8]' : 'w-8 h-8 sm:w-10 sm:h-10'}`}>
                                <img
                                    src={effect.image}
                                    className={effect.hasBorder !== false ? "w-[85%] h-[85%] rounded-full object-cover" : "w-full h-full object-contain drop-shadow-sm"}
                                    alt={effect.name || "Effect"}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="flex flex-col pl-0.5 sm:pl-1">
                {/* Top Row: Rating & Effect Avatar Stack */}
                <div className="flex items-center justify-between mt-0.5 sm:mt-1 mb-1 h-5">
                    {/* Rating */}
                    <div className="flex items-center gap-0.5 sm:gap-1 z-10">
                        <Icon icon="line-md:star-filled" className="text-[#FFE100]" width={14} height={14} />
                        <span className="text-[11px] sm:text-xs font-bold text-[#181211]">{rating}</span>
                    </div>

                    {/* Effect Avatar Stack */}
                    {activeEffects.length > 0 && (
                        <div className={`flex items-center -space-x-2 justify-end z-20 ${isOverlayEffects ? 'hidden sm:flex' : 'flex'}`}>
                            {activeEffects.map((effect, idx) => (
                                <div key={idx} className={`relative flex items-center justify-center group/tooltip cursor-pointer shrink-0 z-[${10 - idx}] hover:z-30 ${effect.hasBorder !== false ? 'w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 bg-white rounded-full shadow-sm border border-[#E8E8E8]' : 'w-9 h-9 sm:w-10.5 sm:h-10.5'}`}>
                                    <img
                                        src={effect.image}
                                        className={effect.hasBorder !== false ? "w-[85%] h-[85%] rounded-full object-cover" : "w-full h-full object-contain drop-shadow-sm"}
                                        alt={effect.name || "Effect"}
                                    />
                                    {effect.name && (
                                        <div className="absolute bottom-full mb-2 bg-white text-[#181211] text-[12px] font-semibold px-3 py-1.5 rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.12)] whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50
                                            after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-white">
                                            {effect.name}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Title & Vendor */}
                <h3 className="font-bold text-[#181211] text-sm sm:text-base mb-1 sm:mb-1.5 leading-tight whitespace-normal line-clamp-2 min-h-[2.5rem] sm:min-h-0">{title}</h3>
                <p className="text-[10px] sm:text-xs text-[#886663] mb-1 font-normal leading-tight whitespace-normal truncate">{vendor}</p>

                {/* Weights / Variants */}
                {weights && weights.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1">
                        {weights.map((w, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setSelectedWeight(w); setShowError(false); }}
                                className={`px-1.5 sm:px-3 py-0.5 sm:py-1 cursor-pointer border rounded-sm text-[11px] sm:text-sm font-medium text-center min-w-8 sm:min-w-10 transition-colors ${selectedWeight === w ? 'border-[#E93E2B] bg-[#E93E2B] text-white' : 'border-[#CCCCCC] bg-white text-[#181211] hover:border-[#E93E2B]'}`}
                            >
                                {w}
                            </button>
                        ))}
                    </div>
                )}

                {/* Bottom Row: Price, Qty, Add to Cart */}
                <div className="flex flex-col mt-1 sm:mt-1.5 relative">
                    {/* Error Message Tooltip-style */}
                    {showError && (
                        <div className="absolute -top-7 right-0 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none overflow-visible z-50">
                            <span className="bg-[#E93E2B] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                                Select Size
                            </span>
                        </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 sm:gap-y-0 gap-x-1 sm:gap-x-2 min-h-[32px] sm:min-h-[36px]">
                        <span className="font-extrabold text-[#181211] text-[15px] sm:text-lg lg:text-xl shrink-0">
                            ${Number(price).toFixed(2)}
                        </span>

                        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
                            {/* Qty Selector */}
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-2.5 py-1 border border-[#E5DCDC] rounded-md bg-white h-7.5 sm:h-8 shadow-sm flex-1 sm:flex-initial justify-between"
                            >
                                <button onClick={handleDecrement} className="text-[#181211] hover:text-[#EA4031] flex items-center justify-center focus:outline-none">
                                    <Icon icon="fa6-solid:minus" width={9} className="sm:w-[10px]" />
                                </button>
                                <span className="text-[12px] sm:text-[14px] font-bold text-[#181211] w-3 sm:w-4 text-center leading-none select-none">{quantity}</span>
                                <button onClick={handleIncrement} className="text-[#181211] hover:text-[#EA4031] flex items-center justify-center focus:outline-none">
                                    <Icon icon="fa6-solid:plus" width={9} className="sm:w-[10px]" />
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-md flex items-center cursor-pointer justify-center transition-all shrink-0 ${showError ? 'bg-[#E93E2B] animate-shake' : 'bg-[#E93E2B] hover:bg-opacity-90'}`}
                            >
                                <Icon icon="mdi:cart-plus" width={18} className="text-white sm:w-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
