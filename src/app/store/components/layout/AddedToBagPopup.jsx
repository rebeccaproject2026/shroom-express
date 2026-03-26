import React from 'react';
import { Icon } from '@iconify/react';
import { useCart } from '../../context/CartContext';

const AddedToBagPopup = ({ onCartOpen }) => {
    const { isAddedPopupOpen, lastAddedItem, closeAddedPopup, subTotal } = useCart();

    if (!isAddedPopupOpen || !lastAddedItem) return null;

    const itemTotal = (Number(lastAddedItem.price) * lastAddedItem.quantity).toFixed(2);

    return (
        <div className="fixed top-0 right-1 z-[9999] w-full max-w-[400px] animate-in slide-in-from-top-4 duration-500 ease-out">
            <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-[#E5DCDC] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#F1F1F1]">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E93E2B] animate-pulse" />
                        <h2 className="text-base font-extrabold text-[#181211] uppercase tracking-wide">Added To Your Bag</h2>
                    </div>
                    <button
                        onClick={closeAddedPopup}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Icon icon="mdi:close" width={22} className="text-[#181211]" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-md border border-[#E8E8E8] shrink-0 bg-[#F5F5F5] overflow-hidden">
                            <img src={lastAddedItem.image} alt={lastAddedItem.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-[#886663] uppercase tracking-widest mb-0.5">{lastAddedItem.vendor || "1SPLIFF"}</p>
                            <h3 className="text-[15px] font-bold text-[#181211] leading-tight mb-2 truncate-2">{lastAddedItem.name}</h3>
                            <div className="space-y-0.5">
                                <p className="text-[11px] text-[#886663] font-medium uppercase">{lastAddedItem.displayWeight || "7x0.5g"}</p>
                                <p className="text-[11px] text-[#A1A1A1]">SKU: 00627570322914</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[11px] font-bold text-[#181211]">THC</span>
                                    <span className="text-[11px] text-[#886663]">25.00 - 29.00%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-[#181211]">CBD</span>
                                    <span className="text-[11px] text-[#886663]">0.00 - 2.00%</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-extrabold text-[#181211]">${itemTotal}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 pt-0">
                    <div className="flex items-center justify-between py-4 border-t border-[#F1F1F1] mb-2">
                        <span className="text-sm font-extrabold text-[#181211] uppercase tracking-wide">Sub-total</span>
                        <span className="text-base font-extrabold text-[#181211]">${subTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => { closeAddedPopup(); onCartOpen(); }}
                            className="w-full bg-[#E93E2B] hover:bg-opacity-90 text-white py-3 rounded-md text-[13px] font-bold uppercase tracking-widest transition-all shadow-sm"
                        >
                            My Cart
                        </button>
                        <button
                            onClick={closeAddedPopup}
                            className="w-full bg-white border border-[#181211] text-[#181211] py-3 rounded-md text-[13px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddedToBagPopup;
