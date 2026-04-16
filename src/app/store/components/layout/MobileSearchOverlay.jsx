import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

const MobileSearchOverlay = ({ isOpen, onClose, searchQuery, setSearchQuery, searchResults, handleSelect }) => {
    const navigate = useNavigate();
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('shroom_recent_searches');
        return saved ? JSON.parse(saved) : ['Magic Mushrooms', 'Microdose', 'Edibles'];
    });

    useEffect(() => {
        localStorage.setItem('shroom_recent_searches', JSON.stringify(recentSearches));
    }, [recentSearches]);

    const trendingSearches = [
        { name: 'Magic Mushrooms', icon: "hugeicons:mushroom" },
        { name: 'Microdose', icon: "streamline-plump:tablet-capsule" },
        { name: 'Edibles', icon: "hugeicons:mushroom-01" },
    ];

    const exploreCategories = [
        { name: 'Magic Mushrooms', img: 'https://images.unsplash.com/photo-1594236113521-4eaecd44d852?auto=format&fit=crop&q=80&w=400', color: 'bg-red-900/40', path: '/store/category/magic-mushrooms' },
        { name: 'Microdose', img: 'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?auto=format&fit=crop&q=80&w=400', color: 'bg-blue-900/40', path: '/store/category/microdose' },
        { name: 'Edibles', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400', color: 'bg-green-900/40', path: '/store/category/edibles' },
    ];

    const clearAllRecent = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setRecentSearches([]);
    };

    const deleteRecentItem = (e, itemToDelete) => {
        e.preventDefault();
        e.stopPropagation();
        setRecentSearches(recentSearches.filter(item => item !== itemToDelete));
    };

    const addToRecent = (term) => {
        if (!term || term.trim() === '') return;
        setRecentSearches(prev => {
            const filtered = prev.filter(item => item.toLowerCase() !== term.trim().toLowerCase());
            return [term.trim(), ...filtered].slice(0, 5);
        });
    };

    const handleSearchClick = (term) => {
        if (!term) return;
        
        // Reset and close overlay
        setSearchQuery(term);
        addToRecent(term);
        onClose();

        // Redirect to category page
        const slug = term.toLowerCase().replace(/\s+/g, '-');
        navigate(`/store/category/${slug}`);
    };

    const onResultClick = (res) => {
        if (searchQuery.trim()) addToRecent(searchQuery);
        handleSelect(res);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1100] bg-white lg:hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
            {/* Top Search Bar */}
            <div className="px-6 pt-8 pb-6 flex items-center gap-4 border-b border-[#F1F5F9]">
                <div className="flex-1 relative">
                    <div 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#181211] cursor-pointer z-10"
                        onClick={() => handleSearchClick(searchQuery)}
                    >
                        <Icon icon="material-symbols:search-rounded" width={22} />
                    </div>
                    <input
                        id="mobile-search-input"
                        type="text"
                        placeholder="Search Products, Stores"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick(searchQuery)}
                        className="w-full bg-[#E8E8E880] border-none rounded-2xl py-3.5 pl-12 pr-12 text-[16px] font-medium text-[#181211] outline-none placeholder-[#181211]"
                        autoFocus
                    />
                    {searchQuery && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery('');
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] p-1 cursor-pointer hover:text-[#E93E2B] z-10"
                        >
                            <Icon icon="mdi:close-circle" width={20} />
                        </button>
                    )}
                </div>
                <button onClick={onClose} className="text-[#E93E2B] font-bold text-[16px] px-2">
                    Cancel
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                {searchQuery.trim().length > 1 ? (
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[11px] font-extrabold text-[#94A3B8] uppercase tracking-wider">Search Results</h4>
                            <span className="text-[11px] font-bold text-[#E93E2B]">{searchResults.length} Found</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            {searchResults.map((res, i) => (
                                <button
                                    key={i}
                                    onClick={() => onResultClick(res)}
                                    className="flex items-center gap-4 py-3 text-left active:bg-gray-50 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                                        {res.image ? (
                                            <img src={res.image} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <Icon icon="solar:magnifer-linear" className="text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-[#181211] text-[15px] truncate">{res.name}</p>
                                        <p className="text-[11px] text-[#94A3B8] font-bold uppercase tracking-widest">{res.type}</p>
                                    </div>
                                    <Icon icon="mdi:chevron-right" className="text-[#CBD5E1]" />
                                </button>
                            ))}
                        </div>
                        {searchResults.length > 0 && (
                            <button 
                                onClick={() => handleSearchClick(searchQuery)}
                                className="w-full text-center py-4 text-[#E93E2B] font-bold text-[14px] border-t border-gray-50 mt-4 flex items-center justify-center gap-2"
                            >
                                View all results for "{searchQuery}"
                                <Icon icon="mdi:chevron-right" width={18} />
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <div className="px-6 py-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-bold text-[#181211] tracking-tight">Recent Searches</h4>
                                    <button
                                        onClick={clearAllRecent}
                                        className="text-xs font-semibold text-[#181211] hover:text-[#E93E2B] p-2"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    {recentSearches.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between py-2.5 border-b border-[#E8E8E8] active:opacity-60"
                                        >
                                            <Link
                                                to={`/store/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                onClick={() => {
                                                    setSearchQuery(item);
                                                    addToRecent(item);
                                                    onClose();
                                                }}
                                                className="flex-1 flex items-center gap-4 cursor-pointer"
                                            >
                                                <Icon icon="solar:history-linear" width={22} className="text-[#94A3B8]" />
                                                <span className="text-base font-medium text-[#181211]">{item}</span>
                                            </Link>
                                            <button
                                                onClick={(e) => deleteRecentItem(e, item)}
                                                className="p-2 hover:bg-gray-50 rounded-md shrink-0"
                                            >
                                                <Icon icon="mdi:close" width={18} className="text-[#CBD5E1]" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trending Searches */}
                        <div className="px-6 py-4 font-sans">
                            <h4 className="text-lg font-bold text-[#181211] tracking-tight mb-4">Trending Searches</h4>
                            <div className="flex flex-wrap gap-2.5">
                                {trendingSearches.map((tag, idx) => (
                                    <Link
                                        key={idx}
                                        to={`/store/category/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        onClick={() => {
                                            setSearchQuery(tag.name);
                                            addToRecent(tag.name);
                                            onClose();
                                        }}
                                        className="flex items-center gap-2 px-4 py-3 bg-[#FFF0EE] rounded-full text-[#E93E2B] font-bold text-[14px] hover:bg-red-100 transition-all active:scale-95"
                                    >
                                        {tag.icon && <Icon icon={tag.icon} width={16} />}
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Explore Categories */}
                        <div className="px-6 mt-2">
                            <h4 className="text-lg font-bold text-[#181211] tracking-tight mb-3.5">Explore Categories</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {exploreCategories.map((cat, idx) => (
                                    <Link
                                        key={idx}
                                        to={cat.path}
                                        onClick={onClose}
                                        className="relative aspect-[16/10] rounded-2xl overflow-hidden group active:scale-95 transition-transform"
                                    >
                                        <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                                        <div className={`absolute inset-0 ${cat.color} flex items-center justify-center backdrop-blur-[2px]`}>
                                            <span className="text-white font-extrabold text-[17px] tracking-wide drop-shadow-lg text-center px-2">{cat.name}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};

export default MobileSearchOverlay;
