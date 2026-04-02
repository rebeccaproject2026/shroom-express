import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Search,
} from 'lucide-react';
import { Icon } from '@iconify/react';
import MobileMenuDrawer from './MobileMenuDrawer';
import MobileSearchOverlay from './MobileSearchOverlay';
import shroomLogo from "../../assets/images/Logo.png";
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import creativeBoostImg from "../../assets/images/creativeboost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
import deepJourneyImg from "../../assets/images/deepjourney.png";
import { allProducts } from '../../data/productsData';
import { useCategory } from '../../context/CategoryContext';
import { useAuth } from '../../context/AuthContext';

const StickyHeader = ({ cartCount = 0, onCartClick, wishlistCount = 0 }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/store' || location.pathname === '/store/';
    const { selectedEffect, toggleEffect, deliveryMethod, setDeliveryMethod } = useCategory();
    const { user, logout } = useAuth();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const allStores = [
        { id: 1, name: "micro zoomiez", type: 'store' },
        { id: 2, name: "The Mushroom", type: 'store' },
        { id: 3, name: "Psilovibin", type: 'store' },
        { id: 4, name: "Shroom Express", type: 'store' },
        { id: 5, name: "Shroom For Sale", type: 'store' },
        { id: 6, name: "Magic Mushroom Delivery", type: 'store' },
        { id: 7, name: "Planet 51", type: 'store' },
        { id: 8, name: "Toronto Magic Store", type: 'store' },
        { id: 9, name: "Magic Mushroom Danforth", type: 'store' },
    ];

    const searchResults = searchQuery.trim().length > 1 ? [
        ...allProducts
            .filter(p => (p.title || p.name || '').toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 4)
            .map(p => ({ id: p.id, name: p.title || p.name, image: p.image, type: 'product', vendor: p.vendor })),
        ...allStores
            .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 3),
    ] : [];

    const handleSelect = (result) => {
        setSearchQuery('');
        setSearchOpen(false);
        if (result.type === 'product') navigate(`/store/product/${result.id}`);
        else navigate(`/store/storeslists/${result.id}`);
    };

    // Close on outside click (Desktop only)
    useEffect(() => {
        const handler = (e) => {
            if (window.innerWidth >= 1024 && searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const categories = [
        { name: 'Magic Mushrooms', icon: "hugeicons:mushroom" },
        { name: 'Microdose', icon: "streamline-plump:tablet-capsule" },
        { name: 'Edibles', icon: "hugeicons:mushroom-01" },
        { name: 'Deals', icon: "streamline-plump:leaf-protect" },
        { name: 'Stores', icon: "streamline:shopping-store-2-store-shop-shops-stores" },
    ];

    const categoryIcons = [
        { name: 'Micro dosing', img: microDosingImg },
        { name: 'Beginner Friendly', img: beginnerFriendlyImg },
        { name: 'High Potency', img: highPotencyImg },
        { name: 'Creative Boost', img: creativeBoostImg },
        { name: 'Relax & Chill', img: relaxChillImg },
        { name: 'Visual Experience', img: visualExperienceImg },
        { name: 'Focus & Clarity', img: focusClarityImg },
        { name: 'Deep Journey', img: deepJourneyImg },
    ];

    return (
        <header className={`${isHomePage ? 'relative' : 'fixed top-0 left-0 right-0'} ${searchOpen || mobileMenuOpen ? 'z-[2000]' : 'z-[100]'} bg-white  flex flex-col w-full font-sans`}>
            {/* SECTION 1: Top Red Bar (Enhanced with Scroll for Small Screens) */}
            <div className="bg-[var(--store-primary)] text-white text-xs sm:text-sm py-2 px-4 flex justify-center sm:justify-center items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth">
                <Link to="/store/create-store" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity font-medium shrink-0">
                    <Icon icon="clarity:store-line" width={16} height={16} />
                    <span>Open Store</span>
                </Link>
                <div className="w-px h-3.5 sm:h-5 bg-[#FFFFFFCC] shrink-0"></div>
                <Link to="" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity font-medium shrink-0">
                    <Icon icon="fluent-mdl2:car" width={16} height={16} />
                    <span>Become Driver</span>
                </Link>
                <div className="w-px h-3.5 sm:h-5 bg-[#FFFFFFCC] shrink-0"></div>
                {user ? (
                    <div className="relative shrink-0" ref={profileMenuRef}>
                        <button
                            onClick={() => setProfileMenuOpen(prev => !prev)}
                            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity font-medium"
                        >
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="max-w-[80px] sm:max-w-none truncate">{user.name}</span>
                            <Icon icon={profileMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down"} width={16} height={16} />
                        </button>

                        {profileMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-[0px_8px_32px_rgba(0,0,0,0.12)] border border-[#F1F5F9] z-[200] overflow-hidden whitespace-normal">
                                <div className="px-4 py-3 border-b border-[#F1F5F9]">
                                    <p className="text-sm font-bold text-[#181211] truncate">{user.name}</p>
                                    <p className="text-xs text-[#94A3B8] truncate">{user.email}</p>
                                </div>
                                {[
                                    { label: "My Account", icon: "hugeicons:user-02", path: "/store/myaccount?tab=profile" },
                                    { label: "My Orders", icon: "mdi:package-variant-closed", path: "/store/myaccount?tab=orders" },
                                    { label: "Wishlist", icon: "ion:heart-outline", path: "/store/myaccount?tab=wishlist" },
                                    { label: "Payment Method", icon: "streamline-plump:payment-recieve-7", path: "/store/myaccount?tab=payment" },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => { setProfileMenuOpen(false); navigate(item.path); }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#181211] hover:bg-[#FAF8F5] transition-colors ${location.pathname === item.path ? 'bg-[#FFF0EE] text-[#E93E2B]' : ''}`}
                                    >
                                        <Icon icon={item.icon} width={17} height={17} className={location.pathname === item.path ? 'text-[#E93E2B]' : 'text-[#64748B]'} />
                                        {item.label}
                                    </button>
                                ))}
                                <div className="border-t border-[#F1F5F9]">
                                    <button
                                        onClick={() => { logout(); setProfileMenuOpen(false); navigate('/store'); }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#E93E2B] hover:bg-[#FFF0EE] transition-colors"
                                    >
                                        <Icon icon="hugeicons:logout-02" width={17} height={17} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/store/login" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity font-medium shrink-0">
                        <Icon icon="hugeicons:user-02" width={17} height={17} />
                        <span>Login / Register</span>
                    </Link>
                )}
            </div>

            {/* SECTION 2: Main Header */}
            <div className="w-full px-3 sm:px-4 md:px-4 lg:px-4 xl:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2 lg:gap-5 relative h-14 sm:h-20">
                {/* Mobile: Left side icons (Menu & Search) */}
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden z-10">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-1 flex items-center justify-center cursor-pointer text-[#181211] hover:text-[#E93E2B]"
                    >
                        <Icon icon="mdi:menu" width={30} height={30} />
                    </button>
                    <button
                        onClick={() => { setSearchOpen(true); setTimeout(() => document.getElementById('mobile-search-input')?.focus(), 100); }}
                        className="p-1 flex items-center justify-center cursor-pointer text-[#181211] hover:text-[#E93E2B]"
                    >
                        <Icon icon="mdi:magnify" width={30} height={30} />
                    </button>
                </div>

                {/* Left/Center: Logo and Desktop Toggle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:left-auto lg:top-auto lg:translate-x-0 lg:translate-y-0 lg:flex lg:flex-1 lg:items-center lg:justify-start gap-2 xl:gap-5">
                    <Link to="/store" className="flex items-center justify-center shrink-0">
                        <img
                            src={shroomLogo}
                            alt="shroomLogo"
                            className="h-10 sm:h-12 w-auto cursor-pointer"
                        />
                    </Link>

                    {/* Delivery Toggle - Only on desktop */}
                    <div className="hidden lg:flex items-center bg-white border border-[#D1D5DB] rounded-full p-0.5 shadow-sm shrink-0">
                        <button
                            onClick={() => setDeliveryMethod('delivery')}
                            className={`flex items-center gap-1.5 xl:gap-2 px-2 xl:px-2.5 py-1.5 rounded-full text-[14px] xl:text-[15px] font-semibold transition-colors cursor-pointer ${deliveryMethod === 'delivery'
                                ? 'bg-[var(--store-primary)] text-white shadow-md'
                                : 'text-[#222222] '
                                }`}
                        >
                            <Icon icon="hugeicons:truck-delivery" width={22} height={22} className="xl:w-6 xl:h-6" />
                            <span>Delivery</span>
                        </button>
                        <button
                            onClick={() => setDeliveryMethod('shipping')}
                            className={`flex items-center gap-1.5 xl:gap-2 px-2 xl:px-2 cursor-pointer py-1.5 rounded-full text-[14px] xl:text-[15px] font-semibold transition-colors ${deliveryMethod === 'shipping'
                                ? 'bg-[var(--store-primary)] text-white shadow-md'
                                : 'text-[#222222]'
                                }`}
                        >
                            <Icon icon="stash:pin-place-duotone" width={23} height={23} className="xl:w-[25px] xl:h-[25px]" />
                            <span>Shipping</span>
                        </button>
                    </div>
                </div>

                {/* Center: Search Bar (Desktop only) */}
                <div className="hidden lg:block w-full lg:max-w-[25rem] xl:max-w-[40rem] lg:px-2 xl:px-4" ref={searchRef}>
                    <div className="relative">
                        {/* Search Input */}
                        <div className="relative flex items-center w-full h-11 rounded-full border border-gray-300 bg-white overflow-hidden transition-all shadow-sm focus-within:border-[#E93E2B]">
                            <div className="pl-5 text-[#636363]">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Products, Stores"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                                onFocus={() => setSearchOpen(true)}
                                className="w-full h-full px-4 text-sm text-gray-700 outline-none placeholder-[#636363] placeholder:text-center placeholder:leading-4"
                            />
                            {searchQuery && (
                                <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }} className="pr-4 text-[#999] hover:text-[#E93E2B] cursor-pointer">
                                    <Icon icon="mdi:close" width={18} />
                                </button>
                            )}
                        </div>

                        {/* Search results dropdown for desktop */}
                        {searchOpen && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#F1F5F9] z-[200] overflow-hidden">
                                {searchResults.filter(r => r.type === 'product').length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase px-4 pt-3 pb-1">Products</p>
                                        {searchResults.filter(r => r.type === 'product').map(r => (
                                            <div
                                                key={`p-${r.id}`}
                                                onClick={() => handleSelect(r)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFF5F4] cursor-pointer transition-colors"
                                            >
                                                <div className="w-9 h-9 rounded-lg bg-[#F5F0EB] overflow-hidden shrink-0">
                                                    <img src={r.image} alt={r.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-[#181211] truncate">{r.name}</p>
                                                    <p className="text-xs text-[#94A3B8] truncate">{r.vendor}</p>
                                                </div>
                                                <Icon icon="mdi:arrow-top-left" width={14} className="text-[#BDBDBD] ml-auto shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {searchResults.filter(r => r.type === 'store').length > 0 && (
                                    <div className="border-t border-[#F1F5F9]">
                                        <p className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase px-4 pt-3 pb-1">Stores</p>
                                        {searchResults.filter(r => r.type === 'store').map(r => (
                                            <div
                                                key={`s-${r.id}`}
                                                onClick={() => handleSelect(r)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFF5F4] cursor-pointer transition-colors"
                                            >
                                                <div className="w-9 h-9 rounded-lg bg-[#F5F0EB] flex items-center justify-center shrink-0">
                                                    <Icon icon="streamline:shopping-store-2-store-shop-shops-stores" width={18} className="text-[#E93E2B]" />
                                                </div>
                                                <p className="text-sm font-semibold text-[#181211] truncate flex-1">{r.name}</p>
                                                <Icon icon="mdi:arrow-top-left" width={14} className="text-[#BDBDBD] shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="px-4 py-2.5 border-t border-[#F1F5F9]">
                                    <button
                                        onClick={() => { navigate('/store/storeslists'); setSearchOpen(false); }}
                                        className="text-xs font-semibold text-[#E93E2B] hover:underline"
                                    >
                                        View all results for "{searchQuery}"
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Wishlist & Cart */}
                <div className="flex items-center justify-end gap-3 md:gap-5 lg:gap-8 xl:gap-8 2xl:gap-12 shrink-0 z-10 lg:flex-1">
                    <button
                        onClick={() => navigate('/store/myaccount?tab=wishlist')}
                        className="flex items-center cursor-pointer gap-2 text-[#181211] hover:text-[#E93E2B] transition-colors relative"
                    >
                        <div className="relative">
                            <Icon icon="mdi:heart-outline" width={26} height={26} className="xl:w-[30px] xl:h-[30px]" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-[#E93E2B] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>
                        <span className="text-sm font-semibold hidden lg:inline">Wishlist</span>
                    </button>

                    <div className="w-px h-5 bg-[#D1D5DB] hidden lg:block"></div>

                    <button onClick={onCartClick} className="flex items-center gap-2 text-[#181211] hover:text-[#E93E2B] cursor-pointer transition-colors relative">
                        <div className="relative">
                            <Icon icon="mdi:cart-outline" width={26} height={26} className="xl:w-[30px] xl:h-[30px]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-[#E93E2B] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span className="text-sm font-semibold hidden lg:inline">My Cart</span>
                    </button>
                </div>
            </div>

            {/* High-Fidelity Mobile Search Overlay */}
            <MobileSearchOverlay
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                handleSelect={handleSelect}
            />

            {/* SECTION 3: Category Navigation */}
            <div className="w-full border-t border-b border-[#E5DCDC] hidden lg:block bg-white">
                <div className="w-full px-3 sm:px-4 md:px-6 lg:px-10 xl:px-14">
                    <ul className="flex items-center justify-center gap-4 xl:gap-8 2xl:gap-14 h-10 w-full relative z-30">
                        {categories.map((cat, idx) => {
                            const categoryPath = cat.name === 'Stores'
                                ? '/store/storeslists'
                                : cat.name === 'Deals'
                                    ? '/store/deals'
                                    : `/store/category/${cat.name.toLowerCase().replace(' ', '-')}`;

                            const effectSlugs = ['micro-dosing', 'beginner-friendly', 'high-potency', 'creative-boost', 'relax-and-chill', 'visual-experience', 'focus-and-clarity', 'deep-journey'];
                            const isEffectSlug = effectSlugs.some(s => location.pathname === `/store/category/${s}`);
                            const isActive = location.pathname === categoryPath ||
                                (cat.name === 'Magic Mushrooms' && isEffectSlug);

                            const isDropdownCategory = !isHomePage && ['Magic Mushrooms', 'Microdose', 'Edibles'].includes(cat.name);

                            if (isDropdownCategory) {
                                return (
                                    <li key={idx} className="shrink-0 flex items-center justify-center relative group">
                                        <Link
                                            to={categoryPath}
                                            className={`flex items-center gap-2 text-[15px] font-bold transition-colors py-2 cursor-pointer ${isActive ? 'text-[var(--store-primary)]' : 'text-[#181211] hover:text-[var(--store-primary)]'}`}
                                        >
                                            <Icon icon={cat.icon} width={18} height={18} />
                                            <span>{cat.name}</span>
                                            <Icon icon="mdi:chevron-down" width={20} height={20} className="ml-0.5 group-hover:rotate-180 transition-transform duration-300" />
                                        </Link>

                                        <div className="absolute top-[38px] left-1/2 -translate-x-1/2 pt-2 w-56 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50">
                                            <div className="bg-white border border-[#E5DCDC] shadow-[0_8px_30_rgba(0,0,0,0.12)] rounded-lg flex flex-col pt-1 pb-1 relative">
                                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-[#E5DCDC] rotate-45"></div>
                                                <Link
                                                    to={categoryPath}
                                                    className="px-5 py-3 text-[15px] text-[#181211] hover:bg-[#FFF5F4] hover:text-[#E93E2B] font-semibold border-b border-[#F1F5F9] transition-colors relative z-10"
                                                >
                                                    All ({cat.name})
                                                </Link>
                                                {categoryIcons.map((subItem, sIdx) => {
                                                    const slug = subItem.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                                                    const effectSlug = subItem.name === 'Relax & Chill' ? 'relax-and-chill' : slug;
                                                    const iconPath = `${categoryPath}?effect=${effectSlug}`;
                                                    return (
                                                        <Link
                                                            key={sIdx}
                                                            to={iconPath}
                                                            className="px-5 py-3 text-[14px] text-[#444444] hover:bg-[#FFF5F4] border-[#F1F5F9] border-b last:border-0 hover:text-[#E93E2B] font-medium transition-colors relative z-10"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </li>
                                );
                            }

                            return (
                                <li key={idx} className="shrink-0 flex items-center justify-center">
                                    <Link
                                        to={categoryPath}
                                        className={`flex items-center gap-2 text-[15px] font-bold transition-colors py-2 ${isActive
                                            ? 'text-[var(--store-primary)]'
                                            : 'text-[#181211] hover:text-[var(--store-primary)]'
                                            }`}
                                    >
                                        <Icon icon={cat.icon} width={18} height={18} />
                                        <span>{cat.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* SECTION 4: Category Icons Row */}
            <div className={`w-full bg-[#FFFFFF] ${!isHomePage ? 'lg:hidden border-b border-[#E5DCDC]' : ''}`}>
                <div className={`${isHomePage ? 'w-full px-3 sm:px-4 md:px-6 lg:px-10 xl:px-14 py-3' : 'px-4 py-2'}`}>
                    <div className="flex items-center justify-start md:justify-center lg:justify-start xl:justify-center gap-5 md:gap-7 lg:gap-10 overflow-x-auto no-scrollbar pb-1">
                        {categoryIcons.map((item, idx) => {
                            const slug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                            const iconPath = `/store/category/${slug}`;
                            const isActiveRoute = location.pathname === iconPath;
                            const isActiveContext = selectedEffect === item.name;
                            const isActive = isActiveRoute || isActiveContext;

                            const handleIconClick = () => {
                                toggleEffect(item.name);
                            };

                            return (
                                <div
                                    key={idx}
                                    onClick={handleIconClick}
                                    className="flex flex-col items-center gap-1.5 md:gap-2.5 lg:gap-2.5 shrink-0 cursor-pointer group text-center lg:text-left min-w-[75px]"
                                >
                                    <div className={`w-[42px] h-[42px] md:w-[50px] md:h-[50px] lg:w-[58px] lg:h-[58px] rounded-full flex items-center justify-center border overflow-hidden transition-colors bg-white border-[#E8E8E8] group-hover:border-[#E93E2B] `}>
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className={`text-[11px] md:text-[13px] lg:text-sm font-semibold whitespace-normal lg:whitespace-nowrap transition-colors leading-tight lg:leading-normal ${isActive ? 'text-[var(--store-primary)]' : 'text-[#181211] group-hover:text-[var(--store-primary)]'}`}>
                                        {item.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Refined Mobile Menu Drawer */}
            <MobileMenuDrawer
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                user={user}
                categories={categories}
                logout={logout}
            />
        </header>
    );
};

export default StickyHeader;
