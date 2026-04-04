import { Icon } from "@iconify/react";

const DetailedStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Active Stores Card */}
            <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm transition-all duration-300 font-manrope">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-[#EA3D2A]/10 flex items-center justify-center text-[#EA3D2A] ">
                        <Icon icon="mdi:star-circle-outline" width="28" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#0F172A] tracking-tight">Active Stores</h4>
                </div>

                <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-tight">Active Stores</p>
                        <h3 className="text-2xl mt-2 font-extrabold text-[#0F172A] leading-none tracking-tight">952</h3>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-xs font-semibold tracking-tight text-[#94A3B8] uppercase">Avg Signup Rate</p>
                        <h3 className="text-2xl  mt-2 font-extrabold text-[#EA3D2A] leading-none">$22.5%</h3>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 border-t-2 border-[#E8E8E8] pt-2">
                    <div className="space-y-1 ">
                        <p className="text-xs font-semibold tracking-tight text-[#94A3B8] uppercase">New This Month</p>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-extrabold text-[#0F172A] leading-none tracking-tight">+38</span>
                            <div className="flex items-center gap-0.5 text-[#16A34A] font-semibold text-sm">
                                <Icon icon="mdi:trending-up" width="16" />
                                4%
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-semibold tracking-tight text-[#94A3B8] uppercase">Churned</p>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-extrabold text-[#0F172A] leading-none tracking-tight">12</span>
                            <div className="flex items-center gap-0.5 text-[#EF4444] font-semibold text-sm">
                                <Icon icon="mdi:trending-down" width="16" />
                                2%
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-xs font-semibold tracking-tight text-[#94A3B8] uppercase">Avg Revenue</p>
                        <h3 className="text-lg font-extrabold text-[#0F172A] leading-none tracking-tight">$4.2k</h3>
                    </div>
                </div>

                <div className="space-y-3 pt-3 border-t-2 border-[#E8E8E8]">
                    <div className="flex justify-between items-center mb-5">
                        <span className="text-sm font-medium text-[#0F172A]">Store Activation Rate</span>
                        <span className="text-sm font-bold text-[#0F172A]">78%</span>
                    </div>
                    <div className="w-full h-[10px] bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '78%' }}></div>
                    </div>
                </div>
            </div>

            {/* Active Products Card */}
            <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm transition-all duration-300 font-manrope">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B] ">
                        <Icon icon="garden:check-badge-stroke-12" width="24" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#0F172A] tracking-tight">Active Products</h4>
                </div>

                <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-tight">Active Products</p>
                        <h3 className="text-2xl mt-2 font-extrabold text-[#0F172A] leading-none tracking-tight">1342</h3>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-xs font-semibold tracking-tight text-[#94A3B8] uppercase">Avg Order Value</p>
                        <h3 className="text-2xl mt-2 font-extrabold text-[#0066FF] leading-none flex items-center justify-end gap-1.5">
                            <Icon icon="mdi:trending-up" width="24" className="text-[#0066FF]" />
                            $48.50
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 border-t-2 border-[#E8E8E8] pt-2">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold tracking-tight text-[#94A3B8] uppercase">New Listings</p>
                        <div className="flex items-center gap-1.5 pt-1">
                            <span className="text-lg font-extrabold text-[#0F172A] leading-none tracking-tight">+124</span>
                            <div className="flex items-center gap-0.5 text-[#16A34A] font-semibold text-sm">
                                <Icon icon="mdi:trending-up" width="16" />
                                9%
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-semibold tracking-tight text-[#94A3B8] uppercase">Out of Stock</p>
                        <div className="flex items-center gap-1.5 pt-1">
                            <span className="text-lg font-extrabold text-[#0F172A] leading-none tracking-tight">31</span>
                            <div className="flex items-center gap-0.5 text-[#EF4444] font-semibold text-sm">
                                <Icon icon="mdi:trending-down" width="16" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-xs font-semibold tracking-tight text-[#94A3B8] uppercase">Avg Rating</p>
                        <div className="pt-1 flex items-center justify-end gap-1">
                            <h3 className="text-lg font-extrabold text-[#0F172A] leading-none tracking-tight">4.6</h3>
                            <Icon icon="solar:star-bold" width="16" className="text-[#FF9800]" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-3 border-t-2 border-[#E8E8E8]">
                    <div className="flex justify-between items-center mb-5">
                        <span className="text-sm font-medium text-[#0F172A]">Fulfillment Rate</span>
                        <span className="text-sm font-bold text-[#0F172A]">88%</span>
                    </div>
                    <div className="w-full h-[10px] bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '88%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedStats;
