import React from 'react';
import { Icon } from '@iconify/react';

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

const Step3Permissions = ({ formData, setFormData }) => {
  const settings = [
    {
      id: 'pushNotifications',
      label: 'Push Notifications',
      sub: 'Send delivery notifications to driver app'
    },
    {
      id: 'liveGpsTracking',
      label: 'Live GPS Tracking',
      sub: 'Allow platform to track location during shifts'
    },
    {
      id: 'cashOnDelivery',
      label: 'Cash on Delivery',
      sub: 'Driver accepts cash payments at door'
    },
    {
      id: 'multiStoreAccess',
      label: 'Multi-Store Access',
      sub: 'Driver can receive orders from multiple stores'
    },
  ];

  const handleToggle = (id) => {
    setFormData(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm font-manrope">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="lucide:settings" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Settings & Permissions</h3>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 3 of 4</span>
      </div>

      <div className="p-4 space-y-6 min-h-[640px]">
        <div className="space-y-3">
          <div className="space-y-1.5 mb-2">
            <h3 className="text-sm font-semibold text-[#181211]">Driver Settings</h3>
          </div>

          <div className="space-y-3 mt-0">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="p-3 border border-[#BDBDD2] rounded-md flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#181211]">
                    {setting.label}
                  </h4>
                  <p className="text-xs font-medium text-[#475569]">
                    {setting.sub}
                  </p>
                </div>
                <Toggle
                  enabled={formData[setting.id]}
                  onChange={() => handleToggle(setting.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Permissions;
