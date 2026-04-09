import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const InventorySuccessState = ({ onReset, formData }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] font-manrope animate-in fade-in zoom-in duration-500 ">
      {/* Success Icon */}
      <div className="mb-4">
        <div className="flex items-center justify-center text-[#219653]">
          <Icon icon="hugeicons:store-verified-02" width="55" />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center space-y-2 mb-5 px-6">
        <h2 className="text-2xl font-semibold text-[#181211]">Product Added Successfully!</h2>
        <p className="text-[15px] font-medium text-[#181211]">
          <span className="text-[#181211] font-semibold">{formData.productName || 'Product Name'}</span> has been added to
          <span className="text-[#181211] font-semibold ml-1">{formData.storeName || 'Store Name'}</span> and is pending approval.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4 w-full max-w-2xl px-6 mb-8">
        <div className="flex-1 bg-[#E0FFED] border border-[#219653] rounded-lg p-4 transition-all">
          <p className="text-sm font-medium text-[#475569] mb-1">Sale Price</p>
          <p className="text-2xl font-semibold text-[#219653]">${formData.salePrice || '0.00'}</p>
        </div>

        <div className="flex-1 bg-[#F6FBFF] border border-[#0066FF] rounded-lg p-4 transition-all">
          <p className="text-sm font-medium text-[#475569] mb-1">Stock</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-medium text-[#0066FF]">{formData.initialStock || '0'}</span>
            <span className="text-sm font-semibold text-[#0066FF]">{formData.unitOfMeasure || 'Capsules'}</span>
          </div>
        </div>

        <div className="flex-1 bg-[#FFF7E8] border border-[#FFBE40]  rounded-lg p-4 transition-all">
          <p className="text-sm font-medium text-[#475569] mb-1">Margin</p>
          <p className="text-2xl font-semibold text-[#FF9F40]">
            {formData.salePrice > 0
              ? Math.round(((formData.salePrice - formData.costPrice) / formData.salePrice) * 100)
              : 0}%
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          className="px-4.5 py-2.5 bg-white border-2 border-[#BDBDD2] rounded-lg text-sm font-semibold text-[#475569] shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
        >
          Add Another Product
        </button>
        <button
          onClick={() => navigate('/superadmin/inventory/all')}
          className="px-4.5 py-2.5 bg-[#EA3D2A] text-white rounded-lg text-sm font-semibold shadow-[0px_4px_10px_rgba(234,61,42,0.3)] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
        >
          View Inventory
          <Icon icon="lucide:arrow-right" width="18" />
        </button>
      </div>
    </div>
  );
};

export default InventorySuccessState;
