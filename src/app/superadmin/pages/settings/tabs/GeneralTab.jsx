import React from "react";
import { Icon } from "@iconify/react";
import Input from "../../../components/common/Input";
import ReusableTableSelect from "../../../components/common/ReusableTableSelect";

const GeneralTab = () => {
    const timezoneOptions = [{ value: 'America/Toronto', label: 'America/Toronto' }];
    const currencyOptions = [{ value: 'CAD', label: 'CAD' }];
    const languageOptions = [{ value: 'English', label: 'English' }];

    return (
        <div className="p-4 max-w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white border border-[#E2E8F0] rounded-md p-5 space-y-8">
                <div>
                    <h2 className="text-xl font-semibold text-[#181211]">Platform Information</h2>
                    <p className="text-sm font-medium text-[#475569] mt-1">Core platform details visible to all users</p>
                </div>

                <div className="space-y-5">
                    <Input
                        label="Platform Name"
                        defaultValue="ShroomExpress"
                        borderClass="border border-[#E2E8F0]"
                        className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm outline-none transition-all placeholder:text-[#94A3B8] text-[#181211] font-medium"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                    />

                    <Input
                        label="Admin Email"
                        defaultValue="admin@shroomexpress.ca"
                        borderClass="border border-[#E2E8F0]"
                        className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm outline-none transition-all placeholder:text-[#94A3B8] text-[#181211] font-medium"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                    />

                    <Input
                        label="Admin Phone"
                        defaultValue="+1 416-000-0000"
                        borderClass="border border-[#E2E8F0]"
                        className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm outline-none transition-all placeholder:text-[#94A3B8] text-[#181211] font-medium"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                    />

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-[14.5px] font-semibold text-[#181211]">Timezone</label>
                        <ReusableTableSelect
                            options={timezoneOptions}
                            defaultValue="America/Toronto"
                            borderclass="border border-[#E2E8F0] rounded-lg"
                            className="w-full h-11 !bg-[#F8F8F8] text-sm text-[#181211] font-medium"
                        />
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-[14.5px] font-semibold text-[#181211]">Currency</label>
                        <ReusableTableSelect
                            options={currencyOptions}
                            defaultValue="CAD"
                            borderclass="border border-[#E2E8F0] rounded-lg"
                            className="w-full h-11 !bg-[#F8F8F8] text-sm text-[#181211] font-medium"
                        />
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-[14.5px] font-semibold text-[#181211]">Language</label>
                        <ReusableTableSelect
                            options={languageOptions}
                            defaultValue="English"
                            borderclass="border border-[#E2E8F0] rounded-lg"
                            className="w-full h-11 !bg-[#F8F8F8] text-sm text-[#181211] font-medium"
                        />
                    </div>
                </div>

                <div className="p-4 border-t border-[#E2E8F0] flex gap-4">
                    <button
                        className="flex-1 px-4 py-2.5 bg-white text-[#475569] rounded-lg text-sm font-semibold border border-[#E2E8F0] transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-4 py-2.5 bg-[#EA3D2A]  text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_rgba(24,18,17,0.2),0px_10px_15px_-3px_rgba(24,18,17,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Icon icon="lucide:check" width="18" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeneralTab;
