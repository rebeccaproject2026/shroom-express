import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../superadmin/components/common/Input';
import ReusableTableSelect from '../../../../superadmin/components/common/ReusableTableSelect';
import DeliveryCoverageModal from '../../../../superadmin/components/stores/DeliveryCoverageModal';

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#E93E2B]' : 'bg-[#E2E8F0]'}`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

const Step3Operations = ({ formData, setFormData }) => {
  React.useEffect(() => {
    if (!formData.sameDayMinAmount) {
      setFormData({
        ...formData,
        sameDayDelivery: true,
        sameDayMinAmount: '50.00',
        sameDayFee: '15.00',
        sameDayFreeOver: '120.00',
        sameDayEta: 'Between 1 - 2 hours',
        sameDayDeliveredBy: 'Shroom Express Driver',
        sameDayOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        sameDayDayHours: {
          'Mon': { open: '09:00', close: '21:00' },
          'Tue': { open: '09:00', close: '21:00' },
          'Wed': { open: '09:00', close: '21:00' },
          'Thu': { open: '09:00', close: '21:00' },
          'Fri': { open: '09:00', close: '21:00' },
        },
        sameDayCoverage: {
          radius: 60,
          cities: [{ name: 'Toronto', province: 'Ontario' }]
        },
        expressDelivery: true,
        expressMinAmount: '120.00',
        expressFee: '15.00',
        expressEta: 'Under 1 hour',
        expressDeliveredBy: 'Shroom Express Driver',
        expressOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        expressDayHours: {
          'Mon': { open: '10:00', close: '20:00' },
          'Tue': { open: '10:00', close: '20:00' },
          'Wed': { open: '10:00', close: '20:00' },
          'Thu': { open: '10:00', close: '20:00' },
          'Fri': { open: '10:00', close: '20:00' },
        },
        expressCoverage: {
          radius: 30,
          cities: [{ name: 'Toronto', province: 'Ontario' }]
        },
        shippingMailOrder: true,
        shippingFee: '15.00',
        shippingFreeOver: '120.00',
        shippingEta: 'Between 1 - 3 days',
        shippingCouriers: ['Canada Post', 'Purolator'],
        shippingAreas: ['Ontario', 'Quebec', 'British Columbia'],
        processingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        shippingOperatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        shippingDayHours: {
          'Mon': { open: '09:00', close: '17:00' },
          'Tue': { open: '09:00', close: '17:00' },
          'Wed': { open: '09:00', close: '17:00' },
          'Thu': { open: '09:00', close: '17:00' },
          'Fri': { open: '09:00', close: '17:00' },
        },
        autoAcceptOrders: true,
        featuredStore: true,
        setStoreAsActive: true
      });
    }
  }, []);

  const [coverageModal, setCoverageModal] = useState({ isOpen: false, type: '' });
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const etaOptions = [
    { value: 'Under 1 hour', label: 'Under 1 hour' },
    { value: 'Between 1 - 2 hours', label: 'Between 1 - 2 hours' },
    { value: 'Between 2 - 4 hours', label: 'Between 2 - 4 hours' },
    { value: 'Between 4 - 6 hours', label: 'Between 4 - 6 hours' },
    { value: 'Between 8 - 12 hours', label: 'Between 8 - 12 hours' },
  ];

  const shippingEtaOptions = [
    { value: 'Between 1 - 3 days', label: 'Between 1 - 3 days' },
    { value: 'Between 3 - 5 days', label: 'Between 3 - 5 days' },
    { value: 'Between 5 - 7 days', label: 'Between 5 - 7 days' },
  ];

  const deliveredByOptions = [
    { value: 'Shroom Express Driver', label: 'Shroom Express Driver' },
    { value: 'In House Driver', label: 'In House Driver' },
  ];

  const courierOptions = [
    { value: 'Shroom Express', label: 'Shroom Express' },
    { value: 'Canada Post', label: 'Canada Post' },
    { value: 'Purolator', label: 'Purolator' },
    { value: 'UPS', label: 'UPS' },
    { value: 'FedEx', label: 'FedEx' },
    { value: 'DHL', label: 'DHL' },
    { value: 'Canpar', label: 'Canpar' },
    { value: 'GLS', label: 'GLS' },
    { value: 'Chit Chats', label: 'Chit Chats' },
    { value: 'Stallion', label: 'Stallion' },
    { value: 'Nationex', label: 'Nationex' },
    { value: 'Dragonfly', label: 'Dragonfly' },
    { value: 'Western Canada Express', label: 'Western Canada Express' },
  ];

  const processingDaysOptions = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
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

  const toggleDay = (prefix, day) => {
    const currentDays = [...formData[`${prefix}OperatingDays`]];
    let newDays;
    const newDayHours = { ...(formData[`${prefix}DayHours`] || {}) };

    if (currentDays.includes(day)) {
      newDays = currentDays.filter(d => d !== day);
      // We don't necessarily need to delete from newDayHours, 
      // but we could if we wanted to keep the object clean.
    } else {
      newDays = [...currentDays, day];
      if (!newDayHours[day]) {
        newDayHours[day] = { open: '09:00 am', close: '09:00 pm' };
      }
    }
    setFormData({
      ...formData,
      [`${prefix}OperatingDays`]: newDays,
      [`${prefix}DayHours`]: newDayHours
    });
  };

  const handleApplyCoverage = (data) => {
    setFormData({ ...formData, [`${coverageModal.type}Coverage`]: data });
  };

  const removeCityFromCoverage = (type, cityName) => {
    const currentCoverage = formData[`${type}Coverage`];
    const newCities = currentCoverage.cities.filter(c => c.name !== cityName);
    setFormData({ ...formData, [`${type}Coverage`]: { ...currentCoverage, cities: newCities } });
  };

  const renderSchedule = (prefix) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#181211] block">
          Operating Days <span className="text-[#E93E2B] ml-0.5">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(prefix, day)}
              className={`w-12 h-12 flex items-center justify-center rounded-md border text-sm font-semibold transition-all ${formData[`${prefix}OperatingDays`].includes(day)
                ? 'border-[#E93E2B] text-[#E93E2B] bg-[#FFF0EE]'
                : 'border-[#BDBDD2] text-[#181211] hover:border-gray-300 bg-white'
                }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-2">
        {formData[`${prefix}OperatingDays`].sort((a, b) => days.indexOf(a) - days.indexOf(b)).map((day) => {
          const dayFullNames = {
            Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday',
            Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
          };
          return (
            <div key={day} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Input
                label={`Opening Time (${dayFullNames[day]})`}
                required
                type="time"
                value={formData[`${prefix}DayHours`]?.[day]?.open || ''}
                onChange={(e) => {
                  const newDayHours = { ...(formData[`${prefix}DayHours`] || {}) };
                  newDayHours[day] = { ...(newDayHours[day] || {}), open: e.target.value };
                  setFormData({ ...formData, [`${prefix}DayHours`]: newDayHours });
                }}
                className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
              />
              <Input
                label={`Closing Time (${dayFullNames[day]})`}
                required
                type="time"
                value={formData[`${prefix}DayHours`]?.[day]?.close || ''}
                onChange={(e) => {
                  const newDayHours = { ...(formData[`${prefix}DayHours`] || {}) };
                  newDayHours[day] = { ...(newDayHours[day] || {}), close: e.target.value };
                  setFormData({ ...formData, [`${prefix}DayHours`]: newDayHours });
                }}
                className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm min-h-[500px]">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="uil:setting" className="text-[#E93E2B]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Operations & Hours</h3>
            <p className="text-[#181211] text-xs leading-tight">Delivery options, operating hours and order settings</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 3 of 5</span>
      </div>

      <div className="p-5 space-y-4">
        <label className="text-sm font-semibold text-[#181211] block mb-2">Delivery Options <span className="text-[#E93E2B] ml-0.5">*</span></label>

        {/* Same-Day Delivery */}
        <div className={`border border-[#BDBDD2] rounded-md transition-all duration-300 ${formData.sameDayDelivery ? 'bg-white' : 'bg-white'}`}>
          <div className="p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-[#181211]">Same-Day Delivery</h4>
              <p className="text-[13px] font-medium text-[#475569]">Orders delivered the same day they are placed</p>
            </div>
            <Toggle
              enabled={formData.sameDayDelivery}
              onChange={() => setFormData({ ...formData, sameDayDelivery: !formData.sameDayDelivery })}
            />
          </div>
          {formData.sameDayDelivery && (
            <div className="p-4 pt-0 space-y-4 border-t border-[#BDBDD2] mt-0 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <Input
                  label="Minimum Order Amount"
                  placeholder="50.00"
                  leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                  value={formData.sameDayMinAmount}
                  onChange={(e) => setFormData({ ...formData, sameDayMinAmount: e.target.value })}
                  className="!py-2 !border-[#BDBDD2]"
                  labelClassName="text-sm font-semibold text-[#181211]"
                />
                <Input
                  label="Fee ($50-$120)"
                  placeholder="15.00"
                  leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                  value={formData.sameDayFee}
                  onChange={(e) => setFormData({ ...formData, sameDayFee: e.target.value })}
                  className="!py-2 !border-[#BDBDD2]"
                  labelClassName="text-sm font-semibold text-[#181211]"
                />
                <Input
                  label="Free over"
                  placeholder="120.00"
                  leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                  value={formData.sameDayFreeOver}
                  onChange={(e) => setFormData({ ...formData, sameDayFreeOver: e.target.value })}
                  className="!py-2 !border-[#BDBDD2]"
                  labelClassName="text-sm font-semibold text-[#181211]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">ETA / Delivery window</label>
                  <ReusableTableSelect
                    value={formData.sameDayEta}
                    onChange={(e) => setFormData({ ...formData, sameDayEta: e.target.value })}
                    options={etaOptions}
                    placeholder="Select ETA / Delivery window..."
                    borderclass="border !border-[#BDBDD2]"
                    showCheckbox={false}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivered by</label>
                  <ReusableTableSelect
                    value={formData.sameDayDeliveredBy}
                    onChange={(e) => setFormData({ ...formData, sameDayDeliveredBy: e.target.value })}
                    options={deliveredByOptions}
                    placeholder="Select a Delivered by..."
                    borderclass="border border-[#BDBDD2]"
                    showCheckbox={false}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivery Coverage <span className="text-[#E93E2B] ml-0.5">*</span></label>
                <div
                  onClick={() => setCoverageModal({ isOpen: true, type: 'sameDay' })}
                  className="w-full px-4 py-2.5 bg-white border !border-[#BDBDD2] rounded-md text-sm font-medium text-[#181211] outline-none cursor-pointer hover:bg-gray-50 transition-all flex items-center justify-between min-h-[44px]"
                >
                  <div className="flex flex-wrap gap-2">
                    {formData.sameDayCoverage.cities.length > 0 ? (
                      formData.sameDayCoverage.cities.map((city, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FFF0EE] text-[#E93E2B] rounded-md text-[13px] font-bold border border-[#E93E2B]/10">
                          {city.name}, {city.province} + {formData.sameDayCoverage.radius} mi
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCityFromCoverage('sameDay', city.name);
                            }}
                            className="hover:opacity-70"
                          >
                            <Icon icon="lucide:x" width="14" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-[#475569]">Click to set cities & radius...</span>
                    )}
                  </div>
                  <Icon icon="mage:location-fill" className="text-[#181211] shrink-0" width="20" />
                </div>
              </div>
              {renderSchedule('sameDay')}
            </div>
          )}
        </div>

        {/* Express Delivery */}
        <div className={`border border-[#BDBDD2] rounded-md transition-all duration-300 ${formData.expressDelivery ? 'bg-white' : 'bg-white'}`}>
          <div className="p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-[#181211]">Express Delivery</h4>
              <p className="text-[13px] font-medium text-[#475569]">Priority delivery within 1-2 hours · $15 flat · min $120</p>
            </div>
            <Toggle
              enabled={formData.expressDelivery}
              onChange={() => setFormData({ ...formData, expressDelivery: !formData.expressDelivery })}
            />
          </div>
          {formData.expressDelivery && (
            <div className="p-4 pt-0 space-y-4 border-t border-[#BDBDD2] animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <Input
                  label="Minimum Order Amount"
                  placeholder="120.00"
                  leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                  value={formData.expressMinAmount}
                  onChange={(e) => setFormData({ ...formData, expressMinAmount: e.target.value })}
                  className="!py-2 !border-[#BDBDD2]"
                  labelClassName="text-sm font-semibold text-[#181211]"
                />
                <Input
                  label="Flat delivery fee"
                  placeholder="15.00"
                  leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                  value={formData.expressFee}
                  onChange={(e) => setFormData({ ...formData, expressFee: e.target.value })}
                  className="!py-2 !border-[#BDBDD2]"
                  labelClassName="text-sm font-semibold text-[#181211]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">ETA / Delivery window</label>
                  <ReusableTableSelect
                    value={formData.expressEta}
                    onChange={(e) => setFormData({ ...formData, expressEta: e.target.value })}
                    options={etaOptions}
                    placeholder="Select ETA / Delivery window..."
                    borderclass="border !border-[#BDBDD2]"
                    showCheckbox={false}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivered by</label>
                  <ReusableTableSelect
                    value={formData.expressDeliveredBy}
                    onChange={(e) => setFormData({ ...formData, expressDeliveredBy: e.target.value })}
                    options={deliveredByOptions}
                    placeholder="Select a Delivered by..."
                    borderclass="border border-[#BDBDD2]"
                    showCheckbox={false}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivery Coverage <span className="text-[#E93E2B] ml-0.5">*</span></label>
                <div
                  onClick={() => setCoverageModal({ isOpen: true, type: 'express' })}
                  className="w-full px-4 py-2.5 bg-white border !border-[#BDBDD2] rounded-md text-sm font-medium text-[#181211] outline-none cursor-pointer hover:bg-gray-50 transition-all flex items-center justify-between min-h-[44px]"
                >
                  <div className="flex flex-wrap gap-2">
                    {formData.expressCoverage.cities.length > 0 ? (
                      formData.expressCoverage.cities.map((city, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FFF0EE] text-[#E93E2B] rounded-md text-[13px] font-bold border border-[#E93E2B]/10">
                          {city.name}, {city.province} + {formData.expressCoverage.radius} mi
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCityFromCoverage('express', city.name);
                            }}
                            className="hover:opacity-70"
                          >
                            <Icon icon="lucide:x" width="14" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-[#475569]">Click to set cities & radius...</span>
                    )}
                  </div>
                  <Icon icon="mage:location-fill" className="text-[#181211] shrink-0" width="20" />
                </div>
              </div>
              {renderSchedule('express')}
            </div>
          )}
        </div>

        {/* Shipping */}
        <div className={`border border-[#BDBDD2] rounded-md transition-all duration-300 ${formData.shippingMailOrder ? 'bg-white' : 'bg-white'}`}>
          <div className="p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-[#181211]">Shipping</h4>
              <p className="text-[13px] font-medium text-[#475569]">Via Canada Post / courier · free over $120 · 2-5 business days</p>
            </div>
            <Toggle
              enabled={formData.shippingMailOrder}
              onChange={() => setFormData({ ...formData, shippingMailOrder: !formData.shippingMailOrder })}
            />
          </div>
          {formData.shippingMailOrder && (
            <div className="p-4 pt-0 space-y-4 border-t border-[#BDBDD2] animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <Input
                  label="Flat shipping fee"
                  placeholder="15.00"
                  leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                  value={formData.shippingFee}
                  onChange={(e) => setFormData({ ...formData, shippingFee: e.target.value })}
                  className="!py-2 !border-[#BDBDD2]"
                  labelClassName="text-sm font-semibold text-[#181211]"
                />
                <Input
                  label="Free over"
                  placeholder="120.00"
                  leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                  value={formData.shippingFreeOver}
                  onChange={(e) => setFormData({ ...formData, shippingFreeOver: e.target.value })}
                  className="!py-2 !border-[#BDBDD2]"
                  labelClassName="text-sm font-semibold text-[#181211]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">ETA / Delivery window</label>
                  <ReusableTableSelect
                    value={formData.shippingEta}
                    onChange={(e) => setFormData({ ...formData, shippingEta: e.target.value })}
                    options={shippingEtaOptions}
                    placeholder="Select ETA / Delivery window..."
                    borderclass="border border-[#BDBDD2]"
                    showCheckbox={false}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Shipping couriers</label>
                  <ReusableTableSelect
                    isMulti={true}
                    value={formData.shippingCouriers}
                    onChange={(e) => setFormData({ ...formData, shippingCouriers: e.target.value })}
                    options={courierOptions}
                    placeholder="Select Shipped Couriers..."
                    borderclass="border border-[#BDBDD2]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Shipping areas <span className="text-[#E93E2B] ml-0.5">*</span></label>
                  <ReusableTableSelect
                    isMulti={true}
                    value={formData.shippingAreas}
                    onChange={(e) => setFormData({ ...formData, shippingAreas: e.target.value })}
                    options={provinceOptions}
                    placeholder="Select Shipping Areas..."
                    borderclass="border border-[#BDBDD2]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Processing days <span className="text-[#E93E2B] ml-0.5">*</span></label>
                  <ReusableTableSelect
                    isMulti={true}
                    value={formData.processingDays}
                    onChange={(e) => setFormData({ ...formData, processingDays: e.target.value })}
                    options={processingDaysOptions}
                    placeholder="Select Processing Days..."
                    borderclass="border border-[#BDBDD2]"
                  />
                </div>
              </div>
              {renderSchedule('shipping')}
            </div>
          )}
        </div>

        {/* Store Settings */}
        <div className="space-y-3 pt-4 border-t border-[#BDBDD2]">
          <label className="text-sm font-semibold text-[#181211] block mb-1">Store Settings <span className="text-[#E93E2B] ml-0.5">*</span></label>
          <div className="space-y-3">
            {[
              { id: 'autoAcceptOrders', label: 'Auto-Accept Orders', sub: 'Automatically accept incoming orders without manual approval' },
              { id: 'featuredStore', label: 'Featured Store', sub: 'Highlight this store at the top of search results' },
              { id: 'setStoreAsActive', label: 'Set Store as Active', sub: 'Store will be live and visible to customers immediately' }
            ].map((setting) => (
              <div key={setting.id} className="border border-[#BDBDD2] rounded-md p-4 transition-all flex items-center justify-between bg-white">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#181211]">{setting.label}</h4>
                  <p className="text-[13px] font-medium text-[#475569]">{setting.sub}</p>
                </div>
                <Toggle
                  enabled={formData[setting.id]}
                  onChange={() => setFormData({ ...formData, [setting.id]: !formData[setting.id] })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <DeliveryCoverageModal
        isOpen={coverageModal.isOpen}
        onClose={() => setCoverageModal({ isOpen: false, type: '' })}
        onApply={handleApplyCoverage}
        initialCities={coverageModal.type ? formData[`${coverageModal.type}Coverage`].cities : []}
        initialRadius={coverageModal.type ? formData[`${coverageModal.type}Coverage`].radius : 60}
      />
    </div>
  );
};

export default Step3Operations;
