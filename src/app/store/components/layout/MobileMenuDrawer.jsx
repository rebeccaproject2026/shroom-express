import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const MobileMenuDrawer = ({ isOpen, onClose, user, categories, logout }) => {
    const location = useLocation();

    // Solar-style icons to match the design's aesthetic
    const accountLinks = [
        { name: 'Profile Settings', icon: 'gg:profile', path: '/store/myaccount' },
        { name: 'Order History', icon: 'uil:invoice', className: 'scale-y-[-1]', path: '/store/myaccount?tab=orders' },
        { name: 'Help Center', icon: 'mdi:help-box-outline', path: '#' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] lg:hidden">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div className={`relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* 1. PROFILE SECTION - Matching padding and font weights */}
                <div className="pt-6 pb-6 px-6 border-b-2 border-[#E8E8E8]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#E93E2B] flex items-center justify-center text-white overflow-hidden shrink-0">
                            {user?.profileImage ? (
                                <img src={user.profileImage} alt="profile" className="w-full h-full object-cover" />
                            ) : (
                                <Icon icon="material-symbols:person-outline" width={26} />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[19px] font-bold text-[#181211] leading-tight">
                                {user?.name || (user?.firstName ? `${user.firstName} ${user.lastName}` : 'Frank Nava')}
                            </h3>
                            <span className="text-sm font-normal text-[#181211]">
                                {user?.membershipTier || 'Premium Member'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* SCROLLABLE AREA */}
                <div className="flex-1 overflow-y-auto no-scrollbar py-4 flex flex-col gap-3">

                    {/* 2. SHOP CATEGORIES SECTION */}
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-bold text-[#181211] uppercase tracking-wider leading-4 px-8 mb-0.5">SHOP CATEGORIES</h4>
                        <div className="px-3.5 flex flex-col gap-2">
                            {categories.map((cat, idx) => {
                                const categoryPath = cat.name === 'Stores'
                                    ? '/store/storeslists'
                                    : cat.name === 'Deals'
                                        ? '/store/deals'
                                        : `/store/category/${cat.name.toLowerCase().replace(' ', '-')}`;

                                const isActive = location.pathname === categoryPath || (cat.name === 'Magic Mushrooms' && (location.pathname === '/' || location.pathname === '/store'));

                                return (
                                    <Link
                                        key={idx}
                                        to={categoryPath}
                                        onClick={onClose}
                                        className={`flex items-center gap-4 px-5 py-3 rounded-lg font-bold transition-all duration-200 group ${isActive
                                            ? 'bg-[#E93E2B] text-white shadow-[0_8px_20px_rgba(233,62,43,0.3)]'
                                            : 'text-[#181211] hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`flex items-center justify-center shrink-0 ${isActive ? 'text-white' : 'text-[#181211]'}`}>
                                            <Icon icon={cat.icon} width={24} height={24} />
                                        </div>
                                        <span className="text-base">{cat.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. MY ACCOUNT SECTION */}
                    <div className="flex flex-col gap-2 border-t-2 border-[#E8E8E8] pt-5 mb-6">
                        {/* <h4 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider px-8 mb-4"></h4> */}
                        <h4 className="text-xs font-bold text-[#181211] uppercase tracking-wider leading-4 px-8 mb-0.5">MY ACCOUNT</h4>
                        <div className="px-3.5 flex flex-col gap-2">
                            {accountLinks.map((link, idx) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={idx}
                                        to={link.path}
                                        onClick={onClose}
                                        className={`flex items-center gap-4 px-5 py-2.5 rounded-2xl font-bold transition-all duration-200 ${isActive
                                            ? 'text-[#E93E2B]'
                                            : 'text-[#181211] hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`flex items-center justify-center shrink-0 ${isActive ? 'text-[#E93E2B]' : 'text-[#181211]'}`}>
                                            <Icon icon={link.icon} width={26} height={26} className={link.className} />
                                        </div>
                                        <span className="text-base">{link.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>


                    {/* 4. FOOTER SECTION - Aligning to very bottom */}
                    <div className="px-5 p-2 mt-auto border-t-2 border-[#E8E8E8] pb-32">
                        <button
                            onClick={() => { logout?.(); onClose(); }}
                            className="flex items-center gap-4 text-[#E93E2B] font-bold text-[17px] px-3.5 mt-3.5 mb-8 hover:opacity-80 transition-opacity"
                        >
                            <Icon icon="material-symbols:logout" width={28} height={28} />
                            Logout
                        </button>

                        <div className="flex items-center justify-between text-[10px] text-[#181211] font-normal px-1">
                            <span>© 2026 ShroomExpress</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                <span className="text-[#181211]">Server Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenuDrawer;
