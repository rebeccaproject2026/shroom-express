import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../superadmin/components/common/ReusableTableSelect';
import StoreLocationMap from '../../../../superadmin/components/stores/StoreLocationMap';
import Input from '../../../../superadmin/components/common/Input';

const Step2Location = ({ formData, setFormData }) => {
  const location = formData.locations[0] || {};

  const categoryOptions = [
    { value: 'Micro Dosing', label: 'Micro Dosing' },
    { value: 'Beginner Friendly', label: 'Beginner Friendly' },
    { value: 'High Potency', label: 'High Potency' },
    { value: 'Creative Boost', label: 'Creative Boost' },
    { value: 'Relax & Chill', label: 'Relax & Chill' },
    { value: 'Visual Experience', label: 'Visual Experience' },
    { value: 'Focus & Clarity', label: 'Focus & Clarity' },
    { value: 'Deep Journey', label: 'Deep Journey' },
  ];

  const socialPlatformOptions = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Whatsapp', label: 'Whatsapp' },
    { value: 'Telegram', label: 'Telegram' },
    { value: 'Signal', label: 'Signal' },
    { value: 'WeChat', label: 'WeChat' },
    { value: 'TikTok', label: 'TikTok' },
    { value: 'X (Twitter)', label: 'X (Twitter)' },
    { value: 'Discord', label: 'Discord' },
  ];

  const countryOptions = [
    { value: 'Canada', label: 'Canada' },
    { value: 'USA', label: 'USA' },
  ];

  const provinceOptions = [
    { value: 'Alberta', label: 'Alberta' },
    { value: 'British Columbia', label: 'British Columbia' },
    { value: 'Manitoba', label: 'Manitoba' },
    { value: 'New Brunswick', label: 'New Brunswick' },
    { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
    { value: 'Nova Scotia', label: 'Nova Scotia' },
    { value: 'Northwest Territories', label: 'Northwest Territories' },
    { value: 'Nunavut', label: 'Nunavut' },
    { value: 'Ontario', label: 'Ontario' },
    { value: 'Prince Edward Island', label: 'Prince Edward Island' },
    { value: 'Quebec', label: 'Quebec' },
    { value: 'Saskatchewan', label: 'Saskatchewan' },
    { value: 'Yukon', label: 'Yukon' },
  ];

  const handleLocationUpdate = (field, value) => {
    const newLocations = [...formData.locations];
    newLocations[0] = { ...newLocations[0], [field]: value };
    setFormData({ ...formData, locations: newLocations });
  };

  const handleSocialLinkChange = (platform, value) => {
    const newLocations = [...formData.locations];
    const newLinks = { ...newLocations[0].socialLinks, [platform]: value };
    newLocations[0] = { ...newLocations[0], socialLinks: newLinks };
    setFormData({ ...formData, locations: newLocations });
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm min-h-[500px]">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="meteor-icons:map-pin" className="text-[#E93E2B]" width="22" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Store Information & Location</h3>
            <p className="text-[#181211] text-xs leading-tight">Where the store operates and serves customers from</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 2 of 5</span>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="Store Name"
            required
            placeholder="e.g. Forest Oasis"
            value={location.storeName}
            onChange={(e) => handleLocationUpdate('storeName', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Category <span className="text-[#E93E2B] ml-0.5">*</span></label>
            <ReusableTableSelect
              isMulti={true}
              value={location.category}
              onChange={(e) => handleLocationUpdate('category', e.target.value)}
              options={categoryOptions}
              placeholder="Select Category..."
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
              showCheckbox={true}
            />
          </div>
          <Input
            label="Website"
            required
            placeholder="https://yourstore.com"
            value={location.website}
            onChange={(e) => handleLocationUpdate('website', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Social Platform</label>
            <ReusableTableSelect
              isMulti={true}
              useTags={true}
              columns={2}
              value={location.socialPlatform}
              onChange={(e) => handleLocationUpdate('socialPlatform', e.target.value)}
              options={socialPlatformOptions}
              placeholder="Select a platform..."
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
            />
          </div>

          {location.socialPlatform && Array.isArray(location.socialPlatform) && location.socialPlatform.map((platform) => (
            <Input
              key={platform}
              label={platform}
              placeholder={`https://${platform.toLowerCase().includes('twitter') ? 'x' : platform.toLowerCase()}.com`}
              value={location.socialLinks?.[platform] || ''}
              onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
              className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium animate-in slide-in-from-top-2 duration-300"
              labelClassName="text-sm font-semibold text-[#181211]"
              borderClass="border border-[#BDBDD2]"
            />
          ))}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">About <span className="text-[#E93E2B] ml-0.5">*</span></label>
          <textarea
            rows="3"
            placeholder="Write a brief description..."
            className="w-full px-4 py-3 bg-white border border-[#BDBDD2] rounded-sm text-sm font-medium text-[#181211] outline-none transition-all resize placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium font-medium"
            value={location.description}
            onChange={(e) => handleLocationUpdate('description', e.target.value.slice(0, 2500))}
          ></textarea>
          <div className="flex justify-end text-xs font-medium text-[#475569] tracking-wider">
            {location.description?.length || 0}/2500 characters
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
          <Input
            label="Street Address"
            required
            placeholder="123 Main Street"
            value={location.streetAddress}
            onChange={(e) => handleLocationUpdate('streetAddress', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Unit Number"
            required
            placeholder="4"
            value={location.unitNumber}
            onChange={(e) => handleLocationUpdate('unitNumber', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="City"
            required
            placeholder="Toronto"
            value={location.city}
            onChange={(e) => handleLocationUpdate('city', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
          <Input
            label="Postal Code"
            required
            placeholder="M5V 2T6"
            value={location.postalCode}
            onChange={(e) => handleLocationUpdate('postalCode', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Country <span className="text-[#E93E2B] ml-0.5">*</span></label>
            <ReusableTableSelect
              value={location.country}
              onChange={(e) => handleLocationUpdate('country', e.target.value)}
              options={countryOptions}
              placeholder="Canada"
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
              showCheckbox={false}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Province <span className="text-[#E93E2B] ml-0.5">*</span></label>
            <ReusableTableSelect
              value={location.province}
              onChange={(e) => handleLocationUpdate('province', e.target.value)}
              options={provinceOptions}
              placeholder="Select Province..."
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
              showCheckbox={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="Email Address"
            required
            placeholder="store@example.com"
            value={location.storeEmail}
            onChange={(e) => handleLocationUpdate('storeEmail', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Phone Number"
            required
            placeholder="+1 (461) 000-0000"
            value={location.storePhone}
            onChange={(e) => handleLocationUpdate('storePhone', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Pin Location on Map</label>
          <div className="w-full h-40 overflow-hidden relative border border-[#BDBDD2] rounded-md">
            <StoreLocationMap
              latitude={location.latitude}
              longitude={location.longitude}
              onLocationChange={(lat, lng) => {
                const newLocations = [...formData.locations];
                newLocations[0] = { ...newLocations[0], latitude: lat, longitude: lng };
                setFormData({ ...formData, locations: newLocations });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Location;
