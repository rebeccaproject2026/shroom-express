import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../../components/common/ReusableTableSelect';
import StoreLocationMap from '../../../../../components/stores/StoreLocationMap';
import Input from '../../../../../components/common/Input';

const Step2Location = ({ formData, setFormData }) => {
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
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'LinkedIn', label: 'LinkedIn' },
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

  const getBadgeColors = (index) => {
    const colors = [
      { bg: 'bg-[#CDFFE2]', text: 'text-[#219653]' }, // Green
      { bg: 'bg-[#FFF4E5]', text: 'text-[#FF9F40]' }, // Orange
      { bg: 'bg-[#FFEDEB]', text: 'text-[#EA3D2A]' }, // Red
      { bg: 'bg-[#E8F1FF]', text: 'text-[#2F80ED]' }, // Blue
      { bg: 'bg-[#F3E8FF]', text: 'text-[#9B51E0]' }, // Purple
    ];
    return colors[index % colors.length];
  };

  const handleLocationChange = (index, field, value) => {
    const newLocations = [...formData.locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setFormData({ ...formData, locations: newLocations });
  };

  const toggleLocationExpansion = (index) => {
    const newLocations = [...formData.locations];
    newLocations[index] = { ...newLocations[index], isExpanded: !newLocations[index].isExpanded };
    setFormData({ ...formData, locations: newLocations });
  };

  const addLocation = () => {
    // Close all existing locations first
    const updatedExistingLocations = formData.locations.map(loc => ({
      ...loc,
      isExpanded: false
    }));

    const newLocation = {
      isExpanded: true,
      website: '',
      socialPlatform: '',
      storeName: '',
      category: [],
      description: '',
      streetAddress: '',
      unitNumber: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'Canada',
      latitude: '43.6532',
      longitude: '-79.3832',
      storeEmail: '',
      storePhone: '',
    };
    setFormData({ ...formData, locations: [...updatedExistingLocations, newLocation] });
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm min-h-[750px]">
      {/* Step Header */}
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="meteor-icons:map-pin" className="text-[#EA3D2A]" width="22" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Store Information & Location</h3>
            <p className="text-[#181211] text-xs leading-tight">Where the store operates and serves customers from</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 2 of 5</span>
      </div>

      <div className="p-5 space-y-4">
        {formData.locations.map((location, index) => {
          const isActive = location.isExpanded;

          if (!isActive) {
            return (
              <div key={index} className="bg-white p-2 rounded-md border border-[#D1D1D6] flex items-center gap-3">
                <div className={`w-10 h-10 ${getBadgeColors(index).bg} rounded-md flex items-center justify-center shrink-0 text-base font-semibold text-[#181211]`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#181211] text-base leading-tight mb-1">
                    Store Location
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-start gap-1.5 text-xs text-[#475569] font-medium leading-tight">
                      <Icon icon="stash:pin-place-duotone" width="15" className="shrink-0" />
                      <span className="truncate">{location.streetAddress || 'Address not set'}{location.unitNumber ? `, Unit-${location.unitNumber}` : ''}, {location.city}{location.province ? `, ${location.province}` : ''}, {location.country} ({location.postalCode})</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                      <div className="flex items-center gap-1.5">
                        <Icon icon="carbon:email" width="15" className="shrink-0" />
                        <span>{location.storeEmail || 'No email set'}</span>
                      </div>
                      <span className="text-[#CBD5E1]">|</span>
                      <div className="flex items-center gap-1.5">
                        <Icon icon="proicons:call" width="15" className="shrink-0" />
                        <span>{location.storePhone || 'No phone set'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleLocationExpansion(index)}
                  className="p-2 text-[#475569] hover:text-[#EA3D2A] transition-colors"
                >
                  <Icon icon="iconamoon:edit-light" width="18" />
                </button>
              </div>
            );
          }

          return (
            <div key={index} className="border border-[#BDBDD2] rounded-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              {/* Section Header */}
              <div className="px-4 py-3  bg-white border-b border-[#BDBDD2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${getBadgeColors(index).bg} rounded-md flex items-center justify-center text-base font-semibold text-[#181211] shrink-0`}>
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold text-[#181211]">Store Location</h3>
                </div>
                <button onClick={() => toggleLocationExpansion(index)} className="hover:bg-gray-100 p-1 rounded-full transition-colors">
                  <Icon icon="lucide:chevron-up" className="text-[#181211]" width="20" />
                </button>
              </div>

              {/* Section Content */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <Input
                    label="Website"
                    required
                    placeholder="https://yourstore.com"
                    value={location.website}
                    onChange={(e) => handleLocationChange(index, 'website', e.target.value)}
                    className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                  />
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Social Platform</label>
                    <ReusableTableSelect
                      value={location.socialPlatform}
                      onChange={(e) => handleLocationChange(index, 'socialPlatform', e.target.value)}
                      options={socialPlatformOptions}
                      placeholder="Select a category..."
                      borderclass="border border-[#BDBDD2]"
                      className="w-full text-[#475569] font-medium"
                      showCheckbox={false}
                    />
                  </div>
                  <Input
                    label="Store Name"
                    required
                    placeholder="e.g. Forest Oasis"
                    value={location.storeName}
                    onChange={(e) => handleLocationChange(index, 'storeName', e.target.value)}
                    className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                  />
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Category <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                    <ReusableTableSelect
                      isMulti={true}
                      value={location.category}
                      onChange={(e) => handleLocationChange(index, 'category', e.target.value)}
                      options={categoryOptions}
                      placeholder="Select Category..."
                      borderclass="border border-[#BDBDD2]"
                      className="w-full text-[#475569] font-medium"
                      showCheckbox={true}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">About <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                  <textarea
                    rows="3"
                    placeholder="Write a brief description of the store, products offered, and what makes it stand out..."
                    className="w-full px-4 py-3 bg-white border border-[#BDBDD2] rounded-sm text-sm font-medium text-[#181211] outline-none transition-all resize-none placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium font-medium"
                    value={location.description}
                    onChange={(e) => handleLocationChange(index, 'description', e.target.value.slice(0, 300))}
                  ></textarea>
                  <div className="flex justify-end text-xs font-medium text-[#475569] tracking-wider">
                    {location.description?.length || 0}/300 characters
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                  <Input
                    label="Street Address"
                    required
                    placeholder="123 Main Street"
                    value={location.streetAddress}
                    onChange={(e) => handleLocationChange(index, 'streetAddress', e.target.value)}
                    className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                  />
                  <Input
                    label="Unit Number"
                    required
                    placeholder="4"
                    value={location.unitNumber}
                    onChange={(e) => handleLocationChange(index, 'unitNumber', e.target.value)}
                    className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                  />
                  <Input
                    label="City"
                    required
                    placeholder="Toronto"
                    value={location.city}
                    onChange={(e) => handleLocationChange(index, 'city', e.target.value)}
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
                    onChange={(e) => handleLocationChange(index, 'postalCode', e.target.value)}
                    className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                  />
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Country <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                    <ReusableTableSelect
                      value={location.country}
                      onChange={(e) => handleLocationChange(index, 'country', e.target.value)}
                      options={countryOptions}
                      placeholder="Canada"
                      borderclass="border border-[#BDBDD2]"
                      className="w-full text-[#475569] font-medium"
                      showCheckbox={false}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Province <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                    <ReusableTableSelect
                      value={location.province}
                      onChange={(e) => handleLocationChange(index, 'province', e.target.value)}
                      options={provinceOptions}
                      placeholder="Select Province / State..."
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
                    onChange={(e) => handleLocationChange(index, 'storeEmail', e.target.value)}
                    className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                  />
                  <Input
                    label="Phone Number"
                    required
                    placeholder="+1 (461) 000-0000"
                    value={location.storePhone}
                    onChange={(e) => handleLocationChange(index, 'storePhone', e.target.value)}
                    className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Pin Location on Map</label>
                  <div className="w-full h-40  overflow-hidden relative">
                    <StoreLocationMap
                      latitude={location.latitude}
                      longitude={location.longitude}
                      onLocationChange={(lat, lng) => {
                        const newLocations = [...formData.locations];
                        newLocations[index] = { ...newLocations[index], latitude: lat, longitude: lng };
                        setFormData({ ...formData, locations: newLocations });
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 px-4 py-2 rounded-md shadow-md border border-[#BDBDD2] flex items-center gap-2 pointer-events-auto cursor-pointer hover:bg-white transition-all">
                        <Icon icon="lucide:map-pin" className="text-[#181211]" width="16" />
                        <span className="text-sm font-bold text-[#181211]">Click to set store Location</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Another Location Button */}
        <button
          onClick={addLocation}
          className="flex items-center gap-2 text-[#EA3D2A] font-semibold text-sm hover:opacity-80 transition-all"
        >
          <Icon icon="majesticons:plus-line" width="18" />
          Add Another Location
        </button>
      </div>
    </div>
  );
};

export default Step2Location;
