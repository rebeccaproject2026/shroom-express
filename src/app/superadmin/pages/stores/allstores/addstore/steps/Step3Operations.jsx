import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../../components/common/Input';

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'
      }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
    />
  </button>
);

const Step3Operations = ({ formData, setFormData }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    const currentDays = [...formData.operatingDays];
    if (currentDays.includes(day)) {
      setFormData({ ...formData, operatingDays: currentDays.filter(d => d !== day) });
    } else {
      setFormData({ ...formData, operatingDays: [...currentDays, day] });
    }
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="uil:setting" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Operations & Hours</h3>
            <p className="text-[#181211] text-xs leading-tight">Delivery options, operating hours and order settings</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 3 of 5</span>
      </div>

      <div className="p-5 space-y-6">
        {/* Delivery Options */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-[#181211] block mb-2.5">
            Delivery Options <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>

          <div className="space-y-3">
            {/* Same-Day Delivery */}
            <div className="p-4 border border-[#BDBDD2] rounded-md">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#181211]">Same-Day Delivery</h4>
                  <p className="text-xs font-medium text-[#475569]">Orders delivered the same day they are placed</p>
                </div>
                <Toggle
                  enabled={formData.sameDayDelivery}
                  onChange={() => setFormData({ ...formData, sameDayDelivery: !formData.sameDayDelivery })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <Input
                  label="Minimum Order Amount"
                  required
                  placeholder="25.00"
                  leftIcon={<span className="text-gray-400 font-bold">$</span>}
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                  labelClassName="text-sm font-semibold text-[#181211]"
                  className="border-[#BDBDD2] !py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                  borderClass="border border-[#BDBDD2]"
                />
                <Input
                  label="Max Delivery Radius (ml)"
                  required
                  placeholder="15"
                  value={formData.maxDeliveryRadius}
                  onChange={(e) => setFormData({ ...formData, maxDeliveryRadius: e.target.value })}
                  labelClassName="text-sm font-semibold text-[#181211]"
                  className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                  borderClass="border border-[#BDBDD2]"
                />
              </div>
            </div>

            {/* Express Delivery */}
            <div className="p-4 border border-[#BDBDD2] rounded-lg flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-[#181211]">Express Delivery</h4>
                <p className="text-xs font-medium text-[#475569]">Priority delivery within 2-3 hours</p>
              </div>
              <Toggle
                enabled={formData.expressDelivery}
                onChange={() => setFormData({ ...formData, expressDelivery: !formData.expressDelivery })}
              />
            </div>

            {/* Shipping */}
            <div className="p-4 border border-[#BDBDD2] rounded-lg flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-[#181211]">Shipping (Mail Order)</h4>
                <p className="text-xs font-medium text-[#475569]">Nationwide shipping via Canada Post / courier</p>
              </div>
              <Toggle
                enabled={formData.shippingMailOrder}
                onChange={() => setFormData({ ...formData, shippingMailOrder: !formData.shippingMailOrder })}
              />
            </div>
          </div>
        </div>

        {/* Operating Days */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#181211] block">
            Operating Days <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`w-13 h-13 flex items-center justify-center rounded-md border text-sm font-semibold transition-all ${formData.operatingDays.includes(day)
                  ? 'border-[#EA3D2A] text-[#EA3D2A] bg-[#FFEDEB]'
                  : 'border-[#BDBDD2] text-[#181211] hover:border-gray-300'
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 ">
          <Input
            label="Opening Time"
            required
            type="time"
            placeholder="09:00 PM"
            value={formData.openingTime}
            onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
            labelClassName="text-sm font-semibold text-[#181211]"
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Closing Time"
            required
            type="time"
            placeholder="09:00 AM"
            value={formData.closingTime}
            onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
            labelClassName="text-sm font-semibold text-[#181211]"
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        {/* Store Settings */}
        <div className="space-y-3 pt-4 border-t border-[#BDBDD2]">
          <label className="text-sm font-semibold text-[#181211] block mb-1">
            Store Settings <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>

          <div className="space-y-3">
            {[
              { id: 'autoAcceptOrders', label: 'Auto-Accept Orders', sub: 'Automatically accept incoming orders without manual approval' },
              { id: 'featuredStore', label: 'Featured Store', sub: 'Highlight this store at the top of search results' },
              { id: 'setStoreAsActive', label: 'Set Store as Active', sub: 'Store will be live and visible to customers immediately' }
            ].map((setting) => (
              <div key={setting.id} className="p-4 border border-[#BDBDD2] rounded-lg flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#181211]">{setting.label}</h4>
                  <p className="text-xs font-medium text-[#475569]">{setting.sub}</p>
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
    </div>
  );
};

export default Step3Operations;
