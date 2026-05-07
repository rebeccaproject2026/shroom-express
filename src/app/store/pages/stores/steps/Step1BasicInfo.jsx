import React from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../../../../superadmin/components/common/ReusableTableSelect';
import Input from '../../../../superadmin/components/common/Input';

const Step1BasicInfo = ({ formData, setFormData }) => {
  const roleOptions = [
    { value: 'Store Manager', label: 'Store Manager' },
    { value: 'Store Executive', label: 'Store Executive' },
  ];

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm min-h-[500px]">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="streamline:shopping-store-2-store-shop-shops-stores" className="text-[#E93E2B]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Owner Details</h3>
            <p className="text-[#181211] text-xs leading-tight">Store identity and owner contact details</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 1 of 5</span>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="First Name"
            required
            placeholder="e.g. John"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Last Name"
            placeholder="e.g. Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Email Address"
            required
            type="email"
            placeholder="store@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Phone Number"
            required
            placeholder="+1 (461) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Role <span className="text-[#E93E2B] ml-0.5">*</span></label>
            <ReusableTableSelect
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={roleOptions}
              placeholder="Store Manager"
              borderclass="border border-[#BDBDD2]"
              className="w-full text-[#475569] font-medium"
            />
          </div>
          <Input
            label="Contact Number"
            required
            placeholder="+1 (461) 000-0000"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
