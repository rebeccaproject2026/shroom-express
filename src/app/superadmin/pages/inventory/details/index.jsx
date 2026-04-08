import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { INVENTORY_DATA } from "../../../data/inventoryData";
import InventoryDetailsView from "./InventoryDetailsView";
import Breadcrumbs from "../../../components/common/Breadcrumbs";

const InventoryDetails = () => {
    const { id } = useParams();

    // Find product dynamically from shared data based on URL ID
    const foundProduct = INVENTORY_DATA.find(item => item.id === id);
    const [product, setProduct] = useState(foundProduct);

    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Inventory", path: "/superadmin/inventory/all" },
        { label: product ? product.id : "Product Details" }
    ];

    if (!product) {
        return <div className="p-10 text-center font-manrope font-bold text-xl">Product Not Found</div>;
    }

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* Header / Breadcrumbs Section */}
            <div className="flex flex-col gap-2 mb-3.5">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all">
                    {/* Product Info Profile */}
                    <div className="flex items-start gap-2">
                        <div className="w-18 h-18 rounded-md bg-gray-50 border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
                            <img src={product.product.img} alt={product.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h1 className="text-xl font-semibold text-[#181211]">{product.product.name}</h1>
                                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${product.status === 'In Stock' ? 'bg-[#ECFDF5] border-[#10B981] text-[#10B981]' :
                                    product.status === 'Low Stock' ? 'bg-[#FFFBEB] border-[#F59E0B] text-[#F59E0B]' :
                                        'bg-[#FEF2F2] border-[#EF4444] text-[#EF4444]'
                                    }`}>
                                    <Icon icon={product.status === 'In Stock' ? "charm:tick" : "material-symbols:warning-rounded"} width="14" />
                                    {product.status}
                                </span>
                                {product.isFeatured && (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-[#FFF7E8] border border-[#F2994A] rounded-full text-[#F2994A] text-xs font-semibold">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-1 text-sm text-[#475569] font-regular mb-0.5">
                                <span className="text-[#475569] font-medium">{product.product.sku}</span>
                                <span className="text-[#475569]">|</span>
                                <span className="text-[#475569] font-regular">{product.product.tier} • {product.category} • EarthDrop Co.</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1 pt-0.5">
                                {["Organic", "Lab Tested", "Vegan", "Non-GMO", "Full Spectrum", product.stock.wt.toLowerCase()].map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-[#F6FBFF] text-[#0066FF] text-xs font-semibold rounded-full border border-[#DAE9FF]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
                        <button className="flex items-center gap-2 px-5 py-2.5 border border-[#475569] text-[#475569] rounded-lg text-sm font-semibold bg-white transition-all active:scale-95 shadow-sm">
                            <Icon icon="iconamoon:edit-thin" width="18" strokeWidth={2} />
                            Edit Products
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#EA3D2A]/10 border border-[#EA3D2A]/50 text-[#EA3D2A] rounded-lg text-sm font-semibold hover:bg-[#EA3D2A] hover:text-white transition-all active:scale-95 shadow-sm group">
                            <Icon icon="fluent:delete-24-regular" width="18" strokeWidth={2} className="group-hover:animate-pulse" />
                            Trash
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content View */}
            <InventoryDetailsView product={product} />
        </div>
    );
};

export default InventoryDetails;
