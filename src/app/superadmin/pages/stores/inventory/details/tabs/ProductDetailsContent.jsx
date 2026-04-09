import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ProductDetailsContent = ({ product }) => {
    const [isEditing, setIsEditing] = useState(null);

    const specifications = [
        { id: 'name', label: "Product Name", value: "Full Spectrum Tincture" },
        { id: 'sku', label: "SKU", value: product?.product?.sku || "SKU-S001-003" },
        { id: 'barcode', label: "Barcode / UPC", value: "628462918374" },
        { id: 'category', label: "Category", value: product?.category || "Full Spectrum" },
        { id: 'unit', label: "Unit", value: "Pack" },
        { id: 'weight', label: "Pack Weight", value: "60" },
        { id: 'dosage', label: "Dosage", value: "1ml (approx. 30 drops)" },
        { id: 'servings', label: "Servings/Pack", value: "30" },
    ];

    const tags = ["Organic", "Lab Tested", "Vegan", "Non-GMO", "Full Spectrum"];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Product Description Banner */}
            <div className="bg-[#EBF5FF] border border-[#0066FF] rounded-md p-2 flex gap-4">
                <div className="mt-5 flex-shrink-0">
                    <Icon icon="vaadin:stock" width="24" className="text-[#0066FF]" />
                </div>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-[#0066FF]">Product Description</h4>
                    <p className="text-xs font-medium text-[#0066FF]/90 leading-relaxed">
                        A high-quality full-spectrum mushroom tincture crafted from organically grown fruiting bodies. Each 30ml pack contains a precise blend of lion's mane, reishi, and chaga extracts for maximum bioavailability.
                    </p>
                </div>
            </div>

            {/* Product Specifications Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#181211]">Product Specifications</h3>

                <div className="space-y-3">
                    {specifications.map((spec) => (
                        <div key={spec.id} className="bg-white border border-[#E2E8F0] rounded-md p-3 px-6 shadow-sm flex items-center justify-between min-h-[54px] transition-all">
                            <span className="text-[15px] font-semibold text-[#181211]">{spec.label}</span>

                            <div className="flex items-center gap-3">
                                {isEditing === spec.id ? (
                                    <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-300">
                                        <input
                                            type="text"
                                            defaultValue={spec.value}
                                            className="w-90 h-10 px-4 bg-white border border-[#E2E8F0] rounded-md text-[16px] font-medium text-[#181211] outline-none transition-all shadow-sm focus:border-[#219653] focus:ring-1 focus:ring-[#219653]"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => setIsEditing(null)}
                                            className="px-4 py-2.5 bg-[#219653] text-white rounded-md text-sm font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95"
                                        >
                                            <Icon icon="charm:tick" width="20" strokeWidth={3} />
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(null)}
                                            className="w-10 h-9 bg-[#E2E8F0] border border-[#475569] text-[#475569] rounded-md flex items-center justify-center shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all active:scale-95"
                                        >
                                            <Icon icon="lucide:x" width="20" strokeWidth={2.5} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <span className="text-[15px] font-semibold text-[#181211]">{spec.value}</span>
                                        <button
                                            onClick={() => setIsEditing(spec.id)}
                                            className="p-1.5 hover:bg-[#F1F5F9] rounded-md transition-colors text-[#181211]"
                                        >
                                            <Icon icon="iconamoon:edit-light" width="20" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Tags Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#181211]">Product Tags</h3>
                <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-5 py-2 bg-[#FFF1F0] border border-[#EA3D2A] text-[#EA3D2A] text-sm font-semibold rounded-full shadow-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsContent;
