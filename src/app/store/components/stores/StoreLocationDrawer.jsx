import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

const StoreLocationDrawer = ({ open, onClose, locations, onSelectLocation, selectedIndex }) => {
    // Prevent background scrolling
    useEffect(() => {
        if (open) {
            document.body.style.setProperty("overflow", "hidden", "important");
            document.documentElement.style.setProperty("overflow", "hidden", "important");
        } else {
            document.body.style.removeProperty("overflow");
            document.documentElement.style.removeProperty("overflow");
        }
        return () => {
            document.body.style.removeProperty("overflow");
            document.documentElement.style.removeProperty("overflow");
        };
    }, [open]);

    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-[#0F3540]/60 z-[9998] transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E8] shrink-0">
                    <h2 className="text-lg font-bold text-[#181211]">Store Details</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E7EB] rounded-full transition-colors"
                    >
                        <Icon icon="heroicons:x-mark-20-solid" width={20} className="text-[#6B7280]" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {locations && locations.map((location, idx) => (
                        <div
                            key={idx}
                            className={`p-5 rounded-2xl border transition-all ${selectedIndex === idx ? 'border-[#E93E2B] bg-white' : 'border-[#E8E8E8] bg-white'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-[#181211] text-lg">{location.storeName || location.name || "Location"}</h3>
                                <span className="bg-[#E93E2B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {location.distance || "1.2 miles"}
                                </span>
                            </div>
                            
                            <p className="text-sm text-[#64748B] mb-2 leading-tight">
                                {location.storeAddress || location.address || "123 Irving St. San Francisco, CA"}
                            </p>
                            
                            <div className="flex items-center gap-1.5 text-[13px] text-[#219653] font-medium mb-5">
                                <Icon icon="ph:clock" width={16} />
                                <span>Open Until 9PM</span>
                            </div>

                            <button
                                onClick={() => onSelectLocation(idx)}
                                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all border ${
                                    selectedIndex === idx 
                                    ? 'bg-[#FEF3F2] border-[#E93E2B] text-[#E93E2B]' 
                                    : 'bg-white border-[#E93E2B] text-[#E93E2B] hover:bg-gray-50'
                                }`}
                            >
                                {selectedIndex === idx ? 'Selected Store' : 'Select Store'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 4px; }
            `}} />
        </>
    );
};

export default StoreLocationDrawer;
