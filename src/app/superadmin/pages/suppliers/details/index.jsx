import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { SUPPLIERS_DATA } from "../../../data/suppliersData";
import SupplierDetails from "./SupplierDetails";
import Breadcrumbs from "../../../components/common/Breadcrumbs";

const SupplierDetailsIndex = () => {
    const { id } = useParams();

    // Find supplier dynamically from shared data based on URL ID
    const foundSupplier = SUPPLIERS_DATA.find(item => String(item.id) === String(id));
    // eslint-disable-next-line no-unused-vars
    const [supplier, setSupplier] = useState(foundSupplier);

    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Suppliers", path: "/superadmin/suppliers/all" },
        { label: supplier ? supplier.name : "Supplier Details" }
    ];

    if (!supplier) {
        return <div className="p-10 text-center font-manrope font-bold text-xl">Supplier Not Found</div>;
    }

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500 pb-10">
            {/* Header / Breadcrumbs Section */}
            <div className="flex flex-col gap-2 mb-3.5">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all">
                    {/* Supplier Info Profile */}
                    <div className="flex items-start gap-3">
                        <div className="w-18 h-18 rounded-sm bg-[#FFFFFF] border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0 shadow-[0px_0px_4px_0px_#00000040] mt-3">
                            <span className="text-3xl">🌿</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h1 className="text-xl font-semibold text-[#181211]">{supplier.name}</h1>
                                <span className={`flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold border ${supplier.status === 'Active' ? 'bg-[#ECFDF5] border-[#10B981] text-[#10B981]' :
                                    supplier.status === 'Pending' ? 'bg-[#FFFBEB] border-[#F59E0B] text-[#F59E0B]' :
                                        'bg-[#FEF2F2] border-[#EF4444] text-[#EF4444]'
                                    }`}>
                                    <Icon icon={supplier.status === 'Active' ? "charm:tick" : "material-symbols:warning-rounded"} width="14" />
                                    {supplier.status}
                                </span>
                                {supplier.verifiedPartner && (
                                    <span className="flex items-center gap-1 px-3 py-0.5 bg-[#FFF7E8] border border-[#F2994A] rounded-full text-[#F2994A] text-xs font-bold">
                                        Verified Partner
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-[#64748B] font-medium leading-tight max-w-xl">
                                {supplier.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#64748B] font-medium">
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:mail" width="14" className="text-[#94A3B8]" />
                                    {supplier.email}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:map-pin" width="14" className="text-[#94A3B8]" />
                                    {supplier.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:phone" width="14" className="text-[#94A3B8]" />
                                    {supplier.phone}
                                </div>
                                <div className="flex items-center gap-1 underline">
                                    <Icon icon="lucide:globe" width="14" className="text-[#94A3B8]" />
                                    {supplier.website}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-[13px] font-bold">
                                <div className="flex items-center gap-1 text-[#F2994A]">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Icon
                                                key={i}
                                                icon="material-symbols:star-outline-rounded"
                                                width="14"
                                                className={i < Math.floor(supplier.rating) ? "text-[#F59E0B]" : "text-[#E2E8F0]"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[#181211]">{supplier.rating}</span>
                                </div>
                                <div className="text-[#64748B] font-medium">
                                    Partner since {supplier.partnerSince}
                                </div>
                                <div className="flex items-center gap-1 px-2.5 py-0.5 bg-[#DAE9FF] text-[#0066FF] text-[11px] font-bold rounded-full border border-[#0066FF]">
                                    {supplier.category}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Stats */}
                    <div className="flex items-center gap-2 shrink-0 mb-6">
                        <div className="bg-white p-2 px-5 rounded-lg border border-[#F8F8F8]  min-w-[120px]">
                            <p className="text-[#475569] text-xs font-medium mb-1">Total Spend</p>
                            <h3 className="text-xl font-semibold text-[#EA3D2A] leading-tight">{supplier.spend}</h3>
                        </div>
                        <div className="bg-white p-2 px-5 rounded-lg border border-[#F8F8F8] min-w-[120px]">
                            <p className="text-[#475569] text-xs font-medium mb-1">Products</p>
                            <h3 className={`text-xl font-semibold text-[#219653] leading-tight`}>{supplier.totalProducts}</h3>
                        </div>
                        <div className="bg-white p-2 px-5 rounded-lg border border-[#F8F8F8] min-w-[120px]">
                            <p className="text-[#475569] text-xs font-medium mb-1">Total Orders</p>
                            <h3 className={`text-xl font-semibold text-[#0066FF] leading-tight`}>{supplier.orders}</h3>
                        </div>
                        <div className="bg-white p-2 px-5 rounded-lg border border-[#F8F8F8]  min-w-[120px]">
                            <p className="text-[#475569] text-xs font-medium mb-1">On-time</p>
                            <h3 className={`text-xl font-semibold text-[#F2994A] leading-tight`}>{supplier.onTime}%</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content View */}
            <SupplierDetails supplier={supplier} />
        </div>
    );
};

export default SupplierDetailsIndex;
