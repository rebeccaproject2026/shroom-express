import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../../components/common/Input';
import ReusableTableSelect from '../../../../../components/common/ReusableTableSelect';
import StoreLocationMap from '../../../../../components/stores/StoreLocationMap';

const Step2Location = ({ formData, setFormData }) => {
    const provinceOptions = [
        { value: 'ON', label: 'Ontario (ON)' },
        { value: 'QC', label: 'Quebec (QC)' },
        { value: 'BC', label: 'British Columbia (BC)' },
        { value: 'AB', label: 'Alberta (AB)' },
        { value: 'MB', label: 'Manitoba (MB)' },
        { value: 'SK', label: 'Saskatchewan (SK)' },
    ];

    const countryOptions = [
        { value: 'Canada', label: 'Canada' },
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
                        <h3 className="text-base font-semibold text-[#181211]">Business Address</h3>
                    </div>
                </div>
                <span className="text-xs font-bold text-[#181211]">STEP 2 OF 4</span>
            </div>

            <div className="p-5 space-y-6">
                {/* Street Address - Full Width */}
                <div className="space-y-1">
                    <Input
                        label="Street Address"
                        required
                        placeholder="e.g. 220 Bay St. Suite 800"
                        value={formData.streetAddress}
                        onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                        className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                </div>

                {/* City & Province - 2 Col */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="City"
                        required
                        placeholder="Toronto"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Province <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                        <ReusableTableSelect
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            options={provinceOptions}
                            placeholder="Select Province"
                            borderclass="border border-[#BDBDD2]"
                            className="w-full text-[#475569] font-medium"
                        />
                    </div>
                </div>

                {/* Postal Code & Country - 2 Col */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Postal Code"
                        required
                        placeholder="M5J 2W4"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Country</label>
                        <ReusableTableSelect
                            value={formData.country || 'Canada'}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            options={countryOptions}
                            placeholder="Canada"
                            borderclass="border border-[#BDBDD2]"
                            className="w-full text-[#475569] font-medium"
                            disabled
                        />
                    </div>
                </div>

                {/* Map Section */}
                <div className="space-y-2 pt-2">
                    <div className="w-full h-[220px] rounded-md overflow-hidden border border-[#BDBDD2] shadow-sm">
                        <StoreLocationMap
                            latitude={formData.latitude}
                            longitude={formData.longitude}
                            onLocationChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2Location;
