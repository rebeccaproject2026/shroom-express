import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const SupplierSuccessState = ({ onReset }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[70vh] animate-in fade-in zoom-in duration-500">
            {/* Success Icon */}
            <div className="relative mb-6">
                <div className="flex items-center justify-center text-[#219653]">
                    <Icon icon="hugeicons:store-verified-02" width="50" />
                </div>
            </div>

            {/* Success Text */}
            <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-semibold text-[#181211]">Supplier Created Successfully!</h2>
                <p className="text-[15px] font-medium text-[#181211]">
                    <span className="text-[#181211] font-semibold">New Supplier(#SP-00045)</span> has been added and is pending approval.
                </p>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onReset}
                    className="px-6 py-2.5 bg-white border border-[#BDBDD2] rounded-md text-sm font-bold text-[#475569] shadow-sm hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
                >
                    Add Another Supplier
                </button>
                <button
                    onClick={() => navigate('/superadmin/suppliers/all')}
                    className="px-6 py-2.5 bg-[#EA3D2A] text-white rounded-md text-sm font-bold shadow-[0px_10px_15px_-3px_#EA3D2A55] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                >
                    View All Suppliers
                    <Icon icon="lucide:arrow-right" width="18" />
                </button>
            </div>
        </div>
    );
};

export default SupplierSuccessState;
