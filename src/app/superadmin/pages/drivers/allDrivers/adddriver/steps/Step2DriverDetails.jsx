import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../../components/common/ReusableTableSelect';
import StoreLocationMap from '../../../../../components/stores/StoreLocationMap';
import Input from '../../../../../components/common/Input';

const Step2DriverDetails = ({ formData, setFormData }) => {
  const driverTypeOptions = [
    { value: 'Store Driver', label: 'Store Driver' },
    { value: 'Platform Driver', label: 'Platform Driver' },
  ];

  const storeOptions = [
    { value: 'Forest Oasis', label: 'Forest Oasis' },
    { value: 'Healthy Greens', label: 'Healthy Greens' },
  ];

  const zoneOptions = [
    { value: 'Toronto', label: 'Toronto' },
    { value: 'Ottawa', label: 'Ottawa' },
    { value: 'Brampton', label: 'Brampton' },
  ];

  const countryOptions = [
    { value: 'Canada', label: 'Canada' },
    { value: 'USA', label: 'USA' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm font-manrope">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="healthicons:truck-driver" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Driver Details</h3>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 2 of 4</span>
      </div>

      <div className="p-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
              Driver Type <span className="text-[#EA3D2A]">*</span>
            </label>
            <ReusableTableSelect
              value={formData.driverType}
              onChange={(e) => setFormData({ ...formData, driverType: e.target.value })}
              options={driverTypeOptions}
              placeholder="Store Driver"
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
              Assigned Store <span className="text-[#EA3D2A]">*</span>
            </label>
            <ReusableTableSelect
              value={formData.assignedStore}
              onChange={(e) => setFormData({ ...formData, assignedStore: e.target.value })}
              options={storeOptions}
              placeholder="Forest Oasis"
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
              Delivery Zone <span className="text-[#EA3D2A]">*</span>
            </label>
            <ReusableTableSelect
              value={formData.deliveryZone}
              onChange={(e) => setFormData({ ...formData, deliveryZone: e.target.value })}
              options={zoneOptions}
              placeholder="Toronto"
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
              Country <span className="text-[#EA3D2A]">*</span>
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
        </div>

        {/* Map Section */}
        <div className="space-y-2">
          <div className="w-full h-48 rounded-md overflow-hidden border border-[#BDBDD2] shadow-sm relative group">
            <StoreLocationMap
              latitude={formData.latitude || '43.6532'}
              longitude={formData.longitude || '-79.3832'}
              onLocationChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white px-6 py-2.5 rounded-md shadow-lg border border-[#BDBDD2] flex items-center gap-2 pointer-events-auto cursor-pointer hover:bg-gray-50 transition-all">
                <Icon icon="meteor-icons:map-pin" width="18" className="text-[#475569]" />
                <span className="text-sm font-semibold text-[#475569]">Click to set Business Location</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Vehicle Make / Model"
            required
            name="vehicleInfo"
            placeholder="e.g. Honda Civic 2021"
            value={formData.vehicleInfo}
            onChange={handleInputChange}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="License Plate"
            required
            name="licensePlate"
            placeholder="e.g. SE1 001"
            value={formData.licensePlate}
            onChange={handleInputChange}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2DriverDetails;
