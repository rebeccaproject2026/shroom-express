import React from 'react';
import { Icon } from '@iconify/react';

const RejectDriverModal = ({ isOpen, onClose, driver, onConfirm }) => {
  const [rejectionReason, setRejectionReason] = React.useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 transition-all">
      <div className="bg-white rounded-lg shadow-2xl max-w-[550px] w-full overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        <div className="p-5 space-y-4">
          <div className="text-center space-y-2 mb-2.5">
            <h2 className="text-xl font-semibold text-[#181211] mb-0">Are you sure?</h2>
            <p className="text-[#475569] text-sm font-medium leading-relaxed px-4">
              Are you sure you want to reject <span className="text-[#475569] font-semibold">{driver?.name}</span> (#{driver?.id})?
            </p>
          </div>

          <div className="space-y-1.5 mb-1">
            <label className="text-[13px] font-semibold text-[#181211] flex items-center gap-1">
              Reason <span className="text-[#EA3D2A]">*</span>
            </label>
            <textarea
              className="w-full h-11 p-4 px-5 bg-[#F8F8F8] rounded-md text-sm outline-none  transition-all font-medium placeholder:text-[#94A3B8] resize-none placeholder:text-[#94A3B8] placeholder:font-medium text-[#181211]"
              placeholder="e.g. Driver's license related documents were not provided..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <div className="px-1 py-2 flex gap-4 bg-white">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-semibold shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all active:scale-95 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm?.(rejectionReason);
                onClose();
              }}
              className="flex-1 px-5 py-2.5 bg-[#EA3D2A] text-white justify-center rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
            >
              Yes, Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectDriverModal;
