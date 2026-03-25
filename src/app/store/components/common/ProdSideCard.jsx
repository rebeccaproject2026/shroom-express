import React from "react";
import { Icon } from "@iconify/react";


const ProdSideCard = ({ store, onAddToCart, isSelected, onSelect }) => {
  const {
    id,
    logo = "https://via.placeholder.com/60/fff/000?text=Logo",
    name = "micro zoomiez",
    rating = "4.8",
    reviewCount = "124",
    deliveryBadge = {
      text: "Same-day Delivery",
      color: "text-[#181211]",
      icon: "carbon:delivery",
    },
    estimatedDelivery = "Under 2 Hours",
    avgPrice = "$29.00 - $150.00",
  } = store || {};

  return (
    <div
      className={`bg-white rounded-md flex flex-col group transition-all duration-300 cursor-pointer w-full h-full p-2 ${
        isSelected
          ? "border-2 border-(--store-primary) shadow-md"
          : "border border-[#B7860B]/5"
      }`}
      onClick={onSelect}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-16 h-16 bg-white rounded-[14px] shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A] border border-[#E8E8E8] flex items-center justify-center z-10 overflow-hidden">
            <img
              src={logo}
              className="w-[85%] h-[85%] object-contain rounded-[10px]"
              alt={`${name} logo`}
            />
          </div>
          <div className="flex flex-col pr-2">
            <h3 className="font-bold text-[#181211] text-xl leading-tight mb-1 truncate max-w-37.5">
              {name}
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    icon="line-md:star-filled"
                    className="text-[#FFE100]"
                    width={14}
                    height={14}
                  />
                ))}
              </div>
              <span className="text-[12px] text-[#94A3B8] font-bold whitespace-nowrap">
                {rating} ({reviewCount})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-[10.5px] text-[#64748B] font-semibold leading-none mb-1">
              Delivery
            </span>
            <span className="text-[11px] font-bold text-[#181211] leading-none mb-1">
              {estimatedDelivery}
            </span>
          </div>
          {/* Delivery Badge */}
          {deliveryBadge && (
            <div className=" bg-[#D4E6D5]  rounded-full px-2.5 py-1 flex items-center gap-1 w-fit">
              <Icon icon="mdi:truck-outline" width="20" height="20" />

              <span
                className={`text-[10px] sm:text-xs font-bold `}
              >
                {deliveryBadge.text}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#E8E8E8]">
        {/* Headers */}

        <span className="text-lg font-extrabold text-[#181211] ">
          {avgPrice}
        </span>




        <div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(); }}
            className=" bg-[#E93E2B] rounded-lg p-2"
          >
            <Icon icon="material-symbols:add-shopping-cart-sharp" width="20" height="20" className=" text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProdSideCard;
