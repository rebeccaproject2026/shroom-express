import React from 'react';
import { Icon } from "@iconify/react";
import Input from "../../../components/common/Input";
import ReusableTableSelect from "../../../components/common/ReusableTableSelect";

const CreateCampaignModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const channelOptions = [
        { value: 'NovaBio Labs', label: 'NovaBio Labs' },
        { value: 'Email Marketing', label: 'Email Marketing' },
        { value: 'Push Notify', label: 'Push Notify' },
    ];

    const audienceOptions = [
        { value: 'Toronto Main', label: 'Toronto Main' },
        { value: 'Win-Back List', label: 'Win-Back List' },
    ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-[#181211]/30 animate-in fade-in duration-300 font-manrope"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-[36%] rounded-lg overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-5 py-6 border-b border-[#E2E8F0] bg-[#FAF8F8] flex items-center gap-4">
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-semibold text-[#181211]">Create Campaign</h3>
                        <p className="text-[13px] font-medium mt-1 text-[#475569]">Set up a new marketing campaign</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                    {/* Campaign Name */}
                    <Input
                        label="Campaign Name"
                        required
                        placeholder="e.g. Spring Flash Sale"
                        borderClass="border border-[#E2E8F0]"
                        className="w-full h-11 px-5 bg-[#F8F8F8] rounded-lg text-sm outline-none transition-all placeholder:text-[#94A3B8] placeholder:font-medium text-[#181211] font-medium"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                    />

                    {/* Channel & Audience (2-Column Grid) */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1.5 flex flex-col">
                            <label className="text-[14.5px] font-semibold text-[#181211]">
                                Channel <span className="text-[#EA3D2A] ml-0.5">*</span>
                            </label>
                            <ReusableTableSelect
                                options={channelOptions}
                                borderclass="border border-[#E2E8F0] rounded-lg"
                                className="w-full h-11 bg-[#F8F8F8] text-sm text-[#181211] font-medium"
                            />
                        </div>

                        <div className="space-y-1.5 flex flex-col">
                            <label className="text-[14.5px] font-semibold text-[#181211]">
                                Audience <span className="text-[#EA3D2A] ml-0.5">*</span>
                            </label>
                            <ReusableTableSelect
                                options={audienceOptions}
                                borderclass="border border-[#E2E8F0] rounded-lg"
                                className="w-full h-11 bg-[#F8F8F8] text-sm text-[#181211] font-medium"
                            />
                        </div>
                        {/* Budget */}
                        <Input
                            label="Budget ($)"
                            required
                            type="number"
                            placeholder="500"
                            borderClass="border border-[#E2E8F0]"
                            className="w-full h-11 px-5 bg-[#F8F8F8] rounded-lg text-sm outline-none  transition-all text-[#181211] font-medium"
                            labelClassName="text-[14.5px] font-semibold text-[#181211]"
                        />
                    </div>


                </div>

                {/* Footer Actions */}
                <div className="px-6 py-5 flex gap-4 bg-white">
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
                        Launch Campaign
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaignModal;
