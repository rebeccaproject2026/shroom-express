import React, { useState } from "react";
import { Icon } from "@iconify/react";

const PricingContent = ({ product }) => {
    const [isEditing, setIsEditing] = useState(null); // 'sale' or 'cost' or null

    const stats = [
        {
            value: product.price.current,
            label: "SALE PRICE",
            sub: "60gm / Pack - 30ml extract",
            bgColor: "bg-[#E0FFED]",
            textColor: "text-[#219653]"
        },
        {
            value: product.price.cost,
            label: "COST PRICE",
            sub: "Paid to supplier",
            bgColor: "bg-[#F8F8F8]",
            textColor: "text-[#181211]"
        },
        {
            value: "$42.00",
            label: "GROSS PROFIT",
            sub: "Per unit",
            bgColor: "bg-[#E0FFED]",
            textColor: "text-[#219653]"
        },
        {
            value: "67.7%",
            label: "MARGIN",
            sub: "Profit %",
            bgColor: "bg-[#F8F8F8]",
            textColor: "text-[#181211]"
        },
        {
            value: "210.0%",
            label: "MARKUP",
            sub: "Over cost",
            bgColor: "bg-[#F6FBFF]",
            textColor: "text-[#0066FF]"
        },
    ];

    const pricingItems = [
        { id: 'sale', label: "Sale Price", value: product.price.current },
        { id: 'cost', label: "Cost Price", value: product.price.cost },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className={`${stat.bgColor} p-5 rounded-2xl border border-[#E2E8F0]  flex flex-col justify-center h-[105px]`}>
                        <h3 className={`text-2xl font-semibold leading-none mb-2 ${stat.textColor}`}>{stat.value}</h3>
                        <p className={`text-sm font-semibold  uppercase tracking-wide mb-1.5 ${stat.textColor}`}>{stat.label}</p>
                        <p className="text-xs font-medium text-[#475569]">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Pricing Controls Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#181211]">Supplier Information</h3>

                <div className="space-y-3">
                    {pricingItems.map((item) => (
                        <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-md p-3 px-6 shadow-sm flex items-center justify-between min-h-[54px]">
                            <span className="text-[15px] font-semibold text-[#181211]">{item.label}</span>

                            <div className="flex items-center gap-3">
                                {isEditing === item.id ? (
                                    <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-300">
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] font-medium">$</span>
                                            <input
                                                type="text"
                                                defaultValue={item.value.replace('$', '')}
                                                className="w-90 h-10 pl-8 pr-4 bg-white border border-[#E2E8F0] rounded-md text-[16px] font-medium text-[#181211] outline-none transition-all shadow-sm"
                                                autoFocus
                                            />
                                        </div>
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
                                        <span className="text-[15px] font-semibold text-[#181211]">{item.value}</span>
                                        <button
                                            onClick={() => setIsEditing(item.id)}
                                            className="p-1.5 hover:bg-[#F1F5F9] rounded-md transition-colors text-[#181211]"
                                        >
                                            <Icon icon="iconamoon:edit-light" width="20" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Taxable Toggle */}
                    <div className="bg-white border border-[#E2E8F0] rounded-md p-3 px-6 shadow-sm flex items-center justify-between min-h-[54px]">
                        <span className="text-[15px] font-semibold text-[#181211]">Product is Taxable</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EA3D2A]"></div>
                        </div>
                    </div>
                </div>

                {/* Commission Info Banner */}
                <div className="bg-[#DAE9FF] border border-[#0066FF] rounded-md p-2 px-5 flex items-center gap-3 text-[#0066FF] shadow-sm">
                    <Icon icon="hugeicons:information-circle" width="22" className="shrink-0" />
                    <p className="text-[14px] font-medium leading-relaxed">
                        ShroomExpress charges a <span className="font-bold">12% platform commission</span> on each sale. Net revenue per unit:<span className="font-bold underline underline-offset-2">$88.00</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PricingContent;
