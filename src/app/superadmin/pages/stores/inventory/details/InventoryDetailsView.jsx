import React, { useState } from "react";
import { Icon } from "@iconify/react";
import OverviewContent from "./tabs/OverviewContent";
import StockSupplyContent from "./tabs/StockSupplyContent";
import PricingContent from "./tabs/PricingContent";
import ProductDetailsContent from "./tabs/ProductDetailsContent";
import SalesPerformanceContent from "./tabs/SalesPerformanceContent";
import NotesContent from "./tabs/NotesContent";
import ActivityLogContent from "./tabs/ActivityLogContent";

const InventoryDetailsView = ({ product }) => {
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = [
        "Overview",
        "Stock & Supply",
        "Pricing",
        "Product Details",
        "Sales Performance",
        "Notes (2)",
        "Activity Log",
    ];

    return (
        <div className="space-y-6 font-manrope">
            {/* Stats Overview Grid (Adjusted Widths) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-13 gap-4">
                {/* Sale Price */}
                <div className="bg-white p-4.5 rounded-lg border border-[#E2E8F0] shadow-sm h-24 lg:col-span-2">
                    <p className="text-[#64748B] text-sm font-medium mb-3">Sale Price</p>
                    <h3 className="text-2xl font-semibold text-[#181211] leading-none">{product.price.current}</h3>
                </div>

                {/* Cost Price */}
                <div className="bg-white p-4.5 rounded-lg border border-[#E2E8F0] shadow-sm h-24 lg:col-span-2">
                    <p className="text-[#64748B] text-sm font-medium mb-3">Cost</p>
                    <h3 className="text-2xl font-semibold text-[#181211] leading-none">{product.price.cost}</h3>
                </div>

                {/* Margin */}
                <div className="bg-white p-4.5 rounded-lg border border-[#E2E8F0] shadow-sm h-24 lg:col-span-2">
                    <p className="text-[#64748B] text-sm font-medium mb-3">Margin</p>
                    <h3 className="text-2xl font-semibold text-[#181211] leading-none">67.7%</h3>
                </div>

                {/* Total Sold */}
                <div className="bg-white p-4.5 rounded-lg border border-[#E2E8F0] shadow-sm h-24 lg:col-span-2">
                    <p className="text-[#64748B] text-sm font-medium mb-3">Total Sold</p>
                    <h3 className="text-2xl font-semibold text-[#181211] leading-none">210</h3>
                </div>

                {/* Stock Progress Card (Increased Width) */}
                <div className="bg-white p-4.5 h-24 rounded-lg border border-[#E2E8F0] shadow-sm lg:col-span-5">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-[13px] font-bold text-[#181211]">
                                <span className="text-[#181211]">{product.stock.current} Pack</span>
                                <span className="text-[#64748B] font-medium"> in stock · Alert at {product.stock.alert} pack</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[12px] font-medium text-[#64748B]">
                                    {product.stock.wt.toLowerCase()}
                                </span>
                                <button className="px-3.5 py-1 bg-[#FF9F43] hover:bg-[#F2994A] text-white text-[11px] font-bold rounded-md shadow-sm transition-all active:scale-95">
                                    Adjust
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden border border-[#EDF2F7]">
                                <div
                                    className="h-full bg-[#F2994A] rounded-full transition-all duration-500"
                                    style={{ width: `${product.stock.percentage}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold text-[#64748B]">
                                <span>0</span>
                                <span className="translate-x-1/2">Alert: {product.stock.alert}</span>
                                <span>200</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Card (Matching Store Details style) */}
            <div className="bg-white border border-[#E2E8F0] rounded-md shadow-sm overflow-hidden">
                {/* Tabs Navigation (Inside the card) */}
                <div className="flex items-center border-b border-[#E2E8F0] gap-8 px-6 overflow-x-auto hide-scrollbar shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative pt-5 pb-4 text-[15px] font-semibold transition-all whitespace-nowrap ${activeTab === tab ? "text-[#EA3D2A]" : "text-[#181211] hover:text-[#EA3D2A]"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA3D2A] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab content Padding */}
                <div className="p-6">
                    {activeTab === "Overview" && <OverviewContent product={product} />}
                    {activeTab === "Stock & Supply" && <StockSupplyContent product={product} />}
                    {activeTab === "Pricing" && <PricingContent product={product} />}
                    {activeTab === "Product Details" && <ProductDetailsContent product={product} />}
                    {activeTab === "Sales Performance" && <SalesPerformanceContent product={product} />}
                    {activeTab === "Notes (2)" && <NotesContent />}
                    {activeTab === "Activity Log" && <ActivityLogContent />}
                </div>
            </div>
        </div>
    );
};

export default InventoryDetailsView;
