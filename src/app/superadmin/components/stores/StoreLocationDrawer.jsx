import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import ReusableTableSelect from '../common/ReusableTableSelect';
import ReusableSearchInput from '../common/ReusableSearchInput';

const MOCK_LOCATIONS = [
  { id: 1, city: 'Toronto', province: 'Ontario', address: '123 Main Street, Unit-4, Toronto, Ontario, Canada (M5V 2T6)', email: 'store@email.com', phone: '+1 (461) 000-0000', status: 'Suspended', color: 'bg-[#FFEDEB]' },
  { id: 2, city: 'Vancouver', province: 'British Columbia', address: '123 Main Street, Unit-4, Toronto, Ontario, Canada (M5V 2T6)', email: 'store@email.com', phone: '+1 (461) 000-0000', status: 'Active', color: 'bg-[#E6F9F0]' },
  { id: 3, city: 'Montreal', province: 'Quebec', address: '123 Main Street, Unit-4, Toronto, Ontario, Canada (M5V 2T6)', email: 'store@email.com', phone: '+1 (461) 000-0000', status: 'Active', color: 'bg-[#E6F9F0]' },
  { id: 4, city: 'Quebec City', province: 'Quebec', address: '123 Main Street, Unit-4, Toronto, Ontario, Canada (M5V 2T6)', email: 'store@email.com', phone: '+1 (461) 000-0000', status: 'Active', color: 'bg-[#E6F9F0]' },
  { id: 5, city: 'Ottawa', province: 'Ontario', address: '123 Main Street, Unit-4, Toronto, Ontario, Canada (M5V 2T6)', email: 'store@email.com', phone: '+1 (461) 000-0000', status: 'Active', color: 'bg-[#E6F9F0]' },
];

