import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../components/common/ReusableTableSelect';
import StoreLocationMap from '../../../../components/stores/StoreLocationMap';
import Input from '../../../../components/common/Input';

const Step2Location = ({ formData, setFormData }) => {
  const provinceOptions = [
    { value: 'Ontario', label: 'Ontario' },
    { value: 'Quebec', label: 'Quebec' },
    { value: 'British Columbia', label: 'British Columbia' },
  ];

  const countryOptions = [
    { value: 'Canada', label: 'Canada' },
    { value: 'USA', label: 'USA' },
  ];

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="meteor-icons:map-pin" className="text-[#EA3D2A]" width="22" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Location & Address</h3>
            <p className="text-[#181211] text-xs leading-tight">Where the store operates and serves customers from</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 2 of 5</span>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="Street Address"
            required
            placeholder="123 Main Street, Unit 4"
            value={formData.streetAddress}
            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
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
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
              Province / State <span className="text-[#EA3D2A] ml-0.5">*</span>
            </label>
            <ReusableTableSelect
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              options={provinceOptions}
              placeholder="Select..."
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
            />
          </div>
          <Input
            label="Postal Code"
            required
            placeholder="M5V 2T6"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
            Country <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>
          <ReusableTableSelect
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            options={countryOptions}
            placeholder="Canada"
            borderclass="border border-[#BDBDD2]"
            className="w-full text-[#475569] font-medium"
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Pin Location on Map</label>
          <div className="w-full h-47 rounded-md overflow-hidden border border-[#BDBDD2] shadow-sm">
            <StoreLocationMap
              latitude={formData.latitude}
              longitude={formData.longitude}
              onLocationChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
          <Input
            label="Latitude"
            placeholder="43.6532"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Longitude"
            placeholder="-79.3832"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2Location;
