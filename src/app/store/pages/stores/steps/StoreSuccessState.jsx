import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const StoreSuccessState = ({ onReset }) => {
    const navigate = useNavigate();

    const storeId = localStorage.getItem('currentStoreId');
    const storeName = localStorage.getItem('currentStoreName') || "New Store";

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
                <h2 className="text-2xl font-semibold text-[#181211]">Store Created Successfully!</h2>
                <p className="text-[15px] font-medium text-[#181211]">
                    <span className="text-[#181211] font-semibold">{storeName}</span> has been added and is pending approval.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(`/store/storeslists/${storeId}`)}
                    className="px-4.5 py-2.5 bg-[#EA3D2A] text-white rounded-lg text-sm font-semibold shadow-[0px_4px_10px_rgba(234,61,42,0.3)] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                >
                    View Store
                    <Icon icon="lucide:arrow-right" width="18" />
                </button>
                <button
                    onClick={() => navigate('/inventory')}
                    className="px-4.5 py-2.5 bg-white border-2 border-[#BDBDD2] rounded-lg text-sm font-semibold text-[#475569] shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
                >
                    Add Inventory
                    <Icon icon="lucide:plus" width="18" />
                </button>
            </div>
        </div>
    );
};

export default StoreSuccessState;
