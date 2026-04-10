import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Input from "../../../../components/common/Input";
import ReusableTableSelect from "../../../../components/common/ReusableTableSelect";

const AddNewAreaModal = ({ isOpen, onClose }) => {
    const [province, setProvince] = useState('Ontario');

    if (!isOpen) return null;

    const provinceOptions = [
        { value: 'Ontario', label: 'Ontario' },
        { value: 'Quebec', label: 'Quebec' },
        { value: 'British Columbia', label: 'British Columbia' },
        { value: 'Alberta', label: 'Alberta' },
    ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-[#181211]/30 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-[36%] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-5 py-6 border-b border-[#E2E8F0] bg-[#FAF8F8] flex items-center gap-4">
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-semibold text-[#181211]">Add New Delivery Area</h3>
                    </div>
                </div>
                {/* Body */}
                <div className="p-4 space-y-3">
                    {/* City Name */}
                    <Input
                        label="City Name"
                        required
                        placeholder="e.g. Forest Oasis"
                        borderClass="border border-[#E2E8F0] "
                        className="h-11 px-5 bg-[#F8F8F8] rounded-lg text-sm outline-none focus:border-[#EA3D2A] transition-all placeholder:text-[#94A3B8] placeholder:font-medium"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                    />
                    {/* Province Selection */}
                    <div className="mb-6">
                        <ReusableTableSelect
                            options={provinceOptions}
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            borderclass="border border-[#E2E8F0] rounded-[14px]"
                            className="w-full h-11"
                        />
                    </div>

                    {/* Postal Codes */}
                    <div className="mb-0 ">
                        <label className="text-[14.5px] font-semibold text-[#181211]">
                            Postal Codes (comma separated) <span className="text-[#EA3D2A] ml-0.5">*</span>
                        </label>
                        <textarea
                            rows="4"
                            placeholder="e.g. L5A, L5B, L5C, L5E"
                            className="w-full p-5 mt-1.5 bg-white border border-[#E2E8F0] rounded-[14px] text-sm min-h-[50px] outline-none  placeholder:text-[#94A3B8] placeholder:font-medium resize-none"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-5 flex gap-4 bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-semibold shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-5 py-2.5 bg-[#EA3D2A] text-white justify-center rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                    >
                        Add Area
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewAreaModal;
