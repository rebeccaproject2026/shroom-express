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
    } = product || {};

    const activeEffects = effects.length > 0 ? effects : (effectImage ? [{ image: effectImage, name: effectName }] : []);

    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const wishlisted = checkWishlisted(id);

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product, selectedWeight, quantity);
    };

    const handleProductClick = () => {
        if (id) {
            navigate(`/store/product/${id}`);
        }
    };

    return (
        <div
            className={`bg-white rounded-3xl p-4  flex flex-col group transition-all duration-300 border border-[#E5DCDC] ${customShadowClass} w-full h-full`}
        >
            {/* Image Container */}
            <div
                onClick={handleProductClick}
                className="relative w-full h-60 flex items-center justify-center overflow-visible shrink-0 mb-3 cursor-pointer"
            >
                {/* Badge */}
                {badge && (
                    <span
                        className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold text-white rounded-md uppercase z-20 ${badge.colorClass || 'bg-[#E93E2B]'}`}
                    >
                        {badge.text}
                    </span>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-2.5 right-1 z-20  group/wish">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                        className={`w-8 h-8 rounded-full flex cursor-pointer items-center justify-center shadow-sm transition-colors border ${wishlisted
                            ? 'bg-[#FDE047] text-[#181211] border-[#FDE047]'
                            : 'bg-white text-[#181211] border-[#E8E8E8] hover:text-[#EA4031]'
                            }`}
                    >
                        <Icon icon={wishlisted ? "mdi:heart" : "mdi:heart-outline"} width={18} />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full  cursor-pointer right-0 mb-2 bg-[#181211] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/wish:opacity-100 transition-opacity pointer-events-none
                        after:content-[''] after:absolute after:top-full after:right-3 after:border-[5px] after:border-transparent after:border-t-[#181211]">
                        {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </div>
                </div>

                {/* Product Image */}
                <img
                    src={image || product1}
                    className="w-full h-full object-contain relative z-10 transition-transform duration-300"
                    alt={title}
                />

            </div>

            {/* Content Container */}
            <div className="flex flex-col pl-1">
                {/* Top Row: Rating & Effect Avatar Stack */}
                <div className="flex items-center justify-between mt-1 mb-1 h-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1 z-10">
                        <Icon icon="line-md:star-filled" className="text-[#FFE100]" width={15} height={15} />
                        <span className="text-xs font-bold text-[#181211]">{rating}</span>
                    </div>

                    {/* Effect Avatar Stack */}
                    {activeEffects.length > 0 && (
                        <div className="flex items-center -space-x-2 justify-end z-20">
                            {activeEffects.map((effect, idx) => (
                                <div key={idx} className={`relative flex items-center justify-center group/tooltip cursor-pointer shrink-0 z-[${10 - idx}] hover:z-30 ${effect.hasBorder !== false ? 'w-8.5 h-8.5 bg-white rounded-full shadow-sm border border-[#E8E8E8]' : 'w-10.5 h-10.5'}`}>
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
                <h3 className="font-bold text-[#181211] text-base mb-1.5 truncate ">{title}</h3>
                <p className="text-xs text-[#886663] mb-1 truncate font-normal leading-tight">{vendor}</p>

                {/* Weights / Variants */}
                {weights && weights.length > 0 && (
                    <div className="flex gap-1">
                        {weights.map((w, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setSelectedWeight(w); }}
                                className={`px-3 py-1 cursor-pointer border rounded-sm text-sm font-medium text-center min-w-10 transition-colors ${selectedWeight === w ? 'border-[#E93E2B] bg-[#E93E2B] text-white' : 'border-[#CCCCCC] bg-white text-[#181211] hover:border-[#E93E2B]'}`}
                            >
                                {w}
                            </button>
                        ))}
                    </div>
                )}

                {/* Bottom Row: Price, Qty, Add to Cart */}
                <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-[#181211] text-lg mt-1">
                        ${Number(price).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2.5">
                        {/* Qty Selector */}
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-3 px-3 py-1 border border-[#E5DCDC] rounded-md bg-white h-7.5 shadow-sm"
                        >
                            <button onClick={handleDecrement} className="text-[#181211] hover:text-[#EA4031] flex items-center justify-center focus:outline-none">
                                <Icon icon="fa6-solid:minus" width={11} />
                            </button>
                            <span className="text-[15px] font-bold text-[#181211] w-4 text-center leading-none select-none">{quantity}</span>
                            <button onClick={handleIncrement} className="text-[#181211] hover:text-[#EA4031] flex items-center justify-center focus:outline-none">
                                <Icon icon="fa6-solid:plus" width={11} />
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="w-7.5 h-7.5 bg-[#E93E2B] text-white rounded-md flex items-center cursor-pointer justify-center hover:bg-opacity-90 transition-opacity shrink-0"
                        >
                            <Icon icon="mdi:cart-plus" width={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
