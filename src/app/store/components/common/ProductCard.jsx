import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import product1 from '../../assets/images/product1.png';

const ProductCard = ({ product }) => {
    // Destructure with default fallbacks matching the screenshot design
    const {
        badge = { text: 'BEST SELLER', colorClass: 'bg-[#EA4031]' },
        isWishlisted = false,
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

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className={`bg-white rounded-3xl p-4  flex flex-col group transition-all duration-300 border border-[#E5DCDC] ${customShadowClass} w-full h-full`}>
            {/* Image Container */}
            <div className="relative w-full h-[240px] flex items-center justify-center overflow-visible shrink-0 mb-3">
                {/* Badge */}
                {badge && (
                    <span
                        className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold text-white rounded-md uppercase z-20 ${badge.colorClass || 'bg-[#E93E2B]'}`}
                    >
                        {badge.text}
                    </span>
                )}

                {/* Wishlist Button */}
                <button
                    className={`absolute top-2.5 right-1 w-[32px] h-[32px] rounded-full flex items-center justify-center shadow-sm transition-colors z-20 border ${isWishlisted
                        ? 'bg-[#FDE047] text-[#181211] border-[#FDE047]'
                        : 'bg-white text-[#181211] border-[#E8E8E8] hover:text-[#EA4031]'
                        }`}
                >
                    <Icon icon={isWishlisted ? "mdi:heart" : "mdi:heart-outline"} width={18} />
                </button>

                {/* Product Image */}
                <img
                    src={image || product1}
                    className="w-[100%] h-[100%] object-contain relative z-10 transition-transform duration-300"
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
                                <div key={idx} className={`relative flex items-center justify-center group/tooltip cursor-pointer shrink-0 z-[${10 - idx}] hover:z-30 ${effect.hasBorder !== false ? 'w-[34px] h-[34px] bg-white rounded-full shadow-sm border border-[#E8E8E8]' : 'w-[42px] h-[42px]'}`}>
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
                            <span
                                key={idx}
                                className="px-3 py-1 border border-[#CCCCCC] rounded-sm text-sm font-medium text-[#181211] bg-white text-center min-w-[40px]"
                            >
                                {w}
                            </span>
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
                        <div className="flex items-center gap-3 px-3 py-1 border border-[#E5DCDC] rounded-md bg-white h-[30px] shadow-sm">
                            <button onClick={handleDecrement} className="text-[#181211] hover:text-[#EA4031] flex items-center justify-center focus:outline-none">
                                <Icon icon="fa6-solid:minus" width={11} />
                            </button>
                            <span className="text-[15px] font-bold text-[#181211] w-4 text-center leading-none select-none">{quantity}</span>
                            <button onClick={handleIncrement} className="text-[#181211] hover:text-[#EA4031] flex items-center justify-center focus:outline-none">
                                <Icon icon="fa6-solid:plus" width={11} />
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <button className="w-[30px] h-[30px] bg-[#E93E2B] text-white rounded-md flex items-center justify-center hover:bg-opacity-90 transition-opacity shrink-0">
                            <Icon icon="solar:cart-plus-linear" width={22} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
