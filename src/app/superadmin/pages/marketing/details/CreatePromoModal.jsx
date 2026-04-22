import React from 'react';
import Input from "../../../components/common/Input";
import ReusableTableSelect from "../../../components/common/ReusableTableSelect";

const CreatePromoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const discountTypes = [
        { value: 'Percent', label: 'Percent' },
        { value: 'Fixed Amount', label: 'Fixed Amount' },
    ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-[#181211]/30 animate-in fade-in duration-300 font-manrope"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-[36%] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-5 py-6 border-b border-[#E2E8F0] bg-[#FAF8F8] flex items-center gap-4">
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-semibold text-[#181211]">Create Promo Code</h3>
                        <p className="text-[13px] font-medium mt-1 text-[#475569]">Add a new discount code</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                    {/* Promo Code Name */}
                    <Input
                        label="Promo Code"
                        required
                        placeholder="e.g. SUMMER20"
                        borderClass="border border-[#E2E8F0]"
                        className="h-11 px-5 bg-[#F8F8F8] rounded-lg text-sm outline-none focus:border-[#EA3D2A] transition-all placeholder:text-[#94A3B8] placeholder:font-medium text-[#181211] font-medium"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                    />

                    {/* Discount Type & Value (2-Column Grid) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 flex flex-col">
                            <label className="text-[14.5px] font-semibold text-[#181211]">
                                Discount Type <span className="text-[#EA3D2A] ml-0.5">*</span>
                            </label>
                            <ReusableTableSelect
                                options={discountTypes}
                                borderclass="border border-[#E2E8F0] rounded-lg"
                                className="w-full h-11 bg-[#F8F8F8] text-sm text-[#181211] font-medium"
                            />
                        </div>

                        <Input
                            label="Discount Value (%)"
                            required
                            type="number"
                            placeholder="20"
                            borderClass="border border-[#E2E8F0]"
                            className="h-11 px-5 bg-[#F8F8F8] rounded-lg text-sm outline-none focus:border-[#EA3D2A] transition-all text-[#181211] font-medium"
                            labelClassName="text-[14.5px] font-semibold text-[#181211]"
                        />
                    </div>

                    {/* Min Order, Max Uses & Expiry (3-Column Grid) */}
                    <div className="grid grid-cols-3 gap-4">
                        <Input
                            label="Min Order ($)"
                            required
                            type="number"
                            placeholder="0"
                            borderClass="border border-[#E2E8F0]"
                            className="h-11 px-4 bg-[#F8F8F8] rounded-lg text-sm outline-none focus:border-[#EA3D2A] transition-all text-[#181211] font-medium"
                            labelClassName="text-[13px] font-semibold text-[#181211]"
                        />
                        <Input
                            label="Max Uses"
                            required
                            type="number"
                            placeholder="100"
                            borderClass="border border-[#E2E8F0]"
                            className="h-11 px-4 bg-[#F8F8F8] rounded-lg text-sm outline-none focus:border-[#EA3D2A] transition-all text-[#181211] font-medium"
                            labelClassName="text-[13px] font-semibold text-[#181211]"
                        />
                        <Input
                            label="Expiry Date"
                            required
                            type="date"
                            placeholder="mm/dd/yyyy"
                            borderClass="border border-[#E2E8F0]"
                            className="h-11 px-4 bg-[#F8F8F8] rounded-lg text-sm outline-none focus:border-[#EA3D2A] transition-all text-[#181211] font-medium"
                            labelClassName="text-[13px] font-semibold text-[#181211]"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-5 flex gap-4 bg-white mt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-semibold shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all active:scale-95 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-1 px-5 py-2.5 bg-[#EA3D2A] text-white justify-center rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                    >
                        Create Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePromoModal;