const LOCATION_OPTIONS = [
  { value: 'All Location', label: 'All Location' },
  { value: 'Alberta', label: 'Alberta' },
  { value: 'British Columbia', label: 'British Columbia' },
  { value: 'Manitoba', label: 'Manitoba' },
  { value: 'New Brunswick', label: 'New Brunswick' },
  { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
  { value: 'Nova Scotia', label: 'Nova Scotia' },
  { value: 'Northwest Territories', label: 'Northwest Territories' },
  { value: 'Nunavut', label: 'Nunavut' },
  { value: 'Ontario', label: 'Ontario' },
  { value: 'Prince Edward Island', label: 'Prince Edward Island' },
  { value: 'Quebec', label: 'Quebec' },
  { value: 'Saskatchewan', label: 'Saskatchewan' },
  { value: 'Yukon', label: 'Yukon' },
];

const STATUS_OPTIONS = [
  { value: 'All Status', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Suspended', label: 'Suspended' },
  { value: 'Draft', label: 'Draft' },
];

const StoreLocationDrawer = ({ isOpen, onClose, store }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Location");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openStatusId, setOpenStatusId] = useState(null);
  const [locations, setLocations] = useState(MOCK_LOCATIONS);

  const filteredLocations = useMemo(() => {
    let result = [...locations];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(loc =>
        loc.city.toLowerCase().includes(lowerSearch) ||
        loc.province.toLowerCase().includes(lowerSearch) ||
        loc.address.toLowerCase().includes(lowerSearch)
      );
    }

    if (locationFilter && locationFilter !== 'All Location') {
      result = result.filter(loc => loc.province === locationFilter);
    }

    if (statusFilter && statusFilter !== 'All Status') {
      result = result.filter(loc => loc.status === statusFilter);
    }

    return result;
  }, [locations, searchTerm, locationFilter, statusFilter]);

  if (!store) return null;

  const handleStatusChange = (locId, newStatus) => {
    setLocations(prev => prev.map(loc =>
      loc.id === locId ? { ...loc, status: newStatus } : loc
    ));
    setOpenStatusId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-[#219653]';
      case 'Pending': return 'text-[#FF9F40]';
      case 'Suspended': return 'text-[#EA3D2A]';
      case 'Draft': return 'text-[#94A3B8]';
      default: return 'text-[#181211]';
    }
  };

  const getStatusBorder = (status) => {
    switch (status) {
      case 'Active': return 'border-[#219653]';
      case 'Pending': return 'border-[#FF9F40]';
      case 'Suspended': return 'border-[#EA3D2A]';
      case 'Draft': return 'border-[#94A3B8]';
      default: return 'border-[#E2E8F0]';
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 " onClick={onClose} />

      {/* Drawer Panel */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-[40%] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header Section */}
        <div className="p-6 pb-4 bg-[#FAF8F8] border-b border-[#E8E8E8] flex items-center justify-between relative shrink-0 font-manrope">
          <button
            onClick={onClose}
            className="absolute right-5 top-7 p-1 hover:bg-gray-100 rounded-full transition-colors text-[#181211]"
          >
            <Icon icon="lucide:x" width="26" />
          </button>

          <div className="pr-10 space-y-1">
            <h2 className="text-xl font-semibold text-[#181211] leading-tight tracking-tight">{store.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-medium text-[#64748B]">{store.id}</span>
              <div className="flex items-center gap-1.5 ml-1">
                {store.delivery?.map((del, i) => (
                  <span key={i} className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${del.type === 'EXPRESS'
                    ? 'border-2 border-[#0066FF] bg-white text-[#0066FF]'
                    : 'border-2 border-[#94A3B8] bg-white text-[#475569]'
                    }`}>
                    {del.type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-2 p-4 pb-1">
          <ReusableSearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Store"
            className="w-full max-w-[52%]"
          />
          <ReusableTableSelect
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            options={LOCATION_OPTIONS}
            placeholder="All Location"
            className="w-38"
          />
          <ReusableTableSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={STATUS_OPTIONS}
            placeholder="All Status"
            className="w-38 shrink-0"
          />
        </div>

        {/* Body - Location List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white font-manrope custom-scrollbar">
          {filteredLocations.map((loc) => (
            <div key={loc.id} className="bg-white p-2 rounded-md border-2 border-[#D1D1D6] flex items-center gap-3">
              <div className={`w-11 h-11 ${loc.color} rounded-md flex items-center justify-center shrink-0 text-base font-bold text-[#181211]`}>
                {loc.id}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#181211] text-base leading-tight mb-1">{loc.city}, {loc.province}</h4>
                <div className="space-y-1">
                  <div className="flex items-start gap-1.5 text-xs text-[#475569] font-medium leading-tight">
                    <Icon icon="stash:pin-place-duotone" width="15" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                    <div className="flex items-center gap-1.5">
                      <Icon icon="carbon:email" width="15" />
                      <span>{loc.email}</span>
                    </div>
                    <span className="text-[#CBD5E1]">|</span>
                    <div className="flex items-center gap-1.5">
                      <Icon icon="proicons:call" width="15" />
                      <span>{loc.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Dropdown - Vertically Centered */}
              <div className="relative shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenStatusId(openStatusId === loc.id ? null : loc.id);
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full border-2 text-xs font-semibold transition-all ${getStatusColor(loc.status)} ${getStatusBorder(loc.status)} bg-white`}
                >
                  {loc.status}
                  <Icon icon={openStatusId === loc.id ? "lucide:chevron-up" : "lucide:chevron-down"} width="14" />
                </button>

                {openStatusId === loc.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpenStatusId(null)} />
                    <div className={`absolute right-0 mt-1 w-30 bg-white border-2 ${getStatusBorder(loc.status)} rounded-2xl shadow-xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
                      {['Active', 'Pending', 'Suspended', 'Draft'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(loc.id, status)}
                          className={`w-full text-left px-4 py-2 text-[15px] font-semibold hover:bg-gray-50 transition-colors ${getStatusColor(status)}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2E8F0] flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white text-[#475569] rounded-lg text-sm font-semibold border border-[#E2E8F0] transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4"
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-2.5 bg-[#219653] text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_rgba(24,18,17,0.2),0px_10px_15px_-3px_rgba(24,18,17,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Icon icon="lucide:check" width="18" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreLocationDrawer;
