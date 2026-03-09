import React from "react";
import { Icon } from "@iconify/react";
import Drawer from "./Drawer";
import OrderMapSection from "../../../admin/components/order/OrderMapSection";

const ViewDetailsDrawer = ({ isOpen, onClose, delivery }) => {
    return (
        <Drawer isOpen={isOpen} onClose={onClose} width="w-full md:w-[650px] lg:w-[800px]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E8] shrink-0">
                <h2 className="text-lg font-semibold text-[#3F4753]">View Details {delivery?.id ? `(${delivery.id})` : ""}</h2>
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                >
                    <Icon icon="lucide:x" width="22" className="text-[#8B8B8B] hover:text-[#3F4753]" />
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5">
                <div className="flex flex-col gap-6">

                    {/* Top Grid: Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Pickup Details Card */}
                        <div className="bg-white rounded-[8px] border border-[#E8E8E8] p-4 shadow-sm">
                            <div className="flex items-center gap-1 mb-3">
                                <Icon icon="hugeicons:location-05" width="22" className="text-[#222222]" />
                                <h3 className="text-base font-semibold text-[#222222]">Pickup Details</h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-sm text-[#777777] font-medium mb-0.5">Facility</p>
                                    <p className="text-sm font-semibold text-[#0F172A]">North Logistics Hub - Warehouse A</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#777777] font-medium mb-0.5">Address</p>
                                    <p className="text-sm font-semibold text-[#222222]">{delivery?.pickup || "452 Commerce Way, Industrial District, SF 94103"}</p>
                                </div>
                                <div className="mt-1 bg-[#F2F2F2] rounded-[6px] p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[#777777] font-medium mb-0.5">Contact Person</p>
                                        <p className="text-base font-semibold text-[#222222]">Robert Chen</p>
                                    </div>
                                    <Icon icon="fluent:call-24-regular" width="22" height="22" color="#1142D4" />
                                </div>
                            </div>
                        </div>

                        {/* Drop-off Details Card */}
                        <div className="bg-white rounded-[8px] border border-[#E8E8E8] p-4 shadow-sm">
                            <div className="flex items-center gap-1 mb-3">
                                <Icon icon="material-symbols:flag-outline-rounded" width="22" className="text-[#222222]" />
                                <h3 className="text-base font-semibold text-[#222222]">Drop-off Details</h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-sm text-[#777777] font-medium mb-0.5">Customer</p>
                                    <p className="text-sm font-semibold text-[#0F172A]">TechCorp Solutions HQ</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#777777] font-medium mb-0.5">Address</p>
                                    <p className="text-sm font-semibold text-[#222222] leading-snug">{delivery?.dropoff || delivery?.drop || "88 Innovation Blvd, Ste 400, Financial Center, SF94111"}</p>
                                </div>
                                <div className="mt-1 bg-[#1142D4]/5 border border-[#D5E1FE] rounded-[6px] p-2.5">
                                    <p className="text-sm text-[#1142D4] font-medium mb-0.5">Instructions</p>
                                    <p className="text-[12px] font-semibold text-[#334155] ">
                                        "Please leave at the reception desk. Ask for Sarah J. and ensure the package is handled with care."
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Middle Grid: Finances and Manifest */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Financial Summary Card */}
                        <div className="bg-white rounded-[8px] border border-[#E8E8E8] p-4 flex flex-col shadow-sm">
                            <div className="flex items-center gap-1 mb-3">
                                <Icon icon="fluent:wallet-credit-card-16-regular" width="22" className="text-[#222222]" />
                                <h3 className="text-base font-semibold text-[#222222]">Financial Summary</h3>
                            </div>

                            <div className="flex flex-col gap-3 flex-1">
                                <div className="flex justify-between items-center text-[13px] font-medium">
                                    <span className="text-[#777777]">Delivery Fee</span>
                                    <span className="text-[#222222] font-semibold">$24.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px] font-medium">
                                    <span className="text-[#777777]">COD Amount</span>
                                    <span className="text-[#222222] font-semibold">$1,240.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px] font-medium pb-3 border-b border-[#E8E8E8]">
                                    <span className="text-[#777777]">Handling Fee</span>
                                    <span className="text-[#222222] font-semibold">$5.50</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-base font-semibold text-[#222222]">Total Payable</span>
                                    <span className="text-lg font-bold text-[#1142D4]">{delivery?.amount || delivery?.earnings || delivery?.netAmount || "$1,269.50"}</span>
                                </div>

                                <button className="mt-auto pt-2 flex items-center justify-center w-full">
                                    <div className="w-full py-2.5 bg-[#1142D4]/10 hover:bg-[#E3EDFF] text-[#1142D4] rounded-md font-semibold text-[13px] transition-colors border border-transparent hover:border-[#D5E1FE]">
                                        Download Invoice
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Package Manifest Card */}
                        <div className="bg-white rounded-[8px] border border-[#E8E8E8] p-4 shadow-sm">
                            <div className="flex items-center gap-1 mb-3">
                                <Icon icon="hugeicons:package-open" width="22" className="text-[#222222]" />
                                <h3 className="text-base font-semibold text-[#222222]">Package Manifest</h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-[13px] text-[#777777] font-medium mb-0.5">Item Description</p>
                                    <p className="text-sm font-semibold text-[#222222]">{delivery?.packageDetails || "Network Switches (L3-24P)"}</p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#777777] font-medium mb-0.5">Quantity</p>
                                    <p className="text-sm font-semibold text-[#222222]">4 units</p>
                                </div>
                                <div>
                                    <p className="text-[13px] text-[#777777] font-medium mb-0.5">Weight</p>
                                    <p className="text-sm font-semibold text-[#222222]">12.5 kg</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Timeline Journey Card */}
                    <div className="bg-white rounded-[8px] border border-[#E8E8E8] p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Icon icon="tabler:timeline" width="22" className="text-[#222222]" />
                            <h3 className="text-base font-semibold text-[#222222]">Journey Timeline</h3>
                        </div>

                        {/* Custom Timeline Implementation */}
                        <div className="relative mt-4 mb-4">
                            {/* Line connecting nodes */}
                            <div className="absolute top-[8px] left-0 w-full h-[5px] bg-[#E8E8E8] rounded-full z-0"></div>
                            {/* <div className="absolute top-[8px] left-0 w-[40%] h-[3px] bg-[#059669] rounded-full z-0"></div> */}

                            <div className="relative z-10 flex justify-between">
                                {/* Step 1: Delivery Created */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-[23px] h-[23px] bg-[#10B981] rounded-full border-[4px] border-[#E8E8E8] shadow-sm mb-3"></div>
                                    <p className="text-[13px] font-semibold text-[#222222] text-center mb-0.5">Delivery Created</p>
                                    <p className="text-[11px] font-medium text-[#777777] text-center">Oct 24, 2023 • 09:12 AM</p>
                                    <p className="text-[11px] font-medium text-[#777777] text-center">Order {delivery?.id || "#PO-7721"} submitted</p>
                                </div>

                                {/* Step 2: Assigned to Fleet */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-[23px] h-[23px] bg-[#10B981] rounded-full border-[4px] border-[#E8E8E8] shadow-sm mb-3"></div>
                                    <p className="text-[13px] font-semibold text-[#222222] text-center mb-0.5">Assigned to Fleet</p>
                                    <p className="text-[11px] font-medium text-[#777777] text-center">Oct 24, 2023 • 10:45 AM</p>
                                    <p className="text-[11px] font-medium text-[#777777] text-center leading-tight">Allocated to San<br />Francisco Hub</p>
                                </div>

                                {/* Step 3: Picked Up */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-[23px] h-[23px] bg-[#D1D5DB] rounded-full border-[4px] border-[#E8E8E8] shadow-sm mb-3"></div>
                                    <p className="text-[13px] font-semibold text-[#222222] text-center mb-0.5">Picked Up</p>
                                    <p className="text-[11px] font-medium text-[#777777] text-center">Pending arrival at Hub</p>
                                </div>

                                {/* Step 4: Out for Delivery */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-[23px] h-[23px] bg-[#D1D5DB]  rounded-full border-[4px] border-[#E8E8E8] shadow-sm mb-3"></div>
                                    <p className="text-[13px] font-semibold text-[#222222] text-center mb-0.5">Out for Delivery</p>
                                    <p className="text-[11px] font-medium text-[#777777] text-center">Pending driver dispatch</p>
                                </div>

                                {/* Step 5: Delivered */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="w-[23px] h-[23px] bg-[#D1D5DB]  rounded-full border-[4px] border-[#E8E8E8] shadow-sm mb-3"></div>
                                    <p className="text-sm font-semibold text-[#222222] text-center mb-0.5">Delivered</p>
                                    <p className="text-[11px] font-medium text-[#777777] text-center leading-tight">Waiting for drop-<br />off completion</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Map section */}
                    <div className="w-full h-[400px]  overflow-hidden border border-[#E8E8E8] shadow-sm">
                        <OrderMapSection className="w-full h-full object-cover" isDashboard={true} isViewDetails={true} />
                    </div>

                </div>
            </div>
        </Drawer>
    );
};

export default ViewDetailsDrawer;
