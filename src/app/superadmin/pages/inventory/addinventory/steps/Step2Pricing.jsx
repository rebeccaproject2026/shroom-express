import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../components/common/Input';

const Step2Pricing = ({ formData, setFormData }) => {
  const salePrice = parseFloat(formData.salePrice || 0);
  const costPrice = parseFloat(formData.costPrice || 0);

  const grossProfit = salePrice - costPrice;
  const margin = salePrice > 0 ? (grossProfit / salePrice) * 100 : 0;
  const markup = costPrice > 0 ? (grossProfit / costPrice) * 100 : 0;
  const commission = 0.12;
  const netRevenue = salePrice * (1 - commission);

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden font-manrope shadow-sm min-h-[800px]">
      {/* Header */}
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="fluent:money-24-filled" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Pricing & Tax</h3>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 2 of 5</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Price Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <Input
            label="Sale Price"
            required
            type="number"
            leftIcon={<span className="text-[#94A3B8] font-medium text-lg">$</span>}
            placeholder="100"
            value={formData.salePrice}
            onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
            className="!py-2.5 pl-8 text-[15px] font-medium placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
          <Input
            label="Cost Price"
            required
            type="number"
            leftIcon={<span className="text-[#94A3B8] font-medium text-lg">$</span>}
            placeholder="32"
            value={formData.costPrice}
            onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
            className="!py-2.5 pl-8 text-[15px] font-medium placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
            labelClassName="text-sm font-semibold text-[#181211]"
            borderClass="border border-[#BDBDD2]"
          />
        </div>

        {/* Calculation Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-[#E2E8F0] rounded-md p-4 space-y-1 shadow-sm transition-all hover:shadow-md">
            <span className="text-base font-medium text-[#45526C]">Gross Profit</span>
            <div className="text-2xl font-bold text-[#181211] leading-tight mt-2.5">${grossProfit.toFixed(2)}</div>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-md p-4 space-y-1 shadow-sm transition-all hover:shadow-md">
            <span className="text-base font-medium text-[#45526C]">Margin</span>
            <div className="text-2xl font-bold text-[#181211] leading-tight mt-2.5">{margin.toFixed(1)}%</div>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-md p-4 space-y-1 shadow-sm transition-all hover:shadow-md">
            <span className="text-base font-medium text-[#45526C]">Markup</span>
            <div className="text-2xl font-bold text-[#181211] leading-tight mt-2.5">{markup.toFixed(1)}%</div>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 mb-3">
          <div className="p-4 border border-[#E2E8F0] rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-[#181211]">Product is Taxable</h4>
              <p className="text-[13px] font-medium text-[#475569] mt-1.5">HST/GST will be applied at checkout</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isTaxable: !formData.isTaxable })}
              className={`w-11 h-6 rounded-full transition-colors relative ${formData.isTaxable ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'}`}
            >
              <div className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isTaxable ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="p-4 border border-[#E2E8F0] rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-[#181211]">Mark as Featured Product</h4>
              <p className="text-[13px] font-medium text-[#475569] mt-1.5">Show this product at the top of store listings</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
              className={`w-11 h-6 rounded-full transition-colors relative ${formData.isFeatured ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'}`}
            >
              <div className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isFeatured ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-3 bg-[#DAE9FF] border border-[#0066FF] rounded-md flex items-center gap-2">
          <Icon icon="material-symbols:info-outline" className="text-[#0066FF]" width="20" />
          <p className="text-[13px] font-medium text-[#0066FF]">
            ShroomExpress charges a <span className="font-bold">12% platform commission</span> on each sale. Net revenue per unit:<span className="font-bold ml-1">${netRevenue.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div >
  );
};

export default Step2Pricing;
