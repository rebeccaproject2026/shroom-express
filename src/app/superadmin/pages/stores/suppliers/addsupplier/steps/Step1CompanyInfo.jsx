import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../../components/common/Input';
import ReusableTableSelect from '../../../../../components/common/ReusableTableSelect';

const Step1CompanyInfo = ({ formData, setFormData }) => {
    const categoryOptions = [
        { value: 'Micro dosing', label: 'Micro dosing' },
        { value: 'Full Spectrum', label: 'Full Spectrum' },
        { value: 'Wellness', label: 'Wellness' },
        { value: 'Edibles', label: 'Edibles' },
        { value: 'Tinctures', label: 'Tinctures' },
        { value: 'Capsules', label: 'Capsules' },
    ];

    return (
        <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-[820px]">
            {/* Header */}
            <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF1F0] rounded-sm flex items-center justify-center shrink-0">
                        <Icon icon="fluent-mdl2:product" className="text-[#EA3D2A]" width="22" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-[#181211]">Company Details</h3>
                    </div>
                </div>
                <span className="text-xs font-bold text-[#181211]">STEP 1 OF 4</span>
            </div>

            <div className="p-6 space-y-6">
                {/* Logo Upload */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                        Supplier Logo <span className="text-[#EA3D2A]">*</span>
                    </label>
                    <div
                        onClick={() => document.getElementById('supplierLogoInput').click()}
                        className="border-2 border-dashed border-[#475569] rounded-md p-8 flex flex-col items-center justify-center gap-3 bg-[#F8F8F8] transition-all cursor-pointer hover:bg-gray-50"
                    >
                        <input
                            type="file"
                            id="supplierLogoInput"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setFormData({ ...formData, logo: file });
                                }
                            }}
                        />
                        <div className="w-10 h-10 bg-[#FFEDEB] rounded-md flex items-center justify-center text-[#EA3D2A]">
                            <Icon icon="material-symbols:upload-rounded" width="20" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-[#181211]">Click to upload Supplier Logo</p>
                            <p className="text-xs font-regular text-[#64748B] mt-1">PNG, JPG up to 10MB, 600x600 preferred</p>
                        </div>
                    </div>
                    {formData.logo && (
                        <div className="flex flex-wrap gap-3 mt-4">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden group border border-[#BDBDD2]">
                                <img
                                    src={URL.createObjectURL(formData.logo)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, logo: null });
                                        }}
                                        className="text-white bg-[#EA3D2A] p-1 rounded-md shadow-lg"
                                    >
                                        <Icon icon="solar:trash-bin-trash-bold" width="12" />
                                    </button>
                                </div>
                                <div className="absolute top-1 left-1 bg-[#219653] text-white p-0.5 rounded-full shadow-lg">
                                    <Icon icon="lucide:check" width="8" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Basic Fields */}
                <div className="space-y-5">
                    <Input
                        label="Company Name"
                        required
                        placeholder="e.g. NavaBio Labs"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                            Tagline / Short Description<span className="text-[#EA3D2A] ml-0.5">*</span>
                        </label>
                        <textarea
                            rows="4"
                            placeholder="e.g. Canada's leading micro-dosing capsule manufacturer"
                            className="w-full px-4 py-3 bg-white border border-[#BDBDD2] rounded-sm text-sm font-medium text-[#181211] outline-none transition-all font-medium resize placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                            value={formData.tagline}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value.slice(0, 500) })}
                        ></textarea>
                        <div className="flex justify-end text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                            {formData.tagline.length}/500
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Product Category<span className="text-[#EA3D2A] ml-0.5">*</span></label>
                            <ReusableTableSelect
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                options={categoryOptions}
                                placeholder="Select category"
                                borderclass="border border-[#BDBDD2]"
                                className="w-full text-[#475569] font-medium"
                            />
                        </div>
                        <Input
                            label="Website"
                            placeholder="e.g. supplier.com"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                            labelClassName="text-sm font-semibold text-[#181211]"
                            borderClass="border border-[#BDBDD2]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Email Address"
                            required
                            type="email"
                            placeholder="orders@supplier.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                            labelClassName="text-sm font-semibold text-[#181211]"
                            borderClass="border border-[#BDBDD2]"
                        />
                        <Input
                            label="Phone Number"
                            placeholder="(000) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                            labelClassName="text-sm font-semibold text-[#181211]"
                            borderClass="border border-[#BDBDD2]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1CompanyInfo;
