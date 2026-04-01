import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const MobileLocationOverlay = ({ isOpen, onClose, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('shroom_recent_locations');
        return saved ? JSON.parse(saved) : ['Vancouver - Toronto', 'Montreal - Toronto'];
    });

    useEffect(() => {
        localStorage.setItem('shroom_recent_locations', JSON.stringify(recentSearches));
    }, [recentSearches]);

    const handleSearchClick = (term) => {
        if (!term || term.trim() === '') return;
        addToRecent(term);
        onSelect?.(term);
        onClose();
    };

    const addToRecent = (term) => {
        setRecentSearches(prev => {
            const filtered = prev.filter(item => item.toLowerCase() !== term.trim().toLowerCase());
            return [term.trim(), ...filtered].slice(0, 5);
        });
    };

    const clearAllRecent = () => setRecentSearches([]);
    const deleteRecentItem = (itemToDelete) => {
        setRecentSearches(recentSearches.filter(item => item !== itemToDelete));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1200] bg-white lg:hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
            {/* Top Search Bar (Matching Image Exactly) */}
            <div className="px-5 pt-8 pb-5 flex items-center gap-4">
                <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#181211]">
                        <Icon icon="material-symbols:search-rounded" width={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Toronto Center"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick(searchQuery)}
                        className="w-full bg-[#F2F2F2] border-none rounded-xl py-3 pl-12 pr-4 text-[16px] font-medium text-[#181211] outline-none placeholder-[#181211]/60"
                        autoFocus
                    />
                </div>
                <button onClick={onClose} className="text-[#E93E2B] font-bold text-[16px] px-1 active:scale-95 transition-transform">
                    Cancel
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                    <div className="px-5 mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[19px] font-bold text-[#181211] tracking-tight">Recent Searches</h4>
                            <button
                                onClick={clearAllRecent}
                                className="text-[13px] font-medium text-[#181211] hover:text-[#E93E2B] px-1"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-col">
                            {recentSearches.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between py-4 border-b border-[#F2F2F2] active:opacity-60 transition-opacity"
                                >
                                    <div
                                        onClick={() => handleSearchClick(item)}
                                        className="flex-1 flex items-center gap-4 cursor-pointer"
                                    >
                                        <Icon icon="solar:history-linear" width={22} className="text-[#CBD5E1]" />
                                        <span className="text-[17px] font-medium text-[#181211]">{item}</span>
                                    </div>
                                    <button
                                        onClick={() => deleteRecentItem(item)}
                                        className="p-1 hover:bg-gray-50 rounded-md shrink-0"
                                    >
                                        <Icon icon="mdi:close" width={18} className="text-[#CBD5E1]" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileLocationOverlay;
