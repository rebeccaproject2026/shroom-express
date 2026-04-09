import React, { useState } from "react";
import { Icon } from "@iconify/react";
import store from "../../../../../../assets/images/store.png";
import Input from "../../../../../../components/common/Input";

const PlaceOrderModal = ({ isOpen, onClose, supplier }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [note, setNote] = useState("");

    const products = [
        { id: 1, name: "Micro Dose Caps 15mg", price: 8, weight: "30gm", minQty: 50, leadTime: "3d" },
        { id: 2, name: "Micro Dose Caps 30mg", price: 12, weight: "45gm", minQty: 50, leadTime: "3d" },
        { id: 3, name: "Micro Dose Caps 50mg", price: 16, weight: "60gm", minQty: 50, leadTime: "4d" },
        { id: 4, name: "Adaptogen Blend 60ct", price: 14, weight: "55gm", minQty: 40, leadTime: "3d" },
        { id: 5, name: "Lion's Mane Caps 100ct", price: 18, weight: "70gm", minQty: 25, leadTime: "5d" },
        { id: 6, name: "Reishi Extract 500mg", price: 15, weight: "50gm", minQty: 30, leadTime: "3d" },
    ];

    if (!isOpen) return null;

    const handleProductSelect = (product) => {
        if (selectedProduct?.id === product.id) {
            setSelectedProduct(null);
        } else {
            setSelectedProduct(product);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#181211]/30 animate-in fade-in duration-300 backdrop-blur-[2px]">
            <div
                className="bg-white w-full max-w-[620px] rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl font-manrope scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#F1F5F9] flex items-center justify-between bg-[#FAF8F8] sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#F8FAFC] shadow-[0px_4px_7px_0px_#00000040] rounded-sm p-1.5 overflow-hidden">
                            <img src={supplier?.image || store} className="w-full h-full object-cover rounded-md" alt="Supplier" />
                        </div>
                        <div className="space-y-0.5">
                            <h3 className="text-xl font-semibold text-[#181211] leading-none">Place Purchase Order</h3>
                            <p className="text-sm text-[#64748B] font-medium leading-none mt-2">{supplier?.name || "NovaBio Labs"}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#F1F5F9] rounded-full transition-all text-[#64748B] hover:text-[#181211]"
                    >
                        <Icon icon="lucide:x" width="22" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
                    {/* Product Selection Grid */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-[#181211]">
                            Select Product <span className="text-[#EA3D2A]">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductSelect(product)}
                                    className={`flex items-center gap-2.5 p-2 rounded-lg border-2 transition-all cursor-pointer relative group ${selectedProduct?.id === product.id
                                        ? "border-[#219653] bg-[#CDFFE2]"
                                        : "border-[#BDBDD2] bg-white"
                                        }`}
                                >
                                    {/* Radio indicator */}
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selectedProduct?.id === product.id ? "border-[#219653]" : "border-[#BDBDD2]"
                                        }`}>
                                        {selectedProduct?.id === product.id && (
                                            <div className="w-2 h-2 rounded-full bg-[#219653]" />
                                        )}
                                    </div>

                                    {/* Product Icon */}
                                    <div className="w-9 h-9 rounded-sm bg-[#E8E8E8] flex items-center justify-center shrink-0">
                                        🌿
                                    </div>

                                    <div className="min-w-0">
                                        <h4 className={`text-sm font-semibold leading-tight truncate ${selectedProduct?.id === product.id
                                            ? "text-[#219653]"
                                            : "text-[#181211] "
                                            }`}>{product.name}</h4>
                                        <p className={`text-xs underline font-medium  mt-0.5 whitespace-nowrap ${selectedProduct?.id === product.id
                                            ? "text-[#219653]"
                                            : "text-[#64748B] "
                                            }`}>
                                            ${product.price}/unit · {product.weight}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selection Summary - Only show when a product is selected */}
                    {selectedProduct && (
                        <div className="grid grid-cols-3 gap-4 p-3 bg-[#E0FFED] border-2 border-[#219653] rounded-lg animate-in slide-in-from-top-2 duration-300">
                            <div className="text-center">
                                <span className="block text-[15px] mb-2 font-bold text-[#181211]">${selectedProduct.price}.00</span>
                                <span className="text-xs  font-semibold text-[#181211]/60 ">Cost/unit</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-[15px] mb-2 font-bold text-[#181211]">{selectedProduct.minQty}</span>
                                <span className="text-xs  font-semibold text-[#181211]/60 ">Min Qty</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-[15px] mb-2 font-bold text-[#181211]">{selectedProduct.leadTime}</span>
                                <span className="text-xs  font-semibold text-[#181211]/60 ">Lead Time</span>
                            </div>
                        </div>
                    )}

                    {/* Quantity Field */}
                    <div className="space-y-1">
                        <Input
                            label="Quantity"
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Enter quantity..."
                            labelClassName="text-sm font-semibold text-[#181211]"
                            className="h-11 rounded-lg border-[#E2E8F0]"
                        />
                    </div>

                    {/* Note Field */}
                    <div className="space-y-1">
                        <Input
                            label="Note to Supplier (Optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="e.g. Please include COA and ship express..."
                            labelClassName="text-sm font-semibold text-[#181211]"
                            className="h-11 rounded-lg border-[#E2E8F0]"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-[#E2E8F0] flex gap-4 bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-bold transition-all hover:bg-gray-50 active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-5 py-2.5 bg-[#EA3D2A] text-white justify-center rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                        onClick={() => {
                            if (selectedProduct && quantity) {
                                onClose();
                            }
                        }}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div >
    );
};

export default PlaceOrderModal;
