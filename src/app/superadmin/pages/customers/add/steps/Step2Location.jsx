import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../components/common/Input';

const Step2Location = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePreferenceSelect = (preference) => {
        setFormData(prev => ({ ...prev, deliveryPreference: preference }));
    };

    const preferences = [
        {
            id: 'Express',
            label: 'Express',
            sublabel: '~30-60 min',
            icon: 'subway:power'
        },
        {
            id: 'Same-day',
            label: 'Same-day',
            sublabel: 'Same day',
            icon: 'carbon:delivery'
        },
        {
            id: 'Shipping',
            label: 'Shipping',
            sublabel: '3-5 business days',
            icon: 'lucide:ship'
        }
    ];

    return (
        <div className="bg-white rounded-md border border-[#BDBDD2] shadow-sm overflow-hidden font-manrope min-h-[820px]">
            {/* Header */}
            <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#FFEDEB] flex items-center justify-center shrink-0">
                        <Icon icon="lucide:map-pin" className="text-[#EA3D2A]" width="22" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-[#181211]">Delivery Address</h3>
                    </div>
                </div>
                <span className="text-xs font-bold text-[#181211]">Step 2 of 3</span>
            </div>

            <div className="p-5 space-y-6">
                {/* Street Address */}
                <Input
                    label="Street Address"
                    required
                    name="streetAddress"
                    value={formData.streetAddress || ''}
                    onChange={handleChange}
                    placeholder="e.g. 42 Queen St. W. Apt 5"
                    className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="City"
                        required
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        placeholder="Toronto"
                        className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                    <Input
                        label="Province"
                        name="province"
                        value={formData.province || ''}
                        onChange={handleChange}
                        placeholder="ON"
                        className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Postal Code"
                        name="postalCode"
                        value={formData.postalCode || ''}
                        onChange={handleChange}
                        placeholder="M5H 2N2"
                        className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                    <Input
                        label="Country"
                        name="country"
                        value={formData.country || ''}
                        onChange={handleChange}
                        placeholder="Canada"
                        className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                </div>

                {/* Delivery Preference */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold text-[#181211]">Delivery Preference</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        {preferences.map((pref) => (
                            <div
                                key={pref.id}
                                onClick={() => handlePreferenceSelect(pref.id)}
                                className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer transition-all ${formData.deliveryPreference === pref.id
                                    ? 'border-[#EA3D2A] bg-white'
                                    : 'border-[#E2E8F0] bg-white hover:border-[#EA3D2A]/30'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 bg-[#E2E8F0]
                                        `}>
                                        <Icon icon={pref.icon} className={'text-[#475569]'} width="22" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-semibold text-[#181211] leading-tight">{pref.label}</span>
                                        <span className="text-[11px] font-medium text-[#475569]">{pref.sublabel}</span>
                                    </div>
                                </div>
                                <div className={`w-5 h-5 mr-2 rounded-full border-2 flex items-center justify-center ${formData.deliveryPreference === pref.id ? 'border-[#EA3D2A]' : 'border-[#CBD5E1]'
                                    }`}>
                                    {formData.deliveryPreference === pref.id && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#EA3D2A]" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2Location;
