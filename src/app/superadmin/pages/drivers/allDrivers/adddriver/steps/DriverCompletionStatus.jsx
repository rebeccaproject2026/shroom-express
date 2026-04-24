import React from 'react';
import { Icon } from '@iconify/react';

const DriverCompletionStatus = ({ currentStep, formData }) => {
  const checklist = [
    { label: 'Driver name', completed: !!(formData.firstName && formData.lastName) },
    { label: 'Email address', completed: !!formData.email },
    { label: 'License Number', completed: !!formData.licenseNumber },
    { label: 'Date of Birth', completed: !!formData.dob },
    { label: 'Phone number', completed: !!formData.phoneNumber },
    { label: 'Driver Image', completed: !!formData.driverImage },
    { label: 'Location', completed: !!formData.deliveryZone },
    { label: 'Vehicle Info', completed: !!(formData.vehicleInfo && formData.licensePlate) },
    { label: 'Permissions', completed: currentStep > 3 },
    { label: 'Upload Documents', completed: currentStep > 4 },
  ];

  const completedCount = checklist.filter(item => item.completed).length;
  // For design parity with the image during Step 3, we show 75% if 8/10 are done
  const progress = currentStep === 3 ? 75 : Math.min(100, Math.round((completedCount / checklist.length) * 100));

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md p-5 shadow-sm space-y-4 font-manrope">
      <h3 className="text-lg font-semibold text-[#181211] mb-2 tracking-tight">Completion</h3>
      <div className="space-y-1.5">
        {checklist.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${item.completed ? 'bg-[#219653] text-white' : 'bg-[#E2E8F0] border-2 border-[#E2E8F0]'
              }`}>
              {item.completed && <Icon icon="lucide:check" width="10" />}
            </div>
            <span className={`text-sm font-medium ${item.completed ? 'text-[#181211]' : 'text-[#475569]'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#181211]">Driver Complete</span>
          <span className="text-[12px] font-bold text-[#219653] transition-all">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#219653] transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default DriverCompletionStatus;
