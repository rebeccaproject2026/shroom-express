import React from 'react';
import { Icon } from '@iconify/react';

const StoreCompletionStatus = ({ currentStep, formData }) => {
  const checklist = [
    { label: 'Store name & contact', completed: !!(formData.storeName && formData.ownerName) },
    { label: 'Category selected', completed: !!formData.category },
    { label: 'Address added', completed: currentStep > 1 },
    { label: 'Delivery method set', completed: false },
    { label: 'Operating days set', completed: false },
    { label: 'Product types added', completed: false },
  ];

  const progress = currentStep === 1 ? 0 : 20;

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-[#181211] mb-2 tracking-tight">Completion</h3>
      <div className="space-y-1">
        {checklist.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${item.completed ? 'bg-[#219653] text-white' : 'bg-[#E2E8F0] border-2 border-[#E2E8F0]'
              }`}>
              {item.completed && <Icon icon="lucide:check" width="10" />}
            </div>
            <span className={`text-sm font-medium ${item.completed ? 'text-[#181211]' : 'text-[#475569]'}`}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#181211]">Profile Complete</span>
          <span className="text-[12px] font-bold text-[#219653]">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#219653] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default StoreCompletionStatus;
