import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import PendingStoreView from "./PendingStoreView";
import ActiveStoreView from "./ActiveStoreView";
import SuspendedStoreView from "./SuspendedStoreView";
import { STORES_DATA } from "../../../../data/storesData";
import RequestDocsModal from "./tabs/modals/RequestDocsModal";
import DeclineStoreModal from "./tabs/modals/DeclineStoreModal";
import SuspendStoreModal from "./tabs/modals/SuspendStoreModal";
import ReinstateStoreModal from "./tabs/modals/ReinstateStoreModal";
import ExtendSuspensionModal from "./tabs/modals/ExtendSuspensionModal";
import Breadcrumbs from "../../../../components/common/Breadcrumbs";

const StoreDetails = () => {
    const { id } = useParams();

    // Find store dynamically from shared data based on URL ID
    const foundStore = STORES_DATA.find(s => s.id.replace('#', '') === id);
    const [store, setStore] = useState(foundStore);

    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Stores", path: "/superadmin/stores/all" },
        { label: store ? store.id : "Store Details" }
    ];

    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [isReinstateModalOpen, setIsReinstateModalOpen] = useState(false);
    const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
    // const toggleStatus = () => {
    //     setStore(prev => ({
    //         ...prev,
    //         status: prev.status === "Pending" ? "Active" :
    //             prev.status === "Active" ? "Suspended" : "Pending"
    //     }));
    // };


    if (!store) {
        return <div className="p-10 text-center font-manrope font-bold text-xl">Store Not Found</div>;
    }

    return (
        <div className="space-y-6 font-manrope animate-in fade-in duration-500">
            {/* Header / Breadcrumbs Section */}
            <div className="flex flex-col gap-2 mb-3.5">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all">
                    {/* Store Info Profile */}
                    <div className="flex items-start gap-2">
                        <div className="w-18 h-18 rounded-md bg-gray-50 border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
                            <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h1 className="text-xl font-semibold text-[#181211]">{store.name}</h1>
                                {store.status === "Active" && (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-[#ECFDF5] border border-[#10B981] rounded-full text-[#10B981] text-xs font-semibold">
                                        <Icon icon="charm:tick" width="14" />
                                        Approved & Live
                                    </span>
                                )}
                                {store.featured && (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-[#FFF7E8] border border-[#F2994A] rounded-full text-[#F2994A] text-xs font-semibold">
                                        Featured
                                    </span>
                                )}
                                {store.status === "Suspended" && (
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 px-3 py-1 bg-[#FFF7E8] border border-[#F2994A] rounded-full text-[#F2994A] text-xs font-semibold">
                                            <Icon icon="carbon:pause-outline" width="14" />
                                            Suspended
                                        </span>
                                        <span className="flex items-center gap-1 px-3 py-1 bg-[#FEF2F2] border border-[#EA3D2A] rounded-full text-[#EA3D2A] text-xs font-semibold">
                                            <Icon icon="openmoji:police-car-light" width="14" />
                                            Policy Violation
                                        </span>
                                    </div>
                                )}
                                {store.status === "Pending" && (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-[#FFF7E8] border border-[#F2994A] rounded-full text-[#F2994A] text-xs font-semibold">
                                        <Icon icon="mdi:timer-sand" width="14" />
                                        Awaiting Approval
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-1 text-sm text-[#475569] font-regular mb-0.5">
                                <span className="text-[#475569] font-regular">{store.id} • Approved {store.approvedDate} • {store.category}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[13px] text-[#475569] font-medium">
                                <a href={`mailto:${store.email}`} className="flex items-center gap-1 hover:text-[#EA3D2A] transition-colors">
                                    <Icon icon="carbon:email" width="14" /> {store.email}
                                </a>
                                <span className="text-[#94A3B8]">|</span>
                                <span className="flex items-center gap-1">
                                    <Icon icon="stash:pin-place-duotone" width="14" /> {store.location}
                                </span>
                                <span className="text-[#94A3B8]">|</span>
                                <span className="flex items-center gap-1 focus:outline-none">
                                    <Icon icon="proicons:call" width="14" /> {store.phone}
                                </span>
                                <span className="text-[#94A3B8]">|</span>
                                <a href={store.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#EA3D2A] transition-colors">
                                    <Icon icon="bitcoin-icons:globe-outline" width="14" /> {store.website}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center shrink-0 self-start lg:self-center">
                        {store.status === "Pending" ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsRequestModalOpen(true)}
                                    className="flex items-center gap-1 px-4 py-2.5 border border-[#0066FF] text-[#0066FF] rounded-lg text-sm font-semibold bg-[#DAE9FF] transition-all active:scale-95 shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33]"
                                >
                                    <Icon icon="material-symbols:upload-rounded" width="18" />
                                    Request Docs
                                </button>
                                <button
                                    onClick={() => setIsDeclineModalOpen(true)}
                                    className="flex items-center gap-1 px-4 py-2.5 border border-[#EA3D2A] text-[#EA3D2A] rounded-lg shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] text-sm font-semibold bg-[#FFEDEB] transition-all active:scale-95"
                                >
                                    <Icon icon="radix-icons:cross-2" width="18" />
                                    Decline
                                </button>
                                <button className="flex items-center gap-1 px-4 py-2.5 bg-[#219653] text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all active:scale-95">
                                    <Icon icon="charm:tick" width="18" />
                                    Approve
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-end gap-2">
                                {store.status === "Suspended" ? (
                                    <div className="flex flex-col items-end gap-3.5 mt-2">
                                        {/* Primary Reinstate Button */}
                                        <button
                                            onClick={() => setIsReinstateModalOpen(true)}
                                            className="flex items-center gap-1 px-4 py-2.5 bg-[#219653] text-white rounded-lg text-[15px] font-bold shadow-md hover:bg-opacity-90 transition-all active:scale-95"
                                        >
                                            <Icon icon="icon-park-outline:play" width="20" />
                                            Reinstate Store
                                        </button>

                                        {/* Secondary Actions */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setIsExtendModalOpen(true)}
                                                className="flex items-center gap-1 px-5 py-2 border border-[#F2994A] text-[#F2994A] rounded-lg text-[14.5px] font-bold bg-[#FFF7E8] transition-all hover:bg-white shadow-sm active:scale-95"
                                            >
                                                <Icon icon="mingcute:time-line" width="20" />
                                                Extend
                                            </button>
                                            <button className="flex items-center gap-1 px-5 py-2 border border-[#EA3D2A] text-[#EA3D2A] rounded-lg text-[14.5px] font-bold bg-[#FFEDEB] transition-all hover:bg-white shadow-sm active:scale-95">
                                                <Icon icon="mdi:block" width="20" />
                                                Revoke
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-end gap-2">
                                        <button className="flex items-center gap-2 px-4 py-2.5 border border-[#475569] text-[#475569] rounded-lg text-[14.5px] font-bold bg-white transition-all active:scale-95 shadow-sm">
                                            <Icon icon="iconamoon:edit-thin" width="18" strokeWidth={1.5} />
                                            Edit Info
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <button className="flex items-center gap-1 px-3 py-2.5 border border-[#0066FF] text-[#0066FF] rounded-lg text-sm font-bold bg-[#DAE9FF] transition-all active:scale-95 shadow-sm whitespace-nowrap">
                                                <Icon icon="ic:round-star" width="20" />
                                                Unfeatured
                                            </button>
                                            <button
                                                onClick={() => setIsSuspendModalOpen(true)}
                                                className="flex items-center gap-1 px-3 py-2.5 border border-[#F2994A] text-[#F2994A] rounded-lg text-sm font-bold bg-[#FFF7E8] transition-all active:scale-95 shadow-sm whitespace-nowrap"
                                            >
                                                <Icon icon="carbon:pause-outline" width="20" strokeWidth={2} />
                                                Suspend
                                            </button>
                                            <button className="flex items-center gap-1 px-3 py-2.5 border border-[#EA3D2A] text-[#EA3D2A] rounded-lg text-sm font-bold bg-[#FFEDEB] transition-all active:scale-95 shadow-sm whitespace-nowrap">
                                                <Icon icon="mdi:block" width="20" />
                                                Revoke
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <RequestDocsModal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} />
            <DeclineStoreModal isOpen={isDeclineModalOpen} onClose={() => setIsDeclineModalOpen(false)} />
            <SuspendStoreModal
                isOpen={isSuspendModalOpen}
                onClose={() => setIsSuspendModalOpen(false)}
                onConfirm={() => setStore(prev => ({ ...prev, status: "Suspended" }))}
            />
            <ReinstateStoreModal
                isOpen={isReinstateModalOpen}
                onClose={() => setIsReinstateModalOpen(false)}
                onConfirm={() => {
                    console.log("Store Reinstated");
                    setIsReinstateModalOpen(false);
                }}
            />
            <ExtendSuspensionModal
                isOpen={isExtendModalOpen}
                onClose={() => setIsExtendModalOpen(false)}
                onConfirm={(duration, reason) => {
                    console.log("Extended by", duration, "for reason:", reason);
                    setIsExtendModalOpen(false);
                }}
            />

            {/* Conditional Views Based on Status */}
            {store.status === "Pending" && <PendingStoreView store={store} />}
            {store.status === "Active" && <ActiveStoreView store={store} />}
            {store.status === "Suspended" && <SuspendedStoreView store={store} />}
        </div>
    );
};

export default StoreDetails;
