import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import storeImg from '../../../assets/images/store.png';

const SAMPLE_DRIVERS = [
    { id: 'SD-2026-001', name: 'Ryan James', status: 'Online', initial: 'R' },
    { id: 'SD-2026-014', name: 'Karen Liu', status: 'Online', initial: 'K' },
    { id: 'SE-2026-007', name: 'Omar Wilson', status: 'Online', initial: 'O' },
    { id: 'SD-2026-003', name: 'Priya Bhatia', status: 'Offline', initial: 'P' },
    { id: 'SD-2026-022', name: 'Tom Morris', status: 'Offline', initial: 'T' },
];
const SAMPLE_STORES = [
    { id: "#SE-00001", name: "Forest Oasis", status: "Open" },
    { id: "#SE-8921", name: "Healthy Greens", status: "Open" },
    { id: "#SE-8921", name: "Bloom Essentials", status: "Closed" },
    { id: "#SE-8921", name: "Bloom Essentials", status: "Closed" },
];
const ZoneDetailsDrawer = ({ isOpen, onClose, selectedZone }) => {
    const [view, setView] = useState('details'); // 'details' or 'assign'
    const [activeTab, setActiveTab] = useState('Drivers');

    if (!isOpen || !selectedZone) return null;

    const renderDetailsView = () => (
        <>
            {/* Header */}
            <div className="p-6 pb-4 flex justify-between items-start bg-[#FAF8F8] border-b border-[#E8E8E8]">
                <div className="">
                    <h2 className="text-2xl font-semibold text-[#181211]">{selectedZone.city}</h2>
                    <p className="text-base font-medium text-[#475569] lowercase">{selectedZone.provinceName}</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors group"
                >
                    <Icon icon="lucide:x" width="24" className="text-[#111827] group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Postal Code Grid Area */}
            <div className="px-6 py-2 mb-3 mt-2">
                <div className="grid grid-cols-10 gap-1.5">
                    {[...selectedZone.postalCodes, ...selectedZone.postalCodes, ...selectedZone.postalCodes, ...selectedZone.postalCodes, ...selectedZone.postalCodes].slice(0, 30).map((code, i) => (
                        <span
                            key={i}
                            className={`flex items-center justify-center py-1.5 text-[10px] font-semibold rounded-sm transition-all ${i === 11
                                ? 'bg-[#FFEDEB]  text-[#FF4D4D]'
                                : 'bg-[#F8F8F8] text-[#475569]'
                                }`}
                        >
                            {code}
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Card Container for Tabs & Content */}
            <div className="mx-6 mb-6 flex-1 flex flex-col border border-[#E2E8F0] rounded-md overflow-hidden bg-white">
                {/* Tabs Navigation */}
                <div className="px-2 flex items-center border-b border-[#E2E8F0]">
                    <button
                        onClick={() => setActiveTab('Drivers')}
                        className={`px-6 py-4 text-sm font-semibold transition-all relative ${activeTab === 'Drivers' ? 'text-[#EA3D2A]' : 'text-[#181211]'
                            }`}
                    >
                        Drivers
                    </button>
                    <button
                        onClick={() => setActiveTab('Store')}
                        className={`px-6 py-4 text-sm font-semibold transition-all relative ${activeTab === 'Store' ? 'text-[#EA3D2A]' : 'text-[#181211]'
                            }`}
                    >
                        Store
                    </button>
                </div>

                {/* Scrollable List container */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {activeTab === 'Drivers' ? (
                        SAMPLE_DRIVERS.map((driver, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded-md border border-[#F6FBFF] bg-white transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full bg-[#FFF1F1] flex items-center justify-center text-[#F44336] font-bold text-lg">
                                        {driver.initial}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-sm font-semibold text-[#111827]">{driver.name}</h4>
                                        <p className="text-xs font-medium text-[#94A3B8] tracking-tight">{driver.id}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[11px] font-bold ${driver.status === 'Online'
                                    ? 'bg-[#CEF1E0] text-[#00B159]'
                                    : 'bg-[#FEECEB] text-[#F44336]'
                                    }`}>
                                    {driver.status}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 rounded-md border border-[#E2E8F0] custom-scrollbar">
                            {SAMPLE_STORES.map((store, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between pb-2 border-b-2 border-[#E2E8F0] last:border-b-0 bg-white"
                                >
                                    {/* Left Section */}
                                    <div className="flex items-center gap-3">
                                        {/* Store Image */}
                                        <img
                                            src={storeImg}
                                            alt="store"
                                            className="w-12 h-12 rounded-md object-cover"
                                        />

                                        {/* Store Info */}
                                        <div className="space-y-0.5">
                                            <h4 className="text-sm font-semibold text-[#111827]">
                                                {store.name}
                                            </h4>
                                            <p className="text-xs text-[#64748B] font-medium">
                                                {store.id}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${store.status === "Open"
                                            ? "bg-[#DCFCE7] text-[#16A34A]"
                                            : "bg-[#FEE2E2] text-[#DC2626]"
                                            }`}
                                    >
                                        {store.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    const renderAssignView = () => {
        const isAssign = view === 'assign';
        const title = isAssign ? 'Assign Driver' : 'Link Store';
        const listItems = isAssign ? [...SAMPLE_DRIVERS, ...SAMPLE_DRIVERS] : SAMPLE_STORES;

        return (
            <>
                {/* Header */}
                <div className="p-6 pb-4 flex justify-between items-start bg-[#FAF8F8] border-b border-[#E8E8E8]">
                    <h2 className="text-xl font-semibold text-[#181211]">{title}</h2>
                    <button
                        onClick={() => setView('details')}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Icon icon="lucide:x" width="24" className="text-[#111827]" />
                    </button>
                </div>

                <div className="p-6 flex-1 flex flex-col space-y-5 overflow-hidden">
                    {/* Form Group */}
                    <div className="mb-4">
                        <label className="text-sm font-semibold text-[#181211]">
                            Add Postal Codes<span className="text-[#EA3D2A] ml-0.5">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5 p-2 mt-2 border border-[#E2E8F0] rounded-md bg-[#F8F8F8] min-h-[45px]">
                            {['M1B', 'M1B', 'M1B', 'M1B'].map((code, index) => (
                                <span key={index} className="flex items-center gap-1.5 px-2 py-0.5 bg-[#E2E8F0] border border-[#F8F8F8] text-[#181211] text-[10px] font-semibold rounded ">
                                    {code}
                                    <Icon icon="lucide:x" width="14" className="cursor-pointer text-[#181211]" />
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Content List Container */}
                    <div className="flex-1 flex flex-col border border-[#E2E8F0] rounded-md overflow-hidden bg-white">
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {listItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0 px-4 transition-colors">
                                    <div className="flex items-center gap-3">
                                        {isAssign ? (
                                            <div className="w-8 h-8 rounded-full bg-[#FFF1F1] flex items-center justify-center text-[#EA3D2A] font-bold text-base">
                                                {item.initial}
                                            </div>
                                        ) : (
                                            <img
                                                src={storeImg}
                                                alt="store"
                                                className="w-8 h-8 rounded object-cover"
                                            />
                                        )}
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-semibold text-[#181211]">{item.name}</h4>
                                            <p className="text-xs font-medium mt-0.5 text-[#475569]">{item.id}</p>
                                        </div>
                                    </div>
                                    <button className={`px-5 py-2 rounded-md text-xs font-medium transition-all ${index === 1
                                        ? 'bg-[#E2E8F0] text-[#475569] border border-[#475569]'
                                        : 'bg-[#E93E2B] text-white shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33]'
                                        }`}>
                                        {index === 1 ? 'Remove' : 'Add'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#E2E8F0] flex gap-4">
                    <button
                        onClick={() => setView('details')}
                        className="flex-1 px-4 py-2.5 bg-white text-[#475569] rounded-lg text-sm font-semibold border border-[#E2E8F0] transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            // Handle save
                            setView('details');
                        }}
                        className="flex-1 px-4 py-2.5 bg-[#219653] text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_rgba(24,18,17,0.2),0px_10px_15px_-3px_rgba(24,18,17,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Icon icon="lucide:check" width="18" />
                        Save Changes
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/25 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div className="relative w-full max-w-[40%] h-full bg-white animate-in slide-in-from-right duration-300 flex flex-col font-manrope">
                {view === 'details' ? (
                    <>
                        {renderDetailsView()}
                        {/* Dynamic Footer based on tab */}
                        <div className="px-6 py-3 border-t border-[#F1F5F9]">
                            <button
                                onClick={() => setView(activeTab === 'Drivers' ? 'assign' : 'link')}
                                className="w-full py-3 flex items-center justify-center gap-2 bg-[#EA3D2A] text-white rounded-sm font-medium text-sm shadow-[0_8px_16px_rgba(234,61,42,0.15)] hover:opacity-90 transition-all active:scale-95"
                            >
                                <Icon icon="lucide:plus" width="18" />
                                <span>{activeTab === 'Drivers' ? 'Assign Driver' : 'Link Store'}</span>
                            </button>
                        </div>
                    </>
                ) : renderAssignView()}
            </div>
        </div>
    );
};

export default ZoneDetailsDrawer;

