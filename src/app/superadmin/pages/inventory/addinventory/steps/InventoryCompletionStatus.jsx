import React from 'react';
import { Icon } from '@iconify/react';

const InventoryCompletionStatus = ({ currentStep, formData }) => {
  const checklist = [
    { label: 'Store selected', completed: !!formData.storeId },
    { label: 'Product name & SKU', completed: !!(formData.productName?.trim() && formData.sku?.trim()) },
    { label: 'Category & unit set', completed: !!(Array.isArray(formData.category) ? formData.category.length > 0 : formData.category) && !!formData.unitOfMeasure },
    { label: 'Sale & cost price', completed: !!(parseFloat(formData.salePrice) > 0 && parseFloat(formData.costPrice) > 0) },
    { label: 'Initial stock & supplier', completed: !!(parseInt(formData.initialStock) >= 0 && formData.supplier?.trim()) },
    { label: 'Pack weight (30-70gm)', completed: false },
    { label: 'Low stock alert set', completed: !!formData.lowStockAlert },
  ];

  const progress = Math.round((checklist.filter(item => item.completed).length / checklist.length) * 100);

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md p-5 shadow-sm font-manrope">
      <h3 className="text-lg font-semibold text-[#181211] mb-4 tracking-tight">Completion</h3>

      <div className="space-y-1">
        {checklist.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${item.completed
              ? 'bg-[#219653] text-white'
              : 'bg-[#E2E8F0] border-2 border-[#E2E8F0]'
              }`}>
              {item.completed && <Icon icon="lucide:check" width="10" />}
            </div>
            <span className={`text-sm font-medium ${item.completed ? 'text-[#181211]' : 'text-[#475569]'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#181211]">Product Complete</span>
          <span className="text-[12px] font-bold text-[#219653]">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#219653] transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryCompletionStatus;
