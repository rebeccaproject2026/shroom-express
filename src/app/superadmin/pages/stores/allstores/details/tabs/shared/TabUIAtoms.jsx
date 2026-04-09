import React from 'react';
import { Icon } from "@iconify/react";

export const Field = ({ label, value, required }) => (
    <div className="space-y-1.5 transition-all">
        <label className="text-sm font-semibold text-[#181211] flex items-center gap-1">
            {label} {required && <span className="text-[#EA3D2A]">*</span>}
        </label>
        <div className="bg-[#F8F8F8] border border-[#E2E8F0] rounded-md px-4 py-2.5 text-[#181211] text-sm font-medium transition-all">
            {value}
        </div>
    </div>
);

export const TextAreaField = ({ label, value, required }) => (
    <div className="space-y-1.5 transition-all">
        <label className="text-sm font-semibold text-[#181211] flex items-center gap-1">
            {label} {required && <span className="text-[#EA3D2A]">*</span>}
        </label>
        <div className="bg-[#F8F8F8] border border-[#E2E8F0] rounded-md px-4 py-3 text-[#181211] text-sm font-medium leading-relaxed transition-all h-25">
            {value}
        </div>
    </div>
);

export const SelectField = ({ label, value, required }) => (
    <div className="space-y-1.5 transition-all">
        <label className="text-sm font-semibold text-[#181211] flex items-center gap-1">
            {label} {required && <span className="text-[#EA3D2A]">*</span>}
        </label>
        <div className="bg-[#F8F8F8] border border-[#E2E8F0] rounded-md px-4 py-2.5 text-[#181211] text-[14px] font-semibold flex items-center justify-between transition-all">
            <span>{value}</span>
            <Icon icon="lucide:chevron-down" width="16" className="text-[#BDBDD2]" />
        </div>
    </div>
);

export const Toggle = ({ enabled }) => (
    <div className={`w-11 h-6 rounded-full transition-colors relative cursor-default ${enabled ? "bg-[#EA3D2A]" : "bg-[#E2E8F0]"}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enabled ? "left-6" : "left-1"}`} />
    </div>
);
