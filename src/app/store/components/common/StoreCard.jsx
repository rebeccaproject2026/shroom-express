import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import productEffectImg from "../../assets/images/producteffect1.png";

const StoreCard = ({ store }) => {
    const navigate = useNavigate();

    const {
        id,
        coverImage = "https://via.placeholder.com/300x140/333/fff?text=Cover+Image",
        logo = "https://via.placeholder.com/60/fff/000?text=Logo",
        name = "micro zoomiez",
        rating = "4.8",
        reviewCount = "124",
        deliveryBadge = { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
        estimatedDelivery = "Under 2 Hours",
        avgPrice = "$27.43",
        location = "45 Four Winds Dr, North York, ON M3J 2T6, Canada",
        avatars = [productEffectImg, productEffectImg, productEffectImg, productEffectImg],
        isPrimary = false
    } = store || {};

    const handleViewStore = () => {
        navigate(`/store/storeslists/${id}`);
    };

    return (
        <div className="bg-white rounded-md flex flex-col group transition-all duration-300 border border-[#B7860B]/5  cursor-pointer w-full h-full min-h-85" onClick={handleViewStore}>

            {/* Cover Image Area */}
            <div className="relative w-full h-40 mb-8 shrink-0">
                <img src={coverImage} className="w-full h-full rounded-t-sm object-fill" alt={`${name} cover`} />
                {/* Delivery Badge */}
                {deliveryBadge && (
                    <div className="absolute top-3 right-3 bg-[#F8F8F8] backdrop-blur-[15px] rounded-full px-2.5 py-1 flex items-center gap-1 shadow-[0px_0px_6px_0px_#181211] border border-[#E8E8E8]">
                        <Icon icon={deliveryBadge.icon} className={deliveryBadge.color} width={14} height={14} />
                        <span className={`text-[9px] sm:text-[10px] font-bold ${deliveryBadge.color}`}>
                            {deliveryBadge.text}
                        </span>
                    </div>
                )}

                {/* Logo Overlap */}
                <div className="absolute -bottom-7 left-3.5 w-16 h-16 bg-white rounded-[14px] shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A]  border border-[#E8E8E8] flex items-center justify-center z-10 overflow-hidden">
                    <img src={logo} className="w-[85%] h-[85%] object-contain rounded-[10px]" alt={`${name} logo`} />
                </div>

                {/* Right Avatars Overlap */}
                {avatars && avatars.length > 0 && (
                    <div className="absolute bottom-2 right-2 flex items-center -space-x-4 z-10">
                        {avatars.map((avatar, idx) => (
                            <div key={idx} className={`relative flex items-center justify-center shrink-0 z-[${10 - idx}] w-9 h-9`}>
                                <img src={avatar} className="w-[85%] h-[85%] object-cover rounded-full" alt="Store tag" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 px-4.5 pb-10 mt-1.5">
                {/* Headers */}
                <div className="flex justify-between items-start mb-3 gap-2">
                    <div className="flex flex-col flex-1 min-w-0 pr-1">
                        <div className="relative group/name cursor-default mb-1 max-w-full">
                            <h3 className="font-bold text-[#181211] text-[18px] sm:text-xl lg:text-[16px] xl:text-xl leading-tight whitespace-normal">{name}</h3>
                            <span className="absolute bottom-full left-0 mb-1.5 bg-[#181211] text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover/name:opacity-100 transition-opacity pointer-events-none z-[200]
                                after:content-[''] after:absolute after:top-full after:left-4 after:border-[5px] after:border-transparent after:border-t-[#181211]">
                                {name}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Icon key={i} icon="line-md:star-filled" className="text-[#FFE100]" width={14} height={14} />
                                ))}
                            </div>
                            <span className="text-[12px] text-[#94A3B8] font-bold whitespace-nowrap">
                                {rating} ({reviewCount})
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end text-right shrink-0 lg:max-w-[70px] xl:max-w-none">
                        <span className="text-[10.5px] lg:text-[9px] xl:text-[10.5px] text-[#64748B] font-semibold leading-none mb-1">Est. Delivery</span>
                        <span className="text-[11px] lg:text-[10px] xl:text-[11px] font-bold text-[#181211] leading-none mb-1">{estimatedDelivery}</span>
                        <span className="text-[10.5px] lg:text-[9.5px] xl:text-[10.5px] font-bold text-[#FF9F40] leading-none whitespace-nowrap">Avg: {avgPrice}</span>
                    </div>
                </div>

                {/* Location Line */}
                <div className="flex items-start gap-1.5 mb-5 mt-auto text-[#64748B]">
                    <Icon icon="lucide:navigation" className=" mt-0.5 shrink-0 -rotate-45" width={12} />
                    <p className="text-[11px] sm:text-xs text-[#64748B] leading-snug line-clamp-2">{location}</p>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                    <button
                        onClick={handleViewStore}
                        className={`w-full py-2.5 sm:py-3 cursor-pointer rounded-md font-extrabold text-[15px] sm:text-base border-2 border-[#181211] transition-all flex items-center justify-center ${isPrimary
                            ? 'bg-[#E93E2B] text-white border-[#E93E2B] hover:opacity-90'
                            : 'bg-white text-[#181211] border-[#181211] hover:border-[#E93E2B] hover:text-[#E93E2B]'
                            }`}
                    >
                        View Store
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoreCard;
