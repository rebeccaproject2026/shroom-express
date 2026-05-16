import React from 'react';
import { Icon } from '@iconify/react';

const StatCard = ({ value, label, valueColor = 'text-[#1E293B]' }) => (
  <div className="flex-1 border border-[#CBD5E1] rounded-[18px] p-4 flex flex-col items-start justify-center bg-white shadow-[0px_1px_2px_0px_#0000000D]">
    <p className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</p>
    <p className="text-sm font-medium text-[#475569]">{label}</p>
  </div>
);

const Step4FeaturedSuccess = ({ selectedPlan, onBack }) => {
  return (
    <div className="p-10 flex-1 flex flex-col items-center justify-start text-center w-full animate-in fade-in duration-500 font-manrope">
      {/* Success Icon */}
      <div className="w-14 h-14 bg-[#D1FADF] text-[#12B76A] border border-[#A6F4C5] rounded-full flex items-center justify-center mb-4">
        <Icon icon="charm:tick" width="24" strokeWidth={3} />
      </div>

      {/* Success Title & Subtitle */}
      <div className="space-y-2 mb-5">
        <h2 className="text-2xl font-bold mb-0 text-[#1E293B]">Store is now featured!</h2>
        <p className="text-sm font-medium text-[#1E293B]  mx-auto leading-relaxed">
          Your store has been enrolled in the {selectedPlan?.name} Featured plan. It will appear in featured listings starting today.
        </p>
      </div>

      {/* Status Cards Row */}
      <div className="flex items-center justify-center gap-6 w-full max-w-xl mx-auto">
        <StatCard
          value={selectedPlan?.name}
          label="Feature"
          valueColor="text-[#475569]"
        />
        <StatCard
          value={`$${selectedPlan?.price}`}
          label="per month"
          valueColor="text-[#2E90FA]"
        />
        <StatCard
          value="Live"
          label="status"
          valueColor="text-[#039855]"
        />
        <StatCard
          value="30"
          label="days included"
          valueColor="text-[#F04438]"
        />
      </div>

      {/* Change/Cancel Action */}
      <button
        onClick={onBack}
        className="mt-12 text-sm font-bold text-[#F04438] hover:underline transition-all opacity-0 pointer-events-none"
      >
        Change or cancel plan
      </button>
    </div>
  );
};

export default Step4FeaturedSuccess;
