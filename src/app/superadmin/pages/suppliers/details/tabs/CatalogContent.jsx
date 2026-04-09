import React, { useState } from "react";
import { Icon } from "@iconify/react";
import PlaceOrderModal from "./modals/PlaceOrderModal";

const CatalogContent = ({ supplier }) => {
    const [isPlaceOrderModalOpen, setIsPlaceOrderModalOpen] = useState(false);
    const products = [
        {
            name: "Micro Dose Caps 30mg",
            min: "50 Pack",
            lead: "3d",
            sku: "NVB-MIC-015",
            category: "Micro dosing",
            cost: "$8.00",
            sell: "$24.99",
            weight: "30gm",
            stock: "142 Pack",
            status: "In Stock"
        },
        {
            name: "Micro Dose Caps 15mg",
            min: "50 caps",
            lead: "3d",
            sku: "NVB-MIC-030",
            category: "Micro dosing",
            cost: "$12.00",
            sell: "$38.99",
            weight: "45gm",
            stock: "87 Pack",
            status: "In Stock"
        },
        {
            name: "Micro Dose Caps 50mg",
            min: "30 Pack",
            lead: "4d",
            sku: "NVB-MIC-050",
            category: "Micro dosing",
            cost: "$16.00",
            sell: "$49.99",
            weight: "60gm",
            stock: "0 Pack",
            status: "Out of Stock"
        },
        {
            name: "Adaptogen Blend 60ct",
            min: "40 Pack",
            lead: "3d",
            sku: "NVB-ADT-001",
            category: "Wellness",
            cost: "$14.00",
            sell: "$44",
            weight: "55gm",
            stock: "56 Pack",
            status: "In Stock"
        },
        {
            name: "Lion's Mane Caps 100ct",
            min: "25 Pack",
            lead: "5d",
            sku: "NVB-LMN-100",
            category: "Capsules",
            cost: "$18.00",
            sell: "$55",
            weight: "70gm",
            stock: "8 Pack",
            status: "Low Stock"
        },
        {
            name: "Reishi Extract 500mg",
            min: "30 bottle",
            lead: "3d",
            sku: "NVB-RSH-030",
            category: "Wellness",
            cost: "$15.00",
            sell: "$42",
            weight: "50gm",
            stock: "34 Pack",
            status: "In Stock"
        }
    ];

    const getStockStatusStyle = (status) => {
        switch (status) {
            case "In Stock": return "text-[#10B981] border-[#10B981] bg-[#ECFDF5]";
            case "Out of Stock": return "text-[#EF4444] border-[#EF4444] bg-[#FEF2F2]";
            case "Low Stock": return "text-[#F59E0B] border-[#F59E0B] bg-[#FFFBEB]";
            default: return "text-gray-500 border-gray-500 bg-gray-50";
        }
    };

    const getCategoryStyle = (category) => {
        switch (category) {
            case "Micro dosing": return "text-[#0066FF] border-[#0066FF] bg-[#DAE9FF]";
            case "Wellness": return "text-[#0066FF] border-[#0066FF] bg-[#DAE9FF]";
            case "Capsules": return "text-[#0066FF] border-[#0066FF] bg-[#DAE9FF]";
            default: return "text-[#0066FF] border-[#0066FF] bg-[#DAE9FF]";
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-manrope">
            {/* Catalog Table Container */}
            <div className="bg-white rounded-md shadow-sm border border-[#E2E8F0] overflow-hidden">
                {/* Header section */}
                <div className="flex items-center justify-between px-5 py-5 bg-white">
                    <div>
                        <h2 className="text-lg font-semibold text-[#181211] leading-tight mb-2">Company Information</h2>
                        <p className="text-sm font-medium text-[#475569]">
                            Showing <span className="font-bold text-[#181211]">7</span> of <span className="font-bold text-[#181211]">7 orders</span>
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsPlaceOrderModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-2.5 bg-[#EA3D2A] text-white rounded-lg text-sm font-semibold hover:bg-[#D43424] transition-all active:scale-95 shadow-lg shadow-[#EA3D2A]/20"
                    >
                        <Icon icon="lucide:plus" width="20" />
                        Order Products
                    </button>
                </div>

                <div className="overflow-x-auto border-t border-[#F1F5F9]">
                    <table className="w-full text-left border-collapse table-fixed lg:table-auto">
                        <thead>
                            <tr className="bg-[#F8FAFC] text-[13px] font-semibold text-[#64748B] uppercase border-b border-[#F1F5F9]">
                                <th className="py-4 px-6 font-semibold">PRODUCT</th>
                                <th className="py-4 px-4 font-semibold">SKU</th>
                                <th className="py-4 px-6 font-semibold">CATEGORY</th>
                                <th className="py-4 px-6 font-semibold">COST</th>
                                <th className="py-4 px-6 font-semibold">PACKET WT</th>
                                <th className="py-4 px-6 font-semibold">STOCK</th>
                                <th className="py-4 px-6 font-semibold text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                            {products.map((product, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-[#F8FAFC]/80 transition-colors group ${index % 2 === 0 ? "bg-white" : "bg-[#BABABA]/20"}`}
                                >
                                    <td className="py-2.5 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-sm bg-[#E8E8E8]  flex items-center justify-center  shrink-0">
                                                🌿
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-[#181211] leading-tight truncate">{product.name}</h4>
                                                <p className="text-xs font-medium underline text-[#475569] mt-0.5 whitespace-nowrap">
                                                    Min: <span className="text-[#64748B]">{product.min}</span> Lead: <span className="text-[#64748B]">{product.lead}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-3 text-[14px] font-medium text-[#475569]">{product.sku}</td>
                                    <td className="py-4 px-6">
                                        <span className={`text-[12px] font-semibold px-3 py-1 rounded-full border inline-block ${getCategoryStyle(product.category)}`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-6">
                                        <div className="flex flex-col">
                                            <span className="text-[15px] font-semibold text-[#181211]">{product.cost}</span>
                                            <span className="text-[12px] mt-1 font-medium text-[#94A3B8] leading-tight">Sell: {product.sell}</span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-6 text-[14px] font-medium text-[#475569]">{product.weight}</td>
                                    <td className="py-2.5 px-6">
                                        <div className="flex flex-col items-start gap-1">
                                            <span className="text-sm font-medium text-[#181211]">{product.stock}</span>
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block ${getStockStatusStyle(product.status)}`}>
                                                {product.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-6 text-center">
                                        <button 
                                            onClick={() => setIsPlaceOrderModalOpen(true)}
                                            className="px-4 py-2 bg-[#219653] text-white rounded-md text-sm font-semibold hover:bg-[#059669] transition-all active:scale-95 shadow-lg shadow-[#10B981]/20"
                                        >
                                            Order
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 border-t border-[#F1F5F9] bg-white">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                            <Icon icon="lucide:chevron-left" width="18" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button className="w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 bg-[#EA3D2A] text-white">1</button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 text-[#181211] hover:bg-gray-50">2</button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 text-[#181211] hover:bg-gray-50">3</button>
                        <span className="px-1 text-[#94A3B8]">...</span>
                        <button className="w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 text-[#181211] hover:bg-gray-50">128</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                            <span className="hidden sm:inline">Next</span>
                            <Icon icon="lucide:chevron-right" width="18" />
                        </button>
                    </div>
                </div>
            </div>

            <PlaceOrderModal 
                isOpen={isPlaceOrderModalOpen} 
                onClose={() => setIsPlaceOrderModalOpen(false)} 
                supplier={supplier}
            />
        </div>
    );
};

export default CatalogContent;
