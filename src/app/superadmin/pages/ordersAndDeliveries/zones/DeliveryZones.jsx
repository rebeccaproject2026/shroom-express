import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import ReusableSearchInput from '../../../components/orders/../common/ReusableSearchInput';
import ReusableTableSelect from '../../../components/orders/../common/ReusableTableSelect';
import ZoneDetailsDrawer from './ZoneDetailsDrawer';
import AddNewAreaModal from './modals/AddNewAreaModal';

const PROVINCE_GROUPS = [
    {
        name: 'ONTARIO',
        count: 28,
        zones: [
            { city: 'Toronto', codes: 87, postalCodes: ['M1B', 'MIC', 'M1E', 'M1G', 'M1H', 'M1J', 'M1K', 'M1L'], drivers: 5, stores: 3 },
            { city: 'Mississauga', codes: 23, postalCodes: ['L4T', 'L4V', 'L4W', 'L4X', 'L4Y', 'L4Z', 'L5A', 'L5B'], drivers: 2, stores: 1 },
            { city: 'Brampton', codes: 10, postalCodes: ['L6P', 'L6R', 'L6S', 'L6T', 'L5V', 'L6W', 'L6X', 'L6Y'], drivers: 0, stores: 0 },
            { city: 'Oakville', codes: 5, postalCodes: ['L6H', 'L6J', 'L6K', 'L6L', 'L6M'], drivers: 0, stores: 0 },
            { city: 'Burlington', codes: 5, postalCodes: ['L7L', 'L7M', 'L7N', 'L7P', 'L7R'], drivers: 0, stores: 0 },
            { city: 'Hamilton', codes: 17, postalCodes: ['L8E', 'L8G', 'L8H', 'L8J', 'L8K', 'L8L', 'L8M', 'L8N'], drivers: 0, stores: 0 },
            { city: 'Vaughan', codes: 5, postalCodes: ['L4H', 'L4J', 'L4K', 'L4L', 'L5A'], drivers: 0, stores: 0 },
            { city: 'Markham', codes: 6, postalCodes: ['L3P', 'L3R', 'L3S', 'L3T', 'L6B', 'L6C'], drivers: 0, stores: 0 },
            { city: 'Richmond Hill', codes: 4, postalCodes: ['L4B', 'L4C', 'L4E', 'L4S'], drivers: 0, stores: 0 },
            { city: 'Pickering', codes: 4, postalCodes: ['L1V', 'L1W', 'L1X', 'L1Y'], drivers: 0, stores: 0 },
            { city: 'Ajax', codes: 3, postalCodes: ['L1S', 'L1T', 'L1Z'], drivers: 0, stores: 0 },
            { city: 'Whitby', codes: 4, postalCodes: ['L1M', 'L1N', 'L1P', 'L1R'], drivers: 0, stores: 0 },
            { city: 'Oshawa', codes: 5, postalCodes: ['L1G', 'L1H', 'L1J', 'L1K', 'L1L'], drivers: 0, stores: 0 },
            { city: 'Milton', codes: 1, postalCodes: ['L9T'], drivers: 0, stores: 0 },
            { city: 'Georgetown', codes: 1, postalCodes: ['L7G'], drivers: 0, stores: 0 },
            { city: 'Caledon', codes: 1, postalCodes: ['L7C'], drivers: 0, stores: 0 },
            { city: 'Newmarket', codes: 2, postalCodes: ['L3X', 'L3Y'], drivers: 0, stores: 0 },
            { city: 'Aurora', codes: 1, postalCodes: ['L4G'], drivers: 0, stores: 0 },
            { city: 'Stouffville', codes: 1, postalCodes: ['L4A'], drivers: 0, stores: 0 },
            { city: 'King City', codes: 1, postalCodes: ['L7B'], drivers: 0, stores: 0 },
            { city: 'Bradford', codes: 1, postalCodes: ['L3Z'], drivers: 0, stores: 0 },
            { city: 'Barrie', codes: 4, postalCodes: ['L4M', 'L4N', 'L9J', 'L9S'], drivers: 0, stores: 0 },
            { city: 'Guelph', codes: 6, postalCodes: ['N1C', 'N1E', 'N1G', 'N1H', 'N1K', 'N1L'], drivers: 0, stores: 0 },
            { city: 'Kitchener', codes: 11, postalCodes: ['N2A', 'N2B', 'N2C', 'N2E', 'N2G', 'N2H', 'N2M', 'N2N'], drivers: 0, stores: 0 },
            { city: 'Waterloo', codes: 5, postalCodes: ['N2J', 'N2K', 'N2L', 'N2T', 'N2V'], drivers: 0, stores: 0 },
            { city: 'Cambridge', codes: 5, postalCodes: ['N1P', 'N1R', 'N1S', 'N3C', 'N3H'], drivers: 0, stores: 0 },
            { city: 'London', codes: 17, postalCodes: ['N5V', 'N5W', 'N5X', 'N5Y', 'N5Z', 'N6A', 'N6B', 'N6C'], drivers: 0, stores: 0 },
            { city: 'Ottawa', codes: 39, postalCodes: ['K1A', 'K1B', 'K1C', 'K1E', 'K1G', 'K1H', 'K1J', 'K1K'], drivers: 1, stores: 1 },
        ]
    },
    {
        name: 'QUEBEC',
        count: 2,
        zones: [
            { city: 'Montreal', codes: 59, postalCodes: ['H1A', 'H1B', 'H1C', 'H1E', 'H1G', 'H1H', 'H1J', 'H1K'], drivers: 3, stores: 2 },
            { city: 'Quebec City', codes: 19, postalCodes: ['G1A', 'G1B', 'G1C', 'G1E', 'G1G', 'G1H', 'G1J', 'G1K'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'BRITISH COLUMBIA',
        count: 4,
        zones: [
            { city: 'Vancouver', codes: 29, postalCodes: ['V5K', 'V5L', 'V5M', 'V5N', 'V5P', 'V5R', 'V5S', 'V5T'], drivers: 2, stores: 1 },
            { city: 'Surrey', codes: 8, postalCodes: ['V3R', 'V3S', 'V3T', 'V3V', 'V3W', 'V3X', 'V3Y', 'V4A'], drivers: 0, stores: 0 },
            { city: 'Burnaby', codes: 6, postalCodes: ['V5N', 'V5J', 'V5K', 'V5A', 'V5B', 'V5C'], drivers: 0, stores: 0 },
            { city: 'Richmond', codes: 8, postalCodes: ['V5V', 'V5W', 'V5X', 'V5Y', 'V7A', 'V7B', 'V7C', 'V7E'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'ALBERTA',
        count: 2,
        zones: [
            { city: 'Calgary', codes: 33, postalCodes: ['T1Y', 'T2A', 'T2B', 'T2C', 'T2E', 'T2G', 'T2H', 'T2J'], drivers: 1, stores: 1 },
            { city: 'Edmonton', codes: 37, postalCodes: ['T5A', 'T5B', 'T5C', 'T5E', 'T5G', 'T5H', 'T5J', 'T5K'], drivers: 2, stores: 1 },
        ]
    },
    {
        name: 'MANITOBA',
        count: 1,
        zones: [
            { city: 'Winnipeg', codes: 33, postalCodes: ['R2C', 'R2G', 'R2H', 'R2J', 'R2K', 'R2L', 'R2M', 'R2N'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'SASKATCHEWAN',
        count: 2,
        zones: [
            { city: 'Regina', codes: 8, postalCodes: ['S4N', 'S4P', 'S4R', 'S4S', 'S4T', 'S4V', 'S4W', 'S4X'], drivers: 0, stores: 0 },
            { city: 'Saskatoon', codes: 10, postalCodes: ['S7H', 'S7J', 'S7K', 'S7L', 'S7M', 'S7N', 'S7P', 'S7R'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'NOVA SCOTIA',
        count: 1,
        zones: [
            { city: 'Halifax', codes: 12, postalCodes: ['B3H', 'B3J', 'B3K', 'B3L', 'B3M', 'B3N', 'B3P', 'B3R'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'NEWFOUNDLAND AND LABRADOR',
        count: 1,
        zones: [
            { city: 'St. John\'s', codes: 14, postalCodes: ['A1A', 'A1B', 'A1C', 'A1E', 'A1G', 'A1H', 'A1K', 'A1L'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'NEW BRUNSWICK',
        count: 1,
        zones: [
            { city: 'Fredericton', codes: 6, postalCodes: ['E3A', 'E3B', 'E3C', 'E3E', 'E3G', 'E3L'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'PRINCE EDWARD ISLAND',
        count: 1,
        zones: [
            { city: 'Charlottetown', codes: 3, postalCodes: ['C1A', 'C1B', 'C1C'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'YUKON',
        count: 1,
        zones: [
            { city: 'Whitehorse', codes: 1, postalCodes: ['Y1A'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'NORTHWEST TERRITORIES',
        count: 1,
        zones: [
            { city: 'Yellowknife', codes: 1, postalCodes: ['X1A'], drivers: 0, stores: 0 },
        ]
    },
    {
        name: 'NUNAVUT',
        count: 1,
        zones: [
            { city: 'Iqaluit', codes: 1, postalCodes: ['X0A'], drivers: 0, stores: 0 },
        ]
    }
];

const DeliveryZones = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [province, setProvince] = useState('All Provinces');
    const [selectedZone, setSelectedZone] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleZoneClick = (zone, provinceName) => {
        setSelectedZone({ ...zone, provinceName });
        setIsDrawerOpen(true);
    };

    const SAMPLE_DRIVERS = [
        { id: 'SD-2026-001', name: 'Ryan James', status: 'Online', initial: 'R' },
        { id: 'SD-2026-014', name: 'Karen Liu', status: 'Online', initial: 'K' },
        { id: 'SE-2026-007', name: 'Omar Wilson', status: 'Online', initial: 'O' },
        { id: 'SD-2026-003', name: 'Priya Bhatia', status: 'Offline', initial: 'P' },
        { id: 'SD-2026-022', name: 'Tom Morris', status: 'Offline', initial: 'T' },
    ];

    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Delivery Zones" }
    ];

    return (
        <div className="animate-in fade-in duration-700 font-manrope pb-10 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Breadcrumbs items={breadcrumbItems} />
                    <h1 className="text-xl font-bold text-[#181211]">Delivery Zones</h1>
                    <p className="text-sm font-medium text-[#475569]">46 service areas across Canada — click any area to manage drivers and stores.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#EA3D2A] text-white px-4 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 group"
                >
                    <Icon icon="lucide:plus" width="18" />
                    <span>Add New Area</span>
                </button>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <ReusableSearchInput
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search city or postal code..."
                        className="w-full sm:w-80 bg-white rounded-lg"
                    />
                    <ReusableTableSelect
                        options={[{ value: 'All Provinces', label: 'All Provinces' }]}
                        value={province}
                        onChange={(val) => setProvince(val)}
                        className="w-44"
                    />
                </div>
                <div className="text-sm font-medium text-[#475569]">
                    Showing <span className="font-bold text-[#181211]">46 areas</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
                {PROVINCE_GROUPS.map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                                <h2 className={`text-sm font-semibold uppercase ${group.name === 'ONTARIO' ? 'text-[#EA3D2A]' : 'text-[#181211]'}`}>{group.name}</h2>
                                <span className="text-xs font-medium text-[#475569]">{group.count} areas</span>
                            </div>
                            <div className="h-[1px] bg-[#E2E8F0] flex-1"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {group.zones.map((zone, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleZoneClick(zone, group.name)}
                                    className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col p-4"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-[15px] font-bold text-[#181211]">{zone.city}</h3>
                                        <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#FFEDEB] text-[#EA3D2A]`}>
                                            {zone.codes} codes
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mb-4 flex-1 items-start">
                                        {zone.postalCodes.map((code, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-[#F8FAFC] border border-[#F8F8F8] text-[#475569] text-[10px] font-semibold rounded">
                                                {code}
                                            </span>
                                        ))}
                                        {zone.codes > zone.postalCodes.length && (
                                            <span className="text-[11px] font-medium text-[#969696] pt-0.5">
                                                +{zone.codes - zone.postalCodes.length} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="pt-1 border-t border-[#F1F5F9] flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xs font-semibold text-[#181211]">{zone.drivers}</span>
                                                <span className="text-xs font-medium text-[#475569]">drivers</span>
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xs font-semibold text-[#181211]">{zone.stores}</span>
                                                <span className="text-xs font-medium text-[#475569]">stores</span>
                                            </div>
                                        </div>
                                        <Icon icon="lucide:chevron-right" width="16" className="text-[#181211]  transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <ZoneDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                selectedZone={selectedZone}
            />

            <AddNewAreaModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};


export default DeliveryZones;
