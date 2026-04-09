import React from 'react';
import { Icon } from '@iconify/react';

const Step5Compliance = ({ formData, setFormData }) => {
  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden font-manrope shadow-sm min-h-[800px]">
      {/* Header */}
      <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="fluent-mdl2:compliance-audit" className="text-[#EA3D2A]" width="24" />
          </div>
          <h3 className="text-base font-semibold text-[#181211]">Compliance Documents</h3>
        </div>
        <span className="text-xs font-bold text-[#181211] opacity-60">Step 5 of 5</span>
      </div>

      <div className="p-6 space-y-4">
        {/* Certificate of Analysis (COA) Card */}
        <div className="p-3.5 border border-[#E2E8F0] rounded-lg flex items-center justify-between transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F8F8F8]  rounded-sm flex items-center justify-center shrink-0">
              <Icon icon="covid:virus-lab-research-microscope" className="text-[#64748B]" width="24" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#181211]">Certificate of Analysis (COA)</h4>
              <p className="text-[13px] font-medium text-[#475569] mt-1">Lab test results showing product purity and potency</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, hasCOA: !formData.hasCOA })}
            className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${formData.hasCOA ? 'bg-[#EA3D2A]' : 'bg-[#D1D5DB]'}`}
          >
            <div className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${formData.hasCOA ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Product License / Permit Card */}
        <div className="p-3.5 border border-[#E2E8F0] rounded-lg flex items-center justify-between transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F8F8F8]  rounded-sm flex items-center justify-center shrink-0">
              <Icon icon="clarity:license-line" className="text-[#64748B]" width="24" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#181211]">Product License / Permit</h4>
              <p className="text-[13px] font-medium text-[#475569] mt-1">Required for regulated product categories</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, hasLicense: !formData.hasLicense })}
            className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${formData.hasLicense ? 'bg-[#EA3D2A]' : 'bg-[#D1D5DB]'}`}
          >
            <div className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${formData.hasLicense ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5Compliance;
