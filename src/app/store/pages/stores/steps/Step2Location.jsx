import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../superadmin/components/common/ReusableTableSelect';
import StoreLocationMap from '../../../../superadmin/components/stores/StoreLocationMap';
import Input from '../../../../superadmin/components/common/Input';

const Step2Location = ({ formData, setFormData }) => {
  React.useEffect(() => {
    if (formData.locations && formData.locations[0] && !formData.locations[0].streetAddress) {
      const newLocations = [...formData.locations];
      newLocations[0] = {
        ...newLocations[0],
        storeName: 'Forest Oasis',
        website: 'https://forestoasis.com',
        description: 'A premium store offering the best mushroom strains for a balanced lifestyle.',
        streetAddress: '123 Main Street',
        unitNumber: '4',
        city: 'Toronto',
        postalCode: 'M5V 2T6',
        country: 'Canada',
        province: 'Ontario',
        storeEmail: 'contact@forestoasis.com',
        storePhone: '+1 (461) 555-9999',
        latitude: '43.6532',
        longitude: '-79.3832',
        isPrimary: true,
        isExpanded: true
      };
      setFormData({ ...formData, locations: newLocations });
    }
  }, []);
  const socialPlatformOptions = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'X (Twitter)', label: 'X (Twitter)' },
    { value: 'TikTok', label: 'TikTok' },
    { value: 'Snapchat', label: 'Snapchat' },
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
      { bg: 'bg-[#FFEDEB]', text: 'text-[#E93E2B]' }, // Red/Pink
      { bg: 'bg-[#FFF4E5]', text: 'text-[#FF9F40]' }, // Orange
      { bg: 'bg-[#CDFFE2]', text: 'text-[#219653]' }, // Green
      { bg: 'bg-[#E8F1FF]', text: 'text-[#2F80ED]' }, // Blue
      { bg: 'bg-[#F3E8FF]', text: 'text-[#9B51E0]' }, // Purple
    ];
    return colors[index % colors.length];
  };

  const handleGlobalUpdate = (field, value) => {
    const newLocations = [...formData.locations];
    if (newLocations[0]) {
      newLocations[0] = { ...newLocations[0], [field]: value };
    }
    setFormData({ ...formData, locations: newLocations });
  };

  const handleLocationUpdate = (index, field, value) => {
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
    const updatedExistingLocations = formData.locations.map(loc => ({
      ...loc,
      isExpanded: false
    }));

    const newLocation = {
      isExpanded: true,
      website: '',
      socialPlatform: '',
      socialLinks: {},
      storeName: formData.locations[0]?.storeName || '',
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
      isPrimary: false
    };
    setFormData({ ...formData, locations: [...updatedExistingLocations, newLocation] });
  };

  const removeLocation = (index) => {
    if (formData.locations.length <= 1) return;
    const newLocations = formData.locations.filter((_, i) => i !== index);
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

      <div className="p-5 space-y-6">
        {/* Global Store Name */}
        <div>
          <Input
            label="Store Name"
            required
            placeholder="e.g. Forest Oasis"
            value={formData.locations[0]?.storeName || ''}
            onChange={(e) => handleGlobalUpdate('storeName', e.target.value)}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        {/* Locations List */}
        <div className="space-y-4">
          {formData.locations.map((loc, index) => {
            const isExpanded = loc.isExpanded;
            const isPrimary = loc.isPrimary;
            const badge = getBadgeColors(index);

            if (!isExpanded) {
              return (
                <div key={index} className="bg-white p-2 rounded-md border border-[#D1D1D6] flex items-center gap-3">
                  <div className={`w-10 h-10 ${badge.bg} rounded-md flex items-center justify-center shrink-0 text-base font-semibold text-[#181211]`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#181211] text-base leading-tight truncate">
                        {loc.city && loc.province ? `${loc.city}, ${loc.province}` : `Store Location`}
                      </h4>
                      {isPrimary && (
                        <span className="px-2 py-[1px] text-[#E93E2B] text-xs font-extrabold rounded-full border-2 border-[#F04438] flex items-center gap-1">
                          <Icon icon="charm:tick" width="14" /> Primary
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5 text-xs text-[#475569] font-medium leading-tight">
                        <Icon icon="stash:pin-place-duotone" width="15" className="shrink-0" />
                        <span className="truncate">{loc.streetAddress || 'Address not set'}{loc.unitNumber ? `, Unit-${loc.unitNumber}` : ''}, {loc.city}{loc.province ? `, ${loc.province}` : ''}, {loc.country} ({loc.postalCode})</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                        <div className="flex items-center gap-1.5">
                          <Icon icon="carbon:email" width="15" className="shrink-0" />
                          <span>{loc.storeEmail || 'No email set'}</span>
                        </div>
                        <span className="text-[#CBD5E1]">|</span>
                        <div className="flex items-center gap-1.5">
                          <Icon icon="proicons:call" width="15" className="shrink-0" />
                          <span>{loc.storePhone || 'No phone set'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleLocationExpansion(index)}
                    className="p-2 text-[#1E293B] transition-colors"
                  >
                    <Icon icon="iconamoon:edit-light" width="20" />
                  </button>
                </div>
              );
            }

            return (
              <div key={index} className="border border-[#BDBDD2] rounded-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Section Header */}
                <div className="px-4 py-3 bg-white border-b border-[#BDBDD2] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${badge.bg} rounded-md flex items-center justify-center text-base font-semibold text-[#181211] shrink-0`}>
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
                      label="Email Address"
                      required
                      placeholder="store@example.com"
                      value={loc.storeEmail}
                      onChange={(e) => handleLocationUpdate(index, 'storeEmail', e.target.value)}
                      className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                      labelClassName="text-sm font-semibold text-[#181211]"
                      borderClass="border border-[#BDBDD2]"
                    />
                    <Input
                      label="Phone Number"
                      required
                      placeholder="+1 (461) 000-0000"
                      value={loc.storePhone}
                      onChange={(e) => handleLocationUpdate(index, 'storePhone', e.target.value)}
                      className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                      labelClassName="text-sm font-semibold text-[#181211]"
                      borderClass="border border-[#BDBDD2]"
                    />
                    <Input
                      label="Website"
                      required
                      placeholder="https://yourstore.com"
                      value={loc.website}
                      onChange={(e) => handleLocationUpdate(index, 'website', e.target.value)}
                      className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                      labelClassName="text-sm font-semibold text-[#181211]"
                      borderClass="border border-[#BDBDD2]"
                    />
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Social Platform</label>
                      <ReusableTableSelect
                        value={loc.socialPlatform}
                        onChange={(e) => handleLocationUpdate(index, 'socialPlatform', e.target.value)}
                        options={socialPlatformOptions}
                        placeholder="Select a platform..."
                        borderclass="border border-[#BDBDD2]"
                        className="w-full text-[#475569] font-medium"
                        showCheckbox={false}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">About <span className="text-[#E93E2B] ml-0.5">*</span></label>
                    <textarea
                      rows="3"
                      placeholder="Write a brief description of the store, products offered, and what makes it stand out..."
                      className="w-full px-4 py-3 bg-white border border-[#BDBDD2] rounded-md text-sm font-medium text-[#181211] outline-none transition-all placeholder:text-[14px] placeholder:text-[#BDBDD2] font-medium"
                      value={loc.description}
                      onChange={(e) => handleLocationUpdate(index, 'description', e.target.value.slice(0, 300))}
                    ></textarea>
                    <div className="flex justify-end text-[11px] font-medium text-[#64748B]">
                      {loc.description?.length || 0}/300 characters
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                    <Input
                      label="Street Address"
                      required
                      placeholder="123 Main Street"
                      value={loc.streetAddress}
                      onChange={(e) => handleLocationUpdate(index, 'streetAddress', e.target.value)}
                      className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                      labelClassName="text-sm font-semibold text-[#181211]"
                      borderClass="border border-[#BDBDD2]"
                    />
                    <Input
                      label="Unit Number"
                      required
                      placeholder="4"
                      value={loc.unitNumber}
                      onChange={(e) => handleLocationUpdate(index, 'unitNumber', e.target.value)}
                      className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                      labelClassName="text-sm font-semibold text-[#181211]"
                      borderClass="border border-[#BDBDD2]"
                    />
                    <Input
                      label="City"
                      required
                      placeholder="Toronto"
                      value={loc.city}
                      onChange={(e) => handleLocationUpdate(index, 'city', e.target.value)}
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
                      value={loc.postalCode}
                      onChange={(e) => handleLocationUpdate(index, 'postalCode', e.target.value)}
                      className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                      labelClassName="text-sm font-semibold text-[#181211]"
                      borderClass="border border-[#BDBDD2]"
                    />
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Country <span className="text-[#E93E2B] ml-0.5">*</span></label>
                      <ReusableTableSelect
                        value={loc.country}
                        onChange={(e) => handleLocationUpdate(index, 'country', e.target.value)}
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
                        value={loc.province}
                        onChange={(e) => handleLocationUpdate(index, 'province', e.target.value)}
                        options={provinceOptions}
                        placeholder="Select Province / State..."
                        borderclass="border border-[#BDBDD2]"
                        className="w-full text-[#475569] font-medium"
                        showCheckbox={false}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Pin Location on Map</label>
                    <div className="w-full h-44 overflow-hidden relative border border-[#BDBDD2] rounded-md">
                      <StoreLocationMap
                        latitude={parseFloat(loc.latitude) || 43.6532}
                        longitude={parseFloat(loc.longitude) || -79.3832}
                        onLocationChange={(lat, lng) => {
                          const newLocations = [...formData.locations];
                          newLocations[index] = { ...newLocations[index], latitude: lat, longitude: lng };
                          setFormData({ ...formData, locations: newLocations });
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/90 px-4 py-2 rounded-md shadow-md border border-[#BDBDD2] flex items-center gap-2 pointer-events-auto cursor-pointer hover:bg-white transition-all">
                          <Icon icon="lucide:map-pin" className="text-[#E93E2B]" width="16" />
                          <span className="text-sm font-bold text-[#181211]">Click to set store Location</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => {
                      const newLocations = formData.locations.map((l, i) => ({
                        ...l,
                        isPrimary: i === index ? !l.isPrimary : false
                      }));
                      setFormData({ ...formData, locations: newLocations });
                    }}
                  >
                    <div className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-all ${isPrimary ? 'bg-[#E93E2B] border-[#E93E2B]' : 'bg-white border-[#BDBDD2] group-hover:border-[#E93E2B]'}`}>
                      {isPrimary && <Icon icon="lucide:check" className="text-white" width="14" />}
                    </div>
                    <p className="text-sm font-bold text-[#181211]">Set this location as the primary one for the store across all operations</p>
                  </div>

                  {formData.locations.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeLocation(index); }}
                      className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 pt-2"
                    >
                      <Icon icon="lucide:trash-2" width="14" /> Remove Location
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Another Location Button */}
        <button
          onClick={addLocation}
          className="flex items-center gap-2 text-[#E93E2B] font-semibold text-sm hover:opacity-80 transition-all"
        >
          <Icon icon="majesticons:plus-line" width="18" />
          Add Another Location
        </button>
      </div>
    </div>
  );
};

export default Step2Location;
