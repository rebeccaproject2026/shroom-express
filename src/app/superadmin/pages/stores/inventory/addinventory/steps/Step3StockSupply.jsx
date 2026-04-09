import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../../components/common/Input';
import ReusableTableSelect from '../../../../../components/common/ReusableTableSelect';

const Step3StockSupply = ({ formData, setFormData }) => {
  const [trackExpiry, setTrackExpiry] = useState(false);

  const suppliers = [
    'NovaBio Labs',
    'EarthDrop Co.',
    'SweetHerb Inc.',
    'GreenRoot Pharma',
    'MushroomPure'
  ];

  const supplierOptions = suppliers.map(s => ({ value: s.toLowerCase().replace(/\s+/g, '-'), label: s }));

  return (
    <div className="space-y-6 font-manrope">
      {/* Stock Levels Card */}
      <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
              <Icon icon="vaadin:stock" className="text-[#EA3D2A]" width="24" />
            </div>
            <h3 className="text-base font-semibold text-[#181211]">Stock Levels</h3>
          </div>
          <span className="text-xs font-bold text-[#181211]">Step 3 of 5</span>
        </div>

        <div className="p-6 space-y-6">
          {/* Blue Alert Box */}
          <div className="p-3 bg-[#F6FBFF] border border-[#0066FF] rounded-md flex items-start gap-3">
            <Icon icon="vaadin:stock" className="text-[#0066FF] mt-2" width="20" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-[#0066FF]">Pack Weight Requirement</p>
              <p className="text-xs font-medium text-[#0066FF]">
                Each product pack must weigh between <span className="font-bold">30gm and 70gm</span>. Packs outside this range cannot be listed.
              </p>
            </div>
          </div>

          {/* Stock Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <Input
              label="Initial Stock Quantity"
              required
              type="number"
              placeholder="0"
              value={formData.initialStock}
              onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
              rightIcon={<span className="text-[#94A3B8] font-medium text-sm">Capsules</span>}
              className="!py-2.5 pr-20 text-[15px] font-medium placeholder:text-[#94A3B8]"
              labelClassName="text-sm font-semibold text-[#181211]"
              borderClass="border border-[#BDBDD2]"
            />
            <div className="space-y-1">
              <Input
                label="Pack Weight (gm)"
                required
                type="number"
                placeholder="e.g. 30"
                value={formData.packWeight}
                onChange={(e) => setFormData({ ...formData, packWeight: e.target.value })}
                rightIcon={<span className="text-[#94A3B8] font-medium text-sm">gm</span>}
                className="!py-2.5 pr-12 text-[15px] font-medium placeholder:text-[#94A3B8]"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
              />
              <p className="text-[10px] font-medium text-[#94A3B8]">Min 30gm - Max 70gm per pack</p>
              {formData.packWeight >= 30 && formData.packWeight <= 70 && (
                <div className="flex items-center gap-1 mt-1">
                  <Icon icon="subway:tick" className="text-[#219653]" width="10" />
                  <p className="text-[10px] font-medium text-[#219653]">Valid - 30gm per pack</p>
                </div>
              )}
            </div>

            <Input
              label="Low Stock Alert Threshold"
              required
              type="number"
              placeholder="10"
              value={formData.lowStockAlert}
              onChange={(e) => setFormData({ ...formData, lowStockAlert: e.target.value })}
              rightIcon={<span className="text-[#94A3B8] font-medium text-sm">Capsules</span>}
              className="!py-2.5 pr-20 text-[15px] font-medium placeholder:text-[#94A3B8]"
              labelClassName="text-sm font-semibold text-[#181211]"
              borderClass="border border-[#BDBDD2]"
            />
            <Input
              label="Reorder Quantity"
              required
              type="number"
              placeholder="50"
              value={formData.reorderQuantity}
              onChange={(e) => setFormData({ ...formData, reorderQuantity: e.target.value })}
              rightIcon={<span className="text-[#94A3B8] font-medium text-sm">Capsules</span>}
              className="!py-2.5 pr-20 text-[15px] font-medium placeholder:text-[#94A3B8]"
              labelClassName="text-sm font-semibold text-[#181211]"
              borderClass="border border-[#BDBDD2]"
            />
          </div>

          {/* Stock Health Preview */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-medium text-[#181211] ">
              <span>Stock Health Preview</span>
              <span className="text-[#219653]">In Stock</span>
            </div>
            <div className="relative pt-1">
              <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#219653] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((formData.initialStock / 200) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-medium text-[#181211] mt-2 tracking-tight">
                <span>0</span>
                <span>Alert: {formData.lowStockAlert || 10}</span>
                <span>200</span>
              </div>
            </div>
          </div>

          {/* Track Expiry Toggle */}
          <div className="p-4 border border-[#E2E8F0] rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-[#181211]">Track Expiry Date</h4>
              <p className="text-[13px] font-medium text-[#475569] mt-1.5">Enable expiry date management for this product</p>
            </div>
            <button
              type="button"
              onClick={() => setTrackExpiry(!trackExpiry)}
              className={`w-11 h-6 rounded-full transition-colors relative ${trackExpiry ? 'bg-[#EA3D2A]' : 'bg-[#BDBDD2]'}`}
            >
              <div className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-white rounded-full transition-transform ${trackExpiry ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Conditional Expiry Fields */}
          {trackExpiry && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2 animate-in fade-in duration-300">
              <Input
                label="Expiry Date"
                required
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="!py-2.5 text-[15px] font-medium"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
              />
              <Input
                label="Batch Number"
                required
                placeholder="e.g. BATCH-2026-23"
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                className="!py-2.5 text-[15px] font-medium placeholder:text-[#94A3B8]"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Supplier Card */}
      <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-[#181211]">Supplier & Restocking</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Supplier / Vendor <span className="text-[#EA3D2A] text-xs ml-1">*</span></label>
              <ReusableTableSelect
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                options={supplierOptions}
                placeholder="Select Supplier.."
                className="w-full h-[45px] text-[#181211] font-medium"
                borderclass="border border-[#BDBDD2]"
              />
            </div>
            <div className="space-y-1">
              <Input
                label="Supplier SKU"
                required
                placeholder="e.g. NVB-MIC-030"
                value={formData.supplierSku}
                onChange={(e) => setFormData({ ...formData, supplierSku: e.target.value })}
                className="!py-2.5 text-[15px] font-medium placeholder:text-[#94A3B8]"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
              />
              <p className="text-[10px] font-medium text-[#94A3B8]">Min 30gm - Max 70gm per pack</p>
            </div>
            <Input
              label="Lead Time (days)"
              required
              type="number"
              placeholder="3"
              value={formData.leadTime}
              onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
              rightIcon={<span className="text-[#94A3B8] font-medium text-sm">Days</span>}
              className="!py-2.5 pr-14 text-[15px] font-medium placeholder:text-[#94A3B8]"
              labelClassName="text-sm font-semibold text-[#181211]"
              borderClass="border border-[#BDBDD2]"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#181211]">Quick Select Supplier</p>
            <div className="flex flex-wrap gap-2">
              {suppliers.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData({ ...formData, supplier: s.toLowerCase().replace(/\s+/g, '-') })}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${formData.supplier === s.toLowerCase().replace(/\s+/g, '-')
                    ? 'border-[#EA3D2A] text-[#EA3D2A] bg-[#FFEDEB]'
                    : 'border-[#BDBDD2] text-[#181211] hover:border-[#EA3D2A] hover:text-[#EA3D2A]'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3StockSupply;
